import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";

export async function POST(request: Request) {
  try {
    const pool = await connectToDatabase();
    const { user_id, quest_id } = await request.json();

    // 1. ตรวจสอบว่าผู้ใช้มีเควสนี้ใน quest_log
    const logResult = await pool.query(
      "SELECT * FROM quest_log WHERE user_id = $1::text AND quest_id = $2::int",
      [user_id, quest_id]
    );

    if (logResult.rowCount === 0) {
      return NextResponse.json({ message: "ยังไม่ได้รับเควสนี้" }, { status: 400 });
    }

    // 2. JOIN กับตาราง quests เพื่อดึง point, exp, reward
    const joinResult = await pool.query(
      `
      SELECT q.point, q.exp, q.reward
      FROM quest_log ql
      JOIN quests q ON ql.quest_id = q.id
      WHERE ql.user_id = $1::text AND ql.quest_id = $2::int
      `,
      [user_id, quest_id]
    );

    const questData = joinResult.rows[0];

    if (!questData) {
      return NextResponse.json({ message: "ไม่พบข้อมูลเควส" }, { status: 404 });
    }

    const { point, exp, reward } = questData;

    // 3. เพิ่มคะแนนให้ผู้ใช้ในตาราง users
    await pool.query(
      `
      UPDATE users
      SET point = COALESCE(point, 0) + $1,
          exp = COALESCE(exp, 0) + $2,
          score = COALESCE(score, 0) + $3
      WHERE email = $4::text
      `,
      [point, exp, reward, user_id]
    );

    // 4. อัปเดตสถานะใน quest_log เป็น "Completed"
    await pool.query(
      `
      UPDATE quest_log
      SET status = 'Success', submitted_at = NOW()
      WHERE user_id = $1::text AND quest_id = $2::int
      `,
      [user_id, quest_id]
    );

    // ✅ ส่งผลลัพธ์กลับ
    return NextResponse.json({
      message: "ส่งเควสและเพิ่มคะแนนสำเร็จ",
      addedPoint: point,
      addedExp: exp,
      addedReward: reward,
    });

  } catch (error) {
    console.error("❌ Database error:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์", error: error.message },
      { status: 500 }
    );
  }
}

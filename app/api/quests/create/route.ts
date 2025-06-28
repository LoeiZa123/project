import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";

export async function POST(request: Request) {
  try {
    const pool = await connectToDatabase();
    const questData = await request.json();
     const rewards = questData.rewards || [];

    // ดึงค่ารางวัลแต่ละชนิด
    const point = rewards.find(r => r.type === "point")?.amount || 0;
    const scores = rewards.find(r => r.type === "scores")?.amount || 0;
    const exp = rewards.find(r => r.type === "exp")?.amount || 0;
    // ตรวจสอบฟิลด์จำเป็น
    if (!questData.title || !questData.description) {
      return NextResponse.json(
        { message: "กรุณาระบุ title และ description" },
        { status: 400 }
      );
    }

    // เตรียมข้อมูลที่จะ insert
    const query = `
      INSERT INTO quests
      (title, description, type_quest, difficulty, category, point, reward, exp)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *;
    `;

    const values = [
      questData.title,
      questData.description,
      questData.type || null,
      questData.difficulty || null,
      questData.category || null,
      point,
      scores,
      exp,
    ];

    const result = await pool.query(query, values);

    return NextResponse.json({
      message: "เพิ่มภารกิจสำเร็จ",
      quest: result.rows[0],
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล", error: error.message },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";

// ใช้ POST เพื่อเพิ่มข้อมูลเข้าใน quest_log
export async function POST(request) {
  try {
    // สร้างการเชื่อมต่อ
    const pool = await connectToDatabase();

    // ดึงข้อมูลที่ส่งมาใน request
    const { user_id, quest_id, status } = await request.json();

    // ตรวจสอบว่าข้อมูลที่จำเป็นถูกส่งมาครบหรือไม่
    if (!user_id || !quest_id || !status) {
      return NextResponse.json(
        { message: "Missing required fields: user_id, quest_id, status" },
        { status: 400 }
      );
    }

    // เพิ่มข้อมูลใหม่เข้าในตาราง quest_log
    const query = `
      INSERT INTO quest_log (user_id, quest_id, status)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [user_id, quest_id, status];

    // รันคำสั่ง SQL เพื่อเพิ่มข้อมูล
    const result = await pool.query(query, values);

    // ส่งผลลัพธ์กลับในรูป JSON
    return NextResponse.json({
      message: "Quest log entry added successfully",
      result: result.rows[0],
    });
  } catch (error) {
    console.error("Database error:", error);

    // ส่ง error message กลับไปในรูป JSON
    return NextResponse.json(
      { message: "Database connection failed", error: error.message },
      { status: 500 }
    );
  }
}

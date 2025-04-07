import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";

export async function POST(request) {

  try {
    // สร้างการเชื่อมต่อกับฐานข้อมูล
    const pool = await connectToDatabase();
    const {user_id} = await request.json();

    // ดึงข้อมูลจากตาราง `quest_log` โดยกรองตามอีเมล
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [user_id]
    );

    // ส่งผลลัพธ์กลับในรูป JSON
    return NextResponse.json({ results: result.rows });
  } catch (error) {
    console.error("Database error:", error);

    // ส่ง error message กลับไปในรูป JSON
    return NextResponse.json(
      { message: "Database connection failed", error: error.message },
      { status: 500 }
    );
  }
}

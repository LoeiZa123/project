import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectToDatabase from "@/lib/db";

export async function POST(request) {
  try {
    // ดึงข้อมูลจาก body ของคำขอ
    const { username, email, password, student_id, faculty, department, year_of_study, enrollment_status } = await request.json();

    // เข้ารหัสรหัสผ่านด้วย bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 เป็น salt rounds

    // สร้างการเชื่อมต่อกับฐานข้อมูล
    const pool = await connectToDatabase();

    // สั่งให้ฐานข้อมูลเพิ่มข้อมูลใหม่ในตาราง users
    const result = await pool.query(
      `INSERT INTO users (username, email, password, student_id, faculty, department, year_of_study, enrollment_status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [username, email, hashedPassword, student_id, faculty, department, year_of_study, enrollment_status]
    );

    // ส่งข้อมูลที่เพิ่งเพิ่มกลับมาใน response
    return NextResponse.json({ message: "User registered successfully", user: result.rows[0] });
  } catch (error) {
    console.error("Database error:", error);

    // ส่ง error message กลับไปในรูป JSON
    return NextResponse.json({ message: "Database connection failed", error: error.message }, { status: 500 });
  }
}

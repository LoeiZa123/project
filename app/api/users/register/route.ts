import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectToDatabase from "@/lib/db";

export async function POST(request) {
  try {
    // ดึงข้อมูลจาก body ของคำขอ
    const { username, email} = await request.json();

   

    // สร้างการเชื่อมต่อกับฐานข้อมูล
    const pool = await connectToDatabase();

    // สั่งให้ฐานข้อมูลเพิ่มข้อมูลใหม่ในตาราง users
    await pool.query(
      `INSERT INTO users (username, email)
        VALUES ($1, $2) RETURNING *`,
      [username,email]
    );

    // ส่งข้อมูลที่เพิ่งเพิ่มกลับมาใน response
    return NextResponse.json({ message: "User registered successfully", user: result.rows[0] });
  } catch (error) {
    console.error("Database error:", error);

    // ส่ง error message กลับไปในรูป JSON
    return NextResponse.json({ message: "Database connection failed", error: error.message }, { status: 500 });
  }
}



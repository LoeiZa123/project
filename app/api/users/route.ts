import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";

export async function GET() {
  try {
    // สร้างการเชื่อมต่อ
    const pool = await connectToDatabase();

    // ดึงข้อมูลจากตาราง `users`
    const result = await pool.query("SELECT * FROM users");

    // ส่งผลลัพธ์กลับในรูป JSON
    return NextResponse.json({ message: "Health Check", results: result.rows });
  } catch (error) {
    console.error("Database error:", error);

    // ส่ง error message กลับไปในรูป JSON
    return NextResponse.json({ message: "Database connection failed", error: error.message }, { status: 500 });
  }
}

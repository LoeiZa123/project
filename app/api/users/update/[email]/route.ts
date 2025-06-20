import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";

export async function PATCH(request: NextRequest) {
  try {
    // ดึง email จาก URL
    const { pathname } = new URL(request.url);
    const email = decodeURIComponent(pathname.split("/").pop() || "");

    const { username, role, score } = await request.json();

    console.log("🛠 Updating user:", { email, username, role });

    if (!email || !username || !role || !score) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const pool = await connectToDatabase();

    const result = await pool.query(
      "UPDATE users SET username = $1, role = $2, score = $3 WHERE email = $4",
      [username, role, score, email]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User updated" });
  } catch (error: any) {
    console.error("❌ Update error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

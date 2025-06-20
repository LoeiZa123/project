// app/api/users/delete/[email]/route.ts
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: { email: string } }
) {
  try {
    const pool = await connectToDatabase();
    const email = decodeURIComponent(params.email);
    console.log("Deleting user with email:", email);
    if (!email || typeof email !== "string") {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    const result = await pool.query(
      "DELETE FROM users WHERE email = $1",
      [email]
    );

    if (result.rowCount > 0) {
      return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

  } catch (error: any) {
    console.error("Delete Error:", error);
    return NextResponse.json(
      { message: "Database error", error: error.message },
      { status: 500 }
    );
  }
}

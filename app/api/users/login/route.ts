import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import connectToDatabase from '@/lib/db';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const pool = await connectToDatabase();
    const result = await pool.query(
      `SELECT * FROM users WHERE username = $1 OR email = $1`,
      [username]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const user = result.rows[0];

    // ตรวจสอบรหัสผ่าน
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    // ส่งข้อมูลผู้ใช้กลับไปยังไคลเอนต์
    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { message: 'Database connection failed', error: error.message },
      { status: 500 }
    );
  }
}

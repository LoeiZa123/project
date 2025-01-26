import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

export async function middleware(req: NextRequest) {
  const cookies = parse(req.headers.get('cookie') || ''); // อ่าน cookie จาก headers
  const token = cookies.token; // ดึง token จาก cookie

  if (token) {
    // ถ้าไม่มี token ให้ redirect ไปที่หน้า login
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // ตรวจสอบว่า JWT ถูกต้องหรือไม่
    jwt.verify(token, process.env.JWT_SECRET as string);

    // ถ้า valid ให้ไปต่อ
    return NextResponse.next();
  } catch (error) {
    // ถ้าไม่ valid ก็ให้ redirect ไปที่หน้า login
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// กำหนดเส้นทางที่ต้องการให้ตรวจสอบ session
export const config = {
  matcher: ['/dashboard', '/profile', '/settings'], // ตัวอย่างหน้าในแอปที่ต้องการให้ล็อกอิน
};

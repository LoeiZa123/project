// app/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Tableranking from "../../components/tableranking";  // ใช้ PascalCase สำหรับคอมโพเนนต์
import { Card, CardBody } from "@heroui/react";
export default function App() {
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (!userData) {
      console.error('No user data found');
      window.location.href = '/'; // ใช้ window.location แทน router.push
      return;
    }

    try {
      const parsedUser = JSON.parse(userData); // แปลงข้อมูลจาก JSON เป็น Object
      setUser(parsedUser); // เก็บข้อมูลผู้ใช้ใน state
    } catch (error) {
      console.error('Failed to parse user data:', error.message);
      window.location.href = '/'; // ถ้าข้อมูลเสียหาย ให้ไปที่หน้า login
    }
  }, []);
  useEffect(() => {
    setIsClient(true); // ตั้งค่าเมื่อเป็นไคลเอนต์
  }, []);

  if (!isClient) {
    return null; // หรือคืนค่า HTML ที่ไม่ขึ้นอยู่กับการทำงานของ window
  }

  return (
    <Card>
      <CardBody>
        <Tableranking />
      </CardBody>
    </Card>
  );
}

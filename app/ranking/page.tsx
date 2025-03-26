// app/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Tableranking from "../../components/tableranking";  // ใช้ PascalCase สำหรับคอมโพเนนต์
import { Card, CardBody } from "@heroui/react";

export default function App() {
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState(null);

  // ตรวจสอบว่าโค้ดทำงานใน client side
  useEffect(() => {
    setIsClient(true);  // ตั้งค่าหลังจากการ render ใน client
  }, []);

  // หากยังไม่ทำการ render ใน client จะให้แสดงผลบางอย่างเช่น "Loading..."
  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardBody>
        <Tableranking />
      </CardBody>
    </Card>
  );
}

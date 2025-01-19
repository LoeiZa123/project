
// app/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Tablemange from "../../components/tablemange";  // ใช้ PascalCase สำหรับคอมโพเนนต์
import {Card, CardBody} from "@heroui/react";
export default function App() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // ตั้งค่าเมื่อเป็นไคลเอนต์
  }, []);

  if (!isClient) {
    return null; // หรือคืนค่า HTML ที่ไม่ขึ้นอยู่กับการทำงานของ window
  }

  return (
    <Card>
      <CardBody>
    <Tablemange />
    </CardBody>
    </Card>
  );
}

// app/managementuser/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Tablemange from "../../components/tablemange";  // ใช้ PascalCase สำหรับคอมโพเนนต์
import { Card, CardBody } from "@heroui/react";
import Listboxmange from "../../components/listboxmange";  // ใช้ PascalCase สำหรับคอมโพเนนต์

export default function App() {
  const [isClient, setIsClient] = useState(false);
  const [selectedData, setSelectedData] = useState<string | null>(null);  // เก็บข้อมูลที่เลือกจาก Listbox

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSelection = (data: string) => {
    setSelectedData(data);  // อัพเดตข้อมูลที่เลือก
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex min-h-screen p-4 gap-4">
      {/* เนื้อหาหลัก */}
      <div className="flex-1">
        <Card>
          <CardBody>
            {/* ส่ง selectedData ไปที่ Tablemange */}
            <Tablemange selectedData={selectedData} />
          </CardBody>
        </Card>
      </div>

    
    </div>
  );
}

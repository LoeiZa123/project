// app/page.tsx
'use client';
import { Card, CardBody } from "@heroui/react";
import NavbarTop from "../components/navbar";  // ใช้ PascalCase สำหรับคอมโพเนนต์
import Image from 'next/image';  // นำเข้า Image จาก next/image

export default function App() {
  return (
    <>
      <Card>
        <CardBody>
          <p>Make beautiful websites regardless of your design experience.</p>
        </CardBody>
        <Image
          alt="HeroUI hero Image"
          src="https://heroui.com/images/hero-card-complete.jpeg"
          width={300}  // ต้องใช้ตัวเลขสำหรับ width
          height={200}  // เพิ่ม height
        />
      </Card>
    </>
  );
}

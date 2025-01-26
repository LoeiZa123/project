// app/page.tsx
'use client';
import { Card, CardBody } from "@heroui/react";
import Circles from "../components/circles";  // ใช้ PascalCase สำหรับคอมโพเนนต์
import Kpistat from "../components/kpistat";  // ใช้ PascalCase สำหรับคอมโพเนนต์

import Image from 'next/image';  // นำเข้า Image จาก next/image

export default function App() {
  return (
    <>
     <Circles />
     <Kpistat />
    </>
  );
}

import { Pool } from "pg";

// ฟังก์ชันเชื่อมต่อฐานข้อมูล
export default async function connectToDatabase() {
  const pool = new Pool({
    user: process.env.DB_USER,       // ผู้ใช้ฐานข้อมูล
    host: process.env.DB_HOST,       // โฮสต์ (หรือ container name ใน Docker)
    database: process.env.DB_NAME,   // ชื่อฐานข้อมูล
    password: process.env.DB_PASSWORD, // รหัสผ่าน
    port: process.env.DB_PORT,       // พอร์ต
    max: 10,                         // จำนวน connection สูงสุดใน pool
  });

  return pool;
}

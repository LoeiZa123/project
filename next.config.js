/** @type {import('next').NextConfig} */
const nextConfig = {};

// next.config.js
module.exports = {
  images: {
    domains: ['heroui.com'],  // เพิ่มโดเมนที่ต้องการให้ Next.js โหลดภาพจากที่นี่
  },
  env: {
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
  },
}
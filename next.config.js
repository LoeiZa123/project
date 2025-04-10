/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['heroui.com', 'nextuipro.nyc3.cdn.digitaloceanspaces.com','lh3.googleusercontent.com'], // ✅ เพิ่มโดเมนที่ต้องการ
  },
  env: {
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

module.exports = nextConfig;

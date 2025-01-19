// app/layout.tsx
'use client';
// globals.css includes @tailwind directives
// adjust the path if necessary
import "@/styles/globals.css";
import {Providers} from "./providers";
import NavbarTop from "../components/navbar";  // ใช้ PascalCase สำหรับคอมโพเนนต์

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en" className='dark'>
      <body>
        <NavbarTop />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
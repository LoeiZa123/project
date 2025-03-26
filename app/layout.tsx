'use client';

import "@/styles/globals.css";
import { Providers } from "./providers";
import { SessionProviderCustom } from '@/contexts/SessionContext'; // นำเข้า SessionProviderCustom
import NavbarTop from "../components/navbar";
import { usePathname } from "next/navigation"; // นำเข้า usePathname
import { SessionProvider } from "next-auth/react";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // ดึงเส้นทางปัจจุบัน

  // เช็คว่า pathname เป็น "/login" หรือไม่
  const shouldShowNavbar = pathname !== "/register" && pathname !== "/login";

  return (
    <SessionProvider>
      <SessionProviderCustom>
        <html lang="en" className="dark">
          <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Acme</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap" rel="stylesheet" />
          </head>
          <body className="font-roboto">
            {shouldShowNavbar && <NavbarTop />}
            <Providers>
              {children}
            </Providers>
          </body>
        </html>
      </SessionProviderCustom>
    </SessionProvider>
  );
}


import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSessionContext } from '@/contexts/SessionContext';
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  Button,
} from "@heroui/react";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="48" viewBox="0 0 32 32" width="48">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { session, status } = useSessionContext(); // ใช้ข้อมูล session จาก context
  const router = useRouter();

  // ตรวจสอบข้อมูล session และ email domain
  const isValidUser = session?.user?.email?.endsWith("@northbkk.ac.th");

  useEffect(() => {
    if (status === "loading") return; // รอโหลด session ก่อน
    if (!session || !isValidUser) {
      router.push("/home");
    } else {
      console.log(session);
    }
  }, [session, status, isValidUser, router]);

  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen text-lg">Loading session...</div>;
  }
  const menuItemspath = [
    { name: "หน้าหลัก", href: "/home" },
    { name: "ภารกิจ", href: "/myquests" },
   // { name: "แดชบอร์ด", href: "/dashboard" },
    { name: "การจัดการ:", href: "/managementuser" },
    { name: "การจัดอันดับ", href: "/ranking" },
  ];

  // ถ้าไม่มี session ให้แสดงแค่ Home
  const menuItemsToDisplay = session ? menuItemspath : menuItemspath.filter(item => item.name === "Home");

  return (
    <Navbar isBordered>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen(prev => !prev)}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-lg text-inherit">WEC</p>
        </NavbarBrand>
      </NavbarContent>

      {/* เมนูสำหรับขนาดหน้าจอใหญ่ */}
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <Link href="/" className="no-underline text-inherit">
            <p className="font-bold text-lg">WEC</p>
          </Link>
        </NavbarBrand>

        {menuItemsToDisplay.map((item) => (
          <NavbarItem key={item.name} isActive={pathname === item.href}>
            <Link
              href={item.href}
              style={{
                fontSize: "1.125rem",
                color: pathname === item.href ? "#2563eb" : "#4b5563",
                fontWeight: pathname === item.href ? "600" : "normal",
                textDecoration: pathname === item.href ? "none" : "underline",
              }}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* เมนูสำหรับขนาดหน้าจอเล็ก */}
      <NavbarMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} className="sm:hidden">
        {menuItemsToDisplay.map((item) => (
          <NavbarMenuItem key={item.name} isActive={pathname === item.href}>
            <Link
              href={item.href}
              style={{
                fontSize: "1.125rem",
                color: pathname === item.href ? "#2563eb" : "#4b5563",
                fontWeight: pathname === item.href ? "600" : "normal",
                textDecoration: pathname === item.href ? "none" : "underline",
              }}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      {/* ด้านขวา */}
      <NavbarContent justify="end">
        {session ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                alt="User avatar"
                size="md"
                src={session.user?.image || "https://i.pravatar.cc/150"}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{session.user?.email || 'No email available'}</p>
              </DropdownItem>
              <DropdownItem onClick={() => router.push('/myprofile')}>
                โปรไฟล์
              </DropdownItem> 
              <DropdownItem key="settings" as={Link} href='/settings'>ตั้งค่า</DropdownItem>
              <DropdownItem key="logout" onPress={() => signOut()} color="danger">
                ออกจากระบบ
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Button className="text-default-500" onPress={() => signIn()} radius="full" variant="light">
            เข้าสู่ระบบ
          </Button>
        )}
      </NavbarContent>
    </Navbar>
  );
}

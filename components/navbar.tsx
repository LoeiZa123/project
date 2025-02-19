'use client';
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
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; // ใช้ usePathname
import { useSession, signIn,signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="48" viewBox="0 0 32 32" width="48"> {/* ขยายขนาดโลโก้ */}
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
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname(); // รับ path ของหน้าปัจจุบัน
  const [user, setUser] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();

 // ถ้ามี session ให้ redirect ไปหน้า "/"
   useEffect(() => {
     if (session) {
       console.log(session);
       //localStorage.setItem("session", JSON.stringify(session)); // บันทึกลง localStorage
 
       //router.push("/");
 
     }else{
      router.push("/home");
     }
   }, [session, router]);

  const menuItemspath = [
    { name: "Home", href: "/home" },
    { name: "Quest", href: "/quest" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Management", href: "/managementuser" },
    { name: "Ranking", href: "/ranking" },
  ];
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
  const showNavbarContent = true;

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-lg text-inherit">WEC</p> {/* เพิ่มขนาดข้อความ */}
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center"> {/* เพิ่มระยะห่าง */}
        <NavbarBrand>
          <AcmeLogo />
          <Link href="/" className="no-underline text-inherit">
            <p className="font-bold text-lg">WEC</p>
          </Link>

        </NavbarBrand>

        {menuItemspath.map((item) => (
          // ตรวจสอบเงื่อนไข: ถ้าไม่มีผู้ใช้และชื่อเมนูเป็น "Management" หรือ "Quest" จะไม่แสดงเมนู

          <NavbarItem key={item.name} isActive={pathname === item.href}>
            <Link
              href={item.href}
              style={{
                fontSize: "1.125rem", // ขนาดตัวอักษร
                color: pathname === item.href ? "#2563eb" : "#4b5563", // ใช้สีตามเงื่อนไข
                fontWeight: pathname === item.href ? "600" : "normal", // ใช้ font-weight เมื่อ active
                textDecoration: pathname === item.href ? "none" : "underline" // ไม่มีเส้นใต้เมื่อ active
              }}
            >
              {item.name}
            </Link>
          </NavbarItem>

        ))}



      </NavbarContent>

      <NavbarContent justify="end">
        
        {session ? (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              alt="User avatar"
              size="md"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat" onAction={(key) => {
            if (key === "logout") {
             
            }
          }}>
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold"> {user ? user.email : 'No email available'}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout"onPress={() => signOut()} color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        ) : <Button className="text-default-500"onPress={() => signIn()} radius="full" variant="light">
          Login
        </Button>} 
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full text-lg"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

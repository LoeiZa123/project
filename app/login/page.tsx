"use client";
import { Card, CardBody, Button } from "@heroui/react";
import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useSession, signIn,signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function App() {
  const { data: session } = useSession();
  const router = useRouter();

  // ถ้ามี session ให้ redirect ไปหน้า "/"
  useEffect(() => {
    if (session) {
      console.log(session);
      localStorage.setItem("session", JSON.stringify(session)); // บันทึกลง localStorage

      router.push("/");

    }
  }, [session, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-96 p-4">
        <CardBody>
          <div className="flex flex-col items-center justify-center mb-4">
            <h1 className="text-2xl font-semibold">Sign in to your account</h1>
          </div>
          <div className="flex flex-col gap-4">
            <Button
              startContent={<Icon icon="flat-color-icons:google" width={40} />}
              variant="bordered"
              className="text-xl font-semibold py-3"
              onPress={() => signIn()}
            >
              Continue with Google
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <Button
              startContent={<Icon icon="flat-color-icons:google" width={40} />}
              variant="bordered"
              className="text-xl font-semibold py-3"
              onPress={() => signOut()}
            >
              Continue with Google
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

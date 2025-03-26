import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "@/lib/db";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      const email = user.email;
      console.log(`Attempting to sign in with email: ${email}`); // Log อีเมลผู้ใช้

      if (email.endsWith("@northbkk.ac.th")) {
        // สร้างการเชื่อมต่อกับฐานข้อมูล
        const pool = await connectToDatabase();

        // เช็คว่าผู้ใช้มีอีเมลนี้อยู่ในฐานข้อมูลแล้วหรือไม่
        const existingUser = await pool.query(
          `SELECT * FROM users WHERE email = $1`,
          [user.email]
        );

        if (existingUser.rows.length > 0) {
          console.log("User already exists in the database. Skipping insert.");
          return true; // ถ้ามีผู้ใช้แล้ว, ไม่ต้องบันทึกซ้ำ
        }



        // สั่งให้ฐานข้อมูลเพิ่มข้อมูลใหม่ในตาราง users
        await pool.query(
          `INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *`,
          [user.name, user.email]
        );

        return true; // อนุญาตให้ล็อกอิน
      } else {
        console.log("Invalid email domain. Login denied.");
        return false; // ปฏิเสธการล็อกอินถ้าไม่ใช่ @northbkk.ac.th
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

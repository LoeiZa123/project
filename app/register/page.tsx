"use client"
import { Card, CardBody, Input, Select, SelectItem, Button,Checkbox,Divider,Link} from "@heroui/react";
import React, { useState } from "react";
import Swal from "sweetalert2";
import {Icon} from "@iconify/react";
export const AcmeIcon = () => {
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
export const EyeSlashFilledIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
        fill="currentColor"
      />
      <path
        d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
        fill="currentColor"
      />
      <path
        d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
        fill="currentColor"
      />
      <path
        d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
        fill="currentColor"
      />
      <path
        d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const EyeFilledIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
        fill="currentColor"
      />
      <path
        d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default function App() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      
      // ตรวจสอบว่า request สำเร็จหรือไม่
      if (response.ok) {
        // ใช้ SweetAlert แสดงผลแจ้งเตือนการลงทะเบียนสำเร็จ
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You have successfully registered.',
          showConfirmButton: false, // ไม่ให้ปุ่ม Confirm แสดง
          timer: 2000, // แสดงแจ้งเตือน 2 วินาที
        }).then(() => {
          // เมื่อแจ้งเตือนแสดงเสร็จแล้วให้ไปที่หน้า /login
          window.location.href = '/login'; // ใช้ window.location.href หรือใช้ router.push ใน Next.js
        });
      } else {
        // ใช้ SweetAlert แสดงผลข้อความข้อผิดพลาด
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: result.message || 'Something went wrong!',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      // แสดงข้อผิดพลาดด้วย SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'An error occurred',
        text: 'An error occurred while registering.',
      });
    }
  
    // ส่งข้อมูล formData ไปยัง API หรือ backend
    console.log(formData);
  };
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    student_id: '',
    faculty: '',
    department: '',
    year_of_study: '',
    role: 'user',
    enrollment_status: 'active'
  });
  return (
    <div className="flex h-full w-full items-center justify-center">
   
      <Card>
        <CardBody>
          <div className="flex flex-col items-center pb-6">
        <AcmeIcon size={60} />
        <h1 className="text-3xl font-medium">Welcome</h1>
        <p className="text-small text-default-500">Create an account to get started</p>
      </div>
          <form onSubmit={handleSubmit}>
            {/* จัดเรียงชื่อผู้ใช้และอีเมลให้อยู่ข้างกัน */}
            <div className="mb-1">
              <Input
                label="Username"
                name="username"
                placeholder="Enter your username"
                type="text"
                size="lg"
                value={formData.username}
                onChange={handleChange}
                className="px-1 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
                required
              />
            </div>
            <div className="mb-1">

              <Input
                label="Email"
                name="email"
                size="lg"
                placeholder="Enter your email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="px-1 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
                required
              />
            </div>

            {/* รหัสผ่าน */}
            <div className="mb-1">
              <Input
                label="Password"
                name="password"
                placeholder="Enter your password"
                type={isVisible ? 'text' : 'password'}
                size="lg"
                value={formData.password}
                onChange={handleChange}
                className="px-1 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg w-full"
                required
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400" />
                    )}
                  </button>
                }
              />
            </div>

            {/* ข้อมูลส่วนตัว */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mb-1">
              <div>
                <Input
                  label="Student ID"
                  name="student_id"
                  placeholder="Enter your student ID"
                  type="text"
                  value={formData.student_id}
                  onChange={handleChange}
                  className="px-1 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
              <div>
                <Input
                  label="Faculty"
                  name="faculty"
                  placeholder="Enter your faculty"
                  type="text"
                  value={formData.faculty}
                  onChange={handleChange}
                  className="px-1 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mb-1">
              <div>
                <Input
                  label="Department"
                  name="department"
                  placeholder="Enter your department"
                  type="text"
                  value={formData.department}
                  onChange={handleChange}
                  className="px-1 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
              <div>
                <Input
                  label="Year of Study"
                  name="year_of_study"
                  placeholder="Enter your year of study"
                  type="number"
                  size="lg"
                  value={formData.year_of_study}
                  onChange={handleChange}
                  className="px-1 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            </div>

            {/* สถานะการศึกษา */}
            <div className="mb-6">
              <Select
                label="Enrollment Status"
                name="enrollment_status"
                value={formData.enrollment_status}
                onChange={handleChange}
                className="px-1 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              >
                <SelectItem key="active">Active</SelectItem>
                <SelectItem key="graduated">Graduated</SelectItem>
                <SelectItem key="leave_of_absence">Leave of Absence</SelectItem>
              </Select>
            </div>

            {/* ปุ่มลงทะเบียน */}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Sign Up
            </Button>
            <p className="text-center text-small mt-4">
        Already have an account?&nbsp;
        <Link href="#" size="lg">
          Log In
        </Link>
      </p>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

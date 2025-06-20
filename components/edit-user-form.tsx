'use client';

import React, { useState, useEffect } from "react";
import { Input, Button, Select, SelectItem } from "@heroui/react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface EditUserFormProps {
  onClose: () => void;
  user: User;
}

export function EditUserForm({ onClose, user }: EditUserFormProps) {
  const [username, setName] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [score, setPoints] = useState(user.score || 0);
  const [role, setRole] = useState(user.role || "user");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setName(user.username);
    setEmail(user.email);
    setRole(user.role);
    setPoints(user.score || 0);
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`/api/users/update/${encodeURIComponent(user.email)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, role, score }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ User updated successfully");
        onClose(); // ปิด modal ถ้าอยากปิดทันที
        window.location.reload(); // รีเฟรชหน้า
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      setMessage("❌ Update failed");
    } finally {
      setLoading(false);
    }
    console.log("Updated user:", { username, email, role });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name"
        value={username}
        onChange={(e) => setName(e.target.value)}
        isRequired
      />
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        isReadOnly
      />
      <Input
        label="Points"
        type="number"
        value={score}
        onChange={(e) => setPoints(Number(e.target.value))}
        isRequired
      />
      <Select
        label="Role"
        selectedKeys={[role]}
        onSelectionChange={(keys) => setRole(Array.from(keys)[0])}
      >
        <SelectItem key="admin">Admin</SelectItem>
        <SelectItem key="user">User</SelectItem>
        <SelectItem key="guest">Guest</SelectItem>
      </Select>

      <div className="flex justify-end gap-2">
        <Button color="primary" isLoading={loading} type="submit">
          Save
        </Button>
        <Button variant="light" onPress={onClose}>
          Cancel
        </Button>
      </div>
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </form>
  );
}

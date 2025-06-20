'use client';

import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { EditUserForm } from '../../components/edit-user-form';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function App() {
  const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure();
  const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onOpenChange: onConfirmOpenChange } = useDisclosure();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Narongrit Jandee', email: 'narongrit@example.com', role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
    { id: 3, name: 'John Doe', email: 'john@example.com', role: 'guest' },
  ]);

  const handleAction = (key: React.Key, user: User) => {
    if (key === "edit") {
      setSelectedUser(user);
      onEditOpen();
    } else if (key === "delete") {
      setSelectedUser(user);
      onConfirmOpen();
    }
  };

  const handleDelete = () => {
    if (!selectedUser) return;
    //setUsers(prev => prev.filter(user => user.id !== selectedUser.id));
   // onConfirmOpenChange(false); // ปิด confirm modal
  };

  return (
    <div className="grid gap-6 p-6">
      {users.map((user) => (
        <Card key={user.id}>
          <CardHeader className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Dropdown>
              <DropdownTrigger>
                <Button size="sm" variant="ghost">
                  <Icon icon="lucide:more-vertical" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="User Actions"
                onAction={(key) => handleAction(key, user)}
              >
                <DropdownItem key="edit" startContent={<Icon icon="lucide:pencil" />}>
                  Edit User
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  startContent={<Icon icon="lucide:trash-2" />}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </CardHeader>
        </Card>
      ))}

      {/* Modal แก้ไขผู้ใช้ */}
      <Modal isOpen={isEditOpen} onOpenChange={onEditOpenChange} scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Edit User</ModalHeader>
              <ModalBody>
                {selectedUser && <EditUserForm user={selectedUser} onClose={onClose} />}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Modal ยืนยันลบ */}
      <Modal isOpen={isConfirmOpen} onOpenChange={onConfirmOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Confirm Delete</ModalHeader>
              <ModalBody>
                Are you sure you want to delete ?{" "}
                <strong>{selectedUser?.name}</strong>
              </ModalBody>
              <ModalFooter className="flex justify-end gap-2">
                <Button variant="light" onPress={() => onClose()}>
                  Cancel
                </Button>
                <Button color="danger" onPress={() => { handleDelete(); onClose(); }}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

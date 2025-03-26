// components/listboxmange.tsx
import React from 'react';
import { Listbox, ListboxItem } from "@heroui/react";

interface ListboxmangeProps {
  onSelect: (data: string) => void;
}

const Listboxmange: React.FC<ListboxmangeProps> = ({ onSelect }) => {
  return (
    <div className="w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
      <Listbox
        disallowEmptySelection
        aria-label="Single selection example"
        selectionMode="single"
        variant="flat"
        onSelectionChange={(selectedKeys) => {
          const selectedValue = Array.from(selectedKeys)[0];
          if (selectedValue) {
            onSelect(selectedValue);
          }
        }}
      >
        <ListboxItem key="user" cheacked>ผู้ใช้งาน</ListboxItem>
        <ListboxItem key="quest">ภารกิจ</ListboxItem>
      </Listbox>
    </div>
  );
};

export default Listboxmange;

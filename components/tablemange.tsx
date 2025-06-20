'use client';
import React, { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    ModalFooter,
} from "@heroui/react";
import {
    Plus,
} from "lucide-react"
import { Icon } from "@iconify/react";
import { EditUserForm } from './edit-user-form';
import { AddQuestModal } from "./add-quest-modal"
export const columns = [
    { name: "ไอดี", uid: "id", sortable: true },
    { name: "ชื่อ-นามสกุล", uid: "name", sortable: true },
    { name: "อายุ", uid: "age", sortable: true },
    { name: "รหัสนักศึกษา", uid: "studentId" },
    { name: "อีเมล", uid: "email" },
    { name: "คะแนน", uid: "score" },
    { name: "ทีม", uid: "team" },
    { name: "สถานะ", uid: "status", sortable: true },
    { name: "จัดการ", uid: "actions" },
];
export const columnsQusets = [
    { name: "ไอดี", uid: "id", sortable: true },
    { name: "ชื่อเควส", uid: "title", sortable: true },
    { name: "คะเเนน", uid: "reward", sortable: true },
    { name: "ระดับความยาก", uid: "difficulty" },
    { name: "รายละเอียด", uid: "description" },
    { name: "หมวดหมู่", uid: "email" },
    { name: "รูป", uid: "image" },
    { name: "สถานะ", uid: "status", sortable: true },
    { name: "จัดการ", uid: "actions" },

];

export const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "Paused", uid: "paused" },
    { name: "Vacation", uid: "vacation" },
];

function getRandomRole() {
    return Math.random() > 0.5 ? "Professor" : "Student";
}

function getRandomDepartment() {
    const departments = ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Business Administration"];
    return departments[Math.floor(Math.random() * departments.length)];
}

function getRandomStudentId() {
    return Math.floor(10000 + Math.random() * 90000); // Generate random 5-digit student ID
}

function getRandomScore() {
    return Math.floor(Math.random() * 100) + 1; // Random score between 1 and 100
}


export const quests = [
    {
        id: 1,
        name: "Tony Reichert",
        role: getRandomRole(),
        team: getRandomDepartment(),
        status: "active",
        age: "29",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        email: "tony.reichert@example.com",
        studentId: getRandomStudentId(),
        score: getRandomScore(),
    },
    {
        id: 2,
        name: "Zoey Lang",
        role: getRandomRole(),
        team: getRandomDepartment(),
        status: "paused",
        age: "25",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        email: "zoey.lang@example.com",
        studentId: getRandomStudentId(),
        score: getRandomScore(),
    },
    {
        id: 3,
        name: "Jane Fisher",
        role: getRandomRole(),
        team: getRandomDepartment(),
        status: "active",
        age: "22",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        email: "jane.fisher@example.com",
        studentId: getRandomStudentId(),
        score: getRandomScore(),
    },
    {
        id: 4,
        name: "William Howard",
        role: getRandomRole(),
        team: getRandomDepartment(),
        status: "vacation",
        age: "28",
        avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
        email: "william.howard@example.com",
        studentId: getRandomStudentId(),
        score: getRandomScore(),
    },
    {
        id: 5,
        name: "Kristen Copper",
        role: getRandomRole(),
        team: getRandomDepartment(),
        status: "active",
        age: "24",
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
        email: "kristen.cooper@example.com",
        studentId: getRandomStudentId(),
        score: getRandomScore(),
    },
    {
        id: 6,
        name: "Brian Kim",
        role: getRandomRole(),
        team: getRandomDepartment(),
        age: "29",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        email: "brian.kim@example.com",
        status: "Active",
        studentId: getRandomStudentId(),
        score: getRandomScore(),
    },
    {
        id: 7,
        name: "Michael Hunt",
        role: getRandomRole(),
        team: getRandomDepartment(),
        status: "paused",
        age: "27",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
        email: "michael.hunt@example.com",
        studentId: getRandomStudentId(),
        score: getRandomScore(),
    },

];

export function capitalize(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const PlusIcon = ({ size = 32, width, height, ...props }) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={size || height}
            role="presentation"
            viewBox="0 0 24 24"
            width={size || width}
            {...props}
        >
            <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            >
                <path d="M6 12h12" />
                <path d="M12 18V6" />
            </g>
        </svg>
    );
};

export const VerticalDotsIcon = ({ size = 24, width, height, ...props }) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={size || height}
            role="presentation"
            viewBox="0 0 24 24"
            width={size || width}
            {...props}
        >
            <path
                d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                fill="currentColor"
            />
        </svg>
    );
};

export const SearchIcon = (props) => {
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
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
            <path
                d="M22 22L20 20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
};

export const ChevronDownIcon = ({ strokeWidth = 1.5, ...otherProps }) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...otherProps}
        >
            <path
                d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={strokeWidth}
            />
        </svg>
    );
};

const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};
interface TablemangeProps {
    selectedData: string | null;
}
const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions", "email", "score", "studentId"];
const INITIAL_VISIBLE_COLUMNS_QUESTS = ["title", "name", "status", "actions", "description", "reward", "difficulty", "category", "image"];

const Tablemange: React.FC<TablemangeProps> = ({ selectedData }) => {
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [visibleColumnsQusets, setVisibleColumnsQusets] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS_QUESTS));
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [dataFilter, setDataFilter] = React.useState(new Set(["users"]));  // dataFilter เป็น Set
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [users, setUsers] = useState([]);
    const [quests, setQuests] = useState([]);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "age",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onOpenChange: onConfirmOpenChange } = useDisclosure();


    const handleAction = (key: React.Key, user: User) => {
        if (key === "edit") {
            setSelectedUser(user);
            onOpen();
        } else if (key === "delete") {
            setSelectedUser(user);
            onConfirmOpen();
        }
    };
    const handleDelete = async (email: string) => {
        const confirmed = confirm(`Are you sure you want to delete user with email ${email}?`);
        if (!confirmed) return;

        try {
            const res = await fetch(`api/users/delete/${encodeURIComponent(email)}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Failed to delete user');
            }

            setUsers(prev => prev.filter(user => user.email !== email));
        } catch (error) {
            alert('Delete failed: ' + error.message);
        }
    };

    const handleDeleteConfirm = () => {
        if (!selectedUser) return;
        handleDelete(selectedUser.email);
        onConfirmOpenChange(false);
    };
    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (!dataFilter.has("users") ? visibleColumnsQusets : visibleColumns === "all") {
            return !dataFilter.has("users") ? columnsQusets : columns;
        }

        if (!dataFilter.has("users") ? visibleColumnsQusets : visibleColumns instanceof Set) {
            return !dataFilter.has("users")
                ? columnsQusets.filter((column) => !dataFilter.has("users") ? visibleColumnsQusets : visibleColumns.has(column.uid))
                : columns.filter((column) => !dataFilter.has("users") ? visibleColumnsQusets : visibleColumns.has(column.uid));
        }

        return []; // กรณีที่ visibleColumns ไม่ใช่ "all" และไม่ใช่ Set
    }, [visibleColumns, dataFilter, visibleColumnsQusets]);

    // ฟังก์ชันดึงข้อมูล users
    const fetchUsers = async () => {
        try {
            const response = await fetch("api/users");
            const data = await response.json();

            // ดึงเฉพาะ results และตรวจสอบว่ามีข้อมูลหรือไม่
            setUsers(data.results ?? []);
        } catch (error) {
            console.error("Error fetching users:", error);
            setUsers([]); // ตั้งค่า users เป็นอาร์เรย์ว่างถ้ามี error
        }
    };
    const fetchQuests = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/quests");
            const data = await response.json();

            // ดึงเฉพาะ results และตรวจสอบว่ามีข้อมูลหรือไม่
            setQuests(data.results ?? []);
        } catch (error) {
            console.error("Error fetching users:", error);
            setQuests([]); // ตั้งค่า users เป็นอาร์เรย์ว่างถ้ามี error
        }
    };
    // โหลดข้อมูลจาก API ครั้งแรก
    useEffect(() => {
        fetchUsers();
        fetchQuests();
    }, []);
    const filteredItems = React.useMemo(() => {
        let filteredUsers = !dataFilter.has("users") ? quests : users;

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredUsers = filteredUsers.filter((user) =>
                Array.from(statusFilter).includes(user.status),
            );
        }

        return filteredUsers;
    }, [users, quests, dataFilter, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((user, columnKey) => {
        console.log(user);
        console.log(columnKey);

        const cellValue = user[columnKey];
        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: user.profile_img }}
                        description={<p className="text-base font-bold">{user.username}</p>}
                        name={<p className="text-base font-bold">{cellValue}</p>} // เพิ่มขนาดฟอนต์ของ name และทำให้เป็นตัวหนา
                    >
                        {user.email}
                    </User>
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-base capitalize">{cellValue}</p>
                        <p className="text-bold text-small capitalize text-default-400">{user.team}</p>
                    </div>
                );

            case "reward":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-base capitalize">{cellValue} point</p>
                    </div>
                );
            case "score":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-base capitalize">{cellValue} point</p>
                    </div>
                );
            case "studentId":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-base capitalize">{cellValue}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <VerticalDotsIcon className="text-default-300" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="User Actions Menu"
                                onAction={(key) => handleAction(key, user)}>
                                <DropdownItem key="view">View</DropdownItem>
                                <DropdownItem key="edit">
                                    Edit User
                                </DropdownItem>
                                <DropdownItem key="delete" className="text-danger" color="danger">Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("");
        setPage(1);
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">

                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by name..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Data
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={dataFilter}
                                selectionMode="single"
                                onSelectionChange={setDataFilter}
                            >
                                <DropdownItem key="users" className="capitalize">ผู้ใช้งาน</DropdownItem>
                                <DropdownItem key="qusets" className="capitalize">ภารกิจ</DropdownItem>

                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Status
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={!dataFilter.has("users") ? visibleColumnsQusets : visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={!dataFilter.has("users") ? setVisibleColumnsQusets : setVisibleColumns}
                            >
                                {!dataFilter.has("users")
                                    ? (columnsQusets || []).map((column) => (
                                        <DropdownItem key={column.uid} className="capitalize">
                                            {capitalize(column.name)}
                                        </DropdownItem>
                                    ))
                                    : (columns || []).map((column) => (
                                        <DropdownItem key={column.uid} className="capitalize">
                                            {capitalize(column.name)}
                                        </DropdownItem>
                                    ))
                                }
                            </DropdownMenu>
                        </Dropdown>

                        {dataFilter.has("qusets") && <AddQuestModal />}


                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {users.length} users</span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            defaultValue="10"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10" >10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onRowsPerPageChange,
        users.length,
        onSearchChange,
        hasSearchFilter,
        setDataFilter,
        dataFilter,

    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys === "all"
                        ? "All items selected"
                        : `${selectedKeys.size} of ${filteredItems.length} selected`}
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);


    return (
        <>
            <Table
                isHeaderSticky
                aria-label="Example table with custom cells, pagination and sorting"
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="outside"
                onSelectionChange={setSelectedKeys}
                onSortChange={setSortDescriptor}
            >
                <TableHeader columns={headerColumns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                            allowsSorting={column.sortable}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No users found"} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior="inside"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Edit User</ModalHeader>
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
                                <strong>{selectedUser?.email}</strong>
                            </ModalBody>
                            <ModalFooter className="flex justify-end gap-2">
                                <Button variant="light" onPress={() => onClose()}>
                                    Cancel
                                </Button>
                                <Button color="danger" onPress={() => { handleDeleteConfirm(); onClose(); }}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );

}

export default Tablemange;


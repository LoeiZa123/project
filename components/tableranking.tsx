'use client';

import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
    Chip,
    Tooltip,
} from "@heroui/react";

// Define the columns for Rank, Score, and Eye icon
export const columns = [
    { name: "RANK", uid: "rank" }, // Added RANK column
    { name: "NAME", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "SCORE", uid: "score" }, // Added SCORE column
    { name: "ACTIONS", uid: "actions" }, // Only keeping the Actions column for Eye icon
];
function getRandomRole() {
    return Math.random() > 0.5 ? "Professor" : "Student";
  }
  
  function getRandomDepartment() {
    const departments = ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Business Administration"];
    return departments[Math.floor(Math.random() * departments.length)];
  }
// Random score generator function (within a range)
const getRandomScore = () => {
    return Math.floor(Math.random() * 600) + 100; // Random score between 100 to 500
};

// Assign score to users
export const users = [
    {
        id: 1,
        name: "Tony Reichert",
        role: getRandomRole(),
        team: getRandomDepartment(),
        score: getRandomScore(),
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        email: "tony.reichert@example.com",
    },
    {
        id: 2,
        name: "Zoey Lang",
        role: getRandomRole(),
        team: getRandomDepartment(),
        score: getRandomScore(),
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        email: "zoey.lang@example.com",
    },
    {
        id: 3,
        name: "Jane Fisher",
        role: getRandomRole(),
        team: getRandomDepartment(),
        score: getRandomScore(),
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        email: "jane.fisher@example.com",
    },
    {
        id: 4,
        name: "William Howard",
        role: getRandomRole(),
        team: getRandomDepartment(),
        score: getRandomScore(),
        avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
        email: "william.howard@example.com",
    },
    {
        id: 5,
        name: "Kristen Copper",
        role: getRandomRole(),
        team: getRandomDepartment(),
        score: getRandomScore(),
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
        email: "kristen.cooper@example.com",
    },
    {
        id: 6,
        name: "Kristen Copper",
        role: getRandomRole(),
        team: getRandomDepartment(),
        score: getRandomScore(),
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
        email: "kristen.cooper@example.com",
    },
    {
        id: 7,
        name: "Kristen Copper",
        role: getRandomRole(),
        team: getRandomDepartment(),
        score: getRandomScore(),
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
        email: "kristen.cooper@example.com",
    },
    {
        id: 8,
        name: "Kristen Copper",
        role: getRandomRole(),
        team: getRandomDepartment(),
        score: getRandomScore(),
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
        email: "kristen.cooper@example.com",
    },
    {
        id: 9,
        name: "Kristen Copper",
        role: getRandomRole(),
        team: getRandomDepartment(),
        score: getRandomScore(),
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
        email: "kristen.cooper@example.com",
    },
    {
        id: 10,
        name: "Kristen Copper",
        role: getRandomRole(),
        team: getRandomDepartment(),
        score: getRandomScore(),
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
        email: "kristen.cooper@example.com",
    },
    {
        id: 11,
        name: "Kristen Copper",
        role: getRandomRole(),
        team: getRandomDepartment(),
        score: getRandomScore(),
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
        email: "kristen.cooper@example.com",
    },
    {
        id: 12,
        name: "Kristen Copper",
        role: getRandomRole(),
        team: getRandomDepartment(),
        score: getRandomScore(),
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
        email: "kristen.cooper@example.com",
    },
    
];
// Score mapping based on rank
const getRankScore = (score) =>
    score >= 500 ? 'Diamond' :
        score >= 400 ? 'Platinum' :
            score >= 300 ? 'Gold' :
                score >= 200 ? 'Silver' :
                    score >= 100 ? 'Bronze' : 'No Rank';

const rankColorMap = {
    Diamond: "#CC33FF",   // สีทองสำหรับ Diamond (HEX code สำหรับทอง)
    Platinum: "#E5E4E2",  // สีเงินสำหรับ Platinum (HEX code สำหรับเงิน)
    Gold: "#FFCC00",      // สีทองเหลืองสำหรับ Gold (HEX code สำหรับทองเหลือง)
    Silver: "#C0C0C0",     // สีเงินสำหรับ Silver (HEX code สำหรับเงิน)
    Bronze: "#CD7F32",    // สีน้ำตาลทองสำหรับ Bronze (HEX code สำหรับทองแดง)
    'No Rank': "#D3D3D3",  // สีเทาสำหรับ No Rank (HEX code สำหรับเทาอ่อน)
};

// Sort users by score in descending order
const sortedUsers = [...users].sort((a, b) => b.score - a.score);

export const EyeIcon = (props) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 20 20"
            width="1em"
            {...props}
        >
            <path
                d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
        </svg>
    );
};

export const DeleteIcon = (props) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 20 20"
            width="1em"
            {...props}
        >
            <path
                d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M8.60834 13.75H11.3833"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M7.91669 10.4167H12.0834"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
        </svg>
    );
};

export const EditIcon = (props) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 20 20"
            width="1em"
            {...props}
        >
            <path
                d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
            <path
                d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
            <path
                d="M2.5 18.3333H17.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
        </svg>
    );
};

// Render the table with ranked users
export default function App() {
    let num = 0;
    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];
        const rank = sortedUsers.findIndex(u => u.id === user.id) + 1;

        switch (columnKey) {
            case "rank":
                // Ensure rank is displayed based on sorted index (rank 1 should be the highest score)
                return <span className="text-base">{rank}</span>;  // Rank based on sorted order
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: user.avatar }}
                        name={<p className="text-base font-bold">{cellValue}</p>} // เพิ่มขนาดฟอนต์ของ name และทำให้เป็นตัวหนา
                    >
                        {user.email}
                    </User>
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-base capitalize">{cellValue}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
                    </div>
                );
                case "score":
                    return (
                      <span>
                        {cellValue !== undefined && !isNaN(cellValue) ? cellValue+" Point " : "N/A"}  
                        <Chip 
                          className="capitalize" 
                          style={{ backgroundColor: rankColorMap[getRankScore(cellValue)], color: '#000000'}} // ใช้ style กับ backgroundColor
                          size="base" 
                          variant="flat"
                        >
                          {getRankScore(cellValue)}
                        </Chip>
                      </span>
                    );  // Display score
                  
            case "actions":
                return (
                    <div className="relative flex items-center justify-center gap-2">
                    <Tooltip content="Details">
                        <span className="text-3xl text-default-400 cursor-pointer active:opacity-50">
                            <EyeIcon />
                        </span>
                    </Tooltip>
                </div>           
                );
            default:
                return cellValue;
        }
    }, []);


    return (
        <Table aria-label="Ranking table">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={sortedUsers}>
                {(item, index) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey, index)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

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
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Avatar, Progress, Image
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

const player = {
    name: 'John Doe',
    username: 'johndoe123',
    level: 10,
    totalPoints: 2450,
    achievements: 15,
    avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'Passionate gamer and environmental advocate. Always striving to reach new heights in every game I play!',
    questsCompleted: 8,
    totalQuests: 18,
};



// Render the table with ranked users
export default function App() {
    let num = 0;
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                        {cellValue !== undefined && !isNaN(cellValue) ? cellValue + " Point " : "N/A"}
                        <Chip
                            className="capitalize"
                            style={{ backgroundColor: rankColorMap[getRankScore(cellValue)], color: '#000000' }} // ใช้ style กับ backgroundColor
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
                            <span className="text-3xl text-default-400 cursor-pointer active:opacity-50" onClick={onOpen}>
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
        <div>
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
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="w-full max-w-screen-xl">
                    {(onClose) => (
                        <div className="flex flex-col md:flex-row  justify-between  from-gray-900 via-gray-800 to-gray-700 p-8 rounded-lg shadow-2xl">
                            {/* Left Section: Profile Avatar & Basic Info */}
                            <div className="flex flex-col items-center space-y-6 md:w-1/4 bg-gray-900 p-5 rounded-xl h-full shadow-lg flex-grow">
                                {/* Profile Picture */}
                                <Avatar
                                    src={player?.avatarUrl}
                                    alt={player?.name}
                                    size="2xl"
                                    className="border-8 border-yellow-400 shadow-xl"
                                />
                                {/* Basic Info */}
                                <div className="space-y-4 text-center">
                                    <p className="text-3xl font-semibold text-white">{player?.name}</p>
                                    <p className="text-2xl text-gray-300">Username: {player?.username}</p>
                                    <p className="text-xl text-gray-400">Level: {player?.level}</p>
                                    <p className="text-xl text-gray-400">Total Points: {player?.totalPoints}</p>
                                    <p className="text-xl text-gray-400">Achievements: {player?.achievements}</p>

                                </div>
                                <div>
                                <Image
                                    alt="HeroUI hero Image"
                                    src="/acviment/badge.png"
                                    width={150}
                                />
                                </div>
                                <div>
                                <Image
                                    alt="HeroUI hero Image"
                                    src="/acviment/trophy.png"
                                    width={150}
                                />
                                </div>
                                <div>
                                <Image
                                    alt="HeroUI hero Image"
                                    src="/acviment/wreath.png"
                                    width={150}
                                />
                                </div>
                            </div>

                            {/* Right Section: Progress & Bio */}
                            <div className="w-full md:w-2/2 ml-4 bg-gray-900 p-6 rounded-xl shadow-lg">
                                {/* Player's Progress */}
                                <div className="space-y-6 mb-8">
                                    <p className="font-semibold text-2xl text-white">Quest Progress:</p>
                                    {player?.questsCompleted ? (
                                        <div className="text-white">
                                            <p className="text-lg mb-4">
                                                Completed Quests: {player?.questsCompleted} / {player?.totalQuests}
                                            </p>
                                            <Progress
                                                value={(player?.questsCompleted / player?.totalQuests) * 100}
                                                className="mt-2 h-2 bg-green-500 rounded"
                                            />
                                        </div>
                                    ) : (
                                        <p className="text-gray-500">No quest completed yet.</p>
                                    )}
                                </div>

                                {/* Achievements */}
                                <div className="space-y-4 mb-8">
                                    <p className="font-semibold text-2xl text-white">Achievements:</p>
                                    {player?.achievements > 0 ? (
                                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                                            {[...Array(player?.achievements)].map((_, index) => (
                                                <li key={index} className="text-lg">Achievement #{index + 1}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500">No achievements yet.</p>
                                    )}
                                </div>

                                {/* Bio */}
                                <div className="mt-6">
                                    <p className="font-semibold text-2xl text-white">About:</p>
                                    <p className="text-lg text-gray-300">{player?.bio}</p>
                                </div>
                            </div>
                        </div>
                    )}

                </ModalContent>
            </Modal>






        </div>
    );
}

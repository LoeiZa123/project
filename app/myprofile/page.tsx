"use client";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Edit, Settings, Shield, Sword, Trophy, UserIcon, Zap } from "lucide-react"
import { useSessionContext } from '@/contexts/SessionContext';
import React, { useState, useEffect } from 'react';

export default function ProfilePage() {
    const [quests, setQuests] = React.useState([]);
    const { session, status } = useSessionContext(); // ใช้ข้อมูล session จาก context
    const [questslog, setQuestslog] = React.useState([]);
    const [userdata, setUserdata] = React.useState([]);

    useEffect(() => {
        if (session?.user?.email) {
            fetchQuests();
            fetchQuestsLog();
            fetchUsers();
        }
    }, [session]);
    const fetchQuests = async () => {
        try {
            const response = await fetch("api/quests");
            const data = await response.json();
            setQuests(data.results ?? []);
        } catch (error) {
            console.error("Error fetching quests:", error);
            setQuests([]);
        }
    };
    const fetchQuestsLog = async () => {
        try {
            const response = await fetch("api/quests/log/myquest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_id: session?.user?.email }),
            });

            const data = await response.json();
            setQuestslog(data.results ?? []);

        } catch (error) {
            console.error("Error fetching quests log:", error);
            setQuests([]);
        }
    };
    const fetchUsers = async () => {
        try {
            const response = await fetch("api/users/getuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_id: session?.user?.email }),
            });

            const data = await response.json();
            setUserdata(data.results ?? []);

        } catch (error) {
            console.error("Error fetching quests log:", error);
            setUserdata([]);
        }
    };
    //const filteredQuests = deleteQuestFromList(quests, questslog);
    const filteredQuests = React.useMemo(() => {
        const completedQuestIds = questslog.map(log => log.quest_id); // ค้นหา quest_id จาก questslog
        return quests.filter(quest => !completedQuestIds.includes(quest.id)); // กรองเควสที่ไม่ได้รับการทำ
    }, [quests, questslog]);
    //const filteredQuestscom = getCompletedQuests(quests, questslog);
    const filteredQuestscom = React.useMemo(() => {
        // กรอง questslog ให้เหลือแค่ quest_id ที่มี status เป็น 'Success'
        const completedQuestIds = questslog
            .filter(log => log.status != 'Success')  // กรอง log ที่มี status เป็น 'Success'
            .map(log => log.quest_id);  // ดึงแค่ quest_id
        // กรอง quests ให้เหลือเฉพาะที่ id ตรงกับ completedQuestIds
        return quests.filter(quest => completedQuestIds.includes(quest.id));
    }, [quests, questslog]);
    const filteredQuestsOn = React.useMemo(() => {
        const completedQuestIds = questslog
            .filter(log => log.status === 'Success') // กรองเฉพาะที่มี status เป็น 'Success'
            .map(log => log.quest_id); // แค่ดึง quest_id ออกมา
        return quests.filter(quest => completedQuestIds.includes(quest.id)); // กรองจาก quests โดยใช้ quest_id
    }, [quests, questslog]);
    let formattedDate;
    if (userdata && userdata.length > 0 && userdata[0].created_at) {
        const createdAt = new Date(userdata[0].created_at);
        formattedDate = createdAt.toLocaleString("en-US", { month: "long", year: "numeric" });
    }


    if (status === "loading") {
        return <div className="flex items-center justify-center h-screen text-lg">Loading session...</div>;
    }

    return (
        <div className="container mx-auto py-6 px-4 md:px-6 lg:py-10">
            <div className="flex flex-col gap-6">
                {/* Profile Header */}
                <div className="relative">
                    <div className="h-32 w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600"></div>
                    <div className="absolute -bottom-16 left-4 h-32 w-32 rounded-xl border-4 border-background bg-muted flex items-center justify-center">
                        <img src={session?.user?.image} alt="" />
                    </div>
                    <Button size="icon" variant="outline" className="absolute top-4 right-4 rounded-full">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit profile</span>
                    </Button>
                </div>

                {/* Profile Info */}
                <div className="mt-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">{session?.user?.name}</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-muted-foreground">{session?.user?.email}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge
                                variant="secondary"
                                className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900"
                            >
                                Level 24
                            </Badge>
                            <span className="text-muted-foreground">เข้าร่วม {formattedDate}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            ตั้งค่า
                        </Button>
                        <Button size="sm">
                            <Shield className="h-4 w-4 mr-2" />
                            โปรไฟล์กิลด์
                        </Button>
                    </div>
                </div>

                {/* XP Progress */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                            <div>
                                <h2 className="text-xl font-bold">เลเวล 24</h2>
                                <p className="text-muted-foreground">7,250 / 10,000 XP ต่อไป เลเวล 25</p>
                            </div>
                            <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                <Trophy className="h-4 w-4" />
                                <span className="text-sm font-medium">7,250 XP</span>
                            </div>
                        </div>
                        <Progress value={72.5} className="h-2" />
                    </CardContent>
                </Card>

                {/* Tabs */}
                <Tabs defaultValue="stats" className="w-full">
                    <TabsList className="mb-6">
                        <TabsTrigger value="stats">สเเตค</TabsTrigger>
                        <TabsTrigger value="achievements">ความสำเร็จ</TabsTrigger>
                        {/*<TabsTrigger value="inventory">Inventory</TabsTrigger>*/}
                        <TabsTrigger value="history">ประวัติ</TabsTrigger>
                    </TabsList>

                    {/* Stats Tab */}
                    <TabsContent value="stats" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/*  <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Character Stats</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center dark:bg-red-900">
                                                <Sword className="h-4 w-4 text-red-700 dark:text-red-300" />
                                            </div>
                                            <span>Strength</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold">65</span>
                                            <Badge
                                                variant="outline"
                                                className="text-green-600 border-green-300 dark:text-green-400 dark:border-green-700"
                                            >
                                                +5
                                            </Badge>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900">
                                                <Zap className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                                            </div>
                                            <span>Intelligence</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold">42</span>
                                            <Badge
                                                variant="outline"
                                                className="text-green-600 border-green-300 dark:text-green-400 dark:border-green-700"
                                            >
                                                +2
                                            </Badge>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900">
                                                <Shield className="h-4 w-4 text-green-700 dark:text-green-300" />
                                            </div>
                                            <span>Defense</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold">58</span>
                                            <Badge
                                                variant="outline"
                                                className="text-green-600 border-green-300 dark:text-green-400 dark:border-green-700"
                                            >
                                                +8
                                            </Badge>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center dark:bg-yellow-900">
                                                <svg
                                                    className="h-4 w-4 text-yellow-700 dark:text-yellow-300"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                                    />
                                                </svg>
                                            </div>
                                            <span>Agility</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold">47</span>
                                            <Badge
                                                variant="outline"
                                                className="text-green-600 border-green-300 dark:text-green-400 dark:border-green-700"
                                            >
                                                +3
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card> */}

                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">สถิติการคัดแยกขยะ</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">จำนวนขยะที่คัดแยกแล้ว</span>
                                        <span className="font-bold">128 ชิ้น</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">คะแนนรวมที่ได้รับ</span>
                                        <span className="font-bold">3,240 คะแนน</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">ขยะรีไซเคิลที่ส่งแล้ว</span>
                                        <span className="font-bold">54 ชิ้น</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">ระดับปัจจุบัน</span>
                                        <span className="font-bold">Eco Hero</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">อันดับในวิทยาลัย</span>
                                        <span className="font-bold">อันดับที่ 12</span>
                                    </div>
                                </CardContent>
                            </Card>

                        </div>
                        {/*<Card>}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Skills</CardTitle>
                                <CardDescription>Mastery levels in various skills</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span>Swordsmanship</span>
                                            <span className="text-sm font-medium">Lvl 32</span>
                                        </div>
                                        <Progress value={80} className="h-2" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span>Archery</span>
                                            <span className="text-sm font-medium">Lvl 18</span>
                                        </div>
                                        <Progress value={45} className="h-2" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span>Alchemy</span>
                                            <span className="text-sm font-medium">Lvl 24</span>
                                        </div>
                                        <Progress value={60} className="h-2" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span>Blacksmithing</span>
                                            <span className="text-sm font-medium">Lvl 27</span>
                                        </div>
                                        <Progress value={67.5} className="h-2" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span>Enchanting</span>
                                            <span className="text-sm font-medium">Lvl 15</span>
                                        </div>
                                        <Progress value={37.5} className="h-2" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span>Herbalism</span>
                                            <span className="text-sm font-medium">Lvl 21</span>
                                        </div>
                                        <Progress value={52.5} className="h-2" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        */}
                    </TabsContent>

                    {/* Achievements Tab */}
                    <TabsContent value="achievements" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">ความสำเร็จล่าสุด</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900">
                                            <Award className="h-5 w-5 text-green-700 dark:text-green-300" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">มือใหม่แยกขยะ</h3>
                                            <p className="text-sm text-muted-foreground">คัดแยกขยะครั้งแรกสำเร็จ</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900"
                                                >
                                                    100 XP
                                                </Badge>
                                                <span className="text-xs text-muted-foreground">2 วันที่ผ่านมา</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="flex items-start gap-4">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900">
                                            <Award className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">นักรีไซเคิลมือโปร</h3>
                                            <p className="text-sm text-muted-foreground">ส่งขยะรีไซเคิลครบ 50 ชิ้น</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900"
                                                >
                                                    300 XP
                                                </Badge>
                                                <span className="text-xs text-muted-foreground">5 วันที่ผ่านมา</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="flex items-start gap-4">
                                        <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center dark:bg-yellow-900">
                                            <Award className="h-5 w-5 text-yellow-700 dark:text-yellow-300" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">แชมป์สะสมคะแนน</h3>
                                            <p className="text-sm text-muted-foreground">สะสมแต้มครบ 1,000 คะแนน</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900"
                                                >
                                                    500 XP
                                                </Badge>
                                                <span className="text-xs text-muted-foreground">1 สัปดาห์ที่ผ่านมา</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="ghost" className="w-full">
                                        ดูความสำเร็จทั้งหมด
                                    </Button>
                                </CardFooter>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">ความคืบหน้าของภารกิจ</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span>ภารกิจแยกขยะรายวัน</span>
                                            <span className="text-sm font-medium">3/5 วัน</span>
                                        </div>
                                        <Progress value={60} className="h-2" />
                                    </div>
                                    <Separator />
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span>ส่งขยะรีไซเคิล</span>
                                            <span className="text-sm font-medium">87/100 ชิ้น</span>
                                        </div>
                                        <Progress value={87} className="h-2" />
                                    </div>
                                    <Separator />
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span>เชิญเพื่อนเข้าร่วม</span>
                                            <span className="text-sm font-medium">6/10 คน</span>
                                        </div>
                                        <Progress value={60} className="h-2" />
                                    </div>
                                    <Separator />
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span>สะสมคะแนน</span>
                                            <span className="text-sm font-medium">1,200/2,000 XP</span>
                                        </div>
                                        <Progress value={60} className="h-2" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="ghost" className="w-full">
                                        ดูภารกิจทั้งหมด
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Inventory Tab */}
                    <TabsContent value="inventory" className="space-y-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-lg">Equipment</CardTitle>
                                    <Button variant="outline" size="sm">
                                        Manage
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                                        <div className="h-12 w-12 rounded-md bg-red-100 flex items-center justify-center dark:bg-red-900">
                                            <Sword className="h-6 w-6 text-red-700 dark:text-red-300" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Dragonslayer Sword</h3>
                                            <p className="text-xs text-muted-foreground">+45 Attack, +10 Fire Damage</p>
                                            <Badge
                                                variant="outline"
                                                className="mt-1 text-purple-600 border-purple-300 dark:text-purple-400 dark:border-purple-700"
                                            >
                                                Legendary
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                                        <div className="h-12 w-12 rounded-md bg-green-100 flex items-center justify-center dark:bg-green-900">
                                            <Shield className="h-6 w-6 text-green-700 dark:text-green-300" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Knight's Shield</h3>
                                            <p className="text-xs text-muted-foreground">+30 Defense, +15 Magic Resist</p>
                                            <Badge
                                                variant="outline"
                                                className="mt-1 text-blue-600 border-blue-300 dark:text-blue-400 dark:border-blue-700"
                                            >
                                                Rare
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                                        <div className="h-12 w-12 rounded-md bg-blue-100 flex items-center justify-center dark:bg-blue-900">
                                            <svg
                                                className="h-6 w-6 text-blue-700 dark:text-blue-300"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Enchanted Helmet</h3>
                                            <p className="text-xs text-muted-foreground">+25 Defense, +5 Intelligence</p>
                                            <Badge
                                                variant="outline"
                                                className="mt-1 text-blue-600 border-blue-300 dark:text-blue-400 dark:border-blue-700"
                                            >
                                                Rare
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-lg">Inventory</CardTitle>
                                    <div className="text-sm text-muted-foreground">24/50 slots</div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                    {Array.from({ length: 24 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="aspect-square border rounded-md p-2 flex flex-col items-center justify-center text-center"
                                        >
                                            {i === 0 && (
                                                <>
                                                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mb-1 dark:bg-red-900">
                                                        <svg
                                                            className="h-4 w-4 text-red-700 dark:text-red-300"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                    <span className="text-xs">Health Potion</span>
                                                    <span className="text-xs text-muted-foreground">x12</span>
                                                </>
                                            )}
                                            {i === 1 && (
                                                <>
                                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mb-1 dark:bg-blue-900">
                                                        <svg
                                                            className="h-4 w-4 text-blue-700 dark:text-blue-300"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                    <span className="text-xs">Mana Potion</span>
                                                    <span className="text-xs text-muted-foreground">x8</span>
                                                </>
                                            )}
                                            {i === 2 && (
                                                <>
                                                    <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center mb-1 dark:bg-yellow-900">
                                                        <svg
                                                            className="h-4 w-4 text-yellow-700 dark:text-yellow-300"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                    <span className="text-xs">Dragon Scale</span>
                                                    <span className="text-xs text-muted-foreground">x3</span>
                                                </>
                                            )}
                                            {i === 3 && (
                                                <>
                                                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mb-1 dark:bg-purple-900">
                                                        <svg
                                                            className="h-4 w-4 text-purple-700 dark:text-purple-300"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
                                                        </svg>
                                                    </div>
                                                    <span className="text-xs">Magic Scroll</span>
                                                    <span className="text-xs text-muted-foreground">x5</span>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full">
                                    Sort Inventory
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* History Tab */}
                    <TabsContent value="history" className="space-y-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">กิจกรรมล่าสุด</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900">
                                        <Trophy className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">ส่งขยะรีไซเคิลครบ 10 ชิ้น</h3>
                                        <p className="text-sm text-muted-foreground">
                                            คุณได้ส่งขยะประเภทพลาสติกครบตามเป้าหมายในสัปดาห์นี้
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge
                                                variant="secondary"
                                                className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900"
                                            >
                                                +750 XP
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">2 วันที่ผ่านมา</span>
                                        </div>
                                    </div>
                                </div>
                                <Separator />

                                <div className="flex items-start gap-4">
                                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900">
                                        <svg
                                            className="h-5 w-5 text-green-700 dark:text-green-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-medium">เลื่อนระดับเป็น Eco Warrior</h3>
                                        <p className="text-sm text-muted-foreground">คุณได้รับเลเวลใหม่จากการทำกิจกรรมอย่างต่อเนื่อง</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-muted-foreground">4 วันที่ผ่านมา</span>
                                        </div>
                                    </div>
                                </div>
                                <Separator />

                                <div className="flex items-start gap-4">
                                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center dark:bg-purple-900">
                                        <svg
                                            className="h-5 w-5 text-purple-700 dark:text-purple-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-medium">ค้นพบจุดทิ้งขยะใหม่: อาคาร A</h3>
                                        <p className="text-sm text-muted-foreground">เพิ่มจุดให้บริการทิ้งขยะรีไซเคิลบริเวณอาคารเรียน</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge
                                                variant="secondary"
                                                className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900"
                                            >
                                                +200 XP
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">1 สัปดาห์ที่ผ่านมา</span>
                                        </div>
                                    </div>
                                </div>
                                <Separator />

                                <div className="flex items-start gap-4">
                                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center dark:bg-amber-900">
                                        <svg
                                            className="h-5 w-5 text-amber-700 dark:text-amber-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-medium">แลกของรางวัล: ถุงผ้ารักษ์โลก</h3>
                                        <p className="text-sm text-muted-foreground">
                                            ใช้แต้มสะสมแลกของรางวัลที่จุดบริการธนาคารขยะ
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-muted-foreground">2 สัปดาห์ที่ผ่านมา</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="ghost" className="w-full">
                                    ดูประวัติกิจกรรมทั้งหมด
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                </Tabs>
            </div>
        </div>
    )
}
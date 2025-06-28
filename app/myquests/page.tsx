"use client";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sword, Trophy, Clock, MapPin, ArrowRight, Star } from "lucide-react"
import React, { useState, useEffect } from 'react';
import { useSessionContext } from '@/contexts/SessionContext';
import Swal from "sweetalert2";


export default function QuestsPage() {
    const [quests, setQuests] = React.useState([]);
    const { session, status } = useSessionContext(); // ใช้ข้อมูล session จาก context
    const [questslog, setQuestslog] = React.useState([]);

    useEffect(() => {
        if (session?.user?.email) {
            fetchQuests();
            fetchQuestsLog();
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

    const acceptQuest = async (quest) => {
        Swal.fire({
            icon: 'question',
            title: 'Are you sure?',
            text: 'Do you want to accept this quest?',
            showCancelButton: true,
            confirmButtonText: 'Yes, accept it!',
            cancelButtonText: 'No, cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                setQuests((prevQuests) => prevQuests.filter(q => q.title !== quest.title));
                try {
                    const response = await fetch('/api/quests/add', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            user_id: session?.user?.email,
                            quest_id: quest.id,
                            status: 'Ongoing',
                        }),
                    });
                    const data = await response.json();
                    if (response.ok) {
                        Swal.fire({
                            icon: 'success',
                            title: 'เควสถูกยอมรับแล้ว',
                            text: 'คุณได้ยอมรับเควสเรียบร้อยแล้ว และภารกิจของคุณถูกส่งไปยังหน้า "ภารกิจของฉัน" แล้ว คุณสามารถตรวจสอบได้เลย!',
                            showConfirmButton: true,
                        });
                        await fetchQuestsLog();
                        console.log(questslog);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'เกิดข้อผิดพลาด',
                            text: data.message || 'บางสิ่งผิดพลาด!',
                        });
                    }
                } catch (error) {
                    console.error('เกิดข้อผิดพลาดในการยอมรับเควส:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาด',
                        text: 'เกิดข้อผิดพลาดระหว่างการยอมรับเควส.',
                    });
                }

            }
        });
    };
    const submitQuest = async (quest) => {
        Swal.fire({
            icon: 'question',
            title: 'คุณแน่ใจหรือไม่?',
            text: 'คุณต้องการส่งเควสนี้หรือไม่?',
            showCancelButton: true,
            confirmButtonText: 'ใช่, ส่งเควส!',
            cancelButtonText: 'ยกเลิก',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch('/api/quests/submit', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            user_id: session?.user?.email,
                            quest_id: quest.id,
                        }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        Swal.fire({
                            icon: 'success',
                            title: 'ส่งเควสสำเร็จ!',
                            text: 'ระบบได้บันทึกการส่งเควสของคุณแล้ว ขอบคุณที่ร่วมรักษ์โลก!',
                            showConfirmButton: true,
                        });

                        await fetchQuestsLog(); // โหลดเควสใหม่ (อัปเดตสถานะ)
                        console.log(questslog);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'เกิดข้อผิดพลาด',
                            text: data.message || 'ไม่สามารถส่งเควสได้ กรุณาลองใหม่อีกครั้ง.',
                        });
                    }
                } catch (error) {
                    console.error('เกิดข้อผิดพลาดในการส่งเควส:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาด',
                        text: 'เกิดข้อผิดพลาดระหว่างการส่งเควส.',
                    });
                }
            }
        });
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


    if (status === "loading") {
        return <div className="flex items-center justify-center h-screen text-lg">Loading session...</div>;
    }

    return (
        <div className="container h-full  mx-auto py-6 px-4 md:px-6 lg:py-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">ภารกิจ</h1>
                    <p className="text-muted-foreground mt-1">ทำภารกิจให้สำเร็จเพื่อรับรางวัลและค่าประสบการณ์</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">1,250 XP</span>
                    </div>
                    <Button variant="outline" size="sm">
                        Quest Log
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="active" className="w-full">
                <TabsList className="mb-6">
                    <TabsTrigger value="active">ใช้งานอยู่</TabsTrigger>
                    <TabsTrigger value="available">พร้อมใช้งาน</TabsTrigger>
                    <TabsTrigger value="completed">เสร็จสิ้น</TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="space-y-4">
                    {filteredQuestscom.map((quest) => (
                        <Card key={quest.id}>
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <div>

                                        <div className="flex items-center gap-2">
                                            {quest.type_quest === "รายวัน" && (
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-900"
                                                >
                                                    ภารกิจรายวัน
                                                </Badge>
                                            )}
                                            {quest.type_quest === "เสริม" && (
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900"
                                                >
                                                    ภารกิจเสริม
                                                </Badge>
                                            )}
                                            {quest.type_quest === "หลัก" && (
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-900"
                                                >
                                                    ภารกิจหลัก
                                                </Badge>
                                            )}

                                        </div>
                                        <CardTitle className="mt-2">{quest.title}</CardTitle>
                                        <CardDescription className="mt-1">
                                            {quest.description}
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[...Array(3)].map((_, index) => (
                                            <Star
                                                key={`star-${index}`} // ✅ ใส่ key ที่ไม่ซ้ำกัน
                                                className={`h-4 w-4 ${index < (quest.difficulty === "ง่าย" ? 1 : quest.difficulty === "ปานกลาง" ? 2 : 3)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-muted-foreground"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 mt-2">
                                            <div className="flex items-center gap-1">
                                                <svg
                                                    className="h-4 w-4 text-amber-600"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                <span className="text-sm">{quest.point} Points</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Trophy className="h-4 w-4 text-yellow-500" />
                                                <span className="text-sm">{quest.exp} XP</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4" />
                                                <span className="text-sm">{quest.reward} Score</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between pt-3">
                                <div className="flex items-center gap-2">
                                    <Sword
                                        className={`h-4 w-4 ${quest.difficulty === "ง่าย" ? "text-green-500" :
                                            quest.difficulty === "ปานกลาง" ? "text-yellow-500" :
                                                "text-red-500"
                                            }`}
                                    />
                                    <span className="text-sm">ระดับความยาก: {quest.difficulty}</span>
                                </div>
                                <Button size="sm" onClick={() => submitQuest(quest)}>ส่งภารกิจ</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="available" className="space-y-4">
                    {filteredQuests.map((quest) => (
                        <Card key={quest.id}>
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            {quest.type_quest === "รายวัน" && (
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-900"
                                                >
                                                    ภารกิจรายวัน
                                                </Badge>
                                            )}
                                            {quest.type_quest === "เสริม" && (
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900"
                                                >
                                                    ภารกิจเสริม
                                                </Badge>
                                            )}
                                            {quest.type_quest === "หลัก" && (
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-900"
                                                >
                                                    ภารกิจหลัก
                                                </Badge>
                                            )}
                                        </div>

                                        <CardTitle className="mt-2">{quest.title}</CardTitle>
                                        <CardDescription className="mt-1">{quest.description}</CardDescription>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[...Array(3)].map((_, index) => (
                                            <Star
                                                key={`star-${index}`} // ✅ ใส่ key ที่ไม่ซ้ำกัน
                                                className={`h-4 w-4 ${index < (quest.difficulty === "ง่าย" ? 1 : quest.difficulty === "ปานกลาง" ? 2 : 3)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-muted-foreground"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="flex items-center gap-1">
                                            <svg
                                                className="h-4 w-4 text-amber-600"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                            <span className="text-sm">{quest.point} Points</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Trophy className="h-4 w-4 text-yellow-500" />
                                            <span className="text-sm">{quest.exp} XP</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4" />
                                            <span className="text-sm">{quest.reward} Score</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between pt-3">
                                <div className="flex items-center gap-2">
                                    <Sword
                                        className={`h-4 w-4 ${quest.difficulty === "ง่าย" ? "text-green-500" :
                                            quest.difficulty === "ปานกลาง" ? "text-yellow-500" :
                                                "text-red-500"
                                            }`}
                                    />
                                    <span className="text-sm">ระดับความยาก: {quest.difficulty}</span>
                                </div>

                                <Button size="sm" onClick={() => acceptQuest(quest)}>รับภารกิจ</Button>
                            </CardFooter>
                        </Card>
                    ))}

                </TabsContent>

                <TabsContent value="completed" className="space-y-4">
                    {filteredQuestsOn.map((quest) => (
                        <Card key={quest.id}>
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            {quest.type_quest === "รายวัน" && (
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-900"
                                                >
                                                    ภารกิจรายวัน
                                                </Badge>
                                            )}
                                            {quest.type_quest === "เสริม" && (
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900"
                                                >
                                                    ภารกิจเสริม
                                                </Badge>
                                            )}
                                            {quest.type_quest === "หลัก" && (
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-900"
                                                >
                                                    ภารกิจหลัก
                                                </Badge>
                                            )}
                                            <Badge
                                                variant="outline"
                                                className="text-green-600 border-green-300 dark:text-green-400 dark:border-green-700"
                                            >
                                                Completed
                                            </Badge>
                                        </div>
                                        <CardTitle className="mt-2">{quest.title}</CardTitle>
                                        <CardDescription className="mt-1">{quest.description}</CardDescription>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[...Array(3)].map((_, index) => (
                                            <Star
                                                key={`star-${index}`} // ✅ ใส่ key ที่ไม่ซ้ำกัน
                                                className={`h-4 w-4 ${index < (quest.difficulty === "ง่าย" ? 1 : quest.difficulty === "ปานกลาง" ? 2 : 3)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-muted-foreground"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">

                                 
                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="flex items-center gap-1">
                                            <svg
                                                className="h-4 w-4 text-amber-600"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                            <span className="text-sm">{quest.point} Points</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Trophy className="h-4 w-4 text-yellow-500" />
                                            <span className="text-sm">{quest.exp} XP</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4" />
                                            <span className="text-sm">{quest.reward} Score</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between pt-3">
                                <div className="flex items-center gap-2">
                                    <Sword
                                        className={`h-4 w-4 ${quest.difficulty === "ง่าย" ? "text-green-500" :
                                            quest.difficulty === "ปานกลาง" ? "text-yellow-500" :
                                                "text-red-500"
                                            }`}
                                    />
                                    <span className="text-sm">ระดับความยาก: {quest.difficulty}</span>
                                </div>
                              
                            </CardFooter>
                        </Card>
                    ))}

                </TabsContent>
            </Tabs>
        </div>
    )
};
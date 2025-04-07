"use client";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Crown, Medal, Search, Shield, Sword, Trophy, User } from "lucide-react"
import React, { useState, useEffect } from 'react';
import { useSessionContext } from '@/contexts/SessionContext';

export default function RankingsPage() {
    const { session, status } = useSessionContext(); // ใช้ข้อมูล session จาก context
    const [userdata, setUserdata] = React.useState([]);
    useEffect(() => {
        if (session?.user?.email) {
            fetchUsers();
        }
    }, [session]);
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
    return (
        <div className="container mx-auto py-6 px-4 md:px-6 lg:py-10">
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">อันดับ</h1>
                        <p className="text-muted-foreground mt-1">ดูว่าคุณเปรียบเทียบกับผู้เล่นคนอื่นอย่างไร</p>
                    </div>
                    <div className="w-full md:w-auto flex items-center gap-2">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input type="search" placeholder="ค้นหาผู้เล่น..." className="pl-8" />
                        </div>
                        <Button variant="outline" size="icon" className="shrink-0">
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                />
                            </svg>
                            <span className="sr-only">Filter</span>
                        </Button>
                    </div>
                </div>

                {/* Your Rank Card */}
                <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                                        <img src={session?.user?.image} alt="" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                                        42
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">{session?.user?.name}</h2>
                                    <p className="text-muted-foreground">{session?.user?.email} • เลเวล 24 </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                    <Trophy className="h-4 w-4" />
                                    <span className="text-sm font-medium">7,250 XP</span>
                                </div>
                                <div className="flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full dark:bg-amber-900 dark:text-amber-300">
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="text-sm font-medium">2,450 คะเเนน</span>
                                </div>
                                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
                                    <Award className="h-4 w-4" />
                                    <span className="text-sm font-medium">47 ภารกิจ</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs */}
                <Tabs defaultValue="overall" className="w-full">
                    <TabsList className="mb-6">
                        <TabsTrigger value="overall">ภาพรวม</TabsTrigger>
                        <TabsTrigger value="quests">ภารกิจ</TabsTrigger>
                        <TabsTrigger value="guild">กิลด์</TabsTrigger>
                    </TabsList>

                    {/* Overall Rankings Tab */}
                    <TabsContent value="overall" className="space-y-6">
                        {/* Top Players */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* 2nd Place */}
                            <Card className="border-2 border-gray-300 dark:border-gray-600">
                                <CardContent className="pt-6 pb-4 flex flex-col items-center text-center">
                                    <div className="relative mb-2">
                                        <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-700">
                                            <User className="h-10 w-10 text-gray-500 dark:text-gray-400" />
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center dark:bg-gray-600">
                                            <Medal className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold mt-2">ShadowBlade</h3>
                                    <p className="text-sm text-muted-foreground">Level 38 Rogue</p>
                                    <div className="flex items-center justify-center gap-2 mt-2">
                                        <Badge
                                            variant="secondary"
                                            className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900"
                                        >
                                            18,450 XP
                                        </Badge>
                                    </div>
                                    <p className="text-sm font-medium mt-3">อันดับที่ 2</p>
                                </CardContent>
                            </Card>

                            {/* 1st Place */}
                            <Card className="border-2 border-yellow-400 dark:border-yellow-600 -mt-4 md:-mt-6">
                                <CardContent className="pt-8 pb-6 flex flex-col items-center text-center">
                                    <div className="relative mb-2">
                                        <div className="h-24 w-24 rounded-full bg-yellow-100 flex items-center justify-center dark:bg-yellow-900">
                                            <User className="h-12 w-12 text-yellow-600 dark:text-yellow-400" />
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center dark:bg-yellow-600">
                                            <Crown className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mt-2">LegendaryHero</h3>
                                    <p className="text-sm text-muted-foreground">เลเวล 42 </p>
                                    <div className="flex items-center justify-center gap-2 mt-2">
                                        <Badge
                                            variant="secondary"
                                            className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900"
                                        >
                                            24,750 XP
                                        </Badge>
                                    </div>
                                    <p className="text-sm font-medium mt-3 text-yellow-600 dark:text-yellow-400">อันดับที่ 1</p>
                                </CardContent>
                            </Card>

                            {/* 3rd Place */}
                            <Card className="border-2 border-amber-600 dark:border-amber-800">
                                <CardContent className="pt-6 pb-4 flex flex-col items-center text-center">
                                    <div className="relative mb-2">
                                        <div className="h-20 w-20 rounded-full bg-amber-100 flex items-center justify-center dark:bg-amber-900">
                                            <User className="h-10 w-10 text-amber-600 dark:text-amber-400" />
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center dark:bg-amber-700">
                                            <Medal className="h-5 w-5 text-white" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold mt-2">MysticMage</h3>
                                    <p className="text-sm text-muted-foreground">เลเวล 36 </p>
                                    <div className="flex items-center justify-center gap-2 mt-2">
                                        <Badge
                                            variant="secondary"
                                            className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900"
                                        >
                                            16,890 XP
                                        </Badge>
                                    </div>
                                    <p className="text-sm font-medium mt-3 text-amber-600 dark:text-amber-400">อันดับที่ 3</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Leaderboard Table */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle>กระดานผู้นำโดยรวม</CardTitle>
                                <CardDescription>ผู้เล่นอันดับต้น ๆ ที่จัดอันดับตามประสบการณ์และความสำเร็จ</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <div className="grid grid-cols-12 border-b bg-muted/50 px-4 py-3 text-sm font-medium">
                                        <div className="col-span-1 flex justify-center">#</div>
                                        <div className="col-span-5 md:col-span-4">Player</div>
                                        <div className="col-span-2 hidden md:block">Level</div>
                                        <div className="col-span-3">XP</div>
                                        <div className="col-span-3 md:col-span-2">Achievements</div>
                                    </div>
                                    <div className="divide-y">
                                        {/* 1st Place Row */}
                                        <div className="grid grid-cols-12 items-center px-4 py-3">
                                            <div className="col-span-1 flex justify-center">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-xs font-bold text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                                                    1
                                                </div>
                                            </div>
                                            <div className="col-span-5 md:col-span-4 flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center dark:bg-yellow-900">
                                                    <User className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">LegendaryHero</p>
                                                    <p className="text-xs text-muted-foreground">Paladin</p>
                                                </div>
                                            </div>
                                            <div className="col-span-2 hidden md:block">
                                                <Badge variant="outline">Level 42</Badge>
                                            </div>
                                            <div className="col-span-3 flex items-center gap-1">
                                                <Trophy className="h-4 w-4 text-blue-600" />
                                                <span className="text-sm">24,750</span>
                                            </div>
                                            <div className="col-span-3 md:col-span-2 flex items-center gap-1">
                                                <Award className="h-4 w-4 text-purple-600" />
                                                <span className="text-sm">87</span>
                                            </div>
                                        </div>

                                        {/* 2nd Place Row */}
                                        <div className="grid grid-cols-12 items-center px-4 py-3">
                                            <div className="col-span-1 flex justify-center">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                                                    2
                                                </div>
                                            </div>
                                            <div className="col-span-5 md:col-span-4 flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-700">
                                                    <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">ShadowBlade</p>
                                                    <p className="text-xs text-muted-foreground">Rogue</p>
                                                </div>
                                            </div>
                                            <div className="col-span-2 hidden md:block">
                                                <Badge variant="outline">Level 38</Badge>
                                            </div>
                                            <div className="col-span-3 flex items-center gap-1">
                                                <Trophy className="h-4 w-4 text-blue-600" />
                                                <span className="text-sm">18,450</span>
                                            </div>
                                            <div className="col-span-3 md:col-span-2 flex items-center gap-1">
                                                <Award className="h-4 w-4 text-purple-600" />
                                                <span className="text-sm">72</span>
                                            </div>
                                        </div>

                                        {/* 3rd Place Row */}
                                        <div className="grid grid-cols-12 items-center px-4 py-3">
                                            <div className="col-span-1 flex justify-center">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                                                    3
                                                </div>
                                            </div>
                                            <div className="col-span-5 md:col-span-4 flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center dark:bg-amber-900">
                                                    <User className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">MysticMage</p>
                                                    <p className="text-xs text-muted-foreground">Mage</p>
                                                </div>
                                            </div>
                                            <div className="col-span-2 hidden md:block">
                                                <Badge variant="outline">Level 36</Badge>
                                            </div>
                                            <div className="col-span-3 flex items-center gap-1">
                                                <Trophy className="h-4 w-4 text-blue-600" />
                                                <span className="text-sm">16,890</span>
                                            </div>
                                            <div className="col-span-3 md:col-span-2 flex items-center gap-1">
                                                <Award className="h-4 w-4 text-purple-600" />
                                                <span className="text-sm">65</span>
                                            </div>
                                        </div>

                                        {/* 4th Place Row */}
                                        <div className="grid grid-cols-12 items-center px-4 py-3">
                                            <div className="col-span-1 flex justify-center">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                                                    4
                                                </div>
                                            </div>
                                            <div className="col-span-5 md:col-span-4 flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">ForestRanger</p>
                                                    <p className="text-xs text-muted-foreground">Ranger</p>
                                                </div>
                                            </div>
                                            <div className="col-span-2 hidden md:block">
                                                <Badge variant="outline">Level 34</Badge>
                                            </div>
                                            <div className="col-span-3 flex items-center gap-1">
                                                <Trophy className="h-4 w-4 text-blue-600" />
                                                <span className="text-sm">15,720</span>
                                            </div>
                                            <div className="col-span-3 md:col-span-2 flex items-center gap-1">
                                                <Award className="h-4 w-4 text-purple-600" />
                                                <span className="text-sm">61</span>
                                            </div>
                                        </div>

                                        {/* 5th Place Row */}
                                        <div className="grid grid-cols-12 items-center px-4 py-3">
                                            <div className="col-span-1 flex justify-center">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                                                    5
                                                </div>
                                            </div>
                                            <div className="col-span-5 md:col-span-4 flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">BattleMonk</p>
                                                    <p className="text-xs text-muted-foreground">Monk</p>
                                                </div>
                                            </div>
                                            <div className="col-span-2 hidden md:block">
                                                <Badge variant="outline">Level 32</Badge>
                                            </div>
                                            <div className="col-span-3 flex items-center gap-1">
                                                <Trophy className="h-4 w-4 text-blue-600" />
                                                <span className="text-sm">14,350</span>
                                            </div>
                                            <div className="col-span-3 md:col-span-2 flex items-center gap-1">
                                                <Award className="h-4 w-4 text-purple-600" />
                                                <span className="text-sm">58</span>
                                            </div>
                                        </div>

                                        {/* Your Rank Row (Highlighted) */}
                                        <div className="grid grid-cols-12 items-center px-4 py-3 bg-muted/50">
                                            <div className="col-span-1 flex justify-center">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                                                    42
                                                </div>
                                            </div>
                                            <div className="col-span-5 md:col-span-4 flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <User className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">Dragonslayer42</p>
                                                    <p className="text-xs text-muted-foreground">Warrior</p>
                                                </div>
                                            </div>
                                            <div className="col-span-2 hidden md:block">
                                                <Badge variant="outline">Level 24</Badge>
                                            </div>
                                            <div className="col-span-3 flex items-center gap-1">
                                                <Trophy className="h-4 w-4 text-blue-600" />
                                                <span className="text-sm">7,250</span>
                                            </div>
                                            <div className="col-span-3 md:col-span-2 flex items-center gap-1">
                                                <Award className="h-4 w-4 text-purple-600" />
                                                <span className="text-sm">32</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* PvP Rankings Tab */}
                    <TabsContent value="pvp" className="space-y-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle>PvP Leaderboard</CardTitle>
                                <CardDescription>Top players ranked by PvP wins and rating</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <div className="grid grid-cols-12 border-b bg-muted/50 px-4 py-3 text-sm font-medium">
                                        <div className="col-span-1 flex justify-center">#</div>
                                        <div className="col-span-5 md:col-span-4">Player</div>
                                        <div className="col-span-2 hidden md:block">Class</div>
                                        <div className="col-span-3">Wins</div>
                                        <div className="col-span-3 md:col-span-2">Rating</div>
                                    </div>
                                    <div className="divide-y">
                                        {/* 1st Place Row */}
                                        <div className="grid grid-cols-12 items-center px-4 py-3">
                                            <div className="col-span-1 flex justify-center">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-xs font-bold text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                                                    1
                                                </div>
                                            </div>
                                            <div className="col-span-5 md:col-span-4 flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center dark:bg-yellow-900">
                                                    <User className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">ShadowBlade</p>
                                                    <p className="text-xs text-muted-foreground">Level 38</p>
                                                </div>
                                            </div>
                                            <div className="col-span-2 hidden md:block">
                                                <Badge
                                                    variant="outline"
                                                    className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-900 dark:border-red-800"
                                                >
                                                    Rogue
                                                </Badge>
                                            </div>
                                            <div className="col-span-3 flex items-center gap-1">
                                                <Sword className="h-4 w-4 text-red-600" />
                                                <span className="text-sm">187</span>
                                            </div>
                                            <div className="col-span-3 md:col-span-2 flex items-center gap-1">
                                                <Shield className="h-4 w-4 text-blue-600" />
                                                <span className="text-sm">2,450</span>
                                            </div>
                                        </div>

                                        {/* More PvP rows would go here */}
                                        {/* ... */}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Quests Rankings Tab */}
                    <TabsContent value="quests" className="space-y-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle>Quest Leaderboard</CardTitle>
                                <CardDescription>Top players ranked by quests completed and difficulty</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <div className="grid grid-cols-12 border-b bg-muted/50 px-4 py-3 text-sm font-medium">
                                        <div className="col-span-1 flex justify-center">#</div>
                                        <div className="col-span-5 md:col-span-4">Player</div>
                                        <div className="col-span-2 hidden md:block">Class</div>
                                        <div className="col-span-3">Completed</div>
                                        <div className="col-span-3 md:col-span-2">Legendary</div>
                                    </div>
                                    <div className="divide-y">
                                        {/* 1st Place Row */}
                                        <div className="grid grid-cols-12 items-center px-4 py-3">
                                            <div className="col-span-1 flex justify-center">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-xs font-bold text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                                                    1
                                                </div>
                                            </div>
                                            <div className="col-span-5 md:col-span-4 flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center dark:bg-yellow-900">
                                                    <User className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">LegendaryHero</p>
                                                    <p className="text-xs text-muted-foreground">Level 42</p>
                                                </div>
                                            </div>
                                            <div className="col-span-2 hidden md:block">
                                                <Badge
                                                    variant="outline"
                                                    className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900 dark:border-blue-800"
                                                >
                                                    Paladin
                                                </Badge>
                                            </div>
                                            <div className="col-span-3 flex items-center gap-1">
                                                <svg
                                                    className="h-4 w-4 text-green-600"
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
                                                <span className="text-sm">124</span>
                                            </div>
                                            <div className="col-span-3 md:col-span-2 flex items-center gap-1">
                                                <svg
                                                    className="h-4 w-4 text-purple-600"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                                                </svg>
                                                <span className="text-sm">12</span>
                                            </div>
                                        </div>

                                        {/* More quest rows would go here */}
                                        {/* ... */}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Guild Rankings Tab */}
                    <TabsContent value="guild" className="space-y-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle>Guild Leaderboard</CardTitle>
                                <CardDescription>Top guilds ranked by achievements and member count</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <div className="grid grid-cols-12 border-b bg-muted/50 px-4 py-3 text-sm font-medium">
                                        <div className="col-span-1 flex justify-center">#</div>
                                        <div className="col-span-5 md:col-span-4">Guild</div>
                                        <div className="col-span-2 hidden md:block">Members</div>
                                        <div className="col-span-3">Level</div>
                                        <div className="col-span-3 md:col-span-2">Territories</div>
                                    </div>
                                    <div className="divide-y">
                                        {/* 1st Place Row */}
                                        <div className="grid grid-cols-12 items-center px-4 py-3">
                                            <div className="col-span-1 flex justify-center">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-xs font-bold text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                                                    1
                                                </div>
                                            </div>
                                            <div className="col-span-5 md:col-span-4 flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center dark:bg-yellow-900">
                                                    <svg
                                                        className="h-4 w-4 text-yellow-600 dark:text-yellow-400"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">Knights of the Round</p>
                                                    <p className="text-xs text-muted-foreground">Founded 8 months ago</p>
                                                </div>
                                            </div>
                                            <div className="col-span-2 hidden md:block">
                                                <Badge variant="outline">48/50</Badge>
                                            </div>
                                            <div className="col-span-3 flex items-center gap-1">
                                                <Trophy className="h-4 w-4 text-blue-600" />
                                                <span className="text-sm">35</span>
                                            </div>
                                            <div className="col-span-3 md:col-span-2 flex items-center gap-1">
                                                <svg
                                                    className="h-4 w-4 text-green-600"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                <span className="text-sm">7</span>
                                            </div>
                                        </div>

                                        {/* More guild rows would go here */}
                                        {/* ... */}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}


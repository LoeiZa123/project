"use client";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    AlertTriangle,
    ArrowDown,
    ArrowUp,
    BarChart3,
    Bell,
    ChevronRight,
    Download,
    FileText,
    Filter,
    MessageSquare,
    MoreHorizontal,
    Plus,
    RefreshCw,
    Search,
    Settings,
    Shield,
    Sword,
    Users,
} from "lucide-react"
import { Input } from "@/components/ui/input"

export default function AdminDashboardPage() {
    return (
        <div className="container mx-auto py-6 px-4 md:px-6 lg:py-10">
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">แผงควบคุมผู้ดูแลระบบ</h1>
                        <p className="text-muted-foreground mt-1">การจัดการเกมและการวิเคราะห์</p>
                    </div>
                    <div className="flex items-center gap-2">
                       
                        <Button>
                            <Settings className="h-4 w-4 mr-2" />
                            การตั้งค่า
                        </Button>
                    </div>

                </div>

                {/* Overview Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">จำนวนผู้เล่นทั้งหมด</p>
                                    <h3 className="text-2xl font-bold mt-1">100</h3>
                                    <div className="flex items-center gap-1 mt-1 text-green-600">
                                        <ArrowUp className="h-3 w-3" />
                                        <span className="text-xs font-medium">เพิ่มขึ้น 0% จากเดือนที่แล้ว</span>
                                    </div>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900">
                                    <Users className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">ภารกิจที่กำลังดำเนินอยู่</p>
                                    <h3 className="text-2xl font-bold mt-1">52</h3>
                                    <div className="flex items-center gap-1 mt-1 text-green-600">
                                        <ArrowUp className="h-3 w-3" />
                                        <span className="text-xs font-medium">เพิ่มขึ้น 8% จากเดือนที่แล้ว</span>
                                    </div>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center dark:bg-purple-900">
                                    <Sword className="h-5 w-5 text-purple-700 dark:text-purple-300" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">คะเเนนรวม</p>
                                    <h3 className="text-2xl font-bold mt-1">12,582 คะเเนน</h3>
                                    <div className="flex items-center gap-1 mt-1 text-green-600">
                                        <ArrowUp className="h-3 w-3" />
                                        <span className="text-xs font-medium">เพิ่มขึ้น 18% จากเดือนที่แล้ว</span>
                                    </div>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900">
                                    <svg
                                        className="h-5 w-5 text-green-700 dark:text-green-300"
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
                                </div>
                            </div>
                        </CardContent>
                    </Card>



                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Player Activity Chart */}
                    <Card className="lg:col-span-2">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>กิจกรรมของผู้เล่น</CardTitle>
                                    <CardDescription>ผู้ใช้ที่ใช้งานรายวันในช่วง 30 วันที่ผ่านมา</CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm">
                                        <Filter className="h-3.5 w-3.5 mr-1" />
                                        Filter
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Download className="h-3.5 w-3.5 mr-1" />
                                        Export
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="h-[300px] flex items-end gap-2">
                                {/* Simulated chart bars */}
                                {Array.from({ length: 30 }).map((_, i) => {
                                    // Generate a somewhat random height between 30% and 90%
                                    const height = 30 + Math.floor(Math.sin(i * 0.5) * 20 + Math.random() * 40)
                                    return (
                                        <div key={i} className="flex-1 group relative">
                                            <div
                                                className="bg-primary/80 hover:bg-primary rounded-t-sm transition-all"
                                                style={{ height: `${height}%` }}
                                            ></div>
                                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity bg-popover text-popover-foreground text-xs rounded px-2 py-1 pointer-events-none">
                                                {Math.floor(height * 100)}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                                <span>May 15</span>
                                <span>June 15</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle>กิจกรรมล่าสุด</CardTitle>
                            <CardDescription>เหตุการณ์ล่าสุดของระบบ</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 dark:bg-blue-900">
                                        <Users className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">การลงทะเบียนผู้เล่นใหม่เพิ่มขึ้น</p>
                                        <p className="text-xs text-muted-foreground mt-1">มีผู้เล่นใหม่ 1 คนในชั่วโมงที่ผ่านมา</p>
                                        <p className="text-xs text-muted-foreground mt-1">1 เดือนที่แล้ว</p>
                                    </div>
                                </div>

                                <Separator />
                                <div className="flex items-start gap-3">
                                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center shrink-0 dark:bg-green-900">
                                        <svg
                                            className="h-4 w-4 text-green-700 dark:text-green-300"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">การสำรองฐานข้อมูลเสร็จสิ้น</p>
                                        <p className="text-xs text-muted-foreground mt-1">สำรองข้อมูลรายวันสำเร็จ</p>
                                        <p className="text-xs text-muted-foreground mt-1">1 ชั่วโมงที่แล้ว</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-start gap-3">
                                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0 dark:bg-purple-900">
                                        <Shield className="h-4 w-4 text-purple-700 dark:text-purple-300" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">การแจ้งเตือนความปลอดภัยได้รับการแก้ไข</p>
                                        <p className="text-xs text-muted-foreground mt-1">บล็อกความพยายามเข้าสู่ระบบที่น่าสงสัย</p>
                                        <p className="text-xs text-muted-foreground mt-1">2 ชั่วโมงที่แล้ว</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="ghost" className="w-full">
                                ดูกิจกรรมทั้งหมด
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>

                </div>

                {/* Management Tabs */}
                <Tabs defaultValue="users" className="w-full">
                    <TabsList className="mb-6">
                        <TabsTrigger value="users">User Management</TabsTrigger>
                        <TabsTrigger value="content">Content Management</TabsTrigger>
                        <TabsTrigger value="reports">Reports</TabsTrigger>
                        <TabsTrigger value="system">System</TabsTrigger>
                    </TabsList>

                    {/* Users Tab */}
                    <TabsContent value="users" className="space-y-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                            <h2 className="text-xl font-bold">User Management</h2>
                            <div className="flex items-center gap-2 w-full md:w-auto">
                                <div className="relative flex-1 md:w-64">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input type="search" placeholder="Search users..." className="pl-8" />
                                </div>
                                <Button>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add User
                                </Button>
                            </div>
                        </div>

                        <Card>
                            <CardContent className="p-0">
                                <div className="rounded-md border">
                                    <div className="grid grid-cols-12 border-b bg-muted/50 px-4 py-3 text-sm font-medium">
                                        <div className="col-span-1 flex justify-center">#</div>
                                        <div className="col-span-3">User</div>
                                        <div className="col-span-2">Level</div>
                                        <div className="col-span-2">Status</div>
                                        <div className="col-span-2">Last Login</div>
                                        <div className="col-span-2 text-right">Actions</div>
                                    </div>
                                    <div className="divide-y">
                                        {/* User Row 1 */}
                                        <div className="grid grid-cols-12 items-center px-4 py-3">
                                            <div className="col-span-1 flex justify-center">1</div>
                                            <div className="col-span-3 flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900">
                                                    <Users className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">LegendaryHero</p>
                                                    <p className="text-xs text-muted-foreground">user@example.com</p>
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <Badge variant="outline">Level 42</Badge>
                                            </div>
                                            <div className="col-span-2">
                                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-900">
                                                    Active
                                                </Badge>
                                            </div>
                                            <div className="col-span-2 text-sm">2 hours ago</div>
                                            <div className="col-span-2 flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <FileText className="h-4 w-4" />
                                                    <span className="sr-only">View</span>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Settings className="h-4 w-4" />
                                                    <span className="sr-only">Edit</span>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">More</span>
                                                </Button>
                                            </div>
                                        </div>

                                        {/* User Row 2 */}
                                        <div className="grid grid-cols-12 items-center px-4 py-3">
                                            <div className="col-span-1 flex justify-center">2</div>
                                            <div className="col-span-3 flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900">
                                                    <Users className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">ShadowBlade</p>
                                                    <p className="text-xs text-muted-foreground">shadow@example.com</p>
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <Badge variant="outline">Level 38</Badge>
                                            </div>
                                            <div className="col-span-2">
                                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-900">
                                                    Active
                                                </Badge>
                                            </div>
                                            <div className="col-span-2 text-sm">5 hours ago</div>
                                            <div className="col-span-2 flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <FileText className="h-4 w-4" />
                                                    <span className="sr-only">View</span>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Settings className="h-4 w-4" />
                                                    <span className="sr-only">Edit</span>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">More</span>
                                                </Button>
                                            </div>
                                        </div>

                                        {/* User Row 3 */}
                                        <div className="grid grid-cols-12 items-center px-4 py-3">
                                            <div className="col-span-1 flex justify-center">3</div>
                                            <div className="col-span-3 flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900">
                                                    <Users className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">MysticMage</p>
                                                    <p className="text-xs text-muted-foreground">mystic@example.com</p>
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <Badge variant="outline">Level 36</Badge>
                                            </div>
                                            <div className="col-span-2">
                                                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900 dark:text-amber-300 dark:hover:bg-amber-900">
                                                    Idle
                                                </Badge>
                                            </div>
                                            <div className="col-span-2 text-sm">1 day ago</div>
                                            <div className="col-span-2 flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <FileText className="h-4 w-4" />
                                                    <span className="sr-only">View</span>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Settings className="h-4 w-4" />
                                                    <span className="sr-only">Edit</span>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">More</span>
                                                </Button>
                                            </div>
                                        </div>

                                        {/* User Row 4 */}
                                        <div className="grid grid-cols-12 items-center px-4 py-3">
                                            <div className="col-span-1 flex justify-center">4</div>
                                            <div className="col-span-3 flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900">
                                                    <Users className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">DragonSlayer42</p>
                                                    <p className="text-xs text-muted-foreground">dragon@example.com</p>
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <Badge variant="outline">Level 24</Badge>
                                            </div>
                                            <div className="col-span-2">
                                                <Badge className="bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-900">
                                                    Suspended
                                                </Badge>
                                            </div>
                                            <div className="col-span-2 text-sm">5 days ago</div>
                                            <div className="col-span-2 flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <FileText className="h-4 w-4" />
                                                    <span className="sr-only">View</span>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Settings className="h-4 w-4" />
                                                    <span className="sr-only">Edit</span>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">More</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center py-4">
                                <div className="text-sm text-muted-foreground">Showing 4 of 24,892 users</div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" disabled>
                                        Previous
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        Next
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* Content Tab */}
                    <TabsContent value="content" className="space-y-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                            <h2 className="text-xl font-bold">Content Management</h2>
                            <div className="flex items-center gap-2">
                                <Button>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create Content
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Quests</CardTitle>
                                    <CardDescription>Manage game quests</CardDescription>
                                </CardHeader>
                                <CardContent className="pb-2">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm font-medium">Total Quests</p>
                                            <p className="text-2xl font-bold">248</p>
                                        </div>
                                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center dark:bg-purple-900">
                                            <Sword className="h-5 w-5 text-purple-700 dark:text-purple-300" />
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Active</span>
                                            <span>182</span>
                                        </div>
                                        <Progress value={73.4} className="h-2" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="w-full">
                                        Manage Quests
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Items</CardTitle>
                                    <CardDescription>Manage game items</CardDescription>
                                </CardHeader>
                                <CardContent className="pb-2">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm font-medium">Total Items</p>
                                            <p className="text-2xl font-bold">1,452</p>
                                        </div>
                                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center dark:bg-amber-900">
                                            <svg
                                                className="h-5 w-5 text-amber-700 dark:text-amber-300"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
                                                    clipRule="evenodd"
                                                ></path>
                                                <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Active</span>
                                            <span>1,024</span>
                                        </div>
                                        <Progress value={70.5} className="h-2" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="w-full">
                                        Manage Items
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Events</CardTitle>
                                    <CardDescription>Manage game events</CardDescription>
                                </CardHeader>
                                <CardContent className="pb-2">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm font-medium">Total Events</p>
                                            <p className="text-2xl font-bold">36</p>
                                        </div>
                                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900">
                                            <svg
                                                className="h-5 w-5 text-green-700 dark:text-green-300"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Scheduled</span>
                                            <span>12</span>
                                        </div>
                                        <Progress value={33.3} className="h-2" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="w-full">
                                        Manage Events
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Reports Tab */}
                    <TabsContent value="reports" className="space-y-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                            <h2 className="text-xl font-bold">Reports & Analytics</h2>
                            <div className="flex items-center gap-2">
                                <Button variant="outline">
                                    <Download className="h-4 w-4 mr-2" />
                                    Export Data
                                </Button>
                                <Button>
                                    <BarChart3 className="h-4 w-4 mr-2" />
                                    Generate Report
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Revenue Breakdown</CardTitle>
                                    <CardDescription>Revenue by source</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[250px] flex items-center justify-center">
                                        {/* Placeholder for pie chart */}
                                        <div className="relative h-[200px] w-[200px] rounded-full bg-muted overflow-hidden">
                                            <div
                                                className="absolute inset-0 bg-primary"
                                                style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 100%)" }}
                                            ></div>
                                            <div
                                                className="absolute inset-0 bg-blue-500"
                                                style={{ clipPath: "polygon(50% 50%, 0 0, 100% 0)" }}
                                            ></div>
                                            <div
                                                className="absolute inset-0 bg-green-500"
                                                style={{ clipPath: "polygon(50% 50%, 0 0, 0 100%)" }}
                                            ></div>
                                            <div
                                                className="absolute inset-0 bg-yellow-500"
                                                style={{ clipPath: "polygon(50% 50%, 0 100%, 100% 100%)" }}
                                            ></div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="h-[120px] w-[120px] rounded-full bg-background"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 bg-primary rounded-sm"></div>
                                            <span className="text-sm">In-app purchases (45%)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 bg-blue-500 rounded-sm"></div>
                                            <span className="text-sm">Premium accounts (25%)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 bg-green-500 rounded-sm"></div>
                                            <span className="text-sm">Battle passes (20%)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 bg-yellow-500 rounded-sm"></div>
                                            <span className="text-sm">Cosmetics (10%)</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Player Retention</CardTitle>
                                    <CardDescription>30-day retention rate</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col items-center justify-center h-[250px]">
                                        <div className="text-5xl font-bold text-primary">78%</div>
                                        <p className="text-muted-foreground mt-2">Monthly retention rate</p>
                                        <div className="flex items-center gap-1 mt-4 text-green-600">
                                            <ArrowUp className="h-4 w-4" />
                                            <span className="text-sm font-medium">5% from last month</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 mt-4">
                                        <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
                                            <span className="text-sm font-medium">Day 1</span>
                                            <span className="text-lg font-bold">92%</span>
                                        </div>
                                        <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
                                            <span className="text-sm font-medium">Day 7</span>
                                            <span className="text-lg font-bold">85%</span>
                                        </div>
                                        <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
                                            <span className="text-sm font-medium">Day 30</span>
                                            <span className="text-lg font-bold">78%</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* System Tab */}
                    <TabsContent value="system" className="space-y-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                            <h2 className="text-xl font-bold">System Status</h2>
                            <div className="flex items-center gap-2">
                                <Button variant="outline">
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Refresh
                                </Button>
                                <Button>
                                    <Settings className="h-4 w-4 mr-2" />
                                    System Settings
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">CPU Usage</p>
                                            <h3 className="text-2xl font-bold mt-1">42%</h3>
                                            <div className="mt-2 space-y-2">
                                                <Progress value={42} className="h-2" />
                                            </div>
                                        </div>
                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900">
                                            <svg
                                                className="h-5 w-5 text-blue-700 dark:text-blue-300"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 1h10v8H5V6zm6 6a1 1 0 100-2 1 1 0 000 2z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Memory Usage</p>
                                            <h3 className="text-2xl font-bold mt-1">68%</h3>
                                            <div className="mt-2 space-y-2">
                                                <Progress value={68} className="h-2" />
                                            </div>
                                        </div>
                                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900">
                                            <svg
                                                className="h-5 w-5 text-green-700 dark:text-green-300"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M13 7H7v6h6V7z"></path>
                                                <path
                                                    fillRule="evenodd"
                                                    d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Disk Usage</p>
                                            <h3 className="text-2xl font-bold mt-1">54%</h3>
                                            <div className="mt-2 space-y-2">
                                                <Progress value={54} className="h-2" />
                                            </div>
                                        </div>
                                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center dark:bg-amber-900">
                                            <svg
                                                className="h-5 w-5 text-amber-700 dark:text-amber-300"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Network</p>
                                            <h3 className="text-2xl font-bold mt-1">87 Mbps</h3>
                                            <p className="text-xs text-muted-foreground mt-1">1.2 TB transferred today</p>
                                        </div>
                                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center dark:bg-purple-900">
                                            <svg
                                                className="h-5 w-5 text-purple-700 dark:text-purple-300"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Server Status</CardTitle>
                                <CardDescription>Current status of all game servers</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <div className="grid grid-cols-12 border-b bg-muted/50 px-4 py-3 text-sm font-medium">
                                        <div className="col-span-3">Server</div>
                                        <div className="col-span-2">Region</div>
                                        <div className="col-span-2">Status</div>
                                        <div className="col-span-2">Players</div>
                                        <div className="col-span-3">Load</div>
                                    </div>
                                    <div className="divide-y">
                                        <div className="grid grid-cols-12 items-center px-4 py-3">
                                            <div className="col-span-3">Game Server 01</div>
                                            <div className="col-span-2">US-East</div>
                                            <div className="col-span-2">
                                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-900">
                                                    Online
                                                </Badge>
                                            </div>
                                            <div className="col-span-2">4,582</div>
                                            <div className="col-span-3">
                                                <div className="flex items-center gap-2">
                                                    <Progress value={65} className="h-2 flex-1" />
                                                    <span className="text-xs">65%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 items-center px-4 py-3">
                                            <div className="col-span-3">Game Server 02</div>
                                            <div className="col-span-2">EU-West</div>
                                            <div className="col-span-2">
                                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-900">
                                                    Online
                                                </Badge>
                                            </div>
                                            <div className="col-span-2">5,241</div>
                                            <div className="col-span-3">
                                                <div className="flex items-center gap-2">
                                                    <Progress value={85} className="h-2 flex-1" />
                                                    <span className="text-xs">85%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 items-center px-4 py-3">
                                            <div className="col-span-3">Game Server 03</div>
                                            <div className="col-span-2">Asia-Pacific</div>
                                            <div className="col-span-2">
                                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-900">
                                                    Online
                                                </Badge>
                                            </div>
                                            <div className="col-span-2">3,128</div>
                                            <div className="col-span-3">
                                                <div className="flex items-center gap-2">
                                                    <Progress value={42} className="h-2 flex-1" />
                                                    <span className="text-xs">42%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 items-center px-4 py-3">
                                            <div className="col-span-3">Game Server 04</div>
                                            <div className="col-span-2">South America</div>
                                            <div className="col-span-2">
                                                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900 dark:text-amber-300 dark:hover:bg-amber-900">
                                                    Maintenance
                                                </Badge>
                                            </div>
                                            <div className="col-span-2">0</div>
                                            <div className="col-span-3">
                                                <div className="flex items-center gap-2">
                                                    <Progress value={0} className="h-2 flex-1" />
                                                    <span className="text-xs">0%</span>
                                                </div>
                                            </div>
                                        </div>
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


"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button, } from "@heroui/react";
import Swal from "sweetalert2";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, X, MapPin, Trophy, Clock, Star } from "lucide-react"

interface Objective {
    id: string
    description: string
    completed: boolean
}

interface Reward {
    type: "xp" | "point" | "scores" | "gold" | "item"
    amount: number
    itemName?: string
}

export function AddQuestModal() {
    const [open, setOpen] = useState(false)
    const [questData, setQuestData] = useState({
        title: "",
        description: "",
        type: "main",
        difficulty: "easy",
        location: "",
        timeLimit: "",
        isTimeLimited: false,
        isActive: true,
        requiredLevel: 1,
        maxPlayers: 1,
        category: "adventure",
    })
    const [isOpen, setIsOpen] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const [objectives, setObjectives] = useState<Objective[]>([{ id: "1", description: "", completed: false }])

    const [rewards, setRewards] = useState<Reward[]>([{ type: "xp", amount: 0 }])

    const addObjective = () => {
        const newObjective: Objective = {
            id: Date.now().toString(),
            description: "",
            completed: false,
        }
        setObjectives([...objectives, newObjective])
    }

    const removeObjective = (id: string) => {
        if (objectives.length > 1) {
            setObjectives(objectives.filter((obj) => obj.id !== id))
        }
    }

    const updateObjective = (id: string, description: string) => {
        setObjectives(objectives.map((obj) => (obj.id === id ? { ...obj, description } : obj)))
    }

    const addReward = () => {
        const newReward: Reward = {
            type: "xp",
            amount: 0,
        }
        setRewards([...rewards, newReward])
    }

    const removeReward = (index: number) => {
        if (rewards.length > 1) {
            setRewards(rewards.filter((_, i) => i !== index))
        }
    }

    const updateReward = (index: number, field: keyof Reward, value: any) => {
        setRewards(rewards.map((reward, i) => (i === index ? { ...reward, [field]: value } : reward)))
    }

    const handleSubmit = async () => {
         console.log("Quest Data:", {
            ...questData,
            objectives: objectives.filter((obj) => obj.description.trim() !== ""),
            rewards: rewards.filter((reward) => reward.amount > 0),
        })
        //return; // หยุดการทำงานชั่วคราวเพื่อดีบัก
        const payload = {
            ...questData,
            objectives: objectives.filter((obj) => obj.description.trim() !== ""),
            rewards: rewards.filter((reward) => reward.amount > 0),
        };

        try {
            // จำลองการส่งข้อมูล (แทนที่ด้วย API จริงได้เลย)
            const res = await fetch("/api/quests/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to create quest");

            // ✅ แจ้งเตือนสำเร็จ
            Swal.fire({
                icon: "success",
                title: "สร้างภารกิจสำเร็จ!",
                text: "ภารกิจใหม่ของคุณถูกบันทึกแล้ว",
                confirmButtonText: "ตกลง",
            });

           
            setOpen(false);
        } catch (err) {
            console.error(err);

            // ❌ แจ้งเตือนเมื่อเกิดข้อผิดพลาด
            Swal.fire({
                icon: "error",
                title: "ไม่สามารถสร้างภารกิจได้",
                text: "กรุณาลองใหม่ภายหลัง",
                confirmButtonText: "ตกลง",
            });
        }
    };
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "easy":
                return "text-green-600 border-green-300 dark:text-green-400 dark:border-green-700"
            case "medium":
                return "text-amber-600 border-amber-300 dark:text-amber-400 dark:border-amber-700"
            case "hard":
                return "text-red-600 border-red-300 dark:text-red-400 dark:border-red-700"
            case "extreme":
                return "text-purple-600 border-purple-300 dark:text-purple-400 dark:border-purple-700"
            default:
                return "text-green-600 border-green-300 dark:text-green-400 dark:border-green-700"
        }
    }

    const getTypeColor = (type: string) => {
        switch (type) {
            case "หลัก":
                return "bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900"
            case "เสริม":
                return "bg-purple-100 text-purple-700 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-300 dark:hover:bg-purple-900"
            case "รายวัน":
                return "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-900"
            case "legendary":
                return "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-900"
            case "daily":
                return "bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900 dark:text-amber-300 dark:hover:bg-amber-900"
            default:
                return "bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900"
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* ปุ่มที่ใช้เปิด Dialog */}
            <DialogTrigger asChild>
                <Button
                    color="primary"
                    onClick={() => {
                        setIsWaiting(true); // แสดงสถานะกำลังโหลด
                        setTimeout(() => {
                            setIsWaiting(false); // หยุดแสดงโหลด
                            setIsOpen(true); // เปิด Dialog หลังจากรอ 1 วินาที
                        }, 1000);
                    }}
                    disabled={isWaiting} // ปิดการคลิกถ้ายังโหลดอยู่
                >
                    {isWaiting ? "กำลังโหลด..." : (
                        <>
                            <Plus className="h-4 w-4 mr-2" /> {/* ไอคอน + */}
                            Add Quest {/* ข้อความบนปุ่ม */}
                        </>
                    )}
                </Button>
            </DialogTrigger>

            {/* กล่องเนื้อหาของ Dialog */}
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>สร้างภารกิจใหม่</DialogTitle>
                    <DialogDescription>
                        เพิ่มภารกิจใหม่เข้าสู่เกม กรอกข้อมูลที่จำเป็นด้านล่างให้ครบถ้วน
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* ข้อมูลเบื้องต้น */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">ข้อมูลเบื้องต้น</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">ชื่อภารกิจ *</Label>
                                    <Input
                                        id="title"
                                        placeholder="กรอกชื่อภารกิจ"
                                        value={questData.title}
                                        onChange={(e) =>
                                            setQuestData({ ...questData, title: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="type">ประเภทภารกิจ *</Label>
                                    <Select
                                        value={questData.type}
                                        onValueChange={(value) =>
                                            setQuestData({ ...questData, type: value })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกประเภทภารกิจ" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="หลัก">ภารกิจหลัก</SelectItem>
                                            <SelectItem value="เสริม">ภารกิจเสริม</SelectItem>
                                            <SelectItem value="รายวัน">ภารกิจรายวัน</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">คำอธิบาย *</Label>
                                <Textarea
                                    id="description"
                                    placeholder="กรอกรายละเอียดภารกิจ"
                                    value={questData.description}
                                    onChange={(e) =>
                                        setQuestData({ ...questData, description: e.target.value })
                                    }
                                    rows={3}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="difficulty">ระดับความยาก *</Label>
                                    <Select
                                        value={questData.difficulty}
                                        onValueChange={(value) =>
                                            setQuestData({ ...questData, difficulty: value })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกระดับความยาก" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="easy">ง่าย</SelectItem>
                                            <SelectItem value="medium">ปานกลาง</SelectItem>
                                            <SelectItem value="hard">ยาก</SelectItem>
                                            <SelectItem value="extreme">โหดสุด</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="requiredLevel">เลเวลที่ต้องการ</Label>
                                    <Input
                                        id="requiredLevel"
                                        type="number"
                                        min="1"
                                        max="50"
                                        value={questData.requiredLevel}
                                        onChange={(e) =>
                                            setQuestData({
                                                ...questData,
                                                requiredLevel: Number.parseInt(e.target.value) || 1,
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="maxPlayers">จำนวนผู้เล่นสูงสุด</Label>
                                    <Input
                                        id="maxPlayers"
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={questData.maxPlayers}
                                        onChange={(e) =>
                                            setQuestData({
                                                ...questData,
                                                maxPlayers: Number.parseInt(e.target.value) || 1,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="location">สถานที่</Label>
                                    <Input
                                        id="location"
                                        placeholder="เช่น ที่ราบตะวันออก - วิหารต้องสาป"
                                        value={questData.location}
                                        onChange={(e) =>
                                            setQuestData({ ...questData, location: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">หมวดหมู่</Label>
                                    <Select
                                        value={questData.category}
                                        onValueChange={(value) =>
                                            setQuestData({ ...questData, category: value })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกหมวดหมู่" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="adventure">ผจญภัย</SelectItem>
                                            <SelectItem value="combat">ต่อสู้</SelectItem>
                                            <SelectItem value="exploration">สำรวจ</SelectItem>
                                            <SelectItem value="crafting">ประดิษฐ์</SelectItem>
                                            <SelectItem value="social">สังคม</SelectItem>
                                            <SelectItem value="puzzle">ปริศนา</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>



                            <div className="flex items-center space-x-4">
                                {/* กลุ่มตัวเลือก "Time Limited" */}
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="isTimeLimited"
                                        checked={questData.isTimeLimited}
                                        onCheckedChange={(checked) =>
                                            setQuestData({ ...questData, isTimeLimited: checked })
                                        }
                                    />
                                    <Label htmlFor="isTimeLimited">จำกัดเวลา</Label>
                                </div>

                                {/* ถ้าเลือกให้จำกัดเวลา จะแสดงช่องให้กรอกระยะเวลา */}
                                {questData.isTimeLimited && (
                                    <div className="space-y-2">
                                        <Input
                                            placeholder="เช่น 2 วัน, 1 สัปดาห์"
                                            value={questData.timeLimit}
                                            onChange={(e) =>
                                                setQuestData({ ...questData, timeLimit: e.target.value })
                                            }
                                        />
                                    </div>
                                )}

                                {/* ตัวเลือกเปิด/ปิดสถานะ Active */}
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="isActive"
                                        checked={questData.isActive}
                                        onCheckedChange={(checked) =>
                                            setQuestData({ ...questData, isActive: checked })
                                        }
                                    />
                                    <Label htmlFor="isActive">เปิดใช้งาน</Label>
                                </div>
                            </div>

                        </CardContent >
                    </Card >

                    {/* วัตถุประสงค์ของภารกิจ 
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-lg">เป้าหมายภารกิจ</CardTitle>
                                <Button variant="outline" size="sm" onClick={addObjective}>
                                    <Plus className="h-4 w-4 mr-1" />
                                    เพิ่มเป้าหมาย
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {objectives.map((objective, index) => (
                                <div key={objective.id} className="flex items-center gap-3">
                                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs font-medium">
                                        {index + 1}
                                    </div>
                                    <Input
                                        placeholder="กรอกรายละเอียดเป้าหมาย"
                                        value={objective.description}
                                        onChange={(e) => updateObjective(objective.id, e.target.value)}
                                        className="flex-1"
                                    />
                                    {objectives.length > 1 && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeObjective(objective.id)}
                                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>*/}


                    {/* รางวัลของภารกิจ */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-lg">รางวัลภารกิจ</CardTitle>
                                <Button variant="outline" size="sm" onClick={addReward}>
                                    <Plus className="h-4 w-4 mr-1" />
                                    เพิ่มรางวัล
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {rewards.map((reward, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <Select
                                        value={reward.type}
                                        onValueChange={(value) => updateReward(index, "type", value)}
                                    >
                                        <SelectTrigger className="w-32">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="xp">XP</SelectItem>
                                            <SelectItem value="point">Points</SelectItem>
                                            <SelectItem value="scores">Scores</SelectItem>

                                        </SelectContent>
                                    </Select>

                                    <Input
                                        type="number"
                                        placeholder="จำนวน"
                                        value={reward.amount}
                                        onChange={(e) =>
                                            updateReward(index, "amount", Number.parseInt(e.target.value) || 0)
                                        }
                                        className="w-24"
                                    />

                                    {reward.type === "item" ? (
                                        <Input
                                            placeholder="ชื่อไอเทม"
                                            value={reward.itemName || ""}
                                            onChange={(e) => updateReward(index, "itemName", e.target.value)}
                                            className="flex-1"
                                        />
                                    ) : (
                                        <div className="flex-1" />
                                    )}

                                    {rewards.length > 1 && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeReward(index)}
                                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>


                    {/* แสดงตัวอย่างภารกิจ */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">แสดงตัวอย่าง</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="border rounded-lg p-4 bg-muted/20">
                                {/* หัวข้อภารกิจ */}
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            {/* ประเภทภารกิจ */}
                                            <Badge variant="secondary" className={getTypeColor(questData.type)}>
                                                ภารกิจ{questData.type.charAt(0).toUpperCase() + questData.type.slice(1)}
                                            </Badge>

                                            {/* จำกัดเวลา */}
                                            {questData.isTimeLimited && questData.timeLimit && (
                                                <Badge
                                                    variant="outline"
                                                    className="text-yellow-600 border-yellow-300 dark:text-yellow-400 dark:border-yellow-700"
                                                >
                                                    <Clock className="h-3 w-3 mr-1" />
                                                    {questData.timeLimit}
                                                </Badge>
                                            )}
                                        </div>
                                        <h3 className="text-lg font-semibold">{questData.title || "ชื่อภารกิจ"}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {questData.description || "รายละเอียดภารกิจจะแสดงที่นี่"}
                                        </p>
                                    </div>

                                    {/* ความยาก (ดาว) */}
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`h-4 w-4 ${star <= (
                                                    questData.difficulty === "easy" ? 1 :
                                                        questData.difficulty === "medium" ? 2 :
                                                            questData.difficulty === "hard" ? 3 : 5
                                                ) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* สถานที่ */}
                                {questData.location && (
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900">
                                            <MapPin className="h-3 w-3 text-blue-700 dark:text-blue-300" />
                                        </div>
                                        <span className="text-sm">{questData.location}</span>
                                    </div>
                                )}

                                {/* เป้าหมาย */}
                                {objectives.some((obj) => obj.description.trim() !== "") && (
                                    <div className="space-y-2 mb-3">
                                        <h4 className="text-sm font-medium">เป้าหมาย:</h4>
                                        {objectives
                                            .filter((obj) => obj.description.trim() !== "")
                                            .map((objective, index) => (
                                                <div key={objective.id} className="flex items-start gap-2">
                                                    <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center mt-0.5">
                                                        <span className="text-xs font-medium">{index + 1}</span>
                                                    </div>
                                                    <span className="text-sm">{objective.description}</span>
                                                </div>
                                            ))}
                                    </div>
                                )}

                                {/* รางวัล */}
                                {rewards.some((reward) => reward.amount > 0) && (
                                    <div className="flex items-center gap-3 mt-3">
                                        {rewards
                                            .filter((reward) => reward.amount > 0)
                                            .map((reward, index) => (
                                                <div key={index} className="flex items-center gap-1">
                                                    {reward.type === "xp" && <Trophy className="h-4 w-4 text-blue-600" />}
                                                    {reward.type === "point" && (
                                                        <svg className="h-4 w-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="..." />
                                                        </svg>
                                                    )}
                                                    {reward.type === "scores" && (
                                                        <svg className="h-4 w-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="..." />
                                                        </svg>
                                                    )}
                                                    <span className="text-sm">
                                                        {reward.amount} {reward.type === "item" ? reward.itemName || "Item" : reward.type.toUpperCase()}
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                )}

                                {/* ระดับความยาก & เลเวลที่ต้องการ */}
                                <div className="flex justify-between items-center mt-4 pt-3 border-t">
                                    <div className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="..." />
                                        </svg>
                                        <span className="text-sm">
                                            ความยาก: {questData.difficulty.charAt(0).toUpperCase() + questData.difficulty.slice(1)}
                                        </span>
                                    </div>
                                    <Badge variant="outline" className={getDifficultyColor(questData.difficulty)}>
                                        เลเวล {questData.requiredLevel}+
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div >

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit}>
                        Create Quest
                    </Button>
                </DialogFooter>
            </DialogContent >
        </Dialog >
    )
}

"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button, } from "@heroui/react";
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
    type: "xp" | "gold" | "item"
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

    const handleSubmit = () => {
        // Here you would typically send the data to your API
        console.log("Quest Data:", {
            ...questData,
            objectives: objectives.filter((obj) => obj.description.trim() !== ""),
            rewards: rewards.filter((reward) => reward.amount > 0),
        })

        // Reset form and close modal
        setOpen(false)
        // You could also show a success toast here
    }

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
            case "main":
                return "bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900"
            case "side":
                return "bg-purple-100 text-purple-700 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-300 dark:hover:bg-purple-900"
            case "guild":
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
            <DialogTrigger asChild>
                <Button
                    color="primary"
                    onClick={() => {
                        setIsWaiting(true); // แสดงสถานะ loading
                        setTimeout(() => {
                            setIsWaiting(false);
                            setIsOpen(true); // เปิด Dialog หลัง 1 วิ
                        }, 1000);
                    }}
                    disabled={isWaiting}
                >
                    {isWaiting ? "กำลังโหลด..." : (
                        <>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Quest
                        </>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Quest</DialogTitle>
                    <DialogDescription>
                        Add a new quest to the game. Fill in all the required information below.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Quest Title *</Label>
                                    <Input
                                        id="title"
                                        placeholder="Enter quest title"
                                        value={questData.title}
                                        onChange={(e) => setQuestData({ ...questData, title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="type">Quest Type *</Label>
                                    <Select value={questData.type} onValueChange={(value) => setQuestData({ ...questData, type: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select quest type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="main">Main Quest</SelectItem>
                                            <SelectItem value="side">Side Quest</SelectItem>
                                            <SelectItem value="guild">Guild Quest</SelectItem>
                                            <SelectItem value="legendary">Legendary Quest</SelectItem>
                                            <SelectItem value="daily">Daily Quest</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Enter quest description"
                                    value={questData.description}
                                    onChange={(e) => setQuestData({ ...questData, description: e.target.value })}
                                    rows={3}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="difficulty">Difficulty *</Label>
                                    <Select
                                        value={questData.difficulty}
                                        onValueChange={(value) => setQuestData({ ...questData, difficulty: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select difficulty" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="easy">Easy</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="hard">Hard</SelectItem>
                                            <SelectItem value="extreme">Extreme</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="requiredLevel">Required Level</Label>
                                    <Input
                                        id="requiredLevel"
                                        type="number"
                                        min="1"
                                        max="50"
                                        value={questData.requiredLevel}
                                        onChange={(e) =>
                                            setQuestData({ ...questData, requiredLevel: Number.parseInt(e.target.value) || 1 })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="maxPlayers">Max Players</Label>
                                    <Input
                                        id="maxPlayers"
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={questData.maxPlayers}
                                        onChange={(e) => setQuestData({ ...questData, maxPlayers: Number.parseInt(e.target.value) || 1 })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        placeholder="e.g., Eastern Highlands - Forgotten Temple"
                                        value={questData.location}
                                        onChange={(e) => setQuestData({ ...questData, location: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                        value={questData.category}
                                        onValueChange={(value) => setQuestData({ ...questData, category: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="adventure">Adventure</SelectItem>
                                            <SelectItem value="combat">Combat</SelectItem>
                                            <SelectItem value="exploration">Exploration</SelectItem>
                                            <SelectItem value="crafting">Crafting</SelectItem>
                                            <SelectItem value="social">Social</SelectItem>
                                            <SelectItem value="puzzle">Puzzle</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="isTimeLimited"
                                        checked={questData.isTimeLimited}
                                        onCheckedChange={(checked) => setQuestData({ ...questData, isTimeLimited: checked })}
                                    />
                                    <Label htmlFor="isTimeLimited">Time Limited</Label>
                                </div>
                                {questData.isTimeLimited && (
                                    <div className="space-y-2">
                                        <Input
                                            placeholder="e.g., 2 days, 1 week"
                                            value={questData.timeLimit}
                                            onChange={(e) => setQuestData({ ...questData, timeLimit: e.target.value })}
                                        />
                                    </div>
                                )}
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="isActive"
                                        checked={questData.isActive}
                                        onCheckedChange={(checked) => setQuestData({ ...questData, isActive: checked })}
                                    />
                                    <Label htmlFor="isActive">Active</Label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Objectives */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-lg">Quest Objectives</CardTitle>
                                <Button variant="outline" size="sm" onClick={addObjective}>
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add Objective
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
                                        placeholder="Enter objective description"
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
                    </Card>

                    {/* Rewards */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-lg">Quest Rewards</CardTitle>
                                <Button variant="outline" size="sm" onClick={addReward}>
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add Reward
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {rewards.map((reward, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <Select value={reward.type} onValueChange={(value) => updateReward(index, "type", value)}>
                                        <SelectTrigger className="w-32">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="xp">XP</SelectItem>
                                            <SelectItem value="gold">Gold</SelectItem>
                                            <SelectItem value="item">Item</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Input
                                        type="number"
                                        placeholder="Amount"
                                        value={reward.amount}
                                        onChange={(e) => updateReward(index, "amount", Number.parseInt(e.target.value) || 0)}
                                        className="w-24"
                                    />
                                    {reward.type === "item" && (
                                        <Input
                                            placeholder="Item name"
                                            value={reward.itemName || ""}
                                            onChange={(e) => updateReward(index, "itemName", e.target.value)}
                                            className="flex-1"
                                        />
                                    )}
                                    {reward.type !== "item" && <div className="flex-1" />}
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

                    {/* Preview */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">Preview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="border rounded-lg p-4 bg-muted/20">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge variant="secondary" className={getTypeColor(questData.type)}>
                                                {questData.type.charAt(0).toUpperCase() + questData.type.slice(1)} Quest
                                            </Badge>
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
                                        <h3 className="text-lg font-semibold">{questData.title || "Quest Title"}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {questData.description || "Quest description will appear here"}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`h-4 w-4 ${star <=
                                                    (
                                                        questData.difficulty === "easy"
                                                            ? 1
                                                            : questData.difficulty === "medium"
                                                                ? 2
                                                                : questData.difficulty === "hard"
                                                                    ? 3
                                                                    : 5
                                                    )
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-muted-foreground"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {questData.location && (
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900">
                                            <MapPin className="h-3 w-3 text-blue-700 dark:text-blue-300" />
                                        </div>
                                        <span className="text-sm">{questData.location}</span>
                                    </div>
                                )}

                                {objectives.some((obj) => obj.description.trim() !== "") && (
                                    <div className="space-y-2 mb-3">
                                        <h4 className="text-sm font-medium">Objectives:</h4>
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

                                {rewards.some((reward) => reward.amount > 0) && (
                                    <div className="flex items-center gap-3 mt-3">
                                        {rewards
                                            .filter((reward) => reward.amount > 0)
                                            .map((reward, index) => (
                                                <div key={index} className="flex items-center gap-1">
                                                    {reward.type === "xp" && <Trophy className="h-4 w-4 text-blue-600" />}
                                                    {reward.type === "gold" && (
                                                        <svg className="h-4 w-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                    )}
                                                    {reward.type === "item" && (
                                                        <svg className="h-4 w-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
                                                        </svg>
                                                    )}
                                                    <span className="text-sm">
                                                        {reward.amount}{" "}
                                                        {reward.type === "item" ? reward.itemName || "Item" : reward.type.toUpperCase()}
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                )}

                                <div className="flex justify-between items-center mt-4 pt-3 border-t">
                                    <div className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                        <span className="text-sm">
                                            Difficulty: {questData.difficulty.charAt(0).toUpperCase() + questData.difficulty.slice(1)}
                                        </span>
                                    </div>
                                    <Badge variant="outline" className={getDifficultyColor(questData.difficulty)}>
                                        Level {questData.requiredLevel}+
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={!questData.title || !questData.description}>
                        Create Quest
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

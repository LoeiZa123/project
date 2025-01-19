'use client';
import { useState } from 'react';
import { Card, CardBody, CardFooter, Progress, Modal, Button } from "@heroui/react";
import { FaDragon, FaCoin } from 'react-icons/fa';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const quests = [
    {
      title: "Quest 1: Defeat the Dragon",
      description: "Defeat the dragon in the dark forest.",
      status: "In Progress",
      progress: 40,
      reward: "100 Gold",
      difficulty: "Hard",
      category: "Combat",
    },
    {
      title: "Quest 2: Gather Herbs",
      description: "Collect 10 healing herbs from the meadow.",
      status: "Completed",
      progress: 100,
      reward: "50 Gold",
      difficulty: "Easy",
      category: "Gathering",
    },
    {
      title: "Quest 3: Find the Lost Artifact",
      description: "Retrieve the lost artifact from the ruins.",
      status: "Not Started",
      progress: 0,
      reward: "200 Gold",
      difficulty: "Medium",
      category: "Exploration",
    },
    {
      title: "Quest 4: Protect the Village",
      description: "Defend the village from bandit attacks.",
      status: "In Progress",
      progress: 60,
      reward: "150 Gold",
      difficulty: "Hard",
      category: "Combat",
    },
    {
      title: "Quest 5: Rescue the Princess",
      description: "Rescue the princess from the dark tower.",
      status: "Not Started",
      progress: 0,
      reward: "300 Gold",
      difficulty: "Very Hard",
      category: "Rescue",
    },
    {
      title: "Quest 6: Explore the Cave",
      description: "Explore the mysterious cave and find hidden treasure.",
      status: "In Progress",
      progress: 80,
      reward: "120 Gold",
      difficulty: "Medium",
      category: "Exploration",
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState(null);

  const handleAction = (quest) => {
    if (quest.status === "Not Started") {
      setQuests(quests.map(q => q.title === quest.title ? { ...q, status: "In Progress", progress: 10 } : q));
    } else if (quest.status === "In Progress") {
      setQuests(quests.map(q => q.title === quest.title ? { ...q, status: "Completed", progress: 100 } : q));
    }
  };

  const openModal = (quest) => {
    setSelectedQuest(quest);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedQuest(null);
  };

  // ฟังก์ชันกรองเควสตามหมวดหมู่ที่เลือก
  const filteredQuests = selectedCategory === "All" 
    ? quests 
    : quests.filter(quest => quest.category === selectedCategory);

  return (
    <div className="flex ">
      {/* Sidebar เลือกหมวดหมู่ */}
      <div className="w-1/6 bg-gray-900 p-2 rounded-lg ml-3 mt-2">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <ul className="space-y-2">
          <li>
            <Button 
              className={`w-full p-2 text-left ${selectedCategory === "All" ? "bg-blue-500 text-dark" : "bg-gray-500"}`}
              onClick={() => setSelectedCategory("All")}
            >
              All Categories
            </Button>
          </li>
          <li>
            <Button 
              className={`w-full p-2 text-left ${selectedCategory === "Combat" ? "bg-blue-500 text-dark" : "bg-gray-500"}`}
              onClick={() => setSelectedCategory("Combat")}
            >
              Combat
            </Button>
          </li>
          <li>
            <Button 
              className={`w-full p-2 text-left ${selectedCategory === "Gathering" ? "bg-blue-500 text-dark" : "bg-gray-500"}`}
              onClick={() => setSelectedCategory("Gathering")}
            >
              Gathering
            </Button>
          </li>
          <li>
            <Button 
              className={`w-full p-2 text-left ${selectedCategory === "Exploration" ? "bg-blue-500 text-dark" : "bg-gray-500"}`}
              onClick={() => setSelectedCategory("Exploration")}
            >
              Exploration
            </Button>
          </li>
          <li>
            <Button 
              className={`w-full p-2 text-left ${selectedCategory === "Rescue" ? "bg-blue-500 text-dark" : "bg-gray-500"}`}
              onClick={() => setSelectedCategory("Rescue")}
            >
              Rescue
            </Button>
          </li>
        </ul>
      </div>

      {/* แสดงเควสที่กรองแล้ว */}
      <div className="w-3/4 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[450px]">
        {filteredQuests.map((quest, index) => (
          <Card key={index} isPressable shadow="sm" onPress={() => openModal(quest)}>
            <CardBody className="overflow-visible p-4">
              <div className="flex items-center mb-2">
                <FaDragon className="text-xl mr-2" />
                <h3 className="text-xl font-semibold">{quest.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{quest.description}</p>
              <Progress value={quest.progress} max={100} color={quest.progress === 100 ? "green" : quest.progress >= 50 ? "yellow" : "red"} className="mt-4" />
              <div className="flex justify-between items-center mt-2">
                <span className={`font-bold ${quest.status === "Completed" ? "text-green-500" : quest.status === "In Progress" ? "text-yellow-500" : "text-red-500"}`}>
                  {quest.status}
                </span>
                <span className="text-sm">{quest.progress}%</span>
              </div>
            </CardBody>
            <CardFooter className="text-small justify-between">
              <Button 
                className={`btn ${quest.status === "Not Started" ? "btn-primary" : quest.status === "In Progress" ? "btn-warning" : "btn-success"}`}
                onClick={() => handleAction(quest)}
              >
                {quest.status === "Not Started" ? "Start Quest" : quest.status === "In Progress" ? "Complete" : "View Details"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Modal สำหรับรายละเอียดเควส */}
      {showModal && selectedQuest && (
        <Modal onClose={closeModal}>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">{selectedQuest.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{selectedQuest.description}</p>
            <p className="font-bold text-lg mb-2">Reward: {selectedQuest.reward}</p>
            <p className="text-sm mb-2">Difficulty: {selectedQuest.difficulty}</p>
            <Progress value={selectedQuest.progress} max={100} color={selectedQuest.progress === 100 ? "green" : selectedQuest.progress >= 50 ? "yellow" : "red"} className="mt-4" />
            <div className="flex justify-between items-center mt-4">
              <span className={`font-bold ${selectedQuest.status === "Completed" ? "text-green-500" : selectedQuest.status === "In Progress" ? "text-yellow-500" : "text-red-500"}`}>
                {selectedQuest.status}
              </span>
              <span className="text-sm">{selectedQuest.progress}%</span>
            </div>
            <Button className="btn btn-primary mt-4" onClick={closeModal}>Close</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

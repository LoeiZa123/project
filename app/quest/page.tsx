'use client';
import { useState } from 'react';
import { Progress, Modal, Button, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { FaDragon } from 'react-icons/fa';
import Swal from "sweetalert2";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const initialQuests = [
    {
      title: "เควส 1: รีไซเคิลขวดพลาสติก",
      description: "รวบรวมขวดพลาสติกจากทั่วมหาวิทยาลัยและนำไปทิ้งในถังขยะรีไซเคิล",
      status: "ยังไม่เริ่ม",
      progress: 0,
      reward: "20 คะแนน",
      difficulty: "ง่าย",
      category: "รีไซเคิล",
      image: "https://media.istockphoto.com/id/1285638666/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%88%E0%B9%83%E0%B8%AA%E0%B9%88%E0%B8%96%E0%B8%B1%E0%B8%87%E0%B8%82%E0%B8%A2%E0%B8%B0%E0%B8%A5%E0%B8%87%E0%B9%83%E0%B8%99%E0%B8%96%E0%B8%B1%E0%B8%87%E0%B8%82%E0%B8%A2%E0%B8%B0%E0%B8%A3%E0%B8%B5%E0%B9%84%E0%B8%8B%E0%B9%80%E0%B8%84%E0%B8%B4%E0%B8%A5.jpg?s=2048x2048&w=is&k=20&c=xOoDhF-y5z_5rlkyqv3Job0cwYV8WIE21j0xNwa3gIY="
    },
    {
      title: "เควส 2: เก็บขยะกระดาษ",
      description: "เก็บขยะกระดาษที่ใช้แล้วจำนวน 10 ชิ้นจากมหาวิทยาลัย และทิ้งในถังขยะรีไซเคิล",
      status: "ยังไม่เริ่ม",
      progress: 0,
      reward: "30 คะแนน",
      difficulty: "ปานกลาง",
      category: "รีไซเคิล",
      image: "https://cdn.pixabay.com/photo/2020/07/06/13/21/mercedes-benz-5377019_1280.jpg"
    },
    {
      title: "เควส 3: จัดกิจกรรมทำความสะอาดมหาวิทยาลัย",
      description: "จัดกิจกรรมทำความสะอาดและเก็บขยะจากจุดต่างๆ รอบมหาวิทยาลัยร่วมกับเพื่อนๆ นักศึกษา",
      status: "ยังไม่เริ่ม",
      progress: 0,
      reward: "50 คะแนน",
      difficulty: "ยาก",
      category: "ชุมชน",
      image: "https://cdn.pixabay.com/photo/2013/05/31/19/30/plastic-bottles-115069_640.jpg"
    },
    {
      title: "เควส 4: ปลูกต้นไม้ในมหาวิทยาลัย",
      description: "ปลูกต้นไม้ในพื้นที่ที่จัดไว้ในมหาวิทยาลัยเพื่อเพิ่มพื้นที่สีเขียว",
      status: "ยังไม่เริ่ม",
      progress: 0,
      reward: "40 คะแนน",
      difficulty: "ปานกลาง",
      category: "สิ่งแวดล้อม",
      image: "https://cdn.pixabay.com/photo/2022/04/07/14/31/bottle-7117637_640.jpg"
    },
    {
      title: "เควส 5: ขี่จักรยานไปเรียน",
      description: "ขี่จักรยานไปเรียนเพื่อช่วยลดการใช้พลังงานและลดมลพิษ",
      status: "ยังไม่เริ่ม",
      progress: 0,
      reward: "10 คะแนน",
      difficulty: "ง่าย",
      category: "สิ่งแวดล้อม",
      image: "https://cdn.pixabay.com/photo/2017/09/08/18/20/garbage-2729608_640.jpg"
    },
    {
      title: "เควส 6: ปรับปรุงถังขยะรีไซเคิลในมหาวิทยาลัย",
      description: "ช่วยปรับปรุงและตกแต่งถังขยะรีไซเคิลในพื้นที่ต่างๆ ของมหาวิทยาลัย",
      status: "ยังไม่เริ่ม",
      progress: 0,
      reward: "60 คะแนน",
      difficulty: "ยาก",
      category: "ชุมชน",
      image: "https://media.istockphoto.com/id/484188961/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%96%E0%B8%B1%E0%B8%87%E0%B8%82%E0%B8%A2%E0%B8%B0%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%8A%E0%B8%B2%E0%B8%A2%E0%B8%84%E0%B8%99%E0%B8%AB%E0%B8%99%E0%B8%B6%E0%B9%88%E0%B8%87.jpg?s=2048x2048&w=is&k=20&c=hWwomWMo2ysHuLGHssHX-AZQUHrAo5V5ZaxLfFq2adU="
    },
    {
      title: "เควส 7: ร่วมงานอาสาสมัคร",
      description: "เข้าร่วมโครงการอาสาสมัครต่างๆ เพื่อช่วยเหลือชุมชนในพื้นที่รอบมหาวิทยาลัย",
      status: "ยังไม่เริ่ม",
      progress: 0,
      reward: "80 คะแนน",
      difficulty: "ยาก",
      category: "ชุมชน",
      image: "https://cdn.pixabay.com/photo/2020/07/13/13/20/garbage-5400780_640.jpg"
    },
    {
      title: "เควส 8: จัดการคัดแยกขยะภายในห้องเรียน",
      description: "ช่วยกันคัดแยกขยะประเภทต่างๆ ภายในห้องเรียนหรือหอพัก",
      status: "ยังไม่เริ่ม",
      progress: 0,
      reward: "20 คะแนน",
      difficulty: "ง่าย",
      category: "รีไซเคิล",
      image: "https://cdn.pixabay.com/photo/2018/03/25/13/43/garbage-3259455_640.jpg"
    },
    {
      title: "เควส 9: ท้าทายการเก็บขยะในห้องสมุด",
      description: "ท้าทายตัวเองเก็บขยะจากพื้นที่ห้องสมุดมหาวิทยาลัยอย่างน้อย 5 ชิ้นภายใน 1 สัปดาห์",
      status: "ยังไม่เริ่ม",
      progress: 0,
      reward: "30 คะแนน",
      difficulty: "ปานกลาง",
      category: "รีไซเคิล",
      image: "https://cdn.pixabay.com/photo/2014/08/08/22/02/garbage-413757_640.jpg"
    },
    {
      title: "เควส 10: รักษาความสะอาดพื้นที่กลางมหาวิทยาลัย",
      description: "เข้าร่วมกิจกรรมทำความสะอาดพื้นที่กลางมหาวิทยาลัยร่วมกับกลุ่มนักศึกษาอื่นๆ",
      status: "ยังไม่เริ่ม",
      progress: 0,
      reward: "50 คะแนน",
      difficulty: "ยาก",
      category: "ชุมชน",
      image: "https://cdn.pixabay.com/photo/2014/10/25/19/22/waste-separation-502952_640.jpg"
    }
  ];
  

  const [quests, setQuests] = useState(initialQuests);
  const [selectedQuest, setSelectedQuest] = useState(null);

  const openModal = (quest) => {
    setSelectedQuest(quest);
    onOpen();
  };

  const acceptQuest = (quest) => {
    // แสดงการยืนยันก่อนรับเควส
    Swal.fire({
      icon: 'question',
      title: 'Are you sure?',
      text: 'Do you want to accept this quest?',
      showCancelButton: true,  // แสดงปุ่ม Cancel
      confirmButtonText: 'Yes, accept it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // ถ้ายืนยันให้ลบเควสจากรายการ
        setQuests((prevQuests) => prevQuests.filter(q => q.title !== quest.title));
  
        // แสดงแจ้งเตือนว่าเควสถูกยอมรับ
        Swal.fire({
          icon: 'success',
          title: 'Quest Accepted',
          text: 'You have successfully accepted the quest!',
          showConfirmButton: true,
          timer: 2000,
        });
      } else {
        // ถ้าเลือก Cancel สามารถแสดงการแจ้งเตือนหรือไม่ก็ได้
        Swal.fire({
          icon: 'info',
          title: 'Action Canceled',
          text: 'You have canceled accepting the quest.',
          showConfirmButton: true,
        });
      }
    });
  };
  

  const filteredQuests = selectedCategory === "All"
    ? quests
    : quests.filter(quest => quest.category === selectedCategory);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar เลือกหมวดหมู่ */}
      <div className="w-1/6 bg-gray-900 p-2 rounded-lg ml-3 mt-2">
        <h2 className="text-xl font-semibold mb-4 text-white">Categories</h2>
        <ul className="space-y-2">
          {["All", "รีไซเคิล", "ชุมชน"].map(category => (
            <li key={category}>
              <Button
                className={`w-full p-2 text-left text-white ${selectedCategory === category ? "bg-blue-500" : "bg-gray-700"}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* แสดงเควส */}
      <div className="w-3/4 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {filteredQuests.map((quest, index) => (
          <div key={index} className="bg-gray-900 shadow-lg rounded-lg overflow-hidden p-4 flex flex-col h-auto">
            <img src={quest.image} alt={quest.title} className="w-full h-40 object-cover rounded" />
            <div className="flex items-center mt-4">
              <FaDragon className="text-2xl text-white mr-2" />
              <h3 className="text-xl font-semibold text-white">{quest.title}</h3>
            </div>
            <Progress value={quest.progress} max={100} className="mt-4 bg-gray-700" />
            <div className="flex justify-between items-center mt-2">
              <span className={`font-bold ${quest.status === "Completed" ? "text-green-500" : quest.status === "In Progress" ? "text-yellow-500" : "text-red-500"}`}>{quest.status}</span>
              <span className="text-sm text-gray-300">{quest.progress}%</span>
            </div>
            <div className="mt-4 flex w-full">
              <Button onPress={() => openModal(quest)}>View details</Button>
              <Button onPress={() => acceptQuest(quest)} className="ml-auto">Accept Quest</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal แสดงรายละเอียด */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{selectedQuest?.title}</ModalHeader>
              <ModalBody>
                <img src={selectedQuest?.image} alt={selectedQuest?.title} className="w-full h-40 object-cover rounded mb-4" />
                <p>{selectedQuest?.description}</p>
                <p className="font-bold">Reward: {selectedQuest?.reward}</p>
                <p>Difficulty: {selectedQuest?.difficulty}</p>
                <Progress value={selectedQuest?.progress} max={100} className="mt-4" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>Close</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

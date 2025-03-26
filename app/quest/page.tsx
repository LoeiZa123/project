"use client"
import { useState, useEffect } from 'react';
import { Progress, Modal, Button, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { FaDragon } from 'react-icons/fa';
import Swal from "sweetalert2";
import { useSessionContext } from '@/contexts/SessionContext';

export default function App() {
  const { session, status } = useSessionContext(); // ใช้ข้อมูล session จาก context
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [quests, setQuests] = useState([]);
  const [questslog, setQuestslog] = useState([]);
  const [selectedQuest, setSelectedQuest] = useState(null);

  // โหลดข้อมูลจาก API ครั้งแรก
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
          "Content-Type": "application/json", // ระบุประเภทข้อมูลให้ถูกต้อง
        },
        body: JSON.stringify({ user_id: session?.user?.email }), // ตรวจสอบว่า session?.user?.email มีค่า
      });

      const data = await response.json();
      setQuestslog(data.results ?? []);
    } catch (error) {
      console.error("Error fetching quests log:", error);
      setQuestslog([]);
    }
  };

  // ฟังก์ชันสำหรับกรอง quests โดยใช้ questslog
  const deleteQuestFromList = (quests, questslog) => {
    const completedQuestIds = questslog.map(log => log.quest_id);
    return quests.filter(quest => !completedQuestIds.includes(quest.id));
  };

  // คัดกรอง quests ตามหมวดหมู่ที่เลือก
  const filteredQuests = selectedCategory === "All"
    ? deleteQuestFromList(quests, questslog)
    : deleteQuestFromList(quests.filter(quest => quest.category === selectedCategory), questslog);

  const openModal = (quest) => {
    setSelectedQuest(quest);
    onOpen();
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
  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen text-lg">Loading session...</div>;
  }


  return (
    <div className="flex min-h-screen flex-col sm:flex-row">
      {/* Sidebar */}
      <div className="w-full sm:w-1/4 bg-gray-900 p-4 rounded-lg ml-3 mt-2 sm:block">
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

      {/* Quests display */}
      <div className="w-full sm:w-3/4 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredQuests.map((quest) => (
          <div key={quest.id} className="bg-gray-900 shadow-lg rounded-lg overflow-hidden p-4 flex flex-col h-auto">
            <img
              src={quest.image || "https://cdn.pixabay.com/photo/2020/07/06/13/21/mercedes-benz-5377019_1280.jpg"}
              alt={quest.title}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <div className="flex items-center mt-4">
              <FaDragon className="text-2xl text-white mr-2" />
              <h3 className="text-xl font-semibold text-white">{quest.title}</h3>
            </div>
            <div className="mt-4 flex w-full">
              <Button onPress={() => openModal(quest)}>ดูละเอียด</Button>
              <Button onPress={() => acceptQuest(quest)} className="ml-auto">รับภารกิจ</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Quest details */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{selectedQuest?.title}</ModalHeader>
              <ModalBody>
                <img src={selectedQuest?.image || "https://cdn.pixabay.com/photo/2020/07/06/13/21/mercedes-benz-5377019_1280.jpg"} alt={selectedQuest?.title} className="w-full h-40 object-cover rounded mb-4" />
                <p>{selectedQuest?.description}</p>
                <p className="font-bold">Reward: {selectedQuest?.reward}</p>
                <p>ระดับความยาก: {selectedQuest?.difficulty}</p>
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

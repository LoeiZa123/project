'use client';

import { Card, CardBody } from "@heroui/react";
import Circles from "../../components/circles";
import Kpistat from "../../components/kpistat";
import Charts from "../../components/chart";

import Image from 'next/image';

export default function App() {
  return (
    <div className="flex flex-col p-6 space-y-6">
      {/* Circles Component */}
      <Card isHoverable>
        <CardBody>
          <Circles />
        </CardBody>
      </Card>

      {/* Container for Charts and Kpistat */}
      <div className="flex flex-row gap-6">
        {/* Charts Component (ชิดซ้าย) */}
        <div className="max-w-[900px] w-full"> {/* กำหนดขนาดสูงสุดของ Charts */}
          <Card isHoverable>
            <CardBody>
              <Charts />
            </CardBody>
          </Card>
        </div>

        {/* Kpistat Component (เรียงในแนวตั้ง) */}
        <div className="flex flex-col w-full">
          <Card isHoverable>
            <CardBody>
              <Kpistat />
            </CardBody>
          </Card>
        </div>
      </div>


    </div>
  );
}

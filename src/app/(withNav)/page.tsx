"use client";

import Revenue from "@/components/main/Revenue";
import Profit from "@/components/main/Profit";
import Expenses from "@/components/main/Expenses";
import Goals from "@/components/main/Goals";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useUserInfo } from "@/hooks/useUserQuery";
import Alarm from "@/components/Alarm";

export default function Home() {

  const [height, setHeight] = useState("0px");
  
  const {data:user} = useUserInfo();

  useEffect(() => {
    const calculateHeight = () => {
      const calculatedHeight = Math.max(190, Math.floor((window.innerHeight - 135 - 40 - 20) / 3));
      setHeight(`${calculatedHeight}px`);
    };

    calculateHeight();
    window.addEventListener("resize", calculateHeight);

    return () => {
      window.removeEventListener("resize", calculateHeight);
    };
  }, []);

  const [isVisible, setIsVisible] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // 3초 후 자동으로 사라지도록 설정
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => setIsCollapsed(true), 500);
    }, 3000);
    return () => clearTimeout(timer); // 타이머 정리
  }, []);


  return (
    <div id="main" className="container">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">{user?.companyName || "가게 이름"}</h1>
        <Link href={"/setGoals"}>
          <button className="bg-theme w-[70px] h-[40px] text-sm text-white px-1 py-[5px] rounded">
            목표설정
          </button>
        </Link>
        
      </div>

      <div className="grid grid-cols-2 gap-4 overflow-y-scroll h-[calc(100vh-160px)]">
        {/* 알림 박스 */}
        <div
        className={`col-span-2 transition-all duration-500 ease-in-out ${
          isCollapsed ? "hidden" : "h-20"
        } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}>
          <Alarm />
        </div>

        {/* 이번 달 매출 */}
        <Revenue height={height} />

        {/* 지난 달 순이익 */}
        <Profit height={height} />

        {/* 이번 달 지출 */}
        <Expenses height={height} />

        {/* 이번 달 목표 */}
        <Goals height={height} />
      </div>
    </div>
  );
}

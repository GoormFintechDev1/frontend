"use client";

import Navbar from "@/components/Navbar";
import Revenue from "@/components/main/Revenue";
import Profit from "@/components/main/Profit";
import Expenses from "@/components/main/Expenses";
import Goals from "@/components/main/Goals";

export default function Home() {

  return (
    <div id="main" className="container">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">가게 이름</h1>
        <button className="bg-theme w-[70px] h-[40px] text-sm text-white px-1 py-[5px] rounded">
          목표설정
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* 이번 달 매출 */}
        <Revenue />

        {/* 지난 달 순이익 */}
        <Profit />

        {/* 이번 달 지출 */}
        <Expenses />

        {/* 이번 달 목표 */}
        <Goals />
      </div>

      <Navbar />
    </div>
  );
}

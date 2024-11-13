"use client";

import Revenue from "@/components/main/Revenue";
import Profit from "@/components/main/Profit";
import Expenses from "@/components/main/Expenses";
import Goals from "@/components/main/Goals";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useUserInfo } from "@/hooks/useUserQuery";

export default function Home() {

  const [height, setHeight] = useState("0px");

  useEffect(() => {
    const calculateHeight = () => {
      const calculatedHeight = Math.max(180, Math.floor((window.innerHeight - 135 - 40 - 20) / 3));
      setHeight(`${calculatedHeight}px`);
    };

    calculateHeight();
    window.addEventListener("resize", calculateHeight);

    return () => {
      window.removeEventListener("resize", calculateHeight);
    };
  }, []);

  const {data, isLoading, error} = useUserInfo();

  return (
    <div id="main" className="container">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">{data?.companyName}</h1>
        <Link href={"/goals"}>
          <button className="bg-theme w-[70px] h-[40px] text-sm text-white px-1 py-[5px] rounded">
            목표설정
          </button>
        </Link>
        
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* 이번 달 매출 */}
        <Revenue height={height}/>

        {/* 지난 달 순이익 */}
        <Profit height={height}/>

        {/* 이번 달 지출 */}
        <Expenses height={height} />

        {/* 이번 달 목표 */}
        <Goals height={height} />
      </div>
    </div>
  );
}

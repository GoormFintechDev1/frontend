"use client";

import Revenue from "@/components/main/Revenue";
import Profit from "@/components/main/Profit";
import Expenses from "@/components/main/Expenses";
import Goals from "@/components/main/Goals";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useUserInfo } from "@/hooks/useUserQuery";
import Alarm from "@/components/Alarm";
import { CustomError } from "@/interface/error";
import { useRouter } from "next/navigation";

export default function Home() {

  const [height, setHeight] = useState("0px");
  const router = useRouter();
  
  const {data:user, error} = useUserInfo();

  if((error as CustomError)?.status === 403){
    router.push("/login")
  }

  useEffect(() => {
    const calculateHeight = () => {
      const calculatedHeight = Math.max(190, Math.floor((window.innerHeight - 200) / 3));
      // const calculatedHeight = Math.max(190, Math.floor((document.documentElement.client - 200) / 3));
      setHeight(`${calculatedHeight}px`);
    };

    calculateHeight();
    window.addEventListener("resize", calculateHeight);

    return () => {
      window.removeEventListener("resize", calculateHeight);
    };
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  const [isOccupied, setIsOccupied] = useState(false);

  useEffect(()=>{
    const savedValue = sessionStorage.getItem("alarm");

    setIsVisible(savedValue === "false" ? false : true);
    setIsOccupied(savedValue === "false" ? false : true);
  },[])


  const handleDelete = () => {
    setIsVisible(false);
    sessionStorage.setItem(`alarm`, JSON.parse('false'));
    setTimeout(()=> setIsOccupied(false), 500);
  }

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

      <div id="main-content" className="grid grid-cols-2 gap-4 overflow-y-scroll h-[calc(var(--dynamic-vh)-168px)]">
        {/* 알림 박스 */}
        <div
        className={`col-span-2 transition-all duration-500 ease-in-out ${
          isOccupied ? "h-20" : "hidden"
        } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}>
          <Alarm onClick={handleDelete}/>
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

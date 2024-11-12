"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useExpenseGoal, useRevenueGoal } from "@/hooks/useGoalQuery";
import { paramMonth2 } from "@/utils/calculateDay";
dayjs().format();


export default function ObjDetail() {
    const searchParams = useSearchParams();
    const pageType = searchParams.get("page"); 
    const router = useRouter();


    const [currentIndex, setCurrentIndex] = useState(new Date().getMonth() + 1);
    const [previousData, setPreviousData] = useState(1);
    const [prepreviousData, setPrepreviousData] = useState(1);
    const [year, setYear] = useState(new Date().getFullYear());


    
    const date = paramMonth2(year, currentIndex);

    const {data: revenue} = useRevenueGoal(date);
    console.log(revenue);
  
    const {data: expense} = useExpenseGoal(date);
    console.log(expense);


    // // 현재, 지난달, 지지난달 데이터 계산
    const currentData = currentIndex;

    useEffect(() => {
        // 이전 및 이전 이전 달 계산
        setPreviousData((currentIndex - 1) === 0 ? 12 : (currentIndex - 1) % 12);
        setPrepreviousData((currentIndex - 2 + 12) % 12 || 12);
    }, [currentIndex]);

    const goToPreviousMonth = () => {
        if (currentIndex === 1) {
            setCurrentIndex(12);
            setYear((prevYear) => prevYear - 1); // 1월에서 이전 달로 이동하면 연도 감소
        } else {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };
    
    const goToNextMonth = () => {
        if (currentIndex === 12) {
            setCurrentIndex(1);
            setYear((prevYear) => prevYear + 1); // 12월에서 다음 달로 이동하면 연도 증가
        } else {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    // 매출 페이지 색상
    const revenueCurrentColor = "bg-emerald-400";
    const revenuePreviousColor = "bg-cyan-500";
    const revenueNextColor = "bg-blue-400";

    // 지출 페이지 색상
    const expenseCurrentColor = "bg-rose-400";
    const expensePreviousColor = "bg-yellow-400";
    const expenseNextColor = "bg-orange-400";

    // 현재 페이지 타입에 따른 색상 선택
    const currentColor = pageType === "revenue" ? revenueCurrentColor : expenseCurrentColor;
    const previousColor = pageType === "revenue" ? revenuePreviousColor : expensePreviousColor;
    const nextColor = pageType === "revenue" ? revenueNextColor : expenseNextColor;


    // 현재 페이지 타입에 따른 달성률 값 설정
    let currentAchievement = pageType === "revenue" 
        ? Math.round((revenue?.monthlyRevenue0Ago / revenue?.revenueGoal0Ago) * 100) 
        : Math.round((expense?.monthlyExpense0Ago / expense?.expenseGoal0Ago) * 100);
    if(Number.isNaN(currentAchievement)) currentAchievement = 0;

    let previousAchievement = pageType === "revenue"
        ? Math.round((revenue?.monthlyRevenue1Ago / revenue?.revenueGoal1Ago) * 100)
        : Math.round((expense?.monthlyExpense1Ago / expense?.expenseGoal1Ago) * 100);
    if(Number.isNaN(previousAchievement)) previousAchievement = 0;
        

    let nextAchievement = pageType === "revenue"
        ? Math.round((revenue?.monthlyRevenue2Ago / revenue?.revenueGoal2Ago) * 100)
        : Math.round((expense?.monthlyExpense2Ago / expense?.expenseGoal2Ago) * 100);
    if(Number.isNaN(nextAchievement)) nextAchievement = 0;


    const currentTotal = pageType === "revenue" ? revenue?.monthlyRevenue0Ago : expense?.monthlyExpense0Ago;
    let previousTotal = pageType === "revenue" ? revenue?.monthlyRevenue1Ago : expense?.monthlyExpense1Ago;
    if (previousTotal === null) previousTotal = 0;
    let nextTotal = pageType === "revenue" ? revenue?.monthlyRevenue2Ago : expense?.monthlyExpense2Ago;
    if (nextTotal === null) nextTotal = 0;


    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center mb-4">
                <button onClick={() => router.back()} className="mr-2 text-gray-600 text-xl font-bold">
                    {"<"}
                </button>
            </div>
            <h1 className="text-2xl font-extralight mb-4 text-center">
                {pageType === "revenue" ? "매출 목표 상세페이지" : "지출 목표 상세페이지"}
            </h1>

            {/* 월별 정보 */}
            <div className="flex items-center justify-between mb-4">
                <button onClick={goToPreviousMonth} className="text-xl font-bold">{"<"}</button>
                <span className="text-xl font-normal">{currentData}월 </span>
                <button onClick={goToNextMonth} className="text-xl font-bold">{">"}</button>
            </div>


            {/*자세한 목표 설정*/}
            <div className="text-center my-10 text-xl">
                {pageType === "revenue" ? " 매출 상세 목표 " : "지출 상세 목표 "}
            </div>


            {/* 현재 달 정보 */}
            <div className="text-base font-sans mb-2">
                <p className="mb-2">
                    <strong>{currentData}월 </strong> <span className="font-midium">- 총 {currentTotal?.toLocaleString() || "0"}원 </span>
                </p>
                <div className="relative w-full h-8 bg-gray-300 rounded-full overflow-hidden mb-8">
                    <div
                        style={{ width: "100%" }}
                        className={`h-full ${currentColor} rounded-full flex items-center justify-center text-black text-sm font-bold p-3`}
                    >
                        {currentAchievement}%
                    </div>
                </div>
            </div>

            {/* 지난 달 정보 */}
            <div className="text-base font-sans mb-2">
                <p className="mb-2">
                    <strong>{previousData}월 </strong> <span className="font-midium"> - 총 {previousTotal?.toLocaleString() || "0"}원 </span>
                </p>
                <div className="relative w-full h-8 bg-gray-300 rounded-full overflow-hidden mb-8">
                    <div
                        style={{ width: "100%" }}
                        className={`h-full ${previousColor} rounded-full flex items-center justify-center text-black text-sm font-bold p-3`}
                    >
                        {previousAchievement}%
                    </div>
                </div>
            </div>

            {/* 지지난 달 정보 */}
            <div className="text-base font-sans mb-2">
                <p className="mb-2">
                    <strong>{prepreviousData}월 </strong> <span className="font-midium"> - 총 {nextTotal?.toLocaleString() || "0"}원 </span>
                </p>
                <div className="relative w-full h-8 bg-gray-300 rounded-full overflow-hidden">
                    <div
                        style={{ width: "100%" }}
                        className={`h-full ${nextColor} rounded-full flex items-center justify-center text-black text-sm font-bold p-3`}
                    >
                        {nextAchievement}%
                    </div>
                </div>
            </div>

        </div>
    );
}
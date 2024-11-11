"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

const monthData = [
    { month: "1월", revenueTotal: 520000, revenueAchievement: 72, expenseTotal: 300000, expenseAchievement: 55 },
    { month: "2월", revenueTotal: 500000, revenueAchievement: 68, expenseTotal: 290000, expenseAchievement: 53 },
    { month: "3월", revenueTotal: 530000, revenueAchievement: 75, expenseTotal: 310000, expenseAchievement: 58 },
    { month: "4월", revenueTotal: 550000, revenueAchievement: 78, expenseTotal: 320000, expenseAchievement: 60 },
    { month: "5월", revenueTotal: 560000, revenueAchievement: 80, expenseTotal: 330000, expenseAchievement: 62 },
    { month: "6월", revenueTotal: 580000, revenueAchievement: 82, expenseTotal: 340000, expenseAchievement: 65 },
    { month: "7월", revenueTotal: 590000, revenueAchievement: 85, expenseTotal: 350000, expenseAchievement: 68 },
    { month: "8월", revenueTotal: 600000, revenueAchievement: 88, expenseTotal: 360000, expenseAchievement: 70 },
    { month: "9월", revenueTotal: 610000, revenueAchievement: 90, expenseTotal: 370000, expenseAchievement: 72 },
    { month: "10월", revenueTotal: 620000, revenueAchievement: 92, expenseTotal: 380000, expenseAchievement: 74 },
    { month: "11월", revenueTotal: 630000, revenueAchievement: 94, expenseTotal: 390000, expenseAchievement: 76 },
    { month: "12월", revenueTotal: 640000, revenueAchievement: 96, expenseTotal: 400000, expenseAchievement: 78 },
];

export default function ObjDetail() {
    const searchParams = useSearchParams();
    const pageType = searchParams.get("page"); 
    const router = useRouter();

    const [currentIndex, setCurrentIndex] = useState(0);

    // 현재, 전달, 다음 달 데이터 계산
    const currentData = monthData[currentIndex];
    const previousData = monthData[(currentIndex - 1 + monthData.length) % monthData.length];
    const nextData = monthData[(currentIndex + 1) % monthData.length];

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

    
    const goToPreviousMonth = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : monthData.length - 1));
    };

    const goToNextMonth = () => {
        setCurrentIndex((prevIndex) => (prevIndex < monthData.length - 1 ? prevIndex + 1 : 0));
    };

    // 현재 페이지 타입에 따른 달성률 값 설정
    const currentAchievement = pageType === "revenue" ? currentData.revenueAchievement : currentData.expenseAchievement;
    const previousAchievement = pageType === "revenue" ? previousData.revenueAchievement : previousData.expenseAchievement;
    const nextAchievement = pageType === "revenue" ? nextData.revenueAchievement : nextData.expenseAchievement;

    const currentTotal = pageType === "revenue" ? currentData.revenueTotal : currentData.expenseTotal;
    const previousTotal = pageType === "revenue" ? previousData.revenueTotal : previousData.expenseTotal;
    const nextTotal = pageType === "revenue" ? nextData.revenueTotal : nextData.expenseTotal;

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
                <span className="text-xl font-normal">{currentData.month}</span>
                <button onClick={goToNextMonth} className="text-xl font-bold">{">"}</button>
            </div>


            {/*자세한 목표 설정*/}
            <div className="text-center my-10 text-xl">
                {pageType === "revenue" ? " 매출 상세 목표 " : "지출 상세 목표 "}
            </div>


            {/* 현재 달 정보 */}
            <div className="text-base font-sans mb-2">
                <p className="mb-2">
                    <strong>{currentData.month}</strong> - 총 {currentTotal.toLocaleString()}원
                </p>
                <div className="relative w-full h-8 bg-gray-300 rounded-full overflow-hidden mb-8">
                    <div
                        style={{ width: `${currentAchievement}%` }}
                        className={`h-full ${currentColor} rounded-full flex items-center justify-center text-black text-sm font-extralight`}
                    >
                        {currentAchievement}%
                    </div>
                </div>
            </div>

            {/* 전달 정보 */}
            <div className="text-base font-sans mb-2">
                <p className="mb-2">
                    <strong>{previousData.month}</strong> - 총 {previousTotal.toLocaleString()}원
                </p>
                <div className="relative w-full h-8 bg-gray-300 rounded-full overflow-hidden mb-8">
                    <div
                        style={{ width: `${previousAchievement}%` }}
                        className={`h-full ${previousColor} rounded-full flex items-center justify-center text-black text-sm font-extralight`}
                    >
                        {previousAchievement}%
                    </div>
                </div>
            </div>

            {/* 다음 달 정보 */}
            <div className="text-base font-sans mb-2">
                <p className="mb-2">
                    <strong>{nextData.month}</strong> - 총 {nextTotal.toLocaleString()}원
                </p>
                <div className="relative w-full h-8 bg-gray-300 rounded-full overflow-hidden">
                    <div
                        style={{ width: `${nextAchievement}%` }}
                        className={`h-full ${nextColor} rounded-full flex items-center justify-center text-black text-sm font-extralight`}
                    >
                        {nextAchievement}%
                    </div>
                </div>
            </div>
        </div>
    );
}

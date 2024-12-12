"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useExpenseGoal, useRevenueGoal } from "@/hooks/useGoalQuery";
import { paramMonth2 } from "@/utils/calculateDay";
import Link from "next/link";
import Image from "next/image";
import { convertToKoreanWon } from "@/utils/currency";
dayjs().format();


export default function ObjDetail() {
    const searchParams = useSearchParams();
    const pageType = searchParams.get("page"); 

    const [currentIndex, setCurrentIndex] = useState(new Date().getMonth() + 1);
    const [previousData, setPreviousData] = useState(1);
    const [prepreviousData, setPrepreviousData] = useState(1);
    const [year, setYear] = useState(new Date().getFullYear());


    
    const date = paramMonth2(year, currentIndex);

    const {data: revenue} = useRevenueGoal(date);
    const {data: expense} = useExpenseGoal(date);


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
    ? (revenue?.revenueGoal0Ago === 0 ? 0 : Math.round((revenue?.monthlyRevenue0Ago / revenue?.revenueGoal0Ago) * 100)) 
    : (expense?.expenseGoal0Ago === 0 ? 0 : Math.round((expense?.monthlyExpense0Ago / expense?.expenseGoal0Ago) * 100));
    if (Number.isNaN(currentAchievement) || !isFinite(currentAchievement)) currentAchievement = 0;
    else if (currentAchievement > 100) currentAchievement = 100;

    let previousAchievement = pageType === "revenue"
        ? (revenue?.revenueGoal1Ago === 0 ? 0 : Math.round((revenue?.monthlyRevenue1Ago / revenue?.revenueGoal1Ago) * 100))
        : (expense?.expenseGoal1Ago === 0 ? 0 : Math.round((expense?.monthlyExpense1Ago / expense?.expenseGoal1Ago) * 100));
    if (Number.isNaN(previousAchievement) || !isFinite(previousAchievement)) previousAchievement = 0;
    else if (previousAchievement > 100) previousAchievement = 100;

    let nextAchievement = pageType === "revenue"
        ? (revenue?.revenueGoal2Ago === 0 ? 0 : Math.round((revenue?.monthlyRevenue2Ago / revenue?.revenueGoal2Ago) * 100))
        : (expense?.expenseGoal2Ago === 0 ? 0 : Math.round((expense?.monthlyExpense2Ago / expense?.expenseGoal2Ago) * 100));
    if (Number.isNaN(nextAchievement) || !isFinite(nextAchievement)) nextAchievement = 0;
    else if (nextAchievement > 100) nextAchievement = 100;


    const currentTotal = pageType === "revenue" ? revenue?.monthlyRevenue0Ago : expense?.monthlyExpense0Ago;
    let previousTotal = pageType === "revenue" ? revenue?.monthlyRevenue1Ago : expense?.monthlyExpense1Ago;
    if (previousTotal === null) previousTotal = 0;
    let nextTotal = pageType === "revenue" ? revenue?.monthlyRevenue2Ago : expense?.monthlyExpense2Ago;
    if (nextTotal === null) nextTotal = 0;

    return (
        <div className="container mx-auto p-4 h-full">
            <div className="back">
                <Link href={"/goals"}>
                <Image alt="back" src={'/icons/arrow.png'} width={25} height={25}></Image>
                </Link>
            </div>
            <div className="flex flex-row justify-between items-center mb-6">
                <h1 className="text-xl font-bold">
                    {pageType === "revenue" ? "매출 목표" : "지출 목표"}
                </h1>
                <Link href="/setGoals"><p className="text-sm text-gr">수정하기</p></Link>
            </div>
            

            {/* 월별 정보 */}
            <div className="flex justify-center items-center ">
                <Image alt="back" onClick={goToPreviousMonth} src={'/icons/smallLeft.png'} width={18} height={18}></Image>
                <h1 className="text-xl font-semibold p-3">{currentData}월</h1>
                <Image alt="back" onClick={goToNextMonth} src={'/icons/smallRight.png'} width={18} height={18}></Image>
            </div>

            
            <div className="overflow-y-scroll h-[calc(var(--dynamic-vh)-250px)]">
            {/*자세한 목표 설정*/}
            <div className="text-center my-16 text-xl">
                {pageType === "revenue" ? (
                    <p className="text-gray-600"><span className="text-emerald-500 font-medium">{convertToKoreanWon(revenue?.revenueGoal0Ago)}</span> 중 <br/>
                    <span className="text-black font-medium">{convertToKoreanWon(revenue?.monthlyRevenue0Ago)}</span> 달성
                    </p>
                ) : (
                    <p className="text-gray-600"><span className="text-red-500 font-medium">{convertToKoreanWon(expense?.expenseGoal0Ago)}</span> 중 <br/>
                    <span className="text-black font-medium">{convertToKoreanWon(expense?.monthlyExpense0Ago)}</span> 지출
                    </p>
                )}
            </div>

            <div className="py-20">
            {/* 현재 달 정보 */}
            <div className="text-base font-sans mb-2">
                <p className="mb-2">
                    {currentData}월 <span className=""> - {currentTotal?.toLocaleString() || "0"}원 </span>
                </p>
                <div className="relative w-full h-7 bg-gray-200 rounded-md overflow-hidden mb-8">
                    <div
                        style={{ width: `${currentAchievement}%` }}
                        className={`h-full ${currentColor} rounded-md flex items-center justify-center text-white text-sm font-bold p-3`}
                    >
                        <p>{currentAchievement}%</p>
                    </div>
                </div>
            </div>

            {/* 지난 달 정보 */}
            <div className="text-base font-sans mb-2">
                <p className="mb-2">
                    {previousData}월<span className=""> - {previousTotal?.toLocaleString() || "0"}원 </span>
                </p>
                <div className="relative w-full h-7 bg-gray-200 rounded-md overflow-hidden mb-8">
                    <div
                        style={{ width: `${previousAchievement}%` }}
                        className={`h-full ${previousColor} rounded-md flex items-center justify-center text-white text-sm font-bold p-3`}
                    >
                        <p>{previousAchievement}%</p>
                    </div>
                </div>
            </div>

            {/* 지지난 달 정보 */}
            <div className="text-base font-sans mb-2">
                <p className="mb-2">
                    {prepreviousData}월 <span className=""> - 총 {nextTotal?.toLocaleString() || "0"}원 </span>
                </p>
                <div className="relative w-full h-7 bg-gray-200 rounded-md overflow-hidden mb-8">
                    <div
                        style={{ width: `${nextAchievement}%` }}
                        className={`h-full ${nextColor} rounded-md flex items-center justify-center text-white text-sm font-bold p-3`}
                    >
                        <p>{nextAchievement}%</p>
                    </div>
                </div>
            </div>
            </div>
            </div>

        </div>
    );
}
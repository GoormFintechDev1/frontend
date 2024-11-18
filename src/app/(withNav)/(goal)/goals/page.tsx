"use client";
import Link from "next/link";
import Image from "next/image";
import { PieChart, Pie, Cell, Label } from "recharts";
import dayjs from "dayjs";
import { useExpenseGoal, useRevenueGoal } from "@/hooks/useGoalQuery";
import { paramMonth2 } from "@/utils/calculateDay";
import { useState } from "react";
import { convertToKoreanWon } from "@/utils/currency";
dayjs().format();


const labelStyle = {
    fontSize: "14px",
    fontWeight: "bold",
    fill: "#10B981" 
};

const COLORS = ["#0FA573", "#E2E8F0"];  // 매출 목표 색상

export default function Objective() {
    const [year, setYear] = useState(new Date().getFullYear());
    const [currentIndex, setCurrentIndex] = useState(new Date().getMonth() + 1);

    const date = paramMonth2(year, currentIndex);

    const {data: revenue} = useRevenueGoal(date);
    const {data: expense} = useExpenseGoal(date);

    const revenuePercentage = Math.round((revenue?.monthlyRevenue0Ago / revenue?.revenueGoal0Ago) * 100);
    const revenueData = revenuePercentage >= 100 
    ? [{ name: "Completed", value: 100 }]  // 100% 이상일 때 전체를 Completed 색상으로 채우기
    : [
        { name: "Completed", value: revenuePercentage },
        { name: "Remaining", value: 100 - revenuePercentage }
      ];

    return (
        <div className="container mx-auto p-4">
            <div className="back">
                <Link href={"/"}>
                <Image alt="back" src={'/icons/arrow.png'} width={25} height={25}></Image>
                </Link>
            </div>

            <div className="mb-6">
            <h1 className="text-xl font-semibold ">목표를 관리해보세요 !</h1>
            <h2 className="text-lg font-semibold mt-3"> ⭐ 목표를 달성하고 배지를 모아보세요 ⭐</h2>
                <div className="bg-white rounded-lg shadow-xl p-6 mt-3">
                    <div className="grid grid-cols-6 gap-4">
                        {[...Array(12)].map((_, index) => (
                            <div
                                key={index}
                                className={`w-16 h-16 flex items-center justify-center rounded-full border-2 ${
                                    index === 10 ? "border-amber-300 bg-amber-50 " : "border-gray-100"}`}>
                                {index === 10 && 
                                <Image alt="badge" src={`/icons/medal.png`} width={50} height={50} className="text-4xl"></Image>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-14">
                {/* 매출 목표 */}
                <Link href="/goals/detail?page=revenue">
                    <div className="bg-white rounded-lg shadow-lg p-4 cursor-pointer">
                        <p className="text-lg mb-2">매출 목표</p>
                        <div className="flex items-center">
                            <div className="w-1/2 flex justify-center items-center">
                                <PieChart width={100} height={100}>
                                    <Pie
                                        data={revenueData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={30}
                                        outerRadius={40}
                                        dataKey="value"
                                        startAngle={90}
                                        endAngle={-270}
                                    >
                                        {revenueData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                        <Label
                                            value={`${Math.min(revenuePercentage, 100)}%`} 
                                            position="center"
                                            style={labelStyle}
                                        />
                                    </Pie>
                                </PieChart>
                            </div>
                            <div className="w-1/2 text-center">
                                <span className="text-gray-500 text-lg">목표 금액</span>
                                <p className="text-emerald-500 text-xl font-semibold">{convertToKoreanWon(revenue?.revenueGoal0Ago)} </p>
                            </div>
                        </div>
                    </div>
                    </Link>


                    {/* 지출 목표 */}
                    <Link href="/goals/detail?page=expense">
                        <div className="bg-white rounded-lg shadow-lg p-4 mt-10 cursor-pointer">
                            <p className="text-lg font-medium mb-10">지출 예산</p>
                            <div className="flex items-center mb-4">
                                <div className="w-1/2 flex flex-col justify-center items-center">
                                    <p className="text-gray-600">지출 예산보다</p>
                                    {expense?.monthlyExpense0Ago && expense?.monthlyExpense1Ago ? (
                                        expense.expenseGoal0Ago < expense.monthlyExpense1Ago ? (
                                            <p className="text-red-600 text-lg font-semibold">
                                                {convertToKoreanWon(Math.abs(expense?.expenseGoal0Ago - expense?.monthlyExpense0Ago))} 더 썼어요.
                                            </p>
                                        ) : (
                                            <p className="text-blue-600 text-lg font-semibold">
                                                {convertToKoreanWon(Math.abs(expense?.monthlyExpense0Ago - expense?.expenseGoal0Ago))} 덜 썼어요.
                                            </p>
                                        )
                                    ) : (
                                        <p>데이터가 없습니다.</p>
                                    )}
                                </div>
                                <div className="w-1/2 text-center">
                                    <span className="text-gray-500 text-lg">소비 금액</span>
                                    <p className="text-gray-600 text-xl font-semibold">
                                        {convertToKoreanWon(expense?.monthlyExpense0Ago)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
            </div>
        </div>
    );
}

// function calculateRemainingBudgetPercentage(currentExpense:number, budget:number) {
//     if (budget === 0) return 0; // 예산이 0일 경우 남은 비율 0%로 처리
//     return Math.round((1 - currentExpense / budget) * 100);
// }

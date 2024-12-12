"use client";
import Link from "next/link";
import Image from "next/image";
import { PieChart, Pie, Cell, Label } from "recharts";
import dayjs from "dayjs";
import { useExpenseGoal, useGetBadge, useRevenueGoal } from "@/hooks/useGoalQuery";
import { paramMonth2 } from "@/utils/calculateDay";
import { convertToKoreanWon } from "@/utils/currency";
import { useEffect, useState } from "react";
dayjs().format();


const labelStyle = {
    fontSize: "14px",
    fontWeight: "bold",
    fill: "#10B981" 
};

const COLORS = ["#0FA573", "#E7F3EF"];  // 매출 목표 색상

interface yearGoal {
    goalMonth: number,
    expenseGoal: number,
    realExpense: number,
    realRevenue: number,
    revenueGoal: number,
}

export default function Objective() {
    const year = new Date().getFullYear();
    const currentIndex = new Date().getMonth() + 1;

    const date = paramMonth2(year, currentIndex);

    const {data: revenue} = useRevenueGoal(date);
    const {data: expense} = useExpenseGoal(date);
    const {data: yearGoal} = useGetBadge(year);

    const [height, setHeight] = useState('170px');

    const revenuePercentage = revenue?.revenueGoal0Ago == 0 ? 0: Math.round((revenue?.monthlyRevenue0Ago / revenue?.revenueGoal0Ago) * 100);
    const revenueData = revenuePercentage >= 100 
    ? [{ name: "Completed", value: 100 }]  // 100% 이상일 때 전체를 Completed 색상으로 채우기
    : revenuePercentage == 0 ? [
        { name: "Completed", value: 0 },
        { name: "Remaining", value: 100 }
      ]
    : [
        { name: "Completed", value: revenuePercentage },
        { name: "Remaining", value: 100 - revenuePercentage}
    ];
    

    useEffect(() => {
        const debounce = (func: () => void, delay:number) => {
            let timer:  ReturnType<typeof setTimeout>;
            return () => {
                clearTimeout(timer);
                timer = setTimeout(() => func(), delay);
            };
        };
    
        const calculateHeight = debounce(() => {
            const calculatedHeight = Math.max(170, Math.floor((window.innerHeight - 135 - 250) / 3));
            setHeight(`${calculatedHeight}px`);
        }, 200);
    
        calculateHeight();
        window.addEventListener("resize", calculateHeight);
    
        return () => {
            window.removeEventListener("resize", calculateHeight);
        };
    }, []);


    return (
        <div className="container mx-auto p-4">
            <div className="back">
                <Link href={"/"}>
                <Image alt="back" src={'/icons/arrow.png'} width={25} height={25}></Image>
                </Link>
            </div>

            <div className="mb-6">
            <h1 className="text-xl font-semibold mb-6">목표를 관리해보세요 !</h1>
            <div className="h-[calc(var(--dynamic-vh)-210px)] overflow-y-scroll">
            <h2 className="text-base font-semibold"> 목표를 달성하고 배지를 모아보세요.</h2>
                <div className="bg-white rounded-2xl border p-2 mt-3 flex items-center justify-center" style={{height}}>
                    <div className="grid grid-cols-6 gap-2 justify-items-center content-center w-full">
                        {yearGoal?.map((goal:yearGoal, index:number) => {
                            const revenueGoal = goal.realRevenue !== 0 && goal.realRevenue - goal.revenueGoal >= 0;
                            const expenseGoal = goal.realExpense !== 0 && goal.expenseGoal - goal.realExpense >= 0;

                            return (
                            <div
                                key={index}
                                className={`w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center rounded-full border-2 ${
                                    revenueGoal && expenseGoal && index +1 < currentIndex ? "border-amber-300 bg-amber-50 " : index + 1 < currentIndex ? "bg-gray-100 border-gray-100" : index +1 === currentIndex ? "border-emerald-100": "border-gray-100"}`} >
                                {revenueGoal && expenseGoal && index +1 < currentIndex &&
                                <Image alt="badge" src={`/icons/medal.png`} width={50} height={50} className="text-4xl"></Image>}
                            </div>
                        )})}
                    </div>
                </div>


                <div className="mt-6">
                    {/* 매출 목표 */}
                    <Link href="/goals/detail?page=revenue">
                        <div className="bg-white rounded-2xl border p-4 cursor-pointer mt-10" style={{height}}>
                            <p className="text-md mb-2">매출 목표</p>
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
                                    <p className="text-emerald-500 text-xl font-semibold">{convertToKoreanWon(revenue?.revenueGoal0Ago ?? 0)} </p>
                                </div>
                            </div>
                        </div>
                        </Link>


                        {/* 지출 목표 */}
                        <Link href="/goals/detail?page=expense">
                            <div className="bg-white rounded-2xl border p-4 mt-10 cursor-pointer" style={{height}}>
                                <p className="text-md font-medium mb-10">지출 예산</p>
                                <div className="flex items-center mb-4">
                                <div className="w-1/2 flex flex-col justify-center items-center">
                                    <p className="text-gray-600">지출 예산보다</p>
                                        {expense?.monthlyExpense0Ago  && expense?.expenseGoal0Ago != 0  ? (
                                            expense.expenseGoal0Ago < expense.monthlyExpense1Ago ? (
                                                <p className="text-red-600 text-lg font-semibold">
                                                    {convertToKoreanWon(Math.abs(expense?.expenseGoal0Ago - expense?.monthlyExpense0Ago) ?? 0)} 더 썼어요.
                                                </p>
                                            ) : (
                                                <p className="text-blue-600 text-lg font-semibold">
                                                    {convertToKoreanWon(Math.abs(expense?.monthlyExpense0Ago - expense?.expenseGoal0Ago) ?? 0)} 덜 썼어요.
                                                </p>
                                            )
                                        ) : (
                                            <p>-</p>
                                        )}
                                    </div>
                                    <div className="w-1/2 text-center">
                                        {/* <span className="text-gray-500 text-lg">소비 금액</span>
                                        <p className="text-gray-600 text-xl font-semibold">
                                            {convertToKoreanWon(expense?.monthlyExpense0Ago)}
                                        </p> */}
                                        <span className="text-gray-500 text-lg">예산</span>
                                        <p className="text-gray-600 text-xl font-semibold">
                                            {convertToKoreanWon(expense?.expenseGoal0Ago)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                </div>
            </div>
        </div>
        </div>
    );
}

// function calculateRemainingBudgetPercentage(currentExpense:number, budget:number) {
//     if (budget === 0) return 0; // 예산이 0일 경우 남은 비율 0%로 처리
//     return Math.round((1 - currentExpense / budget) * 100);
// }

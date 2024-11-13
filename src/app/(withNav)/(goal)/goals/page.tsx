"use client";
import Link from "next/link";
import { PieChart, Pie, Cell, Label } from "recharts";
import dayjs from "dayjs";
import { useExpenseGoal, useRevenueGoal } from "@/hooks/useGoalQuery";
import { paramMonth2 } from "@/utils/calculateDay";
import { useState } from "react";
dayjs().format();


const labelStyle = {
    fontSize: "14px",
    fontWeight: "bold",
    fill: "#10B981" 
};

const COLORS = ["#0FA573", "#E2E8F0"];  // 매출 목표 색상
const EXPENSE_COLORS = ["#FB7185", "#E2E8F0"];   // 지출 목표 색상

export default function Objective() {
    const [year, setYear] = useState(new Date().getFullYear());
    const [currentIndex, setCurrentIndex] = useState(new Date().getMonth() + 1);

    const date = paramMonth2(year, currentIndex);

    const {data: revenue} = useRevenueGoal(date);
    console.log(revenue);

    const {data: expense} = useExpenseGoal(date);
    console.log(expense);

    const revenuePercentage = Math.round((revenue?.monthlyRevenue0Ago / revenue?.revenueGoal0Ago) * 100);
    const revenueData = revenuePercentage >= 100 
    ? [{ name: "Completed", value: 100 }]  // 100% 이상일 때 전체를 Completed 색상으로 채우기
    : [
        { name: "Completed", value: revenuePercentage },
        { name: "Remaining", value: 100 - revenuePercentage }
      ];

    const expensePercentage = Math.round((expense?.monthlyExpense0Ago / expense?.expenseGoal0Ago) * 100);
    const expenseData = expensePercentage >= 100
    ? [{name: "Completed", value: 100}]
    : [
        { name: "Completed", value: expensePercentage },
        { name: "Remaining", value: 100 - expensePercentage }
    ];

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center mb-4">
                <button className="mr-2 text-gray-600 text-lg">{"<"}</button>
            </div>
            <div className="mb-8">
                <h1 className="text-xl font-extralight text-center">목표를 관리해보세요!</h1>
            </div>

                {/* 매출 목표 */}
            <Link href="/goals/detail?page=revenue">
                <div className="bg-white rounded-lg shadow p-4 mb-4 cursor-pointer">
                    <h2 className="text-lg font-bold mb-2">매출 목표</h2>
                    <div className="flex items-center">
                        <div className="w-1/2 flex justify-center items-center">
                            <PieChart width={95} height={100}>
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
                                        value={`${revenuePercentage}%`}
                                        position="center"
                                        style={labelStyle}
                                    />
                                </Pie>
                            </PieChart>
                        </div>
                        <div className="w-1/2 text-right">
                            <span className="text-gray-500 text-lg">목표</span>
                            <p className="text-emerald-500 text-xl font-semibold">{revenue.revenueGoal0Ago}원 </p>
                        </div>
                    </div>
                </div>
                </Link>


                {/* 지출 목표 */}
                <Link href="/goals/detail?page=expense">
                <div className="bg-white rounded-lg shadow p-4 mt-10 cursor-pointer">
                    <h2 className="text-lg font-bold mb-2">지출 목표</h2>
                    <div className="flex items-center">
                        <div className="w-1/2 flex justify-center items-center">
                            <PieChart width={95} height={100}>
                                <Pie
                                    data={expenseData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={30}
                                    outerRadius={40}
                                    dataKey="value"
                                    startAngle={90}
                                    endAngle={-270}
                                >
                                    {expenseData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]} />
                                    ))}
                                    <Label
                                value={`${expensePercentage}%`}  
                                position="center"
                                style={{ ...labelStyle, fill: "#FB7185"}}
                            />
                                </Pie>
                            </PieChart>
                        </div>
                        <div className="w-1/2 text-right">
                        <span className="text-gray-500 text-lg">예산</span>
                            <p className="text-rose-400 text-xl font-semibold">{expense.monthlyExpense0Ago}원 </p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

"use client";
import Link from "next/link";
import { PieChart, Pie, Cell, Label } from "recharts";
import Image from "next/image";
import { useExpenseGoal, useRevenueGoal } from "@/hooks/useGoalQuery";
import dayjs from "dayjs";
import { paramMonth } from "@/utils/calculateDay";
dayjs().format();

const data = [
    { name: "Completed", value: 65 },
    { name: "Remaining", value: 35 },
];

// const dataExpense = [
//     { name: "Completed", value: 60 },
//     { name: "Remaining", value: 40 },
// ];

const labelStyle = {
    fontSize: "14px",
    fontWeight: "bold",
    fill: "#10B981" 
};

const COLORS = ["#0FA573", "#E2E8F0"];  // 매출 목표 색상
const EXPENSE_COLORS = ["#FB7185", "#E2E8F0"];   // 지출 목표 색상

export default function Objective() {

    const {data:expense} = useExpenseGoal(paramMonth); 
    const {data:revenue} = useRevenueGoal(paramMonth); 

    const expenseRate = calculateRemainingBudgetPercentage(expense?.monthlyExpense0Ago, expense?.expenseGoal0Ago);

    const dataExpense = [
        {name: "Completed", value: expenseRate},
        {name: "Remaining", value: 100-expenseRate},

    ];

    return (
        <div className="container mx-auto p-4">
            <div className="back">
                <Link href={"/"}>
                <Image alt="back" src={'/icons/arrow.png'} width={25} height={25}></Image>
                </Link>
            </div>
            <div className="mb-8">
                <h1 className="text-xl font-semibold">목표를 관리해보세요!</h1>
            </div>

            {/* 매출 목표 */}
            <Link href="/goals/detail?page=revenue">
                <div className="bg-white rounded-lg shadow p-4 mb-4 cursor-pointer">
                    <p className="text-base font-medium mb-2">매출 목표</p>
                    <div className="flex items-center">
                        <div className="w-1/2 flex justify-center items-center">
                            <PieChart width={95} height={100}>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={30}
                                    outerRadius={40}
                                    dataKey="value"
                                    startAngle={90}
                                    endAngle={-270}
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                    <Label
                                        value={`${data[0].value}%`}  
                                        position="center"
                                        style={labelStyle}
                                    />
                                </Pie>
                            </PieChart>
                        </div>
                        <div className="w-1/2 text-center">
                            <span className="text-gray-500 text-lg">목표</span>
                            <p className="text-emerald-500 text-xl font-semibold">200만원</p>
                        </div>
                    </div>
                </div>
                </Link>                        
                {/* 지출 목표 */}
                <Link href="/goals/detail?page=expense">
                <div className="bg-white rounded-lg shadow p-4 mt-10 cursor-pointer">
                    <p className="text-base font-medium mb-2">지출 목표</p>
                    <div className="flex items-center">
                        <div className="w-1/2 flex justify-center items-center">
                            <PieChart width={95} height={100}>
                                <Pie
                                    data={dataExpense}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={30}
                                    outerRadius={40}
                                    dataKey="value"
                                    startAngle={90}
                                    endAngle={-270}
                                >
                                    {dataExpense.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]} />
                                    ))}
                                    <Label
                                value={`${dataExpense[0].value}%`}  
                                position="center"
                                style={{ ...labelStyle, fill: "#FB7185"}}
                            />
                                </Pie>
                            </PieChart>
                        </div>
                        <div className="w-1/2 text-center">
                        <span className="text-gray-500 text-lg">예산</span>
                            <p className="text-rose-400 text-xl font-semibold">50만원</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

function calculateRemainingBudgetPercentage(currentExpense:number, budget:number) {
    if (budget === 0) return 0; // 예산이 0일 경우 남은 비율 0%로 처리
    return Math.round((1 - currentExpense / budget) * 100);
}

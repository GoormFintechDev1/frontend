"use client";
import { PieChart, Pie, Cell, Label } from "recharts";
import Image from "next/image";
import Link from "next/link";

const data = [
    { name: "Completed", value: 65 },
    { name: "Remaining", value: 35 },
];

const dataExpense = [
    { name: "Completed", value: 60 },
    { name: "Remaining", value: 40 },
];

const labelStyle = {
    fontSize: "14px",
    fontWeight: "bold",
    fill: "#10B981" 
};

const COLORS = ["#0FA573", "#E2E8F0"];  // 매출 목표 색상
const EXPENSE_COLORS = ["#FB7185", "#E2E8F0"]

export default function Objective() {
    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center mb-4">
                <button className="mr-2 text-gray-600 text-lg">{"<"}</button>
            </div>
            <div className="mb-8">
                <h1 className="text-xl font-extralight text-center">목표를 관리해보세요!</h1>
            </div>

                {/* 매출 목표 */}
                {/* 매출 목표 */}
            <Link href="/goals/detail?page=revenue">
                <div className="bg-white rounded-lg shadow p-4 mb-4 cursor-pointer">
                    <h2 className="text-lg font-bold mb-2">매출 목표</h2>
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
                        <div className="w-1/2 text-right">
                            <span className="text-gray-500 text-lg">목표</span>
                            <p className="text-emerald-500 text-xl font-semibold">200만원</p>
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
                        <div className="w-1/2 text-right">
                        <span className="text-gray-500 text-lg">예산</span>
                            <p className="text-rose-400 text-xl font-semibold">50만원</p>
                        </div>
                    </div>
                </div>
            </Link>

        </div>
    );
}

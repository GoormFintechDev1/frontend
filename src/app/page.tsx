"use client";

import Navbar from "@/components/Navbar";
import convertToKoreanWon from "@/utils/currency";
// import Card from "@/components/Card";
// import Navbar from "@/components/Navbar";
// import { usePostsQuery } from "@/hooks/usePostsQuery";
// import { usePostsStore } from "@/stores/usePostsStore";
import { Bar, BarChart, Cell, LabelList, Pie, PieChart, ResponsiveContainer } from "recharts";

export default function Home() {
  const salesData = [
    { name: '9월', value: 5000, fill: "#E5E7EB" },
    { name: '10월', value: 20000, fill: "#E5E7EB" },
    { name: '11월', value: 15000, fill: "#6EE7B7" },
  ];

  const expensesData = [
    { name: '공과금', value: 150000 },
    { name: '인건비', value: 100000 },
    { name: '재료비', value: 50000 },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">가게 이름</h1>
        <button
          className="bg-theme w-[70px] h-[40px] text-sm text-white px-1 py-[5px] rounded"
        >목표설정</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* 이번 달 매출 */}
        <div className="flex flex-col justify-between bg-white py-3 px-2 rounded-2xl shadow">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold">이번 달 매출</h2>
            <span className="text-gray-500">
              <a href="">&#62;</a>
            </span>
          </div>
          <ResponsiveContainer width={"100%"} height={100}>
            <BarChart data={salesData}>
              {/* <XAxis dataKey="name" /> */}
              {/* <YAxis /> */}
              {/* <Bar dataKey="value" fill="#8884d8" /> */}
              <Bar dataKey="value" radius={7}>
                {salesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                <LabelList
                  dataKey="name" position="insideTop" fill="#fff"
                  offset={8}
                  fontSize={10}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-center text-theme font-bold">{convertToKoreanWon(salesData[2].value)}</p>
        </div>

        {/* 지난 달 순이익 */}
        <div className="flex flex-col bg-white py-3 px-2 rounded-2xl shadow">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold">지난 달 순이익</h2>
            <span className="text-gray-500">
              <a href="">&#62;</a>
            </span>
          </div>
          <div className="flex flex-col h-full justify-center items-center">
            <p className="text-blue-600 text-base font-bold">{convertToKoreanWon(2500000)}</p>
          </div>
        </div>

        {/* 이번 달 지출 */}
        <div className="col-span-2 flex flex-col justify-between bg-white py-3 px-2 rounded-2xl shadow">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold">이번 달 지출</h2>
            <span className="text-gray-500">
              <a href="">&#62;</a>
            </span>
          </div>
          <div className="flex justify-around">
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie data={expensesData} dataKey="value" outerRadius={40} innerRadius={20}>
                  <Cell fill="#ff6384"  />
                  <Cell fill="#ffa384"  />
                  <Cell fill="#ffe384"  />
                  {/* <Cell fill="#e5e5e5" /> */}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col justify-center">
              <p className="text-base text-center text-red-500 font-bold">{convertToKoreanWon(150000)}</p>
              <p className="text-[10px] text-center text-gray-500">오늘은 <span>{convertToKoreanWon(20000)}</span> 지출했어요!</p>
            </div>
          </div>
        </div>

        {/* 이번 달 목표 */}
        <div className="col-span-2 flex flex-col justify-between bg-white py-3 px-2 rounded-2xl shadow">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold">이번 달 목표</h2>
            <span className="text-gray-500">
              <a href="">&#62;</a>
            </span>
          </div>
          <div className="flex justify-around w-full mt-2">
            <div>
              <p className="text-pink-500 font-bold">매출</p>
              <p>70%</p>
            </div>
            <div>
              <p className="text-pink-500 font-bold">지출</p>
              <p>{convertToKoreanWon(10000)} 남았어요</p>
            </div>
          </div>
        </div>
      </div>

      <Navbar />
    </>
  );
}

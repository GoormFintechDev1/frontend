"use client";

import { useExpensesData } from '@/hooks/useReportQuery';
import convertToKoreanWon from '@/utils/currency';
import Link from 'next/link';
import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import {ExpensesLoading} from '../Loading';
import Error from '../Error';

const Expenses = () => {
  const {data: expensesData, isLoading, error} = useExpensesData();

  let chartData = [{
    name: "",
    value: 0,
  }];
  if (expensesData) {
    chartData = Object.entries(expensesData?.categoryExpenses).map(
      ([key, value]) => {
        return { name: key, value: value };
      }
    );
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  if (isLoading) {
    return <ExpensesLoading />
  }

  if (error) {
    return <Error />
  }

  return (
    <div className="box col-span-2 flex flex-col justify-between bg-white py-3 px-2 rounded-2xl shadow h-56">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold">이번 달 지출</h2>
        <span>
          <Link href="/expenses">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
        </span>
      </div>
      <div className="flex justify-center items-center gap-8 h-full">
        <ResponsiveContainer width={120} height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={40}
              innerRadius={20}
              startAngle={270}
              endAngle={630}
            >
              {
                chartData?.map((entry, index) => (
                  <Cell key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))
              }
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col justify-center">
          <p className="text-base text-center text-red-500 font-bold">
            {convertToKoreanWon(150000)}
          </p>
          <p className="text-[10px] text-center text-gray-500">
            오늘은 <span>{convertToKoreanWon(20000)}</span> 지출했어요!
          </p>
          <ul>
            {chartData?.map((data, index) => (
              <li key={index} className="flex justify-center items-center">
                <div className={`inline-block w-3 h-3 mr-2`}
                  style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                {data.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Expenses
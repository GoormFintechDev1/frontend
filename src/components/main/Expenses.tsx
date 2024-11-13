"use client";

import { useExpensesData } from '@/hooks/useExpensesQuery';
import { convertToKoreanWon } from '@/utils/currency';
import Link from 'next/link';
import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import {ExpensesLoading} from '../Loading';
import Error from '../Error';
import { paramMonth } from '@/utils/calculateDay';
import useExpensesStore from '@/stores/useExpensesStore';

interface RevenueProps {
  height: string;
}

const Expenses: React.FC<RevenueProps> = ({height}) => {
  const { isLoading, error } = useExpensesData(paramMonth);

  // Access Zustand store states
  const expensesData = useExpensesStore((state) => state.expensesData);

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

  const COLORS = ["#A80000", "#F30000", "#FF9F9F", "#B6B6B6"];

  if (isLoading) {
    return <ExpensesLoading />
  }

  if (error) {
    return <Error />
  }

  const maxValue = Math.max(...chartData.map((entry) => entry.value));
  const maxCategory = chartData.find((e)=> e.value === maxValue)?.name;

  const highlightedData = chartData.filter((entry) => entry.value === maxValue);

  return (
    <div className="box col-span-2 justify-between" style={{ height }}>
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
              className="size-6 text-gray-400"
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
        <ResponsiveContainer width={'50%'} height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={40}
              innerRadius={20}
              startAngle={90}
              endAngle={-270}
            >
              {
                chartData?.map((entry, index) => (
                  <Cell key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#ffffff" // White stroke to separate segments
                    strokeWidth={entry.value === maxValue ? 2 : 6}
                  />
                ))
              }
            </Pie>
          </PieChart>
          {/* <ul className='flex flex-row space-x-3 mt-4 '>
            {expensesData?.map((data, index) => (
              <li key={index} className="flex justify-center items-center text-[10px] ">
                <div className={`inline-block w-3 h-3 mr-2`}
                  style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                {data.name}
              </li>
            ))}
          </ul> */}
        </ResponsiveContainer>
        <div className="flex flex-col justify-center space-y-4 w-[70%]">
          <p className="text-base text-center text-red-500 font-bold">
            {convertToKoreanWon(expensesData?.totalMonthExpenses as number)}
          </p>
          <p className='text-xs text-center'>가장 큰 지출은 <span className='text-red-500 font-bold'>{maxCategory}</span>예요.</p>
          <p className="text-[10px] text-center text-gray-500">
            오늘은 <span className='text-red-400 font-bold'>{convertToKoreanWon(expensesData?.totalTodayExpense as number)}</span> 지출했어요!
          </p>
          
        </div>
      </div>
    </div>
  )
}

export default Expenses
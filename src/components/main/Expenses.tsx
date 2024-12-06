"use client";

import { useExpensesData } from '@/hooks/useExpensesQuery';
import { convertToKoreanWon } from '@/utils/currency';
import Link from 'next/link';
import React, { useEffect, useMemo } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import Error from '../Error';
import { paramMonth } from '@/utils/calculateDay';
import { useExpensesStore, useCategoryColorStore } from '@/stores/useExpensesStore';
import { ExpensesLoading } from './Loading';

interface RevenueProps {
  height: string;
}

const COLORS = ["#BE185D", "#F472B6", "#F9A8D4", "#FFD2EB", "#F8F8F8"];

const Expenses: React.FC<RevenueProps> = ({height}) => {
  const { isLoading, error } = useExpensesData(paramMonth);
  const setCategoryColorMap = useCategoryColorStore((state) => state.setCategoryColorMap);

  // Access Zustand store states
  const expensesData = useExpensesStore((state) => state.expensesData);

  // chartData를 메모이제이션하여 불필요한 재생성을 방지
  const chartData = useMemo(() => {
    if (!expensesData) return [];

    return Object.entries(expensesData?.categoryExpenses)
      .map(([key, value]) => ({ category: key, amount: value }))
      .sort((a, b) => b.amount - a.amount);
  }, [expensesData]);

  // categoryColorMap을 chartData 기반으로 메모이제이션
  const categoryColorMap = useMemo(() => {
    const map: Record<string, string> = {};
    let colorIndex = 0;
    chartData.forEach((expense) => {
      if (!map[expense.category]) {
        map[expense.category] = COLORS[colorIndex % COLORS.length];
        colorIndex += 1;
      }
    });
    return map;
  }, [chartData]);

  useEffect(() => {
    if (chartData.length > 0) {
      setCategoryColorMap(categoryColorMap);
    }
  }, [categoryColorMap, chartData, setCategoryColorMap]);

  if (isLoading) {
    return <ExpensesLoading />
  }

  if (error) {
    return <Error />
  }

  const maxValue = Math.max(...chartData.map((entry) => entry.amount));
  const maxCategory = chartData.find((e)=> e.amount === maxValue)?.category;

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
        <ResponsiveContainer width={'60%'} height="80%">
          <PieChart>
            <Pie
              data={chartData.length > 0 ? chartData : [{ name: "No Data", amount: 1 }]}
              dataKey="amount"
              outerRadius={40}
              innerRadius={20}
              startAngle={90}
              endAngle={-270}
            >
              { chartData.length > 0 ? (
                chartData?.map((entry, index) => 
                  <Cell key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                )) : (<Cell fill="#FFF4F8" />)
              }
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col justify-center space-y-4 w-[70%]">
          <p className="text-base text-center text-pink-600 font-bold">
            {convertToKoreanWon(expensesData?.totalMonthExpenses as number)}
          </p>
          {maxCategory? <p className='text-xs text-center'>가장 큰 지출은 <span className='text-pink-600 font-bold'>{maxCategory}</span>예요.</p> : 
          ""}
          <p className="text-[10px] text-center text-gray-500">
            오늘은 <span className='text-pink-600 font-bold'>{convertToKoreanWon(expensesData?.totalTodayExpense as number)}</span> 지출했어요!
          </p>
        </div>
      </div>
      {/* <div className='flex justify-center items-center'>
        <ul className='flex gap-x-2'>
          {chartData?.map((data, index) => (
            <li key={index} className="flex items-center text-[10px] ">
              <div className={`inline-block w-2 h-2 mr-1`}
                style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
              <p>{data.category}</p>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  )
}

export default Expenses
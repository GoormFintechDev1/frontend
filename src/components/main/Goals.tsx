import { useExpenseGoal, useRevenueGoal } from '@/hooks/useGoalQuery';
import { convertToKoreanWon } from '@/utils/currency'
import Link from 'next/link'
import React from 'react'

import dayjs from "dayjs";
import { paramMonth } from '@/utils/calculateDay';
dayjs().format();

interface RevenueProps {
  height: string;
}

const Goals: React.FC<RevenueProps> = ({height}) =>  {

  const {data: revenue} = useRevenueGoal(paramMonth);

  const {data: expense} = useExpenseGoal(paramMonth);

  return (
    <div className="box col-span-2 justify-between" style={{height}}>
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold">이번 달 목표</h2>
        <span>
          <Link href="/goals">
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
      <div className="flex justify-around w-full h-full">
        <div className="flex flex-col justify-center">
          <p className="text-pink-500 font-bold">매출</p>
          <p>{Math.round(revenue?.monthlyRevenue0Ago / revenue?.revenueGoal0Ago)}%</p>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-center text-pink-500 font-bold">지출</p>
          <p>{convertToKoreanWon(expense?.monthlyExpense0Ago)} 남았어요</p>
        </div>
      </div>
    </div>
  )
}

export default Goals
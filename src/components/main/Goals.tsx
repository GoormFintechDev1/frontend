import { useExpenseGoal, useRevenueGoal } from '@/hooks/useGoalQuery';
import { convertToKoreanWon } from '@/utils/currency'
import Link from 'next/link'
import React from 'react'

import dayjs from "dayjs";
import { paramMonth } from '@/utils/calculateDay';
import { GoalLoading } from './Loading';
dayjs().format();

interface RevenueProps {
  height: string;
}

const Goals: React.FC<RevenueProps> = ({height}) =>  {

  const {data: revenue, isLoading} = useRevenueGoal(paramMonth);
  const {data: expense,} = useExpenseGoal(paramMonth);

  if(isLoading){
    return <GoalLoading/>
  }

  let revenuePercentage = Math.round((revenue?.monthlyRevenue0Ago / revenue?.revenueGoal0Ago)*100);
  if (Number.isNaN(revenuePercentage) || !isFinite(revenuePercentage)) revenuePercentage = 0;
  else if(revenuePercentage > 100) revenuePercentage = 100;
  let expenseMoney = expense?.expenseGoal0Ago - expense?.monthlyExpense0Ago;
  if(!expenseMoney || expenseMoney < 0) expenseMoney = 0;

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
        <div className="flex flex-col justify-center space-y-3">
          <p className= "text-center text-sm">매출 목표를</p>
          <div className='flex flex-row space-x-2'>
            <p className='text-rose-800 font-bold'>{revenuePercentage}% </p>
            <p>달성했어요.</p>
          </div>
        </div>
        <div className='h-1/2 self-center border' style={{borderColor: "#f9f9f9"}}></div>
        <div className="flex flex-col justify-center space-y-3">
          <p className="text-center text-sm">지출 예산이</p>
          <div className='flex flex-row space-x-2'>
            <p className='text-rose-800 font-bold'>{convertToKoreanWon(expenseMoney)}</p>
            <p>남았어요.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Goals
import convertToKoreanWon from '@/utils/currency'
import Link from 'next/link'
import React from 'react'

const Goals = () => {
  return (
    <div className="col-span-2 flex flex-col justify-between bg-white py-3 px-2 rounded-2xl shadow h-56">
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
      <div className="flex justify-around w-full h-full">
        <div className="flex flex-col justify-center">
          <p className="text-pink-500 font-bold">매출</p>
          <p>70%</p>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-center text-pink-500 font-bold">지출</p>
          <p>{convertToKoreanWon(10000)} 남았어요</p>
        </div>
      </div>
    </div>
  )
}

export default Goals
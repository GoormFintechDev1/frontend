"use client";

import { useState } from "react";
import Image from "next/image";
import { useMonthlyRevenue } from "@/hooks/useRevenueQuery";
import Link from "next/link";
import { paramMonth2 } from "@/utils/calculateDay";
import Calendar from "@/components/Calendar";
import { DayIncome } from "@/interface/revenue";

interface IncomeData {
  totalIncome: number;
  cardIncome: number;
  cashIncome: number;
}

export default function Revenue() {

  const [date, setDate] = useState<Date | null>(new Date());
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSalesData, setSelectedSalesData] = useState<IncomeData>({
    totalIncome: 0,
    cardIncome: 0,
    cashIncome: 0,
  });

  const { data, isLoading } = useMonthlyRevenue(paramMonth2(year,month));

  const saleData = data?.dailyIncomeList ?? [];
  const monthlyTotalIncome = data?.monthlyTotalncome;
  const monthlyCardIncome = data?.monthlyCardIncome;
  const monthlyCashIncome = data?.monthlyCashIncome;

  const handleDateClick = (date:number) => {
    const temp = new Date(year, month - 1, date+1); 
    const formattedDate = temp.toISOString().split("T")[0];
    const sales = saleData.filter((d:DayIncome) => d.date === formattedDate)
    .reduce((acc:IncomeData, cur:IncomeData)=>{
      acc.totalIncome += cur.totalIncome;
      acc.cardIncome += cur.cardIncome;
      acc.cashIncome += cur.cashIncome;
      return acc
    },{totalIncome: 0,cardIncome: 0,cashIncome: 0,});

    setSelectedSalesData(sales);
    setDate(new Date(year, month -1, date));
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const goToPrevMonth = () => {
    setMonth((prevMonth) => {
      if (prevMonth === 1) {
        setYear((prevYear) => prevYear - 1);
        return 12;
      }
      return prevMonth - 1;
    });
  };
  
  const goToNextMonth = () => {
    setMonth((prevMonth) => {
      if (prevMonth === 12) {
        setYear((prevYear) => prevYear + 1);
        return 1;
      }
      return prevMonth + 1;
    });
  };

  return (
    <div className='container p-3'>
    <div className="flex flex-col">
      <div className="back">
        <Link href={"/"}>
          <Image alt="back" src={'/icons/arrow.png'} width={25} height={25}></Image>
        </Link>
      </div>
      <div className='flex flex-row items-center' >
        <div onClick={goToPrevMonth}><Image src={'/icons/smallLeft.png'} alt={'left'} width={18} height={18}></Image></div>
        <h1 className="text-xl font-semibold px-3">
          {month}월 매출
        </h1>
        <div onClick={goToNextMonth}><Image src={'/icons/smallRight.png'} alt={'right'} width={18} height={18}></Image></div>
      </div>

        {/* Sales Summary */}
        <section className="px-2 py-9">
          <div className="space-y-2 text-sm font-medium">
            <div className="flex flex-row space-x-3 font-semibold">
              <p>총 매출</p>
              <span className="text-blue-500">
                {isLoading ? "0" : monthlyTotalIncome?.toLocaleString()} 원
              </span>
            </div>
            <div className="text-xs text-gray-600 flex flex-row space-x-3">
              <p>카드 매출</p>
              <span>{isLoading ? "0" : monthlyCardIncome?.toLocaleString()} 원</span>
            </div>
            <div className="text-xs text-gray-600 flex flex-row space-x-3">
              <p>현금 매출</p>
              <span>{isLoading ? "0" : monthlyCashIncome?.toLocaleString()} 원</span>
            </div>
          </div>
        </section>

        {/* Calendar */}
        {date && (
          <div className="border-t-2 pt-6" style={{borderColor: "#F5F5F5"}} >
            <Calendar year={year} month={month} data={saleData} onDateClick={handleDateClick}/>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-30 z-10"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-t-3xl w-full max-w-lg p-6 text-center relative slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="text-gray-700 font-bold text-2xl absolute top-2 right-4"
              >
                &times;
              </button>
              <div className="w-3/4 mx-auto pb-2 mb-2">
                <h2 className="text-lg font-semibold mb-3">
                  {date?.toLocaleDateString("ko-KR", {
                    month: "long",
                    day: "numeric",
                    weekday: "long",
                  })}
                </h2>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="text-base flex items-center space-x-8">
                  <span className="">카드 매출</span>
                  <span className="mx-2">
                    {selectedSalesData?.cardIncome.toLocaleString()} 원
                  </span>
                </div>
                <div className="text-base flex items-center space-x-8">
                  <span className="font-medium">현금 매출</span>
                  <span className="mx-2">
                    {selectedSalesData?.cashIncome.toLocaleString()} 원
                  </span>
                </div>
                <div className="text-lg font-semibold border-t w-full mx-auto p-4 text-center space-x-8" style={{borderColor:"#f5f5f5"}}>
                  <span>총 매출</span>
                  <span className="text-blue-500 mx-2">
                    {selectedSalesData?.totalIncome.toLocaleString()} 원
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

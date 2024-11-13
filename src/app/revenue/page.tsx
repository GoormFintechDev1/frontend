"use client";

import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useMonthlyRevenue } from "@/hooks/useRevenueQuery";
import Link from "next/link";

interface DayIncome {
  date: string;
  totalIncome: number;
  cardIncome: number;
  cashIncome: number;
}

export default function Revenue() {
  const [isClient, setIsClient] = useState(false); // 클라이언트에서만 렌더링
  const [date, setDate] = useState<Date | null>(null);
  const [activeStartDate, setActiveStartDate] = useState<Date | null>(null);
  // const [monthlySalesData, setMonthlySalesData] = useState({ total: 0, card: 0, cash: 0 });
  const [selectedSalesData, setSelectedSalesData] = useState({
    totalIncome: 0,
    cardIncome: 0,
    cashIncome: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hydration Error
  useEffect(() => {
    // 클라이언트가 렌더링된 후에 상태를 초기화
    setDate(new Date());
    setActiveStartDate(new Date());
    setIsClient(true);
  }, []);

  // 예시 매출 데이터
  // const salesData = {
  //   '2024-11-01': { total: 10000, card: 7000, cash: 3000 },
  //   '2024-11-02': { total: 20000, card: 12000, cash: 8000 },
  //   '2024-11-03': { total: 43000, card: 33000, cash: 10000 },
  //   '2024-11-04': { total: 25000, card: 15000, cash: 10000 },
  //   '2024-11-05': { total: 60000, card: 40000, cash: 20000 },
  // };

  // useEffect(() => {
  //   if (activeStartDate) {
  //     const year = activeStartDate.getFullYear();
  //     const month = activeStartDate.getMonth() + 1;

  //     let total = 0;
  //     let card = 0;
  //     let cash = 0;

  //     Object.keys(salesData).forEach((date) => {
  //       const [dataYear, dataMonth] = date.split('-').map(Number);

  //       if (dataYear === year && dataMonth === month) {
  //         total += salesData[date].total;
  //         card += salesData[date].card;
  //         cash += salesData[date].cash;
  //       }
  //     });

  //     setMonthlySalesData({ total, card, cash });
  //   }
  // }, [activeStartDate]);

  const handleDateClick = (clickedDate: Date) => {
    const temp = new Date(clickedDate); //포맷팅하면 날짜가 하루 늦게 찍혀서...
    temp.setDate(temp.getDate() + 1);
    const formattedDate = temp.toISOString().split("T")[0];
    const sales = saleData.find((d) => d.date === formattedDate) || {
      totalIncome: 0,
      cardIncome: 0,
      cashIncome: 0,
    };
    setSelectedSalesData(sales);
    setDate(clickedDate);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleMonthChange = ({
    activeStartDate,
  }: {
    activeStartDate: Date;
  }) => {
    setActiveStartDate(activeStartDate);
  };

  //data fetching
  const year = activeStartDate
    ? activeStartDate.getFullYear()
    : new Date().getFullYear();
  const month = activeStartDate
    ? activeStartDate.getMonth() + 1
    : new Date().getMonth() + 1;

  const { data, isLoading, error } = useMonthlyRevenue(year, month);
  const saleData = data?.dailyIncomeList;
  const monthlyTotalIncome = data?.monthlyTotalncome;
  const monthlyCardIncome = data?.monthlyCardIncome;
  const monthlyCashIncome = data?.monthlyCashIncome;

  // 클라이언트에서 렌더링이 완료되기 전까지는 렌더링하지 않음
  if (!isClient) return null;

  return (
    <div className='container p-3'>
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <Link href={"/"}>
          <Image alt="back" src={'/icons/arrow.png'} width={25} height={25}></Image>
        </Link>
      </div>
      <div className='flex flex-row items-center' >
        <div><Image src={'/icons/smallLeft.png'} alt={'left'} width={18} height={18}></Image></div>
        <h1 className="text-xl font-semibold p-3">
          {activeStartDate?.toLocaleDateString('ko-KR', { month: 'long' })} 매출
        </h1>
        <div><Image src={'/icons/smallRight.png'} alt={'right'} width={18} height={18}></Image></div>
      </div>

      {/* Sales Summary */}
      <section className="p-2">
        <div className="space-y-1 text-base font-bold">
          <div className="">
            총 매출
            <span className="text-blue-500 ml-4">{monthlyTotalIncome?.toLocaleString()} 원</span>
          </div>
          <h1 className="text-xl font-semibold p-3">
            {activeStartDate?.toLocaleDateString("ko-KR", { month: "long" })}{" "}
            매출
          </h1>
          <div>
            <Image
              src={"/icons/smallRight.png"}
              alt={"right"}
              width={18}
              height={18}
            ></Image>
          </div>
        </div>

        {/* Sales Summary */}
        <section className="p-4">
          <div className="space-y-1 text-base font-bold">
            <div className="">
              총 매출
              <span className="text-blue-500 ml-4">
                {monthlyTotalIncome?.toLocaleString()} 원
              </span>
            </div>
            <div className="text-sm text-gray-600 font-thin">
              <span>카드 매출 {monthlyCardIncome?.toLocaleString()} 원</span>
              <br />
              <span>현금 매출 {monthlyCashIncome?.toLocaleString()} 원</span>
            </div>
          </div>
        </section>

        {/* Calendar */}
        {date && activeStartDate && (
          <section className="flex-grow mt-6">
            <Calendar
              onChange={setDate}
              value={date}
              onActiveStartDateChange={handleMonthChange}
              onClickDay={handleDateClick} // 날짜 클릭 시 모달 오픈
              tileContent={({ date }) => {
                const temp = new Date(date);
                temp.setDate(date.getDate() + 1);
                const formattedTileDate = temp.toISOString().split("T")[0];
                const daySales = saleData
                  ?.filter((d: DayIncome) => d.date === formattedTileDate)
                  ?.reduce((acc: number, cur: DayIncome) => {
                    acc += cur.totalIncome;
                    return acc;
                  }, 0);
                return daySales ? (
                  <div className="text-black text-sm mt-1">{daySales}</div>
                ) : (
                  <div></div>
                );
              }}
              className="w-full text-xl"
              view="month"
              minDetail="month"
              maxDetail="month"
              formatDay={(locale, date) => `${date.getDate()}`} // '일' 제거
            />
          </section>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-30 z-10"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-t-xl w-full max-w-lg p-6 animate-slide-up text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="text-gray-700 font-bold text-2xl absolute top-2 right-2"
              >
                &times;
              </button>
              <div className="border-b w-3/4 mx-auto pb-2 mb-2">
                <h2 className="text-lg font-semibold mb-3">
                  {date?.toLocaleDateString("ko-KR", {
                    month: "long",
                    day: "numeric",
                    weekday: "long",
                  })}
                </h2>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="text-lg flex items-center">
                  <span className="font-medium">카드 매출:</span>
                  <span className="mx-2">
                    {selectedSalesData?.cardIncome.toLocaleString()}
                  </span>
                  <span>원</span>
                </div>
                <div className="text-lg flex items-center">
                  <span className="font-medium">현금 매출:</span>
                  <span className="mx-2">
                    {selectedSalesData?.cashIncome.toLocaleString()}
                  </span>
                  <span>원</span>
                </div>
                <div className="text-lg font-semibold border-t w-3/4 mx-auto pt-4 text-center">
                  <span>총 매출:</span>
                  <span className="text-blue-500 mx-2">
                    {selectedSalesData?.totalIncome.toLocaleString()}
                  </span>
                  <span>원</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

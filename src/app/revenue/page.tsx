"use client";

import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { useState, useEffect } from "react";

export default function Revenue() {
  const [isClient, setIsClient] = useState(false); // 클라이언트에서만 렌더링
  const [date, setDate] = useState<Date | null>(null);
  const [activeStartDate, setActiveStartDate] = useState<Date | null>(null);
  const [monthlySalesData, setMonthlySalesData] = useState({ total: 0, card: 0, cash: 0 });
  const [selectedSalesData, setSelectedSalesData] = useState({ total: 0, card: 0, cash: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Hydration Error
  useEffect(() => {
    // 클라이언트가 렌더링된 후에 상태를 초기화
    setDate(new Date());
    setActiveStartDate(new Date());
    setIsClient(true);
  }, []);  

  // 예시 매출 데이터
  const salesData = {
    '2024-11-01': { total: 10000, card: 7000, cash: 3000 },
    '2024-11-02': { total: 20000, card: 12000, cash: 8000 },
    '2024-11-03': { total: 43000, card: 33000, cash: 10000 },
    '2024-11-04': { total: 25000, card: 15000, cash: 10000 },
    '2024-11-05': { total: 60000, card: 40000, cash: 20000 },
  };

  useEffect(() => {
    if (activeStartDate) {
      const year = activeStartDate.getFullYear();
      const month = activeStartDate.getMonth() + 1;

      let total = 0;
      let card = 0;
      let cash = 0;

      Object.keys(salesData).forEach((date) => {
        const [dataYear, dataMonth] = date.split('-').map(Number);

        if (dataYear === year && dataMonth === month) {
          total += salesData[date].total;
          card += salesData[date].card;
          cash += salesData[date].cash;
        }
      });

      setMonthlySalesData({ total, card, cash });
    }
  }, [activeStartDate]);

  const handleDateClick = (clickedDate: Date) => {
    const formattedDate = clickedDate.toISOString().split('T')[0];
    const sales = salesData[formattedDate] || { total: 0, card: 0, cash: 0 };
    setSelectedSalesData(sales);
    setDate(clickedDate);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleMonthChange = ({ activeStartDate }: { activeStartDate: Date }) => {
    setActiveStartDate(activeStartDate);
  };

  // 클라이언트에서 렌더링이 완료되기 전까지는 렌더링하지 않음
  if (!isClient) return null;

  return (
    <div className='container'>
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between py-3">
        <button className="text-lg font-semibold">{'<'}</button>
      </header>
      <div>
        <h1 className="text-2xl font-semibold px-3 py-2">
          {activeStartDate?.toLocaleDateString('ko-KR', { month: 'long' })} 매출
        </h1>
      </div>

      {/* Sales Summary */}
      <section className="p-4">
        <div className="space-y-1 text-xl font-bold">
          <div className="text-gray-600">
            총 매출: 
            <span className="text-blue-500 ml-4">{monthlySalesData.total.toLocaleString()} 원</span>
          </div>
          <div className="text-base text-gray-600 font-thin">
            <span>카드 매출: {monthlySalesData.card.toLocaleString()} 원</span>
            <br />
            <span>현금 매출: {monthlySalesData.cash.toLocaleString()} 원</span>
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
              const formattedTileDate = date.toISOString().split('T')[0];
              const daySales = salesData[formattedTileDate]?.total;
              return daySales ? (
                <div className="text-black text-sm mt-1">{daySales.toLocaleString()} </div>
              ) : null;
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
          className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-30"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-t-lg w-full max-w-lg p-6 animate-slide-up text-center relative"
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
                {date?.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })}
              </h2>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="text-lg flex items-center">
                <span className="font-medium">카드 매출:</span>
                <span className="mx-2">{selectedSalesData.card.toLocaleString()}</span>
                <span>원</span>
              </div>
              <div className="text-lg flex items-center">
                <span className="font-medium">현금 매출:</span>
                <span className="mx-2">{selectedSalesData.cash.toLocaleString()}</span>
                <span>원</span>
              </div>
              <div className="text-lg font-semibold border-t w-3/4 mx-auto pt-4 text-center"> 
                <span>총 매출:</span>
                <span className="text-blue-500 mx-2">{selectedSalesData.total.toLocaleString()}</span>
                <span>원</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

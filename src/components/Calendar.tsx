"use client"

import { DayIncome } from '@/interface/revenue';
import React, { useEffect, useState } from 'react';

function generateCalendarDates(year:number, month:number) {
  const dates = [];
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const prevDays = firstDayOfMonth.getDay();
  for (let i = 0; i < prevDays; i++) {
    dates.push(null);
  }

  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    dates.push(day);
  }

  const totalCells = Math.ceil(dates.length / 7) * 7;
  while (dates.length < totalCells) {
    dates.push(null);
  }

  return dates;
}

interface CalendarProps {
  year: number;
  month: number;
  data: DayIncome[];
  onDateClick: (date: number) => void;
}

function Calendar({ year, month, data, onDateClick }:CalendarProps) {
  const dates = generateCalendarDates(year, month-1);

  const today = new Date();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const getTotalIncomeForDate = (day: number) => {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const totalIncome = data
      .filter(income => income.date === dateStr)
      .reduce((acc, curr) => acc + curr.totalIncome, 0);
    
    return totalIncome > 0 ? totalIncome : null;
  };

  const getTotalIncomeForWeek = (weekDates: (number | null)[]) => {
    const filteredWeekDates = weekDates.filter((day): day is number => day !== null); // null 제거
  
    return filteredWeekDates.reduce((acc, day) => {
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const totalIncome = data
        .filter((income) => income.date === dateStr)
        .reduce((acc, curr) => acc + curr.totalIncome, 0);
      return acc + totalIncome;
    }, 0);
  };

  const handleDateClick = (date: number) => {
    onDateClick(date);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerHeight < 670);
    };

    handleResize();
    window.addEventListener('resize', handleResize); 
    return () => window.removeEventListener('resize', handleResize); 
  }, []);

  const weeks = [];
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  return (
    <div className="flex flex-col items-center w-full mx-auto font-sans">
      <div className="grid grid-cols-7 gap-x-2 gap-y-4 text-center w-full">
        {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
          <div
            key={day}
            className={`text-gray-500 font-semibold text-xs ${
              index === 0 ? "text-red-500" : ""
            } ${index === 6 ? "!text-sky-500" : ""}`}
          >
            {day}
          </div>
        ))}
        {weeks.map((weekDates, weekIndex) => (
          <React.Fragment key={weekIndex}>
            {weekDates.map((date, index) => {
              const isToday =
                date &&
                year === today.getFullYear() &&
                month === today.getMonth() + 1 &&
                date === today.getDate();
              const totalIncome = date ? getTotalIncomeForDate(date) : null;

              return (
                <div
                  key={index}
                  onClick={() => date && handleDateClick(date)}
                  className={`${isSmallScreen ? "h-7" : "h-14"} w-full flex flex-col items-center rounded-lg p-1 cursor-pointer text-gray-400 
                ${date && index % 7 === 0 ? "!text-red-400" : ""} /* 일요일 빨간색 */
                ${date && index % 7 === 6 ? "!text-sky-400" : ""} /* 토요일 파란색 */
              `}
                >
                  <div
                    className={`text-xs ${
                      isToday ? "text-gray-600 font-bold" : ""
                    }`}
                  >
                    {date || ""}
                  </div>
                  <div className="text-[10px] text-blue-600 font-medium my-auto">
                    {totalIncome !== null ? totalIncome.toLocaleString() : ""}
                  </div>
                </div>
              );
            })}
            <div className="col-span-7 text-right text-gray-700 text-[10px] bg-slate-50">
              {getTotalIncomeForWeek(weekDates).toLocaleString()} 원
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
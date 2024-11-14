'use client'

import Calendar from '@/components/Calendar';
import React, { useState } from 'react';

const page = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((prevYear) => prevYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((prevYear) => prevYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
  };

const saleData = [
    {date: '2024-11-01', totalIncome: 424115, cardIncome: 424115, cashIncome: 0},
    {date: '2024-11-01', totalIncome: 299186, cardIncome: 0, cashIncome: 299186}
]


    return (
        <div className='container'>
            <div className="flex justify-between items-center mb-4">
                <button onClick={goToPrevMonth}>이전 달</button>
                <h2>{`${currentYear}년 ${currentMonth + 1}월`}</h2>
                <button onClick={goToNextMonth}>다음 달</button>
            </div>
            <Calendar year={currentYear} month={currentMonth} saleData={saleData}/>
        </div>
    );
};

export default page;
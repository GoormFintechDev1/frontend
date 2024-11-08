import React, { useState } from 'react';

function generateCalendarDates(year, month) {
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

function CustomCalendar() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const dates = generateCalendarDates(currentYear, currentMonth);

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xs mx-auto font-sans">
      <header className="flex justify-between items-center w-full px-4 py-2">
        <button onClick={goToPrevMonth}>&lt;</button>
        <h2 className="text-lg font-semibold">{`${currentYear}년 ${currentMonth + 1}월`}</h2>
        <button onClick={goToNextMonth}>&gt;</button>
      </header>

      <div className="grid grid-cols-7 gap-2 text-center w-full">
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <div
            key={day}
            className={`text-gray-500 font-semibold ${
              index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : ''
            }`}
          >
            {day}
          </div>
        ))}
        {dates.map((date, index) => (
          <div
            key={index}
            className={`h-10 w-10 flex items-center justify-center rounded-full 
              ${date ? 'hover:bg-gray-300 cursor-pointer' : ''} 
              ${date && index % 7 === 0 ? 'text-red-500' : ''} /* 일요일 빨간색 */
              ${date && index % 7 === 6 ? 'text-blue-500' : ''} /* 토요일 파란색 */
            `}
          >
            {date || ''}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomCalendar;
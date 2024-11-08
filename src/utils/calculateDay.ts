import dayjs from "dayjs";
dayjs().format();

export const paramMonth = dayjs().format('YYYY-MM'); // DB에 전달하는 날짜 형식

export const currentMonth = (month: string) => { // 화면에 표시할 날짜 포맷
  return dayjs(month).format("MM월");
};

export const handlePrevMonth = (month: string) => { // 현재 월 기준으로 이전 월 계산
  const prevMonth = dayjs(month).subtract(1, 'month').format('YYYY-MM');
  return prevMonth
}

export const handleNextMonth = (month: string) => { // 현재 월 기준으로 다음 월 계산
  const nextMonth = dayjs(month).add(1, 'month').format('YYYY-MM');
  return nextMonth
};
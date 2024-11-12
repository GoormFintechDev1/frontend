import { ExpenseDetail } from "@/interface/expenses";
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

export const getWeekOfMonth = (date: string) => {
  // 주의 시작을 월요일로 설정 (옵션: 일요일 시작을 원하면 변경 가능)
  const startOfMonth = dayjs(date).startOf('month');
  const dayOfMonth = dayjs(date).date();

  // 날짜의 요일 번호 가져오기 (월요일 기준: 1, 일요일 기준: 0)
  const startDay = startOfMonth.day(); // 0 (일요일)부터 시작
  const offset = (startDay === 0 ? 6 : startDay - 1); // 월요일 기준 0으로 맞춤

  // 주차 계산 (1-based index)
  return Math.ceil((dayOfMonth + offset) / 7);
};

// Extracting and grouping data by week number
export const groupByWeek = (expenses: ExpenseDetail[]): Record<number, ExpenseDetail[]> => {
  const groupedByWeek: Record<number, ExpenseDetail[]> = {};

  expenses.forEach((expense) => {
    const date = new Date(expense.transactionDate);
    const week = Math.ceil(date.getDate() / 7); // 주차 계산 (단순히 날짜 기반으로 계산)
    if (!groupedByWeek[week]) {
      groupedByWeek[week] = [];
    }
    groupedByWeek[week].push(expense);
  });

  return groupedByWeek;
};
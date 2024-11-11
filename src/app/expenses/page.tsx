"use client";

import Error from "@/components/Error";
import { useExpensesDetailData } from "@/hooks/useExpensesQuery";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ExpensesPageLoading from "./loading";
import {
  paramMonth,
  currentMonth,
  handleNextMonth,
  handlePrevMonth,
  groupByWeek,
} from "@/utils/calculateDay";
import { useState } from "react";
import useExpensesStore from "@/stores/useExpensesStore";
import ExpensesPieChart from "@/components/expenses/ExpensesPieChart";
import ExpensesData from "@/components/expenses/ExpensesData";
import dayjs from "dayjs";
import { ExpenseDetail } from "@/interface/expenses";
import ExpensesWeekData from "@/components/expenses/ExpensesWeekData";
dayjs().format();

const ExpensesPage = () => {
  const [month, setMonth] = useState(paramMonth);
  const [activeToggle, setActiveToggle] = useState(false);

  const router = useRouter();
  const { isLoading, error } = useExpensesDetailData(month);

  const expensesData = useExpensesStore((state) => state.expensesDetailsData);

  console.log(expensesData);

  let chartData = [{ name: "", value: 0 }];
  let groupedExpenses: Record<number, ExpenseDetail[]> = {};

  if (expensesData) {
    chartData = Object.entries(expensesData.categoryTotalExpenses).map(
      ([key, value]) => {
        return { name: key, value: value };
      }
    );

    groupedExpenses = groupByWeek(expensesData.expenseDetails);
  }
  console.log(groupedExpenses);

  const toggleWeekData = () => {
    setActiveToggle((activeToggle) => !activeToggle);
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  if (isLoading) {
    return <ExpensesPageLoading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="container">
      <div className="col-span-2 flex flex-col justify-between">
        <div className="mb-4">
          <Link href={"#"} onClick={router.back}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </Link>
        </div>
        <div className="flex items-center gap-x-3">
          <button onClick={() => setMonth(handlePrevMonth(month))}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          {/* 월 표현 방식 - DB는 YYYY-mm 형식의 param을 받음 */}
          <h2 className="text-sm font-semibold">{currentMonth(month)}</h2>
          <button onClick={() => setMonth(handleNextMonth(month))}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
        <>
          <ExpensesPieChart chartData={chartData} COLORS={COLORS} />
          <ExpensesData chartData={chartData} COLORS={COLORS} month={month} />
        </>
        <button onClick={toggleWeekData}>주간별 상세보기</button>
        {activeToggle && (
          <>
            <ExpensesWeekData month={month} groupedExpenses={groupedExpenses} />
          </>
        )}
      </div>
    </div>
  );
};

export default ExpensesPage;

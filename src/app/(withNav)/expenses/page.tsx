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
} from "@/utils/calculateDay";
import { useState } from "react";
import { useExpensesStore } from "@/stores/useExpensesStore";
import ExpensesPieChart from "@/components/expenses/ExpensesPieChart";
import ExpensesData from "@/components/expenses/ExpensesData";
import dayjs from "dayjs";
import ExpensesWeekData from "@/components/expenses/ExpensesWeekData";
import Image from "next/image";
dayjs().format();

const ExpensesPage = () => {
  const [month, setMonth] = useState(paramMonth);
  const [activeToggle, setActiveToggle] = useState(false);

  const router = useRouter();
  const { isLoading, error } = useExpensesDetailData(month);

  const expensesDetailsData = useExpensesStore((state) => state.expensesDetailsData);

  const expensesDetails = expensesDetailsData?.expenseDetails;

  const toggleWeekData = () => {
    setActiveToggle((activeToggle) => !activeToggle);
  }

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
            <Image src={"/icons/arrow.png"} alt="arrow" width={24} height={24} />
          </Link>
        </div>
        <div className="flex items-center gap-x-3">
          <button onClick={() => setMonth(handlePrevMonth(month))}>
            <Image src={"/icons/smallLeft.png"} alt="Back" width={18} height={18} />
          </button>
          {/* 월 표현 방식 - DB는 YYYY-mm 형식의 param을 받음 */}
          <h2 className="text-xl font-semibold">{currentMonth(month)} 지출</h2>
          <button onClick={() => setMonth(handleNextMonth(month))}>
            <Image src={"/icons/smallRight.png"} alt="Forward" width={18} height={18} />
          </button>
        </div>
        <div className="h-[calc(100vh-163px)] overflow-y-scroll">
          <ExpensesPieChart chartData={expensesDetailsData!} />
          <ExpensesData chartData={expensesDetailsData!} month={month} />
          <div className="flex justify-center">
            <button
              onClick={toggleWeekData}
              className="flex items-center justify-between bg-white text-black border px-4 py-2 mb-4 rounded focus:outline-none transition"
            >
              주간별 지출금액
              <span
                className={`ml-2 transform transition-transform duration-300 ${activeToggle ? 'rotate-180' : 'rotate-0'}`}
              >
                ▼
              </span>
            </button>
          </div>
          {activeToggle && (
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                activeToggle ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <ExpensesWeekData chartData={expensesDetails!} month={month} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;

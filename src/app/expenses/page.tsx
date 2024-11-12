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
import ExpensesWeekData from "@/components/expenses/ExpensesWeekData";
import Image from "next/image";
dayjs().format();

const ExpensesPage = () => {
  const [month, setMonth] = useState(paramMonth);
  const [activeToggle, setActiveToggle] = useState(false);

  const router = useRouter();
  const { isLoading, error } = useExpensesDetailData(month);

  const expensesDetailsData = useExpensesStore((state) => state.expensesDetailsData);
  let groupedData: Record<number, Date[]> = {};

  
  const expenseDetails = expensesDetailsData?.expenseDetails;
  
  expenseDetails?.map((v) => {
    groupedData = groupByWeek(v.transactionDate, groupedData);
  })
  console.log(expensesDetailsData);
  console.log(groupedData);

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
            <Image src={"/icons/arrow.png"} alt="arrow" width={24} height={24} />
          </Link>
        </div>
        <div className="flex items-center gap-x-3">
          <button onClick={() => setMonth(handlePrevMonth(month))}>
            <Image src={"/icons/Back.png"} alt="Back" width={18} height={18} />
          </button>
          {/* 월 표현 방식 - DB는 YYYY-mm 형식의 param을 받음 */}
          <h2 className="text-sm font-semibold">{currentMonth(month)}</h2>
          <button onClick={() => setMonth(handleNextMonth(month))}>
            <Image src={"/icons/Forward.png"} alt="Forward" width={18} height={18} />
          </button>
        </div>
        <>
          <ExpensesPieChart chartData={expensesDetailsData!} COLORS={COLORS} />
          <ExpensesData chartData={expensesDetailsData!} COLORS={COLORS} month={month} />
        </>
        <button onClick={toggleWeekData}>주간별 상세보기</button>
        {activeToggle && (
          <>
            {/* <ExpensesWeekData month={month} groupedExpenses={groupedExpenses} /> */}
          </>
        )}
      </div>
    </div>
  );
};

export default ExpensesPage;

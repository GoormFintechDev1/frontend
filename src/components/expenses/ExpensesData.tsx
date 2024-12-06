import { chartDataProps } from "@/interface/expenses";
import { useCategoryColorStore } from "@/stores/useExpensesStore";
import { formatNumberWithComma } from "@/utils/currency";
import Link from "next/link";
import React from "react";

const ExpensesData = (props: chartDataProps) => {
  const categoryColor = useCategoryColorStore(
    (state) => state.categoryColorMap
  );

  if (!props.chartData || !props.chartData.categoryTotalExpenses) {
    return [];
  }

  const totalExpenses = Object.entries(
    props.chartData.categoryTotalExpenses
  ).map(([key, value]) => ({
    category: key,
    amount: value,
  })).sort((a,b)=> b.amount - a.amount);

  return (
    <div className="flex items-center gap-8 mb-4">
      <div className="flex flex-col w-full px-6 pt-2 pb-5 border-b-2 border-[#f5f5f5]">
        <ul className="flex flex-col gap-y-2">
          {totalExpenses.map((data, index) => (
            <li key={index} className="">
              <Link className="flex justify-between items-center"
                href={{
                  pathname: `/expenses/detail`,
                  query: { category: data.category, month: props.month },
                }}
              >
                <div className="flex items-center">
                  <span
                    className={`inline-block w-3 h-3 mr-2`}
                    style={{
                      backgroundColor: categoryColor[data.category],
                    }}
                  ></span>
                  {data.category}
                </div>
                <div className="flex gap-x-2">
                  {formatNumberWithComma(data.amount)}
                  <span>&#62;</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpensesData;

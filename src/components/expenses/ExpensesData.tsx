import { chartDataProps } from "@/interface/expenses";
import { formatNumberWithComma } from "@/utils/currency";
import Link from "next/link";
import React from "react";

const ExpensesData = (props: chartDataProps) => {
  if (!props.chartData || !props.chartData.categoryTotalExpenses) {
    return [];
  }
  
  const totalExpenses = Object.entries(props.chartData.categoryTotalExpenses).map(([key, value]) => ({
    category: key,
    amount: formatNumberWithComma(value),
  }));
  
  return (
    <div className="flex items-center gap-8 mb-4">
      <div className="flex flex-col w-full px-6 pt-2 pb-5 border-b-2 border-[#f5f5f5]">
        <ul className="flex flex-col gap-y-2">
          {totalExpenses.map((data, index) => (
            <li key={index} className="flex justify-between items-center">
              <div className="flex items-center">
                <span
                  className={`inline-block w-3 h-3 mr-2`}
                  style={{
                    backgroundColor: props.categoryColorMap[data.category] || props.COLORS[index % props.COLORS.length],
                  }}
                ></span>
                {data.category}
              </div>
              <div className="flex gap-x-2">
                {data.amount}
                <span>
                  <Link
                    href={{
                      pathname: `/expenses/detail`,
                      query: { category: data.category, month: props.month },
                    }}
                  >
                    &#62;
                  </Link>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpensesData;

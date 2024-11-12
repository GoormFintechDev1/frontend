import { chartDataProps } from "@/interface/expenses";
import Link from "next/link";
import React from "react";

const ExpensesData = (props: chartDataProps) => {
  return (
    <div className="flex items-center gap-8 mb-4">
      <div className="flex flex-col w-full px-6 pt-2 pb-5 border-b-2 border-[#f5f5f5]">
        <ul className="flex flex-col gap-y-2">
          {props.chartData?.expenseDetails.map((data, index) => (
            <li key={index} className="flex justify-between items-center">
              <div>
                <div
                  className={`inline-block w-3 h-3 mr-2`}
                  style={{
                    backgroundColor: props.COLORS[index % props.COLORS.length],
                  }}
                ></div>
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

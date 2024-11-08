"use client";

import { useExpensesDetailData } from "@/hooks/useExpensesQuery";
import { useRouter, useSearchParams } from "next/navigation";
import Error from "@/components/Error";
import Link from "next/link";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import ExpensesDetailPageLoading from "./loading";

const ExpensesDetailPage = () => {
  const router = useRouter();
  const params = useSearchParams();

  const {
    data: expensesDetailData,
    isLoading,
    error,
  } = useExpensesDetailData();

  const filteredData = expensesDetailData?.expenseDetails.filter(detail => detail.category === params.get("category")) || [];

  if (expensesDetailData) {
    console.log("exponsesDetailData", expensesDetailData);
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  if (isLoading) {
    return <ExpensesDetailPageLoading />;
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
          <div>
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
          </div>
          <h2 className="text-sm font-semibold">11월</h2>
          <div>
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
          </div>
        </div>
        <div className="flex mb-4">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={filteredData}
                dataKey="amount"
                outerRadius={70}
                innerRadius={50}
                startAngle={270}
                endAngle={630}
              >
                {filteredData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-8 mb-4">
          <div className="flex flex-col w-full px-6 pt-2 pb-5 border-b-2 border-[#f5f5f5]">
            <ul className="flex flex-col gap-y-2">
              {filteredData.map(
                (data, index) =>
                  data.category === params.get("category") && (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <div
                          className={`inline-block w-3 h-3 mr-2`}
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        ></div>
                        {data.category}
                      </div>
                      <div className="flex gap-x-2">
                        {data.amount}
                        <span>
                          <Link href={`/expense/detail`}>&#62;</Link>
                        </span>
                      </div>
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesDetailPage;

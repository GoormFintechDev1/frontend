"use client";

import Error from "@/components/Error";
import { Loading } from "@/components/Loading";
import { useExpensesData, useExpensesDetailData } from "@/hooks/useExpensesQuery";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const ExpensesPage = () => {
  const router = useRouter();
  const { data: expensesData, isLoading, error } = useExpensesData();

  const {data: expensesDetailData} = useExpensesDetailData();

  if (expensesDetailData) {
    console.log("exponsesDetailData", expensesDetailData);
  }

  let chartData = [{
    name: "",
    value: 0,
  }];
  if (expensesData) {
    chartData = Object.entries(expensesData?.categoryExpenses).map(
      ([key, value]) => {
        return { name: key, value: value };
      }
    );
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  if (isLoading) {
    return <Loading />;
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
                data={chartData}
                dataKey="value"
                outerRadius={70}
                innerRadius={50}
                startAngle={270}
                endAngle={630}
              >
                {chartData?.map((entry, index) => (
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
              {chartData?.map((data, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div>
                    <div
                      className={`inline-block w-3 h-3 mr-2`}
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    {data.name}
                  </div>
                  <div className="flex gap-x-2">
                    {data.value}
                    <span>
                      <Link href={`/expense/detail`}>&#62;</Link>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;

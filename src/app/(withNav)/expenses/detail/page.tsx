"use client";

import { useExpensesDetailData } from "@/hooks/useExpensesQuery";
import { useRouter, useSearchParams } from "next/navigation";
import Error from "@/components/Error";
import Link from "next/link";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import ExpensesDetailPageLoading from "./loading";
import dayjs from "dayjs";
import { formatNumberWithComma } from "@/utils/currency";
import { useExpensesStore } from "@/stores/useExpensesStore";
import Image from "next/image";
dayjs().format();

const ExpensesDetailPage = () => {
  const router = useRouter();
  const params = useSearchParams();

  const {isLoading, error} = useExpensesDetailData(params.get("month")!);

  const expensesDetailsData = useExpensesStore((state) => state.expensesDetailsData);
  const COLORS = ["#A80000", "#FB1111", "#FF7575", "#FFC4C4", "#F8F8F8"];

  const filteredData =
    expensesDetailsData?.expenseDetails.filter((detail) => {
      const category = detail.category === params.get("category");
      const month = dayjs(detail.transactionDate).format("YYYY-MM") === params.get("month")
      const week = params.get("week")
        ? Math.ceil(new Date(detail.transactionDate).getDate() / 7).toString() === params.get("week")
        : true;

      return category && month && week;
    }) || []

  const amountSum = filteredData?.reduce((acc, cur) => acc + cur.amount, 0);

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
            <Image src={"/icons/arrow.png"} alt="arrow" width={24} height={24} />
          </Link>
        </div>
        <div className="flex items-center gap-x-3">
          <h2 className="text-xl font-semibold p-2">세부정보</h2>
        </div>
        <div className="flex flex-col mb-4">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={filteredData}
                dataKey="amount"
                outerRadius={70}
                innerRadius={50}
                startAngle={90}
                endAngle={-270}
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
          <div className="text-center">
            <div className="font-bold text-xl px-5 py-2">{params.get("category")}</div>
            <div className="font-bold text-xl px-5 py-2">{formatNumberWithComma(amountSum)}</div>
          </div>
        </div>
        <div className="flex items-center gap-8 mb-4">
          <div className="flex flex-col w-full px-6 pt-2 pb-5">
            <ul className="flex flex-col gap-y-2">
              {filteredData.map(
                (data, index) =>
                  data.category === params.get("category") && (
                    <li
                      key={index}
                      className="flex items-baseline p-2 border-b border-gray-200"
                    >
                      <div
                        className="inline-block w-3 h-3 mr-2"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      ></div>
                      <div className="w-full">
                        <div className="flex justify-between">
                          <p className="font-semibold">{data.storeName}</p>
                          <p className="text-sm text-gray-500">
                            {dayjs(data.transactionDate).format("YYYY-MM-DD")}
                          </p>
                        </div>
                        <div className="flex justify-between mt-1">
                          <p className="text-sm text-gray-700">
                            {data.note}
                          </p>
                          <p className="text-sm font-semibold text-right">
                            {data.transactionMeans === "CASH" ? "현금": "카드"}{" "}
                            {formatNumberWithComma(data.amount)}
                          </p>
                        </div>
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

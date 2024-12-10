import { convertToKoreanWon } from "@/utils/currency";
import Link from "next/link";
import { Bar, BarChart, Cell, LabelList, ResponsiveContainer } from "recharts";
import {RevenueLoading} from "./Loading";
import { useRevenueHistory } from "@/hooks/useRevenueQuery";
import dayjs from "dayjs";
import { paramMonth2 } from "@/utils/calculateDay";
dayjs().format();

interface RevenueProps {
  height: string;
}

const Revenue: React.FC<RevenueProps> = ({height}) => {

  const year = new Date().getFullYear();
  const month = new Date().getMonth() +1;

  const { data, isLoading } = useRevenueHistory(paramMonth2(year, month));

  const revenueData = [
    { name: month-2+'월', value: data?.totalIncome2Ago, fill: "#E5E7EB" },
    { name: month-1+'월', value: data?.totalIncome1Ago, fill: "#E5E7EB" },
    { name: month+'월', value: data?.totalIncome0Ago, fill: "#6EE7B7" },
  ];

  
  if (isLoading) {
    return <RevenueLoading/>
  }

  return (
    <div className="box space-y-3" style={{ height }}>
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold">이번 달 매출</h2>
        <span>
          <Link href="/revenue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
        </span>
      </div>
      <ResponsiveContainer width={"100%"} height={"85%"}>
        <BarChart data={revenueData}>
          {/* <XAxis dataKey="name" /> */}
          {/* <YAxis /> */}
          {/* <Bar dataKey="value" fill="#8884d8" /> */}
          <Bar dataKey="value" radius={7} minPointSize={25}>
            {revenueData?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
            <LabelList
              dataKey="name"
              position="insideTop"
              fill="#fff"
              offset={8}
              fontSize={10}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-center text-emerald-500 font-bold">
        {revenueData?.map((entry) => (
          entry.name === month+'월' ? convertToKoreanWon(entry.value) : ""
        ))}
      </p>
    </div>
  )
}

export default Revenue
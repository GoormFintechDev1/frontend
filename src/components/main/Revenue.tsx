import { useRevenueQuery } from "@/hooks/useReportQuery";
import convertToKoreanWon from "@/utils/currency";
import Link from "next/link";
import { Bar, BarChart, Cell, LabelList, ResponsiveContainer } from "recharts";
import Loading from "../Loading";
import Error from "../Error";

const Revenue = () => {
  const {data: revenueData, isLoading, error} = useRevenueQuery();

  if (isLoading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }

  return (
    <div className="flex flex-col justify-between bg-white py-3 px-2 rounded-2xl shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold">이번 달 매출</h2>
        <span className="text-gray-500">
          <Link href="/revenue">&#62;</Link>
        </span>
      </div>
      <ResponsiveContainer width={"100%"} height={100}>
        <BarChart data={revenueData}>
          {/* <XAxis dataKey="name" /> */}
          {/* <YAxis /> */}
          {/* <Bar dataKey="value" fill="#8884d8" /> */}
          <Bar dataKey="value" radius={7}>
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
      <p className="text-center text-theme font-bold">
        {revenueData?.map((entry) => (
          entry.name === "11월" ? convertToKoreanWon(entry.value) : ""
        ))}
      </p>
    </div>
  )
}

export default Revenue
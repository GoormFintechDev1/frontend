import exp from "constants";
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface IndustryReport {
    average_sale: string,
    average_expense: string,
    my_expense: string,
    my_income: string,
    expense_description: string,
    sale_description: string,
}

interface Props {
    report: IndustryReport;
  }

export default function ReportIndusty({report}:Props) {
    const myExpense =  Number(report?.my_expense.replace(/[^0-9]/g, "")) || 0;
    const myRevenue =  Number(report?.my_income.replace(/[^0-9]/g, "")) || 0;
    const averageExpense =  Number(report?.average_expense.replace(/[^0-9]/g, "")) || 0;
    const averageRevenue = Number(report?.average_sale.replace(/[^0-9]/g, "")) || 0;

    const revenueChart = [
        {  name: "매출", "나": myRevenue, "평균": averageRevenue },
    ]

    const expenseChart = [
        {  name: "지출", "나": myExpense, "평균": averageExpense },
    ]

    console.log(revenueChart, expenseChart)

  return (
    <div>
        <div className="text-xl font-bold py-3">주변 상권 분석</div>
        <div className="min-h-7 rounded-xl p-5 my-2 bg-zinc-50" >
            <p className="font-bold text-sm pb-3">매출/지출 비교</p>
            <div className="text-xs" style={{ color: "#333333" }}>
            <div className="flex justify-around">
  {/* 매출 차트 */}
  <div className="flex flex-col items-center space-y-2">
    <p className="text-sm font-medium">매출</p>
    <ResponsiveContainer width={120} height={140}>
      <BarChart data={revenueChart} margin={{ top: 0, bottom: 5 }}>
        <XAxis dataKey="name" hide />
        <YAxis hide />
        <Tooltip formatter={(value: number) => `${value}만원`} />
        <Bar
          dataKey="평균"
          fill="#CECECE"
          barSize={45}
          radius={[10, 10, 10, 10]}
          label={{ position: "insideTop", fill: "#666", fontSize: 12 }}
        />
        <Bar
          dataKey="나"
          fill="#92B4FF"
          barSize={45}
          radius={[10, 10, 10, 10]}
          label={{ position: "insideTop", fill: "#fff", fontSize: 12 }}
        />
      </BarChart>
    </ResponsiveContainer>
    <div className="flex justify-between w-full text-xs">
      <div className="text-center w-1/2 text-gray-500">평균</div>
      <div className="text-center w-1/2 text-blue-500">나</div>
    </div>
  </div>

  {/* 지출 차트 */}
  <div className="flex flex-col items-center space-y-2">
    <p className="text-sm font-medium">지출</p>
    <ResponsiveContainer width={120} height={140}>
      <BarChart data={expenseChart} margin={{ top: 0, bottom: 5 }}>
        <XAxis dataKey="name" hide />
        <YAxis hide />
        <Tooltip formatter={(value: number) => `${value}만원`} />
        <Bar
          dataKey="나"
          fill="#d3d3d3"
          barSize={45}
          radius={[10, 10, 10, 10]}
          label={{ position: "insideTop", fill: "#666", fontSize: 12 }}
        />
        <Bar
          dataKey="평균"
          fill="#f76c6c"
          barSize={45}
          radius={[10, 10, 10, 10]}
          label={{ position: "insideTop", fill: "#fff", fontSize: 12 }}
        />
      </BarChart>
    </ResponsiveContainer>
    <div className="flex justify-between w-full text-xs">
      <div className="text-center w-1/2 text-gray-500">평균</div>
      <div className="text-center w-1/2 text-red-500">나</div>
    </div>
  </div>
</div>
</div>
        </div>
        <div className="text-base" style={{color:"#333333", lineHeight:"28px"}}>
            <div className="py-3">
                <p className="font-bold">매출은</p>
                <div>{report?.sale_description}</div>
            </div>
            <div className="py-3">
                <p className="font-bold">지출은</p>
                <div>{report?.expense_description}</div>
            </div>
        </div>
    </div>

  )
}

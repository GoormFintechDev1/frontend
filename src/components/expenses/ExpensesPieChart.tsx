import { chartDataProps } from "@/interface/expenses";
import { useCategoryColorStore } from "@/stores/useExpensesStore";
import { convertToKoreanWon } from "@/utils/currency";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const ExpensesPieChart = (props: chartDataProps) => {
  const categoryColor = useCategoryColorStore(
    (state) => state.categoryColorMap
  );

  const COLORS = ["#BE185D", "#F472B6", "#F9A8D4", "#FFD2EB", "#F8F8F8"];

  // chartData가 null 또는 undefined인지 확인
  // if (!props.chartData || !props.chartData.categoryTotalExpenses) {
  //   return [];
  // }

  const totalExpenses = props.chartData ? Object.entries(
    props.chartData.categoryTotalExpenses
  ).map(([key, value]) => ({
    category: key,
    amount: value,
  })).sort((a,b)=> b.amount - a.amount) : [];

  return (
    <>
      <div className="flex">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={totalExpenses.length > 0 ? totalExpenses : [{ name: "No Data", amount: 1 }]}
              dataKey="amount"
              outerRadius={70}
              innerRadius={50}
              startAngle={90}
              endAngle={-270}
            >
              {totalExpenses.length > 0 ? (totalExpenses.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    Object.keys(categoryColor).length === 0
                      ? COLORS[index % COLORS.length]
                      : categoryColor[entry.category]
                  }
                />
              ))) : (
                <Cell fill="#FFF4F8"/>
              )}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center">
        <p className="font-bold text-xl px-5 py-2">총 지출 금액</p>
        <p className="font-bold text-xl px-5 py-2">
          {convertToKoreanWon(props.chartData?.totalMonthExpenses)}
        </p>
      </div>
    </>
  );
};

export default ExpensesPieChart;

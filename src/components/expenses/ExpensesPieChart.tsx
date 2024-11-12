import { chartDataProps } from "@/interface/expenses";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const ExpensesPieChart = (props: chartDataProps) => {
  // chartData가 null 또는 undefined인지 확인
  if (!props.chartData || !props.chartData.categoryTotalExpenses) {
    return [];
  }

  const totalExpenses = Object.entries(props.chartData.categoryTotalExpenses).map(([key, value]) => ({
    category: key,
    amount: value,
  }));

  return (
    <div className="flex mb-4">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={totalExpenses}
            dataKey="amount"
            outerRadius={70}
            innerRadius={50}
            startAngle={270}
            endAngle={630}
          >
            {totalExpenses.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={props.categoryColorMap[entry.category] || props.COLORS[index % props.COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensesPieChart;

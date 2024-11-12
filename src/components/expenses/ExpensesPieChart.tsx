import { chartDataProps } from "@/interface/expenses";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";



const ExpensesPieChart = (props: chartDataProps) => {
  return (
    <div className="flex mb-4">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={props.chartData?.expenseDetails}
            dataKey="amount"
            outerRadius={70}
            innerRadius={50}
            startAngle={270}
            endAngle={630}
          >
            {props.chartData?.expenseDetails.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={props.COLORS[index % props.COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensesPieChart;

import { ExpenseDetail } from "@/interface/expenses";
import { useCategoryColorStore } from "@/stores/useExpensesStore";
import { groupByWeek } from "@/utils/calculateDay";
import { formatNumberWithComma } from "@/utils/currency";
import dayjs from "dayjs";
import Link from "next/link";

interface WeeklyExpensesProps {
  month: string,
  chartData: ExpenseDetail[]
}

const ExpensesWeekData = ({ chartData, month }: WeeklyExpensesProps) => {
  const weekData = groupByWeek(chartData);
  const categoryColor = useCategoryColorStore((state) => state.categoryColorMap);

  return (
    <div className="flex flex-col gap-8 mb-4">
      {Object.entries(weekData).map(([week, expenses]) => (
        <div key={week} className="flex flex-col w-full px-6 pt-2 pb-5 border-b-2 border-[#f5f5f5]">
          <h3>{dayjs(month).format("YYYY년 MM월")} {week}째주</h3>
          <ul className="flex flex-col">
            {expenses.map((expense, index) => (
              <li key={index}>
                <Link className="flex justify-between" href={{
                  pathname:"/expenses/detail",
                  query: {
                    category: expense.category,
                    month: month,
                    week: week,
                  }
                }}>
                  <div className="flex items-center">
                    <span className="w-3 h-3 inline-block mr-2"  style={{ backgroundColor: categoryColor[expense.category] }}></span>
                    {expense.category}</div>
                  <div>{formatNumberWithComma(expense.amount)}</div>
                </Link>
                {/* <div>
                  {dayjs(expense.transactionDate).format("YYYY-MM-DD HH:mm")}
                </div> */}
                {/* <div>{expense.storeName}</div> */}
                {/* <div>{expense.note}</div> */}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExpensesWeekData;

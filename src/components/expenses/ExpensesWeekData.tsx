import { ExpenseDetail } from "@/interface/expenses";
import dayjs from "dayjs";
import Link from "next/link";

interface WeeklyExpensesProps {
  month: string,
  groupedExpenses: Record<number, ExpenseDetail[]>;
}

const ExpensesWeekData = ({ month, groupedExpenses }: WeeklyExpensesProps) => {
  return (
    <div className="flex flex-col gap-8 mb-4">
      {Object.entries(groupedExpenses).map(([week, expenses]) => (
        <div key={week} className="flex flex-col w-full px-6 pt-2 pb-5 border-b-2 border-[#f5f5f5]">
          <h3>{dayjs(month).format("YYYY년 MM월")} {week}째주</h3>
          <ul className="flex flex-col gap-y-2">
            {expenses.map((expense, index) => (
              <li key={index} className="flex justify-between">
                <Link href={{
                  pathname:"/expenses/detail",
                  query: {
                    category: expense.category,
                    month: month,
                    week: week,
                  }
                }}>
                  <div>{expense.category}</div>
                  <div>{expense.amount}</div>
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

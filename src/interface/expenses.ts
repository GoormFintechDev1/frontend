export interface chartDataProps {
  chartData: expenseDetailDTOType,
  COLORS: string[],
  categoryColorMap: Record<string, string>,
  month?: string,
}

export interface expenseDTOType {
  totalMonthExpenses: number,
  totalTodayExpense: number,
  categoryExpenses: {
    [key: string]: number
  }
}

export interface expenseDetailDTOType {
  totalMonthExpenses: number,
  categoryTotalExpenses: Record<string, number>
  expenseDetails: ExpenseDetail[]
}

export interface ExpenseDetail {
  transactionDate: Date,
  transactionMeans: TransactionMeansEnum,
  amount: number,
  storeName: string,
  category: string,
  note: string,
}

// Enum 예시
enum TransactionMeansEnum {
  CARD = "CARD",
  CASH = "CASH",
}
export interface exponseDTOType {
  totalMonthExpenses: number,
  totalTodayExpense: number,
  categoryExpenses: {
    [key: string]: number
  }
}

export interface exponseDetailDTOType {
  totalMonthExpenses: number,
  categoryTotalExpenses: Record<string, number>
  expenseDetails: ExpenseDetail[]
}

interface ExpenseDetail {
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

export interface MonthRevenue {
    monthlyTotalIncome: number,
    monthlyCardIncome: number,
    monthlyCashIncome: number,
    dailyIncomeList: [{
      [key: string]: number
    }]
}

export interface DayIncome {
  date: string;
  totalIncome: number;
  cardIncome: number;
  cashIncome: number;
}
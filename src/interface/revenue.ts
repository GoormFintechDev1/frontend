
export interface MonthRevenue {
    monthlyTotalIncome: number,
    monthlyCardIncome: number,
    monthlyCashIncome: number,
    dailyIncomeList: [{
      [key: string]: number
    }]
}

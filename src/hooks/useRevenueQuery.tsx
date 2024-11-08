
import { getIncomeHistory, getMonthlyIncome } from "@/lib/revenueApi";
import { useQuery } from "@tanstack/react-query";

export const useMonthlyRevenue = (year:number, month:number) => {
    return useQuery({
      queryKey: ['monthlyRevenue', year, month],
      queryFn: () => getMonthlyIncome(year, month),
    })
}

export const useRevenueHistory = (year:number, month:number) => {
  return useQuery({
    queryKey: ['incomeHistory', year, month],
    queryFn: () => getIncomeHistory(year, month),
  })
}
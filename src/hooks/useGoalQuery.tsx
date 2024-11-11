import { getExpenseGoal, getRevenueGoal } from "@/lib/goalApi"
import { useQuery } from "@tanstack/react-query"


export const useRevenueGoal = (date: string) => {
    return useQuery({
      queryKey: ['revenueGoal', date],
      queryFn: () => getRevenueGoal(date),
    })
  }


export const useExpenseGoal = (date: string) => {
    return useQuery({
      queryKey: ['expenseGoal', date],
      queryFn: () => getExpenseGoal(date),
    })
  }
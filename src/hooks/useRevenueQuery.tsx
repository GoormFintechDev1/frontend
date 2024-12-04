
import { getIncomeHistory, getMonthlyIncome } from "@/lib/revenueApi";
import { useQuery} from "@tanstack/react-query";

export const useMonthlyRevenue = (date:string) => {
    return useQuery({
      queryKey: ['monthlyRevenue', date],
      queryFn: () => getMonthlyIncome(date),
    })
}

export const useRevenueHistory = (date:string) => {

  return useQuery({
    queryKey: ['incomeHistory', date],
    queryFn: () => getIncomeHistory(date),
  });
};
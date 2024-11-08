
import { getMonthlyIncome } from "@/lib/revenueApi";
import { useQuery } from "@tanstack/react-query";

export const useMonthlyRevenue = (year:number, month:number) => {
    return useQuery({
      queryKey: ['monthlyRevenue', year, month],
      queryFn: () => getMonthlyIncome(year, month),
    })
}

import { getIncomeHistory, getMonthlyIncome } from "@/lib/revenueApi";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useMonthlyRevenue = (year:number, month:number) => {
    return useQuery({
      queryKey: ['monthlyRevenue', year, month],
      queryFn: () => getMonthlyIncome(year, month),
    })
}

export const useRevenueHistory = (year: number, month: number) => {
  const router = useRouter();

  return useQuery({
    queryKey: ['incomeHistory', year, month],
    queryFn: () => getIncomeHistory(year, month),
    onError: (error: any) => {
      if (error.status === 403) {
        router.push('/login'); 
      }
    },
  } as UseQueryOptions<any, any> );
};
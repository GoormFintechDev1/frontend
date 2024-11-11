import { getLastProfit, getProfitDetail } from "@/lib/profitApi"
import { useQuery } from "@tanstack/react-query"

export const useLastPorfit = (year:number, month:number) => {
    return useQuery({
      queryKey: ['lastProfit', year, month],
      queryFn: () => getLastProfit(year, month),
    })
  }
  
  export const useProfitDetail = (year:number, month:number) => {
    return useQuery({
      queryKey: ['lastProfit', year, month],
      queryFn: () => getProfitDetail(year, month),
    })
  }
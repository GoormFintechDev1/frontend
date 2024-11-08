"use client"

import { exponseDetailDTOType, exponseDTOType } from "@/interface/expenses"
import { getExpensesData, getExpensesDetailData, getLastProfit } from "@/lib/expensesApi"
import { useQuery } from "@tanstack/react-query"

export const useExpensesData = (currentMonth: string) => useQuery<exponseDTOType>({
  queryKey: ["expensesData", currentMonth],
  queryFn: () => getExpensesData(currentMonth),
})

export const useExpensesDetailData = () => useQuery<exponseDetailDTOType>({
  queryKey: ["expensesDetailData"],
  queryFn: getExpensesDetailData,
})


export const useLastPorfit = (year:number, month:number) => {
  return useQuery({
    queryKey: ['lastProfit', year, month],
    queryFn: () => getLastProfit(year, month),
  })
}
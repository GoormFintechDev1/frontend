"use client"

import { exponseDetailDTOType, exponseDTOType } from "@/interface/expenses"
import { getExpensesData, getExpensesDetailData, getLastProfit } from "@/lib/expensesApi"
import { useQuery } from "@tanstack/react-query"

export const useExpensesData = () => useQuery<exponseDTOType>({
  queryKey: ["expensesData"],
  queryFn: getExpensesData,
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
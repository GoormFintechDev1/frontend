"use client"

import { exponseDetailDTOType, exponseDTOType } from "@/interface/expenses"
import { getExpensesData, getExpensesDetailData } from "@/lib/expensesApi"
import { useQuery } from "@tanstack/react-query"

export const useExpensesData = () => useQuery<exponseDTOType>({
  queryKey: ["expensesData"],
  queryFn: getExpensesData,
})

export const useExpensesDetailData = () => useQuery<exponseDetailDTOType>({
  queryKey: ["expensesDetailData"],
  queryFn: getExpensesDetailData,
})
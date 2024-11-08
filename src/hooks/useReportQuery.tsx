"use client";

import { useQuery } from "@tanstack/react-query";
import { getExpensesData, getExpensesDetailData, getRevenueData } from "@/lib/reportApi";
import { exponseDetailDTOType, exponseDTOType } from "@/interface/report";

export const useRevenueQuery = () => useQuery({
  queryKey: ["revenueData"],
  queryFn: getRevenueData,
})

export const useExpensesData = () => useQuery<exponseDTOType>({
  queryKey: ["expensesData"],
  queryFn: getExpensesData,
})

export const useExpensesDetailData = () => useQuery<exponseDetailDTOType>({
  queryKey: ["expensesDetailData"],
  queryFn: getExpensesDetailData,
})
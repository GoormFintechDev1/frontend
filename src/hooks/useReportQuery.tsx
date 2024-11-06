"use client";

import { useQuery } from "@tanstack/react-query";
import { getExpensesData, getRevenueData } from "@/lib/reportApi";

export const useRevenueQuery = () => useQuery({
  queryKey: ["revenueData"],
  queryFn: getRevenueData,
})

export const useExpensesData = () => useQuery({
  queryKey: ["expensesData"],
  queryFn: getExpensesData,
})
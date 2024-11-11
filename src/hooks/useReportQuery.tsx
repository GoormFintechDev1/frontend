"use client";

import { getRevenueData } from "@/lib/reportApi";
import { useQuery } from "@tanstack/react-query";

export const useRevenueQuery = () => useQuery({
  queryKey: ["revenueData"],
  queryFn: getRevenueData,
})
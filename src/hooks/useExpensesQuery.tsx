"use client";

import { exponseDetailDTOType, exponseDTOType } from "@/interface/expenses";
import {
  getExpensesData,
  getExpensesDetailData,
  getLastProfit,
} from "@/lib/expensesApi";
import useExpensesStore from "@/stores/useExpensesStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";


export const useExpensesData = (currentMonth: string) => {
  const { data, isLoading, error } = useQuery<exponseDTOType>({
    queryKey: ["expensesData", currentMonth],
    queryFn: () => getExpensesData(currentMonth),
  });
  const setExpensesData = useExpensesStore((state) => state.setExpensesData);

  // Handle data state
  useEffect(() => {
    if (data) {
      setExpensesData(data);
    }
  }, [data, setExpensesData]);

  return { isLoading, error };
};

export const useExpensesDetailData = (paramMonth: string) => {
  const { data, isLoading, error } = useQuery<exponseDetailDTOType>({
    queryKey: ["expensesDetailData"],
    queryFn: () => getExpensesDetailData(paramMonth),
  });
  const setExpensesDetailsData = useExpensesStore(
    (state) => state.setExpensesDetailsData
  );

  // Handle data state
  useEffect(() => {
    if (data) {
      setExpensesDetailsData(data);
    }
  }, [data, setExpensesDetailsData]);

  return { isLoading, error };
};

export const useLastPorfit = (year: number, month: number) => {
  return useQuery({
    queryKey: ["lastProfit", year, month],
    queryFn: () => getLastProfit(year, month),
  });
};

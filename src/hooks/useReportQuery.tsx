"use client";

import { getReportData } from "@/lib/reportApi";
import useReportsStore from "@/stores/useReportsStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useReportQuery = (paramMonth: string) => {
  const {data, isLoading, error} = useQuery({
    queryKey: ["reportData", paramMonth],
    queryFn: () => getReportData(paramMonth),
  })

  const setReportData = useReportsStore(
    (state) => state.setReportData
  );

  useEffect(() => {
    if(data) {
      setReportData(data);
    }
  }, [data, setReportData])
  

  return { isLoading, error }
}
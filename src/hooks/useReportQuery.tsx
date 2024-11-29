"use client";

import { getReportCheck, getReportData } from "@/lib/reportApi";
// import useReportsStore from "@/stores/useReportsStore";
import {useQuery } from "@tanstack/react-query";
// import { useEffect } from "react";

// export const useReportQuery = (paramMonth: string) => {
//   const {data, isLoading, error} = useQuery({
//     queryKey: ["reportData", paramMonth],
//     queryFn: () => getReportData(paramMonth),
//   })

//   const setReportData = useReportsStore(
//     (state) => state.setReportData
//   );

//   useEffect(() => {
//     if(data) {
//       setReportData(data);
//     }
//   }, [data, setReportData])
  

//   return { isLoading, error }
// }

export const useReportQuery2 = (paramMonth: string) => {
  return useQuery({
    queryKey: ["report", paramMonth],
    queryFn: () => getReportData(paramMonth),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  })
}

export const useReportCheck = () => {
  return useQuery({
    queryKey: ["reportCheck"],
    queryFn: () => getReportCheck(),
  })
}
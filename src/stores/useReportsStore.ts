import { create } from "zustand";

interface ReportDTOType {
  title: string,
  contents: string[],
}

interface ReportsState {
  data: ReportDTOType[],
  setReportData: (data: ReportDTOType[]) => void,
}

const useReportsStore = create<ReportsState>((set) => ({
  // State
  data: [],

  //Actions
  setReportData: (data) => set({ data: data })
}));

export default useReportsStore;
import { create } from "zustand";

interface ReportsState {
  content: string | string[] | object[],
  setReportData: (data: string | string[] | object[]) => void,
}

const useReportsStore = create<ReportsState>((set) => ({
  // State
  content: "",

  //Actions
  setReportData: (data) => set({ content: data })
}));

export default useReportsStore;
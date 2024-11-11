import { exponseDetailDTOType, exponseDTOType } from "@/interface/expenses";
import { create } from "zustand";

interface ExpensesState {
  isLoading: boolean;
  error: string | null;
  expensesData: exponseDTOType | null;
  expensesDetailsData: exponseDetailDTOType | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setExpensesData: (data: exponseDTOType) => void
  setExpensesDetailsData: (data: exponseDetailDTOType) => void
}

const useExpensesStore = create<ExpensesState>((set) => ({
  // State
  isLoading: false,
  error: null,
  expensesData: null,
  expensesDetailsData: null,

  //Actions
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setExpensesData: (data) => set({ expensesData: data }),
  setExpensesDetailsData: (data) => set({ expensesDetailsData: data }),
}));

export default useExpensesStore;
import { expenseDetailDTOType, expenseDTOType } from "@/interface/expenses";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ExpensesState {
  expensesData: expenseDTOType | null;
  expensesDetailsData: expenseDetailDTOType | null;
  setExpensesData: (data: expenseDTOType) => void
  setExpensesDetailsData: (data: expenseDetailDTOType) => void
}

interface CategoryColorState {
  categoryColorMap: Record<string, string>
  setCategoryColorMap: (data: Record<string, string>) => void
}

const useExpensesStore = create<ExpensesState>((set) => ({
  // State
  expensesData: null,
  expensesDetailsData: null,

  //Actions
  setExpensesData: (data) => set({ expensesData: data }),
  setExpensesDetailsData: (data) => set({ expensesDetailsData: data }),
}));

const useCategoryColorStore = create(
  persist<CategoryColorState>(
    (set) => ({
      categoryColorMap: {},
      setCategoryColorMap: (data) => set({ categoryColorMap: data }),
    }),
    {
      name: 'category-color-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
)

export { useExpensesStore, useCategoryColorStore };
import { SetGoal } from "@/interface/goal"
import { getBadges, getExpenseGoal, getRevenueGoal, setGoals, updateGoals } from "@/lib/goalApi"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useRevenueGoal = (date: string) => {
    return useQuery({
      queryKey: ['revenueGoal', date],
      queryFn: () => getRevenueGoal(date),
    })
  }


export const useExpenseGoal = (date: string) => {
    return useQuery({
      queryKey: ['expenseGoal', date],
      queryFn: () => getExpenseGoal(date),
    })
  }


export const useSetGoal = () => {
  return useMutation({
    mutationFn: (data:SetGoal) => setGoals(data),
    onError: (error) => {
        console.error("목표 설정 실패 ", error);
    }
  })
}

export const useUpdateGoal = () => {
  return useMutation({
    mutationFn: (data:SetGoal) => updateGoals(data),
    onError: (error) => {
        console.error("목표 수정 실패 ", error);
    }
  })
}

export const useGetBadge = (year:number) => {
  return useQuery({
    queryKey: ["badge"],
    queryFn: () => getBadges(year),
  })
}
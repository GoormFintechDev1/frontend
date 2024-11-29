import { SetGoal } from "@/interface/goal"
import { getBadges, getExpenseGoal, getRevenueGoal, setGoals, updateGoals } from "@/lib/goalApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useRevenueGoal = (date: string) => {
    return useQuery({
      queryKey: ['revenueGoal'],
      queryFn: () => getRevenueGoal(date),
      // staleTime: 1000*60,
    })
  }


export const useExpenseGoal = (date: string) => {
    return useQuery({
      queryKey: ['expenseGoal'],
      queryFn: () => getExpenseGoal(date),
      // staleTime:1000*60,
    })
  }


export const useSetGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data:SetGoal) => setGoals(data),
    onSuccess: ()=>{
      queryClient.invalidateQueries({ queryKey: ["expenseGoal"], exact: true });
      queryClient.invalidateQueries({ queryKey: ["revenueGoal"], exact: true });
    },
    onError: (error:string) => {
        console.error("목표 설정 실패 ", error);
    }
  })
}

export const useUpdateGoal = () => {
  return useMutation({
    mutationFn: (data:SetGoal) => updateGoals(data),
    onError: (error:string) => {
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
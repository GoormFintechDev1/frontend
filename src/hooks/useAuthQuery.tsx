import { authUser } from "@/lib/authApi"
import { useQuery } from "@tanstack/react-query"

export const useAuthQuery = () => {
  return useQuery({
    queryKey: ["authStatus"],
    queryFn: authUser,
    retry: false, // 쿼리가 실패할 경우, 재시도 여부
    refetchOnWindowFocus: false, // 창에 포커스가 다시 맞춰질 때 쿼리 실행 여부
    staleTime: 1000 * 60 * 5, // 쿼리 데이터가 최신 데이터로 간주되는 시간
  })
}
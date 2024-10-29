import { FormDataType } from "@/app/register/page"
import { authUser, joinUser } from "@/lib/authApi"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useAuthQuery = () => {
  return useQuery({
    queryKey: ["authStatus"],
    queryFn: authUser,
    retry: false, // 쿼리가 실패할 경우, 재시도 여부
    refetchOnWindowFocus: false, // 창에 포커스가 다시 맞춰질 때 쿼리 실행 여부
    staleTime: 1000 * 60 * 5, // 쿼리 데이터가 최신 데이터로 간주되는 시간
  })
}

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (formData: FormDataType) => joinUser(
        formData.userId,
        formData.password,
        formData.nickname,
        formData.username,
        formData.phone,
        formData.address
    ),
    onSuccess: () => {
        console.log("회원가입 성공");
    },
    onError: (error) => {
        console.error("회원가입 실패 ", error);
    }
  })
}
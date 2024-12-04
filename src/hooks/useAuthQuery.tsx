
import { LoginType } from "@/interface/login"
import { FormDataType } from "@/interface/register"
import { checkloginId, checkEmail, checkNickname, checkPhoneNumber, joinUser, loginUser, logoutUser, deleteUser } from "@/lib/authApi"
import { useMutation } from "@tanstack/react-query"

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (formData: FormDataType) => joinUser(formData),
    onError: (error:string) => {
        console.error("회원가입 실패 ", error);
    }
  })
}


export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (loginData: LoginType) => loginUser(
      loginData
    ),
  })
}

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: (loginId:string) => logoutUser(loginId)
  })
}


export const useCheckloginId = () => {
  return useMutation({
    mutationFn: (loginId:string) => checkloginId(loginId),
  })
}

export const useCheckNickname = () => {
  return useMutation({
    mutationFn: (nickname:string) => checkNickname(nickname),
  })
}

export const useCheckPhoneNumber = () => {
  return useMutation({
    mutationFn: (phoneNumber:string) => checkPhoneNumber(phoneNumber),
  })
}

export const useCheckEmail = () => {
  return useMutation({
    mutationFn: (email:string) => checkEmail(email),
  })
}

export const useDeleteMutation = () => {
  return useMutation({
    mutationFn: (loginId:string) => deleteUser(loginId)
  })
}
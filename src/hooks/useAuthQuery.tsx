
import { LoginType } from "@/interface/login"
import { FormDataType } from "@/interface/register"
import { checkloginId, checkEmail, checkNickname, checkPhoneNumber, joinUser, loginUser, logoutUser } from "@/lib/authApi"
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
    onSuccess: () => {
      console.log("로그인 성공");
    },
    onError: (error:string) => {
      console.log("로그인 실패", error);
    }
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


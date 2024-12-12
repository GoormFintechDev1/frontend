
import { LoginType } from "@/interface/login";
import { FormDataType } from "@/interface/register";
import { Reset, Validate } from "@/interface/resetPassword";


const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8080/api/auth";
if (enviroment === "production") {
  url = process.env.NEXT_PUBLIC_DOMAIN ? `https://${process.env.NEXT_PUBLIC_DOMAIN}/api/auth` : `http://localhost:8080/api/auth`;
}

export const loginUser = async (data:LoginType) => {
  const response = await fetch(`${url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("로그인 실패...");
  }

  return response;
};

export const joinUser = async (formData:FormDataType) => {
  const response = await fetch(`${url}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("회원가입 실패...");
  }

  return response;
};

export const logoutUser = async (loginId:string) => {
  const response = await fetch(`${url}/logout`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({loginId}),
    credentials: "include",
  })

  if (!response.ok) {
    console.error("Failed to Logout");
  }
}

export const refreshAccessToken = async (refreshToken: string) => {
  const response = await fetch(`${url}/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
    credentials: "include",
  });

  if (!response.ok) throw new Error("토큰 갱신 실패");
  const data = await response.json();
  return data.accessToken;
};

export const checkloginId = async ( loginId: string ) => {
  const response = await fetch(`${url}/duplication/loginId`,{
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({loginId}),
  })
  
  if(!response.ok) throw new Error("아이디 중복 검사 실패");
  const data = await response.json();
  return data
  
}

export const checkNickname = async (nickName:string) => {
  const response = await fetch(`${url}/duplication/nickname`,{
    method:'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({nickName}),
  })

  if(!response.ok) throw new Error("닉네임 중복 검사 실패");
  const data = await response.json();
  return data

}


export const checkPhoneNumber = async (phoneNumber:string) => {
  const response = await fetch(`${url}/duplication/phone`,{
    method:'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({phoneNumber}),
  })

  if(!response.ok) throw new Error("전화번호 중복 검사 실패");
  const data = await response.json();
  return data

}

export const checkEmail = async (email:string) => {
  const response = await fetch(`${url}/duplication/email`,{
    method:'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email}),
  })

  if(!response.ok) throw new Error("이메일 중복 검사 실패");
  const data = await response.json();
  return data

}

export const deleteUser = async (loginId:string) => {
  const response = await fetch(`${url}/inactive`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({loginId}),
    credentials: "include",
  })

  if (!response.ok) {
    console.error("Failed to delete");
  }
}

export const resetPassword = async (resetData: Reset) => {
  const response = await fetch(`${url}/reset-password`,{
    method:'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(resetData),
  })

  if(!response.ok) throw new Error("비밀번호 변경 중 오류가 발생했습니다.");
  const data = await response.text();
  return data
}

export const checkPassword = async (checkData: Validate) => {
  const response = await fetch(`${url}/check`,{
    method:'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(checkData),
  })

  if (!response.ok) throw new Error("비밀번호 확인 실패");
    const data = await response.text(); // 문자열로 처리
    return data;
};


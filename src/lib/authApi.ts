import { FormDataType } from "@/app/register/page";
import { LoginFormType } from "@/components/Login";

const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8080/api/auth";
if (enviroment === "production") {
  url = "https://domain/api/auth";
}

export const authUser = async () => {
  try {
    const response = await fetch(`${url}/check`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (data.message === "Not Authenticated") {
      return null;
    }

    return data;
  } catch (error) {
    console.error("Authentication Check Failed", error);
    throw error;
  }
};

export const loginUser = async (data:LoginFormType) => {
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
    throw new Error("로그인 실패...");
  }

  return response;
};

export const logoutUser = async () => {
  const response = await fetch(`${url}/logout`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
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

export const checkAccount = async ( account: string ) => {
  const response = await fetch(`${url}/duplication/account`,{
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({account}),
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
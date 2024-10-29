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

export const joinUser = async (
  account: string,
  password: string,
  nickname: string,
  name: string,
  phoneNumber: string,
  address: string,
) => {
  const response = await fetch(`${url}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ account, password, nickname, name, phoneNumber, address }),
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


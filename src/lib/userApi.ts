import { CustomError } from "@/interface/error";

const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8080/api/member";
if (enviroment === "production") {
  url = process.env.NEXT_PUBLIC_DOMAIN ? `https://${process.env.NEXT_PUBLIC_DOMAIN}/api/member` : `http://localhost:8080/api/member`;
}

export const getUserInfo = async() => {
    const response = await fetch(`${url}/info`, {
        method: "GET",
        credentials: "include",
      });
    
        if (!response.ok) {
        const errorData = await response.json().catch(() => null); // JSON 파싱이 실패할 수 있으므로 예외 처리
        const error = new Error(response.statusText || "권한이 없습니다.");
        (error as CustomError).status = response.status;
        (error as CustomError).data = errorData; 
        throw error;
      }
  
    return response.json();
  }
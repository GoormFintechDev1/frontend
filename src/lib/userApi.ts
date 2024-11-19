const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8080/api/member";
if (enviroment === "production") {
  url = process.env.NEXT_PUBLIC_DOMAIN ? `http://${process.env.NEXT_PUBLIC_DOMAIN}/api/member` : `http://localhost:8080/api/member`;
}

interface CustomError extends Error {
  status: number,
  data: string,
}

export const getUserInfo = async() => {
    const response = await fetch(`${url}/info`, {
        method: "GET",
        credentials: "include",
      });
    
        if (!response.ok) {
        const errorData = await response.json().catch(() => null); // JSON 파싱이 실패할 수 있으므로 예외 처리
        const error = new Error(response.statusText || "API 요청 오류");
        (error as CustomError).status = response.status;
        (error as CustomError).data = errorData; 
        throw error;
      }
  
    return response.json();
  }
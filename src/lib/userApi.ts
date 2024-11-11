const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8080/api/member";
if (enviroment === "production") {
  url = "https://domain/api/member";
}


export const getUserInfo = async() => {
    const response = await fetch(`${url}/info`, {
        method: "GET",
        credentials: "include",
      });
    
        if (!response.ok) {
        const errorData = await response.json().catch(() => null); // JSON 파싱이 실패할 수 있으므로 예외 처리
        const error = new Error(response.statusText || "API 요청 오류");
        (error as any).status = response.status;
        (error as any).data = errorData; 
        throw error;
      }
  
    return response.json();
  }
const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8080/api/pos";
if (enviroment === "production") {
  url = "https://domain/api/pos";
}

export const getMonthlyIncome = async(year:number , month:number) => {
    const query = year+'-'+month;
    const params = new URLSearchParams({ month:query });
    const response = await fetch(`${url}/monthly-income?${params.toString()}`, {
        method: "GET",
        credentials: "include",
      });
    
    if(!response.ok) new Error("월매출 조회 오류");

    return response.json();
}

export const getIncomeHistory = async(year:number , month:number) => {
  const query = year+'-'+month;
  const params = new URLSearchParams({ month:query });
  const response = await fetch(`${url}/income-history?${params.toString()}`, {
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
const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8080/api/pos";
if (enviroment === "production") {
  url = "https://domain/api/pos";
}

export const getMonthlyIncome = async(date:string) => {
    const response = await fetch(`${url}/monthly-income?month=${date}`, {
        method: "GET",
        credentials: "include",
      });
    
      if (!response.ok) {
        const errorData = await response.json().catch(() => null); 
        const error = new Error(response.statusText || "API 요청 오류");
        (error as any).status = response.status;
        (error as any).data = errorData; 
        throw error;
      }

    return response.json();
}

export const getIncomeHistory = async(date:string) => {
  const response = await fetch(`${url}/income-history?month=${date}`, {
      method: "GET",
      credentials: "include",
    });
  
      if (!response.ok) {
      const errorData = await response.json().catch(() => null); 
      const error = new Error(response.statusText || "API 요청 오류");
      (error as any).status = response.status;
      (error as any).data = errorData; 
      throw error;
    }

  return response.json();
}
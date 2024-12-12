const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8080/api/pos";
if (enviroment === "production") {
  url = process.env.NEXT_PUBLIC_DOMAIN ? `/api/pos` : `http://localhost:8080/api/pos`;
}

interface CustomError extends Error {
  status: number,
  data: string,
}

export const getMonthlyIncome = async(date:string) => {
    const response = await fetch(`${url}/monthly-income?month=${date}`, {
        method: "GET",
        credentials: "include",
      });
    
      if (!response.ok) {
        const errorData = await response.json().catch(() => null); 
        const error = new Error(response.statusText || "API 요청 오류");
        (error as CustomError).status = response.status;
        (error as CustomError).data = errorData; 
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
      (error as CustomError).status = response.status;
      (error as CustomError).data = errorData; 
      throw error;
    }

  return response.json();
}
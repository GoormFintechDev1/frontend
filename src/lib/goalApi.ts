const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8080/api/goal";
if (enviroment === "production") {
  url = "https://domain/api/goal";
}

export const getRevenueGoal = async(date: string) => {
    const response = await fetch(`${url}/check/revenue?goalMonth=${date.toString()}`, {
        method: "GET",
        credentials: "include",
      });
    
    if(!response.ok) new Error("매출 목표 조회 실패");
  
    return response.json();
  }

  

  export const getExpenseGoal = async(date: string) => {
    const response = await fetch(`${url}/check/expense?goalMonth=${date.toString()}`, {
        method: "GET",
        credentials: "include",
      });
    
    if(!response.ok) new Error("지출 목표 조회 실패");
  
    return response.json();
  }
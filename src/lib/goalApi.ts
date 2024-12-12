import { SetGoal } from "@/interface/goal";

const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8080/api/goal";
if (enviroment === "production") {
  url = process.env.NEXT_PUBLIC_DOMAIN ? `http://${process.env.NEXT_PUBLIC_DOMAIN}/api` : `http://localhost:8080/api/goal`;
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


  export const setGoals = async(data:SetGoal) => {
    const response = await fetch(`${url}/set`,{
      method:"POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if(!response.ok) new Error("지출 목표 조회 실패");

    return response;
  }



  export const updateGoals = async(data:SetGoal) => {
    const response = await fetch(`${url}/update`,{
      method:"PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if(!response.ok) new Error("지출 목표 조회 실패");

    return response;
  }

  export const getBadges = async(year:number) => {
    const response = await fetch(`${url}/total?goalYear=${year}`,{
      method:"GET",
      credentials: "include",
    })

    if(!response.ok) new Error("배지 조회 실패");

    return response.json();
  }
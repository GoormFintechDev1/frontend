const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8080/api/account";
if (enviroment === "production") {
  url = process.env.DOMAIN ? `https://${process.env.DOMAIN}/api/account` : `http://localhost:8080/api/account`;
}

export const getLastProfit = async(year:number , month:number) => {
    const query = year+'-'+month;
    const params = new URLSearchParams({ month:query });
    const response = await fetch(`${url}/profit?${params.toString()}`, {
        method: "GET",
        credentials: "include",
      });
    
    if(!response.ok) new Error("지난 달 순이익 조회 오류");
  
    return response.json();
}

export const getProfitDetail = async(date:string) => {
    const response = await fetch(`${url}/profit/detail?month=${date.toString()}`, {
        method: "GET",
        credentials: "include",
      });
    
    if(!response.ok) new Error("지난 달 순이익 조회 오류");
  
    return response.json();
}

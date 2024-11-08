const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8080/api/account";
if (enviroment === "production") {
  url = "https://domain/api/account";
}

export const getExpensesData = async () => {
  const response = await fetch(`${url}/expense?month=2024-11`, {
    method: "GET",
    credentials: "include",
  })

  const data = await response.json();

  return data;
}

export const getExpensesDetailData = async () => {
  const response = await fetch(`${url}/expense/detail?month=2024-11`, {
    method: "GET",
    credentials: "include",
  })

  const data = await response.json();

  return data;
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
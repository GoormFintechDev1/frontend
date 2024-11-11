const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8080/api/account";
if (enviroment === "production") {
  url = "https://domain/api/account";
}

export const getExpensesData = async (currentMonth: string) => {
  const response = await fetch(`${url}/expense?month=${currentMonth}`, {
    method: "GET",
    credentials: "include",
  })

  const data = await response.json();

  return data;
}

export const getExpensesDetailData = async (paramMonth: string) => {
  const response = await fetch(`${url}/expense/detail?month=${paramMonth}`, {
    method: "GET",
    credentials: "include",
  })

  const data = await response.json();

  return data;
}



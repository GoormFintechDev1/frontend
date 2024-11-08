const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8080/api/account";
if (enviroment === "production") {
  url = "https://domain/api/account";
}

export const getRevenueData = async () => {
  const data = [
    { name: "9월", value: 5000, fill: "#E5E7EB" },
    { name: "10월", value: 20000, fill: "#E5E7EB" },
    { name: "11월", value: 15000, fill: "#6EE7B7" },
  ]

  return data;
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
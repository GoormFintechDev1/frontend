const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8080/api/account";
if (enviroment === "production") {
  url = "https://domain/api/account";
}

console.log(url);

export const getRevenueData = async () => {
  const data = [
    { name: "9월", value: 5000, fill: "#E5E7EB" },
    { name: "10월", value: 20000, fill: "#E5E7EB" },
    { name: "11월", value: 15000, fill: "#6EE7B7" },
  ]

  return data;
}
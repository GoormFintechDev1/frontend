export const getRevenueData = async () => {
  const data = [
    { name: "9월", value: 5000, fill: "#E5E7EB" },
    { name: "10월", value: 20000, fill: "#E5E7EB" },
    { name: "11월", value: 15000, fill: "#6EE7B7" },
  ]

  return data;
}

export const getExpensesData = async () => {
  const data = [
    { name: "공과금", value: 150000, fill: "#ff6384" },
    { name: "인건비", value: 100000, fill: "#ffa384" },
    { name: "재료비", value: 50000, fill: "#ffe384" },
  ]

  return data;
}
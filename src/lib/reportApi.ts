const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8080/api/account";
if (enviroment === "production") {
  url = "https://domain/api/account";
}

console.log(url);

export const getReportData = async (paramMonth: string) => {
  // fetch(`${url}/${paramMonth}`, {
  //   method: "GET",
  //   credentials: "include"
  // });

  const data = [
    { paramMonth },
  ]

  return data;
}
const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8080/api/pos";
if (enviroment === "production") {
  url = "https://domain/api/pos";
}

export const getMonthlyIncome = async(year:number , month:number) => {
    const query = year+'-'+month;
    const params = new URLSearchParams({ month:query });
    const response = await fetch(`${url}/monthly-income?${params.toString()}`, {
        method: "GET",
        credentials: "include",
      });
    
    if(!response.ok) new Error("월매출 조회 오류");

    return response.json();
}

export const getIncomeHistory = async(year:number , month:number) => {
  const query = year+'-'+month;
  const params = new URLSearchParams({ month:query });
  const response = await fetch(`${url}/income-history?${params.toString()}`, {
      method: "GET",
      credentials: "include",
    });
  
  if (response.status === 403) {
    // 403 에러일 경우 커스텀 에러를 던져서 처리하도록 함
    throw new Error("Forbidden - 로그인 필요");
  }
  
  if(!response.ok) new Error("매출 히스토리 조회 오류");

  console.log(response.json());

  return response.json();
}
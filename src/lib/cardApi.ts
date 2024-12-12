const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8080/api/card";
if (enviroment === "production") {
  url = process.env.NEXT_PUBLIC_DOMAIN ? `https://${process.env.NEXT_PUBLIC_DOMAIN}/api/card` : `http://localhost:8080/api/card`;
}


export const RecommendCard = async(paramMonth: string) => {
    const response = await fetch(`${url}/recommend?month=${paramMonth}`, {
        method: "GET",
        credentials: "include",
      });
    
    if(!response.ok) new Error("카드추천 조회 실패");
  
    return response.json();
  }
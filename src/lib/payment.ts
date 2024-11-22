import { Payment } from "@/interface/payment";


const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8083/api/payments";
if (enviroment === "production") {
  url = process.env.NEXT_PUBLIC_DOMAIN ? `http://${process.env.NEXT_PUBLIC_DOMAIN}/api` : `http://localhost:8083/api/payment`;
}


export const setPayment = async(data:Payment) => {
    const response = await fetch(`${url}/confirm`,{
      method:"POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if(!response.ok) new Error("지출 목표 조회 실패");

    console.log(response.json())

    return response;
  }
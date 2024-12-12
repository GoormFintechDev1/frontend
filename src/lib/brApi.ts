import { BusinessInfo } from "@/interface/business";

const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8080/api/business";
if (enviroment === "production") {
  url = process.env.NEXT_PUBLIC_DOMAIN ? `http://${process.env.NEXT_PUBLIC_DOMAIN}/api/business` : `http://localhost:8080/api/business`;
}


export const validateBR = async(data:BusinessInfo) => {
    const response = await fetch(`${url}/br-connect`, {
      method:"POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(data),
      credentials: "include",
    });
   
    if (!response.ok) {
      throw new Error("사업자 인증을 실패했습니다.");
    }
  
    return response;
  }

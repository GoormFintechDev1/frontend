"use client"

import Button from "@/components/Button";
import { useSearchParams } from "next/navigation";

// Infopage에서 받을 props의 타입 정의
// interface InfopageProps {
//     first: string; 
//     second: string; 
//     buttonmessage: string; 
//     href: string;
//   }
  
  //사용법
  //router.push에 링크와 함께 url에 쿼리 파라미터 전달.
  //예시) /info?first=hi&second=🥳&buttonmessage=로그인&href=/login

  export default function Infopage() {

    const prams = useSearchParams();
    const first = prams.get("first") || "";
    const second = prams.get("second") || "";
    const buttonmessage = prams.get("buttonmessage") || "";
    const href = prams.get("href") || "";

    return (
        <div className="flex flex-col items-center h-screen container">
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-xl font-bold my-2 text-center">{first}</div>
            <div className="text-4xl my-2 mt-5">{second}</div>
          </div>
      
          <Button className="mb-8" href={`${href}`}>
            {buttonmessage}
          </Button>
        </div>
      );
  }


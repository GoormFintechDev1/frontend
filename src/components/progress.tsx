'use client'

import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import Image from "next/image";

interface Props {
  time: number
}

export default function progress({time}:Props) {
  
  const [info, setInfo] = useState("");
  let count = 0;
  const list = ["사업자 등록 인증 완료!", "포스 정보 가져오는 중...", "사업자 계좌 가져오는 중..."]

  useEffect(()=>{
    setInterval(()=>{count++; setInfo(list[count])},1000)
  },[])

  return (
    <div className="container flex flex-col items-center justify-center space-y-8">

      <div className="text-lg font-bold">{info} 정보 가져오는 중...</div>
      {/* <div>
        <Image src={"/progress.gif"} width={140} height={140} alt="progress" unoptimized></Image>
      </div> */}
      <ProgressBar time={time}/>
    </div>
  )
}

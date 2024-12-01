'use client'

import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import Image from "next/image";

interface Props {
  time: number
}

export default function progress({time}:Props) {
  
  const [info, setInfo] = useState("");

  useEffect(()=>{
    setInterval
  },[])

  return (
    <div className="container flex flex-col items-center justify-center space-y-8">

      <div className="text-lg font-bold">{info} 정보 가져오는 중...</div>
      <div>
        <Image src={"/progress.gif"} width={140} height={140} alt="progress" unoptimized></Image>
      </div>
      <ProgressBar time={time}/>
    </div>
  )
}

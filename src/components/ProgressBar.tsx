"use client"

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

interface Props {
    time: number;
  }

export default function ProgressBar({time}:Props) {
  
  const [progress, setTimer] = useState(0);
  const second = useMemo(()=> time / 100, [time]);

  useEffect(()=>{
    const progressId = setInterval(()=>{
      setTimer((prev)=> prev + 1);
    }, second);

    const timerId = setTimeout(()=>{clearInterval(progressId)}, time);
    
    return ()=>{
      clearInterval(progressId);
      clearTimeout(timerId);
    }

  },[])


  return (
      <div className="flex flex-col space-y-6 w-full items-center">
        <div className="relative w-4/5">
          <div className="bg-slate-200 h-[2px]"></div>
          <div
            className={`bg-emerald-400 h-[2px] rounded-xl absolute top-0 left-0`}
            style={{ width: `${progress}%` }}></div>
          <div className="absolute flex justify-between w-full -top-4">
            {[0, 50, 100].map((value, index) => (
              <div
                key={index}
                className={`w-8 h-8 flex justify-center items-center rounded-full border-2 ${
                  progress >= value ? "bg-emerald-400 border-emerald-400" : "bg-white border-slate-200"
                }`}
              >
                {progress >= value && (
                  <div className="w-7 h-7 bg-emerald-400 rounded-full flex items-center justify-center">
                    <Image alt="check" src={"/icons/Done_white.png"} width={20} height={20}></Image>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* <div className="text-emerald-500 text-sm">{progress} %</div> */}
      </div>
  )
}

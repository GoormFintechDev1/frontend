"use client"

import { useEffect, useMemo, useState } from "react";

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
    <div className="flex flex-col space-y-5 w-full items-center">
        <div className="bg-slate-100 w-4/5 h-2 rounded-xl">
            <div className={`bg-emerald-400 h-2 rounded-xl`} style={{width:`${progress}%`}}></div>
        </div>
        <div className="text-emerald-500 text-sm">{progress} %</div>
    </div>
  )
}

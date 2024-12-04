'use client'

import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import Image from "next/image";

interface Props {
  time: number
}
const list = ["포스 정보를 가져오고 있어요.", "계좌 정보를 가져오고 있어요.",];

export default function ProgressComponent({time}:Props) {

  const [info, setInfo] = useState(list[0]);
  const second = time/2;

  useEffect(() => {
    let count = 1;

    const intervalId = setInterval(() => {
      setInfo(list[count]);
      count++;
    }, second);

    const timerId = setTimeout(() => {
      clearInterval(intervalId);
    }, time);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timerId);
    };
  }, [time, second]);


  return (
    <div className="container flex flex-col items-center justify-between">
      <div></div>
      <div className="text-lg font-bold flex flex-col items-center space-y-4">
        <p>{info}</p>
        <Image src={"/dots.gif"} width={140} height={140} alt="progress" unoptimized></Image>
      </div>
      
      <ProgressBar time={time}/>
    </div>
  )
}

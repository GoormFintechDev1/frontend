"use client"

import { useWeather } from "@/hooks/useWeatherQuery";
import { useEffect, useMemo, useState } from "react"
import { AlarmLoading } from "./main/Loading";
import Image from "next/image";

interface Props {
  onClick: () => void
}

export default function Alarm({onClick}:Props){

    const [geolocation, setGeoLocation] = useState({
        long:0,
        lat:0,
    });

    const [info, setInfo] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setGeoLocation({
                long: position.coords.longitude,
                lat: position.coords.latitude,
              });
            },
            () => {
              setError(true);
            }
          );
        } else if (result.state === "denied") {
          setError(true);
        }
      });
    }, []);

    const {data:weather, isLoading} = useWeather(geolocation);

    const C = useMemo(()=>Math.round((weather?.main?.temp-273.15)), [weather]);

    useEffect(()=>{
        if(C <= 10 ) setInfo('따뜻한 음료가 잘 팔릴 것 같아요.');
        else if(C <= 20) setInfo('시원한 음료가 잘 팔릴 것 같아요.')
    }, [C]);

    if( isLoading || (info == "" && !error)){
      return (<AlarmLoading/>)
    }

    return(
    <div className="box h-20 text-sm items-center justify-center">
      <div className="flex space-x-3 justify-center items-center text-gray-800">
        {info && <p>현재 <span className="font-bold">{C}°C</span>로 {info}</p>}
        {error && <p>위치 접근이 거부되었습니다.</p>}
        <div className="" onClick={onClick}>
          <Image src={"/icons/Cancel.png"} alt="cancle" width={25} height={25}></Image>
        </div>
      </div>
    </div>)
}


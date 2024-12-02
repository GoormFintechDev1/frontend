"use client"

import { useWeather } from "@/hooks/useWeatherQuery";
import { useEffect, useMemo, useState } from "react"

export default function Alarm(){

    const [geolocation, setGeoLocation] = useState({
        long:0,
        lat:0,
    });

    const [info, setInfo] = useState("");


    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          setGeoLocation({
            long: position.coords.longitude,
            lat: position.coords.latitude,
          });
        });
      }, []);


    const {data:weather} = useWeather(geolocation);

    const C = useMemo(()=>Math.round((weather?.main?.temp-32)%1.8), [weather]);

    useEffect(()=>{
        if(C <= 10 ) setInfo("오늘 날씨는 영상 10도 이하이니 따뜻한 음료가 잘 팔릴 거예요.")
    }, [C])


    return(
    <div className="box h-10 text-sm items-center justify-center">
        <p className=""> {info}</p>
    </div>)
}


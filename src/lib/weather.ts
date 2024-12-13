import { Weather } from "@/interface/weather";

const WEATHER_KEY =
  process.env.NODE_ENV === "production"
    ? process.env.WEATHER_KEY
    : process.env.NEXT_PUBLIC_WEATHER_KEY;

export const getWeather = async({lat,long}:Weather) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${WEATHER_KEY}`, {
        method: "GET",
      });
    
        if (!response.ok) throw new Error("weather api error");
  
    return response.json();
  }
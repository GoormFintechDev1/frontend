import { Weather } from "@/interface/weather";

const API_KEY = "923e8dfdb94ace794fe0f0f785023f3e";

export const getWeather = async({lat,long}:Weather) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`, {
        method: "GET",
      });
    
        if (!response.ok) throw new Error("weather api error");
  
    return response.json();
  }
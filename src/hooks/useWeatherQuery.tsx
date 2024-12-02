import { Weather } from "@/interface/weather"
import { getWeather } from "@/lib/weather"
import { useQuery } from "@tanstack/react-query"


export const useWeather = (input:Weather) => {
    return useQuery({
        queryKey: ["weather"],
        queryFn: () => getWeather(input),
        enabled: input.long !== 0 && input.lat !== 0,
    })
}
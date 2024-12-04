import { RecommendCard } from "@/lib/cardApi"
import { useQuery } from "@tanstack/react-query"

export const useRecCard = (paramMonth: string) => {
    return useQuery({
      queryKey: ['RecommendCard'],
      queryFn: () => RecommendCard(paramMonth),
    })
  }
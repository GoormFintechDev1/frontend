import { getProduct } from "@/lib/productApi";
import { useQuery } from "@tanstack/react-query"

export const useProduct = () => {
    return useQuery({
      queryKey: ['productall'],
      queryFn: getProduct,
    })
  }

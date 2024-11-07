import { BusinessInfo } from "@/interface/business"
import { validateBR } from "@/lib/brApi"
import { useMutation } from "@tanstack/react-query"

export const useValidateBR = () => {
    return useMutation({
      mutationFn: (data:BusinessInfo) => validateBR(data),
    })
  }
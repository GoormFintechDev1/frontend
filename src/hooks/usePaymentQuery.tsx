import { Payment } from "@/interface/payment";
import { setPayment } from "@/lib/payment";
import { useMutation } from "@tanstack/react-query"

// export const usePaymentWidget = (clientKey:string, customerKey:string) => {
//     return useQuery({
//         queryKey: ["payment-widget", clientKey , customerKey],
//         queryFn: ()=>{return loadPaymentWidget(clientKey, customerKey);}
//     })
// }

export const usePayment = () => {
    return useMutation({
        mutationFn: (data:Payment) => setPayment(data),
        onSuccess: () => console.log('success')
    })
}
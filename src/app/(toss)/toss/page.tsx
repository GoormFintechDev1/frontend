"use client"

// import { loadTossPayments } from "@tosspayments/payment-sdk";
import { ANONYMOUS, loadTossPayments,  } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";



const clientKey = "test_ck_Poxy1XQL8Rl0boAj5BP5V7nO5Wml";

//성공 버전 2
export default function toss() {

    const searchParams = useSearchParams();
    const [payment, setPayment] = useState(null);
    const [amount] = useState({
      currency: "KRW",
      value: Number(searchParams.get("price")),
    });

    const orderID = window.btoa(Math.random().toString(36).substring(2));
    
    // const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    // function selectPaymentMethod(method) {
    //   setSelectedPaymentMethod(method);
    // }

    useEffect(() => {
      async function fetchPayment() {
        try {
          const tossPayments = await loadTossPayments(clientKey);
  
          // 비회원 결제
          // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentspayment
          const payment = tossPayments.payment({
            customerKey: ANONYMOUS,
          });
  
          setPayment(payment);
        } catch (error) {
          console.error("Error fetching payment:", error);
        }
      }
  
      fetchPayment();
    }, [clientKey]);


    async function requestPayment() {
      // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
      // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
      await payment.requestPayment({
        method: "CARD", // 카드 및 간편결제
        amount: amount,
        orderId: orderID, // 고유 주분번호
        orderName: "토스 티셔츠 외 2건",
        successUrl: window.location.origin + "/success", // 결제 요청이 성공하면 리다이렉트되는 URL
        failUrl: window.location.origin + "/fail", // 결제 요청이 실패하면 리다이렉트되는 URL
        customerEmail: "customer123@gmail.com",
        customerName: "김토스",
        customerMobilePhone: "01012341234",
        // 카드 결제에 필요한 정보
        card: {
          useEscrow: false,
          flowMode: "DEFAULT",
          useCardPoint: false,
          useAppCardOnly: false,
        },
      });
    }
  
    
    return (
       <div>
        <button className="button" onClick={()=>requestPayment()}>결제하기</button>
       </div>

    )
}

//성공버전!!! v1 
//https://docs.tosspayments.com/guides/payment/integration
// const clientKey = "test_ck_Poxy1XQL8Rl0boAj5BP5V7nO5Wml";
// export default function PaymentPage() {
//   const handlePayment = async () => {
//     const tossPayments = await loadTossPayments(clientKey);

//     tossPayments
//       .requestPayment("카드", {
//         amount: 100, // 결제 금액
//         orderId: "Rk-bOmTzkOoZ7ANjBTjni", // 주문번호
//         orderName: "테스트 결제", // 상품명
//         customerName: "김토스", // 구매자 이름
//         successUrl: "http://localhost:3000/success", // 결제 성공 시 이동 URL
//         failUrl: "http://localhost:3000/fail", // 결제 실패 시 이동 URL
//       })
//       .catch((error) => {
//         if (error.code === "USER_CANCEL") {
//           alert("결제를 취소했습니다.");
//         } else if (error.code === "INVALID_CARD_COMPANY") {
//           alert("유효하지 않은 카드입니다.");
//         } else {
//           alert("결제 중 오류가 발생했습니다.");
//           console.error(error);
//         }
//       });
//   };

//   return (
//     <div>
//       <button onClick={handlePayment}>결제하기</button>
//     </div>
//   );
// }

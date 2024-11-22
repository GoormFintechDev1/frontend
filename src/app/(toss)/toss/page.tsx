"use client"

// import { loadTossPayments } from "@tosspayments/payment-sdk";
//토스 결제창 연동 
import { ANONYMOUS, loadTossPayments,  } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
// // import "../../(toss)/toss.css";
// import { useSearchParams } from "next/navigation";



const clientKey = "test_ck_Poxy1XQL8Rl0boAj5BP5V7nO5Wml";
// const secretKey = "test_sk_ORzdMaqN3w2znJypkbAM85AkYXQG";


export default function toss() {

    const [payment, setPayment] = useState(null);
    const [amount] = useState({
      currency: "KRW",
      value: 50000,
    });
    
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    // const searchParams = useSearchParams();

    function selectPaymentMethod(method) {
      setSelectedPaymentMethod(method);
    }

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
        orderId: "-3FskhYw03p0wbMUzbZzB", // 고유 주분번호
        orderName: "토스 티셔츠 외 2건",
        successUrl: window.location.origin + "/success", // 결제 요청이 성공하면 리다이렉트되는 URL
        failUrl: window.location.origin + "/fail", // 결제 요청이 실패하면 리다이렉트되는 URL
        customerEmail: "customer123@gmail.com",
        customerName: "김토스",
        customerMobilePhone: "01012341234",
        // 카드 결제에 필요한 정보
        card: {
          useEscrow: false,
          flowMode: "DEFAULT", // 자체창 여는 옵션
          // cardCompany: "농협", // 카드사 자체창
          // easyPay: "토스페이", // 간편결제 자체창
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


// export default function (){

//   const [amount, setAmount] = useState({
//     currency: "KRW",
//     value: 50_000,
//   });

//   const [ready, setReady] = useState(false);
//   const [widgets, setWidgets] = useState(null);

//   useEffect(() => {
//     async function fetchPaymentWidgets() {
//       // ------  결제위젯 초기화 ------
//       const tossPayments = await loadTossPayments(clientKey);
//       // 회원 결제
//       // const widgets = tossPayments.widgets({
//       //   customerKey,
//       // });
//       // 비회원 결제
//       const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
  
//       setWidgets(widgets);
//     }
  
//     fetchPaymentWidgets();
//   }, [clientKey, customerKey]);


//   useEffect(() => {
//     async function renderPaymentWidgets() {
//       if (widgets == null) {
//         return;
//       }
//       // ------ 주문의 결제 금액 설정 ------
//       await widgets.setAmount(amount);
  
//       await Promise.all([
//         // ------  결제 UI 렌더링 ------
//         widgets.renderPaymentMethods({
//           selector: "#payment-method",
//           variantKey: "DEFAULT",
//         }),
//         // ------  이용약관 UI 렌더링 ------
//         widgets.renderAgreement({
//           selector: "#agreement",
//           variantKey: "AGREEMENT",
//         }),
//       ]);
  
//       setReady(true);
//     }
  
//     renderPaymentWidgets();
//   }, [widgets]);

//   useEffect(() => {
//     if (widgets == null) {
//       return;
//     }
  
//     widgets.setAmount(amount);
//   }, [widgets, amount]);
  


//   return (<div>
//     <div className="wrapper">
//     <div className="box_section">
//       {/* 결제 UI */}
//       <div id="payment-method" />
//       {/* 이용약관 UI */}
//       <div id="agreement" />
//       {/* 쿠폰 체크박스 */}
//       {/* <div>
//         <div>
//           <label htmlFor="coupon-box">
//             <input
//               id="coupon-box"
//               type="checkbox"
//               aria-checked="true"
//               disabled={!ready}
//               onChange={(event) => {
//                 // ------  주문서의 결제 금액이 변경되었을 경우 결제 금액 업데이트 ------
//                 setAmount(event.target.checked ? amount - 5_000 : amount + 5_000);
//               }}
//             />
//             <span>5,000원 쿠폰 적용</span>
//           </label>
//         </div>
//       </div> */}

//       {/* 결제하기 버튼 */}
//       <button
//         className="button"
//         disabled={!ready}
//         onClick={async () => {
//           try {
//             // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
//             // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
//             // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
//             await widgets.requestPayment({
//               orderId: "SGSd6VjmDvYzIsyZdLwNE",
//               orderName: "토스 티셔츠 외 2건",
//               successUrl: window.location.origin + "/success",
//               failUrl: window.location.origin + "/fail",
//               customerEmail: "customer123@gmail.com",
//               customerName: "김토스",
//               customerMobilePhone: "01012341234",
//             });
//           } catch (error) {
//             // 에러 처리하기
//             console.error(error);
//           }
//         }}
//       >
//         결제하기
//       </button>
//     </div>
//   </div>
//   </div>)
// }

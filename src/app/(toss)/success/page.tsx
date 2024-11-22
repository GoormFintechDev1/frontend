"use client"

import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import Link from "next/link";

import { usePayment } from "@/hooks/usePaymentQuery";
import { useEffect } from "react";

// interface Payment {
//     orderName: string;
//     approvedAt: string;
//     receipt: {
//       url: string;
//     };
//     totalAmount: number;
//     method: "카드" | "가상계좌" | "계좌이체";
//     paymentKey: string;
//     orderId: string;
// }

// export default function SuccessPage() {
//   const router = useRouter();

//   const paymentKey = searchParams.get("paymentKey");
//   const orderId = searchParams.get("orderId");
//   const amount = searchParams.get("amount");

//   const [payment, setPayment] = useState<Payment | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const confirmPayment = async () => {
//       try {
//         if (!paymentKey || !orderId || !amount) {
//           return; // 필요한 값이 없으면 요청하지 않음
//         }

//         const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_TOSS_PAYMENTS_SECRET_KEY}:`).toString(
//               "base64"
//             )}`,
//           },
//           body: JSON.stringify({
//             paymentKey,
//             orderId,
//             amount,
//           }),
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(JSON.stringify(errorData));
//         }

//         const paymentData = await response.json();
//         setPayment(paymentData);
//       } catch (err: any) {
//         const errorData = JSON.parse(err.message);
//         setError(errorData.message);

//         router.push(`/fail?code=${errorData.code}&message=${encodeURIComponent(errorData.message)}`);
//       }
//     };

//     confirmPayment();
//   }, [paymentKey, orderId, amount, router]);

//   if (!payment && !error) {
//     return <p>Loading...</p>; // 로딩 상태 처리
//   }

//   if (error) {
//     return <p>결제를 처리하는 도중 문제가 발생했습니다: {error}</p>; // 에러 처리
//   }

//   return (
//     <main>
//       <div className="box_section" style={{ width: "600px" }}>
//         <img width="100px" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" />
//         <h2>결제를 완료했어요</h2>
//         <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
//           <div className="p-grid-col text--left">
//             <b>결제금액</b>
//           </div>
//           <div className="p-grid-col text--right" id="amount">
//             {payment?.totalAmount.toLocaleString()}원
//           </div>
//         </div>
//         <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
//           <div className="p-grid-col text--left">
//             <b>주문번호</b>
//           </div>
//           <div className="p-grid-col text--right" id="orderId">
//             {payment?.orderId}
//           </div>
//         </div>
//         <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
//           <div className="p-grid-col text--left">
//             <b>paymentKey</b>
//           </div>
//           <div className="p-grid-col text--right" id="paymentKey" style={{ whiteSpace: "initial", width: "250px" }}>
//             {payment?.paymentKey}
//           </div>
//         </div>
//         <div className="p-grid-col">
//           <Link href="https://docs.tosspayments.com/guides/payment-widget/integration">
//             <button className="button p-grid-col5">연동 문서</button>
//           </Link>
//           <Link href="https://discord.gg/A4fRFXQhRu">
//             <button className="button p-grid-col5" style={{ backgroundColor: "#e8f3ff", color: "#1b64da" }}>
//               실시간 문의
//             </button>
//           </Link>
//         </div>
//       </div>
//       <div className="box_section" style={{ width: "600px", textAlign: "left" }}>
//         <b>Response Data :</b>
//         <div id="response" style={{ whiteSpace: "initial" }}>
//           {payment && <pre>{JSON.stringify(payment, null, 4)}</pre>}
//         </div>
//       </div>
//     </main>
//   );
// }




export default function Success(){

    const searchParams = useSearchParams();
    const router = useRouter();

    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");

    if (!paymentKey && !orderId && !amount){
        router.push("/shop");
    }

    const paymentConfirm = usePayment();

    useEffect(()=>{
        paymentConfirm.mutate({paymentKey, orderId, amount});
    },[])


    console.log({paymentKey, orderId, amount})

    return (
        <div>

        </div>
    )
}
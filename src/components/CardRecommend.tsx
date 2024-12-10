"use client";

import { useUserInfo } from "@/hooks/useUserQuery";
import Link from "next/link";

const CardRecommend = () => {
  const {data:user, isLoading} = useUserInfo();

  if(isLoading){
    return(
      <div className="flex flex-col justify-center bg-gray-100 p-5 m-5 rounded-lg animate-pulse">
        <div className="bg-gray-300 h-8 rounded"></div>
      </div>
    )
  }
  
  return (
    <Link href={"/card"}>
      <div className="bg-gray-100 p-5 rounded-lg text-sm m-5">
        <div className="flex flex-col text-center">
          <div className=""><span className="font-bold">{user?.companyName}</span>에 맞는 카드 추천 보러가기</div>
          {/* <div className="font-bold text-center">{convertToKoreanWon(card[0].totalSaving)} 할인 받기!</div>
          <div className="text-xs text-gray-700 text-right" style={{fontSize:'10px'}}> {paramMonth.slice(0,4)}년 {paramMonth.slice(5,7)}월 기준</div> */}
        </div>
        {/* <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg mr-4">
          <Image src={card.imageURL} alt={card.cardName} width={24} height={24} className="rounded"/>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">{card.cardName}</p>
          <p className="text-gray-500 text-sm">{Array.isArray(card.benefits) ? card.benefits[0] : card.benefits}</p>
        </div> */}
      </div>
    </Link>
    
  );
};

export default CardRecommend;

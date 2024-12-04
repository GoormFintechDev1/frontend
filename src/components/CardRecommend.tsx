"use client";

import { Card } from "@/interface/card";
import Image from "next/image";

interface CardRecommendProps {
  cards: Card[]; 
}

const CardRecommend = ({ cards }: CardRecommendProps) => {
  if (!cards || cards.length === 0) {
    return <p className="text-gray-500 text-center mt-4">추천할 카드가 없습니다.</p>;
  }

  const card = cards[0];

  return (
    <div className="bg-gray-50 p-5 rounded-lg shadow-md flex items-center">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg mr-4">
        <Image src={card.imageURL} alt={card.cardName} width={24} height={24} className="rounded"/>
      </div>
      {/* 카드 추천 내용 */}
      <div className="flex-1">
        <p className="font-semibold text-sm">{card.cardName}</p>
        <p className="text-gray-500 text-sm">{Array.isArray(card.benefits) ? card.benefits[0] : card.benefits}</p>
      </div>
    </div>
  );
};

export default CardRecommend;

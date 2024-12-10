"use client";
import Loading from "@/components/Loading";
import { useRecCard } from "@/hooks/useCardQuery";
import { paramMonth } from "@/utils/calculateDay";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Card() {
    const { data: cards } = useRecCard(paramMonth);
    // console.log(cards);

    const router = useRouter();
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    if (!cards || cards.length === 0) {
        return <Loading/>;
    }

    const currentCard = cards[currentCardIndex];

    const handlePrev = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="container">
            <div className="col-span-2 flex flex-col justify-between">
                <div className="mb-4">
                    <Link href={"#"} onClick={router.back}>
                        <Image src={"/icons/arrow.png"} alt="arrow" width={24} height={24} />
                    </Link>
                </div>

                <div className="mb-8">
                    <h1 className="font-bold text-xl mb-1"> 카드 추천 </h1>
                    <p className="text-gray-500 text-sm">지출 내역을 분석해 적절한 카드를 추천드려요.</p>
                </div>

                {/* <div className="text-center mb-5">
                    <p className="font-semibold">{currentCard.corporateName}</p>
                </div> */}

                <div className="flex justify-center items-center mb-6">
                    <button onClick={handlePrev} className="text-gray-500 text-2xl font-bold px-4">
                        &lt;
                    </button>

                    <div className={`w-48 h-72 rounded-lg flex items-center justify-center shadow-2xl transition-all duration-500`}>
                        <Image
                            src={currentCard.imageURL}
                            alt={currentCard.cardName}
                            width={192}
                            height={288}
                            className="rounded-lg"
                        />
                        </div>

                    <button onClick={handleNext} className="text-gray-500 text-2xl font-bold px-4">
                        &gt;
                    </button>
                </div>

                <div className="text-center mb-5">
                    <p className="text-center font-bold text-lg text-gray-700 mt-2"><span className="text-emerald-500">{currentCard.totalSaving}</span> 원 절약 가능</p>
                    <p className="text-gray-600 text-sm mb-2">{currentCard.cardName}</p>
                </div>

                {/* 키워드 중 하나라도 포함되어 있지 않으면 표시하지 않음 */}
                <div className="text-center">
                    {/* <p className="text-lg mb-1 text-gray-700"> 혜택 사항</p> */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <ul className="text-sm text-gray-800 space-y-2 list-disc list-inside">
                        {currentCard.benefits &&
                            Array.isArray(currentCard.benefits) &&
                            currentCard.benefits
                            .filter((benefit: string) => benefit.trim() !== "") // 비어 있지 않은 혜택 필터링
                            .filter((benefit: string) => {
                                // 포함하려는 단어 목록
                                const keywords = ["공과금", "쇼핑", "통신", "마트", "식음료", "주유"];
                                // 하나라도 포함되어 있는지 확인
                                return keywords.some((keyword) => benefit.includes(keyword));
                            })
                            .map((benefit: string, index: number) => (
                                <li key={index} className="">
                                <label>{benefit}</label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

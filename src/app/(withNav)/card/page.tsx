"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Card() {
    const router = useRouter();
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    // 카드 데이터 
    const cards = [
        { id: 1, name: "KB 국민 My WE:SH 카드", mainbf:["공과금 20% 캐시백 "], benefits: ["이득1", "이득2", "이득3"], color: "bg-orange-300" },
        { id: 2, name: "신한 Deep Dream 카드", mainbf:["통신비 10% 캐시백"], benefits: ["이득4", "이득5", "이득6"], color: "bg-blue-300" },
        { id: 3, name: "현대 Zero 카드", mainbf:["쇼핑(재료비) 20% 할인"], benefits: ["이득7", "이득8", "이득9"], color: "bg-green-300" },
    ];

    const handlePrev = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1));
    };

    const currentCard = cards[currentCardIndex];

    return (
        <div className="container">
            <div className="col-span-2 flex flex-col justify-between">
                <div className="mb-4">
                    <Link href={"#"} onClick={router.back}>
                    <Image src={"/icons/arrow.png"} alt="arrow" width={24} height={24} />
                    </Link>
                </div>

                <div className="mb-5">
                    <h1 className="font-bold text-xl mb-1"> 카드 추천 </h1>
                    <p className="text-gray-500">지출 내역을 분석해 적절한 카드를 추천드려요.</p>
                </div>

                
                <div className="flex justify-center items-center mb-6">
                    <button onClick={handlePrev}
                        className="text-gray-500  text-2xl font-bold px-4"
                    >
                        &lt;
                    </button>

                    <div
                        className={`w-48 h-72 ${currentCard.color} rounded-lg flex items-center justify-center shadow-lg transition-all duration-500`}
                    >
                        <span className="text-gray-600 font-semibold">{currentCard.name}</span>
                    </div>

                    <button
                        onClick={handleNext}
                        className="text-gray-500  text-2xl font-bold px-4"
                    >
                        &gt;
                    </button>
                </div>


                <div className="text-center mb-10">
                    <p className="text-gray-600 font-semibold mb-2">{currentCard.name}</p>
                    <h1 className="font-bold">{currentCard.mainbf}</h1>
                </div>

                <div className="text-center">
                    <p className="text-lg mb-1 text-gray-700">연회비 및 추가 혜택 사항</p>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                        <ul className="text-md text-gray-600 space-y-2">
                            <li>{currentCard.benefits[0]}</li>
                            <li>{currentCard.benefits[1]}</li>
                            <li>{currentCard.benefits[2]}</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};
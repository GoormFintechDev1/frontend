"use client"

import Image from "next/image";
import { useState } from "react";

export default function Detail() {
    const [isLiked, setIsLiked] = useState(false);

    const toggleLike = () => {
        setIsLiked(!isLiked);
    };


    return (
        <div className="flex flex-col h-screen ">
            <div>
                <button className="absolute top-2 left-2 text-gray-400 p-2 text-3xl">
                    &lt;
                </button>
            </div>
            {/* 게시글 이미지 */}
            <div className="relative">
                
                <Image 
                    src="/detail.jpg" 
                    alt="로고" 
                    width={400} 
                    height={400}
                />
            </div>

            {/* 사용자 정보 및 지팡이 레벨  */}
            <div className="flex justify-between items-center py-8 border-t-2">
                <h2 className="text-2xl font-extralight py-2 ml-3">잠오는 프로도</h2>
                <p className="">{/* 지팡이 레벨*/ }</p>
            </div>

            {/* 게시글 정보 */}
            <div className="border-t-2 py-6 flex-grow ml-3">
                <h1 className="text-2xl font-semibold">지팡이 팔아요~</h1>
                <span className="flex items-center justify-between mt-2">
                    <p className="text-gray-500">지팡이</p>
                    <p className="text-gray-500">3분 전</p>
                </span>
                <p className="mt-5 text-lg">이제 필요 없슈~!<br/>~~~~~~</p>
            </div>

            {/* 거래 희망 장소 */}
            <div className="flex-grow my-1 ml-3 border-b-2">
                <p className="text-gray-700 font-bold">📍거래 희망 장소</p>
                <p className="text-gray-700">우리 집 근처에서 거래해요.</p>
            </div>

            {/* 하단 바 */}
            <div className="flex items-center justify-between my-2">
                <button onClick={toggleLike} className="text-red-500 text-3xl ml-3">
                    {isLiked ? "❤️" : "🤍"}
                </button>
                <p className="text-2xl ">20,000</p>
                <button className="bg-emerald-400 text-white h-16 w-48 rounded-xl px-4 text-2xl">거래 요청하기</button>
            </div>
        </div>

        
    );
    
}
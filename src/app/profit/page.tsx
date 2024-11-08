"use client";

import { useEffect, useState } from "react";

export default function Income() {
    const [month, setMonth] = useState(11);
    const income = 92500000;
    const [showFireworks, setShowFireworks] = useState(false);

    useEffect(() => {
        setShowFireworks(true);
        const timer = setTimeout(() => setShowFireworks(false), 1000); // 1초 후 애니메이션 숨기기
        return () => clearTimeout(timer);
    }, []);

    const handlePreviousMonth = () => {
        setMonth((prev) => (prev > 1 ? prev - 1 : 12));
    };

    const handleNextMonth = () => {
        setMonth((prev) => (prev < 12 ? prev + 1 : 1));
    };

    return (

        // 애니메이션
        <div className="container min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
            {showFireworks && (
                <div className="fixed inset-0 z-50 flex justify-center items-center pointer-events-none">
                    <div className="fireworks-container">
                        {[...Array(30)].map((_, i) => {
                            const angle = Math.random() * 360; // 0 to 360 degrees
                            const distance = Math.random() * 200 + 50; // Distance for explosion
                            const x = Math.cos((angle * Math.PI) / 180) * distance;
                            const y = Math.sin((angle * Math.PI) / 180) * distance;
                            return (
                                <div
                                    key={i}
                                    className="coin"
                                    style={{
                                        animationDelay: `${i * 0.02}s`,
                                        "--x": `${x}px`,
                                        "--y": `${y}px`,
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="container">
                <div className="w-full max-w-md text-center">
                    <div className="flex justify-between items-center mb-6">
                        <button onClick={handlePreviousMonth} className="text-2xl">{'<'}</button>
                        <div className="text-xl font-semibold">{month}월</div>
                        <button onClick={handleNextMonth} className="text-2xl">{'>'}</button>
                    </div>

                    <div className="mt-16">
                        <div className="text-lg font-medium mb-4">이번 달 총 순수익은?</div>
                        <div className="text-2xl font-bold text-black mb-6">{income.toLocaleString()}원 입니다.</div>
                    </div>

                    <div className="text-left text-gray-600 space-y-2 ml-20 mt-20">
                        <div>➕ 총 매출: 100,000,000원</div>
                        <div>➖ 매출 원가: 4,000,000원</div>
                        <div>➖ 운영비용: 2,500,000원 </div>
                        <div>➖ 세금: 1,000,000원 </div>
                    </div>

                    <div className="mt-48 flex justify-center w-full ">
                        <button className="button">
                            월간 리포트 보러 가기
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .fireworks-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    overflow: hidden;
                }
                .coin {
                    position: absolute;
                    width: 30px; 
                    height: 30px;
                    background-image: url("/coin.png"); 
                    background-size: cover;
                    top: 50%;
                    left: 50%;
                    animation: explode 0.4s ease-out forwards;
                    transform: translate(-50%, -50%);
                }
                @keyframes explode {
                    0% {
                        transform: translate(-50%, -50%) scale(0.5);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(var(--x), var(--y)) scale(1.5); /* 크기 조정 */
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
}
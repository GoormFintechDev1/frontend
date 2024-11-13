"use client"

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ReportDetail() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialMonth = searchParams.get('month') || '11월'; // 기본값을 11월로 설정
    const [month, setMonth] = useState(initialMonth);

    const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

    // 현재 월의 인덱스를 가져오는 함수
    const getCurrentMonthIndex = () => months.indexOf(month);

    // 이전 달로 이동하는 함수
    const handlePreviousMonth = () => {
        const currentIndex = getCurrentMonthIndex();
        const newIndex = currentIndex === 0 ? months.length - 1 : currentIndex - 1;
        setMonth(months[newIndex]);
        router.push(`/reportdetail?month=${months[newIndex]}`);
    };

    // 다음 달로 이동하는 함수
    const handleNextMonth = () => {
        const currentIndex = getCurrentMonthIndex();
        const newIndex = currentIndex === months.length - 1 ? 0 : currentIndex + 1;
        setMonth(months[newIndex]);
        router.push(`/reportdetail?month=${months[newIndex]}`);
    };

    return (
        <div className="container">
            <div className="flex items-center mb-4">
                <button onClick={() => window.history.back()} className="mr-2 text-gray-600 text-xl font-bold">
                    {"<"}
                </button>
            </div>
            
            <div className="p-4 text-center">
                <div className="flex items-center justify-center space-x-4">
                    <button onClick={handlePreviousMonth} className="text-xl font-semibold px-2">
                        {"<"}
                    </button>
                    <h1 className="text-2xl font-extralight">000의 <br/>{month} 월간 리포트</h1>
                    <button onClick={handleNextMonth} className="text-xl font-semibold px-2">
                        {">"}
                    </button>
                </div>
            </div>

            <div className="p-4">
                <p>qweqweqweqweqweqweqweqweqweqw <br/> qweasdfasdfsadfasdf</p>
            </div>
        </div>
    );
}

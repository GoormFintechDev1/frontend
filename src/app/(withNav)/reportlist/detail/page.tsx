"use client"

import { useReportQuery } from '@/hooks/useReportQuery';
import useReportsStore from '@/stores/useReportsStore';
import { handleNextMonth, handlePrevMonth } from '@/utils/calculateDay';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ReportDetail() {
    const searchParams = useSearchParams();
    const initialMonth = searchParams.get('month') || '2024-11'; // 기본값을 11월로 설정
    const [month, setMonth] = useState(initialMonth);

    useReportQuery(month);

    const reportData = useReportsStore((state) => state.content);

    console.log(reportData);

    return (
        <div className="container">
            <div className="flex items-center mb-4">
                <button onClick={() => window.history.back()} className="mr-2 text-gray-600 text-xl font-bold">
                    {"<"}
                </button>
            </div>
            
            <div className="p-4 text-center">
                <div className="flex items-center justify-center space-x-4">
                    <button onClick={() => setMonth(handlePrevMonth(month))} className="text-xl font-semibold px-2">
                        {"<"}
                    </button>
                    <h1 className="text-2xl font-extralight">000의 <br/>{month} 월간 리포트</h1>
                    <button onClick={() => setMonth(handleNextMonth(month))} className="text-xl font-semibold px-2">
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

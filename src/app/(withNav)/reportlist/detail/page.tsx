"use client"

import ReportItem from '@/components/reportlist/ReportItem';
import { useReportQuery } from '@/hooks/useReportQuery';
import useReportsStore from '@/stores/useReportsStore';
import { handleNextMonth, handlePrevMonth } from '@/utils/calculateDay';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import dayjs from "dayjs";
import { useUserInfo } from '@/hooks/useUserQuery';
dayjs().format();

export default function ReportDetail() {
    const searchParams = useSearchParams();
    const initialMonth = searchParams.get('month') || '2024-11'; // 기본값을 11월로 설정
    const [month, setMonth] = useState(initialMonth);

    useReportQuery(month);

    const reportData = useReportsStore((state) => state.data);

    console.log(reportData);

    const {data: useInfo} = useUserInfo();

    return (
        <div className="container">
            <div className="flex items-center mb-4">
                <button onClick={() => window.history.back()} className="mr-2 text-gray-600 text-xl font-bold">
                    <Image src={"/icons/arrow.png"} alt="PrevPage" width={28} height={28} />
                </button>
            </div>
            
            <div className="p-4 text-center">
                <div className="flex items-center justify-center space-x-4">
                    <button onClick={() => setMonth(handlePrevMonth(month))} className="text-xl font-semibold px-2">
                        <Image src={"/icons/Back.png"} alt="PrevMonth" width={24} height={24} />
                    </button>
                    <h1 className="text-2xl font-extralight"><span>{useInfo?.companyName}</span> <br/>{month} 월간 리포트</h1>
                    <button onClick={() => setMonth(handleNextMonth(month))} className="text-xl font-semibold px-2">
                        <Image src={"/icons/Forward.png"} alt="NextMonth" width={24} height={24} />
                    </button>
                </div>
            </div>

            <div className="p-4">
                {reportData.map((item, index) => (
                    <ReportItem key={index} item={item} />
                ))}
            </div>
        </div>
    );
}

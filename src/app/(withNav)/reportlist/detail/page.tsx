"use client"

// import ReportItem from '@/components/reportlist/ReportItem';
import { useReportQuery, useReportQuery2 } from '@/hooks/useReportQuery';
import useReportsStore from '@/stores/useReportsStore';
// import { handleNextMonth, handlePrevMonth } from '@/utils/calculateDay';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
// import { useState } from 'react';
import dayjs from "dayjs";
import { useUserInfo } from '@/hooks/useUserQuery';
import ReportIndusty from '@/components/reportlist/ReportIndusty';
import ReportMarket from '@/components/reportlist/ReportMarket';
dayjs().format();

export default function ReportDetail() {
    const searchParams = useSearchParams();
    const initialMonth = searchParams.get('month') || '2024-11'; // 기본값을 11월로 설정
    // const [month, setMonth] = useState(initialMonth);
    const month = initialMonth;

    // useReportQuery(month);

    // const reportData = useReportsStore((state) => state.data);

    
    const {data: useInfo} = useUserInfo();
    const {data: reportData} = useReportQuery2(month);

    return (
        <div className="container h-full">
            <div className="flex items-center mb-4">
                <button onClick={() => window.history.back()} className="mr-2 text-gray-600 text-xl font-bold">
                    <Image src={"/icons/arrow.png"} alt="PrevPage" width={28} height={28} />
                </button>
            </div>
            
            <div className=" mt-4">
                <div className="flex items-left space-x-4 ">
                    {/* <button onClick={() => setMonth(handlePrevMonth(month))} className="text-xl font-semibold px-2">
                        <Image src={"/icons/Back.png"} alt="PrevMonth" width={24} height={24} />
                    </button> */}
                    <h1 className="text-xl font-bold pb-4 "><span>{useInfo?.companyName}</span> {month.slice(-2)}월 리포트</h1>
                    {/* <button onClick={() => setMonth(handleNextMonth(month))} className="text-xl font-semibold px-2">
                        <Image src={"/icons/Forward.png"} alt="NextMonth" width={24} height={24} />
                    </button> */}
                </div>
            </div>

            <div className="pt-4 overflow-scroll h-4/5 flex flex-col space-y-10 "> {/* 높이 변경 필요... */}
                {/* {reportData.map((item, index) => (
                    <ReportItem key={index} item={item} />
                ))} */}
                {/* <div>{reportData.reports}</div> */}
                <ReportIndusty report={reportData?.reports.INDUSTRY_REPORT}/>
                <ReportMarket report={reportData?.reports.MARKET_REPORT}/>
            </div>
        </div>
    );
}

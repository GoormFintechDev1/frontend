"use client"

import { useReportQuery2 } from '@/hooks/useReportQuery';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import dayjs from "dayjs";
import { useUserInfo } from '@/hooks/useUserQuery';
import ReportIndusty from '@/components/reportlist/ReportIndusty';
import ReportMarket from '@/components/reportlist/ReportMarket';
import { useEffect, useState } from 'react';
import ReportLoading from '@/components/ReportLoading';
dayjs().format();

export default function ReportDetail() {
    const searchParams = useSearchParams();
    const initialMonth = searchParams.get('month') || '2024-11'; // 기본값을 11월로 설정
    const month = initialMonth;
    const router = useRouter();

    
    const {data: useInfo} = useUserInfo();
    const {data: reportData, isLoading} = useReportQuery2(month);

    const [height, setHeight] = useState("500px");

    useEffect(() => {
        const calculateHeight = () => {
          const calculatedHeight = Math.max(190, Math.floor((window.innerHeight - 135 - 40 - 30)));
          setHeight(`${calculatedHeight}px`);
        };
    
        calculateHeight();
        window.addEventListener("resize", calculateHeight);
    
        return () => {
          window.removeEventListener("resize", calculateHeight);
        };
      }, []);

    
    if(isLoading){
        return <ReportLoading/>
    }

    if(reportData?.reports.INDUSTRY_REPORT.error){
        // alert("에러가 발생했습니다.");
        router.push("/report");
        return
    }

    return (
        <div className="container h-full">
            <div className="flex items-center mb-4">
                <button onClick={() => window.history.back()} className="mr-2 text-gray-600 text-xl font-bold">
                    <Image src={"/icons/arrow.png"} alt="PrevPage" width={28} height={28} />
                </button>
            </div>
            
            <div className=" mt-4">
                <div className="flex items-left space-x-4 ">
                    <h1 className="text-xl font-bold pb-4 "><span>{useInfo?.companyName}</span> {month.slice(-2)}월 리포트</h1>
                </div>
            </div>

            <div className="pt-4 overflow-scroll flex flex-col space-y-10 " style={{height}}> {/* 높이 변경 필요... */}
                { reportData && (<><ReportIndusty report={reportData?.reports.INDUSTRY_REPORT}/>
                <ReportMarket report={reportData?.reports.MARKET_REPORT}/></>)}
            </div>
        </div>
    );
}

"use client"

import { useReportCheck } from '@/hooks/useReportQuery';
import { useUserInfo } from '@/hooks/useUserQuery';
import { getYearMonths, paramMonth, paramMonth2 } from '@/utils/calculateDay';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export default function ReportList() {

    const router = useRouter();

    const {data:user} = useUserInfo();
    const {data:check} = useReportCheck();

    // 계정 생성일
    const start = dayjs(user?.createAt);
    // 현재 날짜
    const today = dayjs().subtract(1, "month"); //이번달 기준 지난달까지만 보여야 하니까!
    const yearMonths = useMemo(()=>getYearMonths(start, today),[start,today]);
    const year = useMemo(()=>Object.keys(yearMonths).sort((a,b)=> Number(b) - Number(a)), [yearMonths]);

    return (
        <div className="container flex flex-col">
            <div className="pb-3 pt-2">
                <h1 className="text-xl font-bold">월간 리포트</h1>
            </div>

            <div className="overflow-y-scroll h-[calc(var(--dynamic-vh)-160px)] flex flex-col justify-center">
                {
                    year.length > 0 ? year.map((y,i)=> (
                        <div key={i} className='h-full'>
                            <div className='font-bold py-5 border-b'>{y}년</div>
                            <ul className='py-5'>
                            {yearMonths[y].map((m,i)=>(
                                <li key={i} className='list-none flex py-3 ' style={{color:"#333333"}} onClick={()=> router.push(`/report/detail?month=${paramMonth2(Number(y),m)}`)}>
                                    <p>{m.toString().padStart(2,'0')}월 리포트</p>
                                    { !check && paramMonth2(Number(y),m+1) == paramMonth &&  <p className='bg-red-500 text-white text-sm px-2 ml-3 rounded justify-self-center'>new</p>}
                                    <span className="ml-auto text-gray-400">&gt;</span>
                                </li>
                            ))}
                            </ul>
                        </div>
                    )) : (
                        <div className='text-center text-sm text-gray-500'>
                            <p>아직 리포트를 생성할 데이터가 없어요!</p>
                        </div>
                    )
                }
                
                {/* <Link href="/reportlist/detail?month=2024-11">
                    <div className="mb-7 p-4 bg-gray-200 text-black rounded-lg cursor-pointer">
                        11월 월간 리포트
                    </div>
                </Link>
                <Link href="/reportlist/detail?month=2024-10">
                    <div className="mb-7 p-4 bg-gray-200 text-black rounded-lg cursor-pointer">
                        10월 월간 리포트
                    </div>
                </Link>
                <Link href="/reportlist/detail?month=2024-09">
                    <div className="mb-7 p-4 bg-gray-200 text-black rounded-lg cursor-pointer">
                        9월 월간 리포트
                    </div>
                </Link> */}
            </div>
        </div>
    );
}

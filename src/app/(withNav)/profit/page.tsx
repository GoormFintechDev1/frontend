"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useProfitDetail } from "@/hooks/useProfitQuery";
import { paramMonth2 } from "@/utils/calculateDay";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useUserInfo } from "@/hooks/useUserQuery"; 
import dayjs from "dayjs";
import Loading from "@/components/Loading";
dayjs().format();
dayjs.extend(isSameOrBefore);

export default function Income() {
    const currentMonth = new Date().getMonth() + 1; // 현재 월 (1부터 시작)
    const currentYear = new Date().getFullYear();
    const [month, setMonth] = useState(currentMonth - 1 || 12); // 전달 (1월일 경우 12월로 설정)
    const [year, setYear] = useState(currentMonth === 1 ? currentYear - 1 : currentYear); // 1월일 경우 전년도 설정
    const [count, setCount] = useState(0);

    const { data: userInfo, isLoading } = useUserInfo(); 
    const createAt = userInfo?.createAt ? dayjs(userInfo.createAt) : null; // 가입 날짜를 dayjs로 변환
    const isAfterCreateAt = createAt
        ? createAt.isSameOrBefore(dayjs(`${year}-${month}`, "YYYY-MM"), 'month') // 'month' 단위 비교
        : false;

    const { data: profit } = useProfitDetail(paramMonth2(year, month));
    const targetValue = profit?.netProfit || 0;
    const duration = 2000; // 애니메이션 지속 시간 (ms)
    const increment = Math.ceil(targetValue / (duration / 16));

    // 애니메이션 효과 설정
    useEffect(() => {
        if (targetValue <= 0) {
            setCount(0);
            return;
        }

        let currentCount = 0;
        const interval = setInterval(() => {
            currentCount += increment;
            if (currentCount >= targetValue) {
                setCount(targetValue);
                clearInterval(interval);
            } else {
                setCount(currentCount);
            }
        }, 16);

        return () => clearInterval(interval);
    }, [targetValue, increment]);

    const handlePreviousMonth = () => {
        setMonth((prev) => {
            if (prev === 1) {
                setYear((prevYear) => prevYear - 1); // 1월에서 전달로 넘어가면 전년도 12월
                return 12;
            }
            return prev - 1;
        });
    };

    const handleNextMonth = () => {
        setMonth((prev) => {
            if (prev === currentMonth - 1 && year === currentYear) {
                return prev; // 현재 월보다 다음으로 넘어가지 않음
            }
            if (prev === 12) {
                setYear((prevYear) => prevYear + 1); // 12월에서 다음 달로 넘어가면 다음 해 1월
                return 1;
            }
            return prev + 1;
        });
    };

    // 버튼 클릭 시 동작: 가입한 날짜에 따라 이동 경로 결정
    const handleReportNavigation = () => {
        if (!isAfterCreateAt) {
            window.location.href = "/report"; 
        } else {
            window.location.href = `/report/detail?month=${paramMonth2(year, month)}`; 
        }
    };

    if (isLoading) return <Loading/>; 

    return (
        <div className="container flex flex-col h-full items-center relative overflow-hidden">
            <div className="mb-3 w-full">
                <Link href={"/"}>
                    <Image alt="back" src={"/icons/arrow.png"} width={25} height={25}/>
                </Link>
            </div>
            <div className="flex flex-col w-full h-[calc(var(--dynamic-vh)-170px)] max-w-md text-center p-3 justify-between">
                
                <div className="flex justify-center items-center ">
                    <Image alt="back" onClick={handlePreviousMonth} src={"/icons/smallLeft.png"} width={18} height={18}/>
                    <h1 className="text-xl font-semibold p-3">{month}월 순이익</h1>
                    <Image alt="back" onClick={handleNextMonth} src={"/icons/smallRight.png"} width={18} height={18}/>
                </div>

                <div className="">
                    <div className="text-lg font-medium mb-4">총 순이익은?</div>
                    <div className="text-2xl font-bold text-blue-600 mb-6">
                        {profit ? count.toLocaleString() : "0"}원
                    </div>
                </div>

                <div className="text-left text-gray-600 space-y-2 mx-auto">
                    <div>➕ 총 매출: {profit?.incomeTotal?.toLocaleString() ?? 0}원</div>
                    <div>➖ 원자재비: {profit?.saleCost?.toLocaleString() ?? 0}원</div>
                    <div>➖ 운영비용: {profit?.operatingExpense?.toLocaleString() ?? 0}원</div>
                    <div>➖ 세금: {profit?.taxes?.toLocaleString() ?? 0}원</div>
                </div>

                <div className="flex justify-center w-full">
                    <button className="button" onClick={handleReportNavigation}>
                        {profit ? "월간 리포트 보기" : "리포트 리스트 보기"}
                    </button>
                </div>
            </div>
        </div>
    );
}

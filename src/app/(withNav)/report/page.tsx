"use client"

import Link from 'next/link';

export default function ReportList() {
    return (
        <div className="container">
            <div className="p-2 pb-6">
                <h1 className="text-xl font-bold">월간 리포트</h1>
            </div>

            <div className="p-2">
                <Link href="/reportlist/detail?month=2024-11">
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
                </Link>
            </div>
        </div>
    );
}

"use client"

import { useUserInfo } from "@/hooks/useUserQuery";
import dayjs from "dayjs";
dayjs().format();


export default function MyPage() {
    const {data, isLoading, error} = useUserInfo();

    const {data: useInfo} = useUserInfo();
    console.log(useInfo);

    return (
        <div className="flex flex-col h-screen">
            <div className="flex items-center justify-between ">
                <h1 className="text-xl ml-4 mt-4 p-2 font-extralight"> 📌{data?.companyName} </h1>
            </div>

            <div className="text-right mr-4">
                <p className="text-gray-500 border-b"> 로그아웃 </p>
            </div>

            <div className="flex flex-col p-6 m-6 bg-gray-50 rounded-lg shadow-md">
                <p className="font-extralight text-xl">🔗이름 </p>
                <h1 className="font-bold ml-6 mt-2 text-lg">📍{useInfo?.name}</h1>
            </div>

            <div className="flex flex-col p-6 m-6 bg-gray-50 rounded-lg shadow-md">
                <p className="font-extralight text-xl">📞전화번호</p>
                <h1 className="font-bold ml-6 mt-2 text-lg">📍{useInfo?.phoneNumber}</h1>
            </div>

            <div className="flex flex-col p-6 m-6 bg-gray-50 rounded-lg shadow-md ">
                <p className="font-extralight text-xl">🏠주소 </p>
                <h1 className="font-bold ml-6 mt-2 text-lg">📍{useInfo?.address}</h1>
            </div>
        </div>
    )
}
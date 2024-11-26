"use client"

import { useLogoutMutation } from "@/hooks/useAuthQuery"; 
import { useUserInfo } from "@/hooks/useUserQuery";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";
dayjs().format();


export default function MyPage() {

    const {data: useInfo} = useUserInfo();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const logout = useLogoutMutation();
    const handleLogout = () => {
        logout.mutate(useInfo?.loginId);
    }

    return (
        <div className="container ">
            <div className="items-center border-b">
                    <h1 className="text-xl ml-4 mt-4 p-2 font-semibold"> 📌{useInfo?.companyName} </h1>
                    <h1 className="font-extralight ml-6 mt-2 text-lg">📍{useInfo?.phoneNumber}</h1>
                    <h1 className="font-extralight ml-6 mt-2 text-lg mb-4">📍{useInfo?.address}</h1>
            </div>

            <div className="p-5 border-b flex justify-between items-center">
            <Link href="/mpedit" className="flex justify-between w-full items-center">
                <p className="text-lg">내 정보 수정</p>
                <span className="ml-auto">&gt;</span>
            </Link>
            </div>

            {/* <div className="p-5 border-b flex justify-between items-center">
                <p className="text-lg ">사업자 인증 </p>
                <span className="ml-auto">&gt;</span>
            </div> */}

            <div className="p-5 border-b flex justify-between items-center">
                <p className="text-lg">알림 </p>
                <span className="text-end">&gt;</span>
            </div>

            <div className="p-5 border-b flex justify-between items-center" onClick={openModal}>
                <p className="text-lg "> 로그아웃 </p>
                <span className="text-end">&gt;</span>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <p className="text-lg font-bold mb-4 text-center">
                        정말 로그아웃 하시겠습니까?
                        </p>
                        <p className="text-sm text-gray-500 mb-6 text-center">추가 메시지</p>
                        <div className="flex gap-4 justify-center">
                        <button
                            className="px-4 py-2 bg-emerald-300 rounded-lg"
                            onClick={handleLogout}
                        >
                            예
                        </button>
                        <button
                            className="px-4 py-2 bg-gray-300 rounded-lg"
                            onClick={closeModal}
                        >
                            아니오
                        </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="p-5 border-b flex justify-between items-center">
                <p className="text-lg"> 회원탈퇴 </p>
                <span className="text-end">&gt;</span>
            </div>
        </div>
    )
}
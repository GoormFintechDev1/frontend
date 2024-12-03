"use client";

import { useLogoutMutation } from "@/hooks/useAuthQuery";
import { useUserInfo } from "@/hooks/useUserQuery";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
dayjs().format();

export default function MyPage() {
  const { data: userInfo } = useUserInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const logout = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logout.mutateAsync(userInfo?.loginId); 
      router.push("/login"); 
    } catch (error) {
      console.error("로그아웃 실패:", error); 
    }
  };

  const handleClipboard = async() => {
    try {
        await navigator.clipboard.writeText(userInfo?.brNum);
        //message component 띄우기
      } catch (error) {
        alert(error)
      }
  }

    return (
        <div className="container ">
            <div className="flex flex-col space-y-2 pt-2 pb-7">
                <h1 className="text-xl font-semibold">{userInfo?.companyName}</h1>
                <div className="flex space-x-2 items-center">
                    <h1 className="font-medium text-sm">{userInfo?.brNum.slice(0,3)}-{userInfo?.brNum.slice(3,5)}-{userInfo?.brNum.slice(5,)}</h1>
                    <Image alt="clipboard" src={"/icons/Copy.png"} width={10} height={10} style={{height:"10px"}} onClick={handleClipboard}/>
                </div>
                <h1 className="font-medium text-sm">{userInfo?.address}</h1>
            </div>

            <div
                className="border-b-2 ml-[-25px] w-[calc(100%+50px)]"
                style={{ borderColor: "#F5F5F5" }}>
            </div>

            <div className="pt-7 px-2 flex justify-between ">
                <Link href="/mpedit" className="flex justify-between w-full " style={{ color: "#333333" }}>
                <p>내 정보 수정</p>
                <span className="ml-auto">&gt;</span>
                </Link>
            </div>

             {/* <div className="p-5 border-b flex justify-between items-center">
                <p className="text-lg ">사업자 인증 </p>
                <span className="ml-auto">&gt;</span>
            </div> */}

            <div className="pt-7 px-2 flex justify-between " style={{ color: "#333333" }}>
                <p>알림</p>
                <span className="text-end">&gt;</span>
            </div>

            <div className="pt-7 px-2 flex justify-between ">
                <Link href="/card" className="flex justify-between w-full " style={{ color: "#333333" }}>
                <p>카드 추천</p>
                <span className="text-end">&gt;</span>
                </Link>
            </div>

            <div className="pt-7 px-2 flex justify-between " style={{ color: "#333333" }} onClick={openModal}>
                <p> 로그아웃 </p>
                <span className="text-end">&gt;</span>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                    <p className="text-lg font-bold mb-4 text-center">로그아웃 하시겠습니까?</p>
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

            <div className="pt-7 px-2 flex justify-between " style={{ color: "#333333" }}>
                <p> 회원탈퇴 </p>
                <span className="text-end">&gt;</span>
            </div>
        </div>
    );
}
"use client";

import { useDeleteMutation, useLogoutMutation } from "@/hooks/useAuthQuery";
import { useUserInfo } from "@/hooks/useUserQuery";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Select from "@/components/Select";
dayjs().format();

export default function MyPage() {
  const { data: userInfo } = useUserInfo();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();

  const logout = useLogoutMutation();
  const deleteAccount = useDeleteMutation();

  // 로그아웃
  const handleLogout = async () => {
        try {
            await logout.mutateAsync(userInfo?.loginId || "");
            router.push("/login"); 
        } catch (error) {
            console.error("로그아웃 실패:", error); 
            alert("로그아웃에 실패했습니다. 다시 시도해주세요."); 
        }
    };

    // 회원탈퇴
    const handleDeleteAccount = async () => {
        try {
            await deleteAccount.mutateAsync(userInfo?.loginId || "");
            router.push("/login");
        } catch (error) {
            console.log("회원탈퇴 실패:", error);
            alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.")
        }
    };


    return (
        <div className="container ">
            <div className="flex flex-col space-y-2 pt-2 pb-7">
                <h1 className="text-xl font-semibold">{userInfo?.companyName}</h1>
                <h1 className="font-medium text-sm">{userInfo?.brNum}</h1>
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

            <div className="pt-7 px-2 flex justify-between " style={{ color: "#333333" }} onClick={() => setIsLogoutModalOpen(true)}>
                <p> 로그아웃 </p>
                <span className="text-end">&gt;</span>
            </div>
            <Select
                isOpen={isLogoutModalOpen}
                title="로그아웃 하시겠습니까?"
                message=""
                onConfirm={handleLogout}
                onClose={()=> setIsLogoutModalOpen(false)}
                confirmText="예"
                cancelText="아니오"
                />


            <div className="pt-7 px-2 flex justify-between " style={{ color: "#333333" }} onClick={()=> setIsDeleteModalOpen(true)}>
                <p> 회원탈퇴 </p>
                <span className="text-end">&gt;</span>
            </div>
            <Select
                isOpen={isDeleteModalOpen}
                title="회원탈퇴 하시겠습니까?"
                message="탈퇴 시 모든 정보가 삭제됩니다."
                onConfirm={handleDeleteAccount}
                onClose={()=> setIsDeleteModalOpen(false)}
                confirmText="탈퇴"
                cancelText="취소"
                />
        </div>
    );
}
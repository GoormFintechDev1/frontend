"use client";

import { useDeleteMutation, useLogoutMutation } from "@/hooks/useAuthQuery";
import { useUserInfo } from "@/hooks/useUserQuery";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Select from "@/components/Select";
import Alert from "@/components/Alert";
dayjs().format();

export default function MyPage() {
  const { data: userInfo } = useUserInfo();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

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
            setMessage(error as string);
        }
    };

    // 회원탈퇴
    const handleDeleteAccount = async () => {
        try {
            await deleteAccount.mutateAsync(userInfo?.loginId || "");
            router.push("/login");
        } catch (error) {
            console.log("회원탈퇴 실패:", error);
            setMessage(error as string);
        }
    };


  const handleBrNumClipboard = async() => {
    try {
        await navigator.clipboard.writeText(userInfo?.brNum);
        setMessage("사업자 번호를 복사했어요.")
        setIsAlertOpen(true);
      } catch (error) {
        setMessage(error as string);
      }
  }

  const handleAddressClipboard = async() => {
    try {
        await navigator.clipboard.writeText(userInfo?.address);
        setMessage("사업장 주소를 복사했어요.")
        setIsAlertOpen(true);
      } catch (error) {
        setIsError(true);
        setMessage(error as string);
      }
  }

  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(()=>{
    if (isAlertOpen){
       timerId.current = setTimeout(()=>setIsAlertOpen(false), 1000);
    };

    if(isError){
        timerId.current = setTimeout(()=>setIsError(false),1000);
    }

    return ()=> {
        if (timerId.current !== null) {
          clearTimeout(timerId.current);
          timerId.current = null;
        }
      };
  },[isAlertOpen, isError]);

    return (
        <div className="container ">
            <div className="flex flex-col space-y-2 pt-2 pb-7">
                <h1 className="text-xl font-semibold">{userInfo?.companyName || "가게 이름"}</h1>
                <div className="flex space-x-2 items-center font-medium text-sm">
                   {userInfo? (<h1>{userInfo?.brNum.slice(0,3)}-{userInfo?.brNum.slice(3,5)}-{userInfo?.brNum.slice(5,)}</h1>) : (<p>000-00-00000</p>)}
                    <Image alt="clipboard" src={"/icons/Copy.png"} width={10} height={10} style={{height:"10px"}} onClick={handleBrNumClipboard}/>
                </div>
                <div className="flex space-x-2 items-center">
                    <h1 className="font-medium text-sm">{userInfo?.address || "사업장 주소"}</h1>
                    <Image alt="clipboard" src={"/icons/Copy.png"} width={10} height={10} style={{height:"10px"}} onClick={handleAddressClipboard}/>
                </div>
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

            <Alert isOpen={isAlertOpen} message={message}/>
        </div>
    );
}
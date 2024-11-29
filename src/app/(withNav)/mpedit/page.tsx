"use client"

import { useCheckPhoneNumber } from "@/hooks/useAuthQuery";
import { InputType2 } from "@/interface/register";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// interface Props {
//     onReadySubmit: (data: InputType2) => void;
//     onPrev: () => void;
//   }
  
export default function Mpedit() {
    const {
      register,
      watch,
      clearErrors,
      setError,
      formState: { errors },
    } = useForm<InputType2>({ mode: "onChange" });
  
    const [isPhoneNumberAvailable, setIsPhoneNumberAvailable] = useState("");
    const [isPhoneNumberChecked, setIsPhoneNumberChecked] = useState(false);
  
    const phoneNumber = watch("phoneNumber");
    const checkPhoneNumberMutation = useCheckPhoneNumber();
  
    useEffect(() => {
      // 전화번호가 변경될 때 상태 초기화
      if (phoneNumber !== "") {
        setIsPhoneNumberChecked(false);
        setIsPhoneNumberAvailable("");
        clearErrors("phoneNumber");
      }
    }, [phoneNumber, clearErrors]);
  
    const handleCheckPhoneNumber = () => {
      if (phoneNumber === "" || errors.phoneNumber) return;
  
      clearErrors("phoneNumber");
      checkPhoneNumberMutation.mutate(phoneNumber, {
        onSuccess: (data:string) => {
          if (data) {
            setError("phoneNumber", {
              type: "manual",
              message: "이미 가입된 전화번호입니다.",
            });
            setIsPhoneNumberChecked(false);
          } else {
            setIsPhoneNumberAvailable("사용 가능한 전화번호입니다.");
            setIsPhoneNumberChecked(true);
          }
        },
        onError: () => {
          setError("phoneNumber", {
            type: "manual",
            message: "전화번호 중복 검사 중 문제가 발생했습니다.",
          });
          setIsPhoneNumberChecked(false);
        },
      });
    };


    return (
        <div className="container">
            <div className="back">
                <Link href="/mypage">
                <Image alt="back" src={'/icons/arrow.png'} width={25} height={25}></Image>
                </Link>
            </div>

            <div className="p-4">
                <h1 className="text-xl font-bold">내 정보 수정</h1>
            </div>

            <div className="mb-4 p-3">
                <label className="block text-lg font-bold mb-2 ml-1">전화번호</label>
                <div className="flex items-center gap-3">
                <input
                    type="text"
                    placeholder="전화번호를 입력하세요."
                    className="input-base flex-grow border rounded-lg p-2"
                    {...register("phoneNumber", {
                    required: "전화번호를 입력하세요.",
                    pattern: {
                        value: /^[0-9]{10,11}$/,
                        message: "유효한 전화번호를 입력해주세요.",
                    },
                    })}
                />
                <button
                    type="button"
                    className={`p-4 rounded-lg text-md  ${
                    isPhoneNumberChecked
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-emerald-500 text-white"
                    }`}
                    disabled={isPhoneNumberChecked}
                    onClick={handleCheckPhoneNumber}
                >
                    중복 확인
                </button>
                </div>

                {/* 에러 메시지 */}
                {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-2">
                    {errors.phoneNumber.message}
                </p>
                )}
                {!errors.phoneNumber && isPhoneNumberAvailable && (
                <p className="text-emerald-500 text-sm mt-2">
                    {isPhoneNumberAvailable}
                </p>
                )}
            </div>
        </div>
    );
}

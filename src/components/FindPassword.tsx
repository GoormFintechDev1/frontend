'use client';

import Button from "./Button";
import { useCheckPassword, } from "@/hooks/useAuthQuery";
import { SubmitHandler, useForm } from 'react-hook-form';
import { Validate } from "@/interface/resetPassword";
import { useState } from "react";
import { useRouter } from "next/navigation";



export default function FindPassword() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null); 
    
    const { register, handleSubmit, formState: { errors } } = useForm<Validate>({ mode: "onChange" });
    const mutation = useCheckPassword();

    const onSubmit: SubmitHandler<Validate> = (data) => {
        console.log("Find Password Data:", data);

        mutation.mutate(data, {
            onSuccess: async (response) => {
                // API 응답이 "true" 또는 "false" 문자열로 반환되는 경우 처리
                if (response === "true") {
                    router.push(`/newpassword?loginId=${data.loginId}`);
                } else {
                    setError("아이디 또는 이메일이 잘못되었습니다.");
                }
            },
            onError: (error) => {
                setError(error.message || "서버 에러가 발생했습니다.");
            },
        });
    };

    return (
        <div className="container flex flex-col justify-center h-full p-3 space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col space-y-8 p-3">
            <p className="text-xl font-bold flex items-start ">비밀번호 재설정</p>
                <div className=" ">
                    <div className="label-input-set">
                        <label className="label-base">아이디</label>
                        <input
                            type="text"
                            placeholder="아이디를 입력하세요."
                            className="input-base"
                            {...register('loginId',
                                { required: "아이디를 입력하세요."}
                            )}
                        />
                        <p className="helper-text text-red-500">{errors.loginId?.message}</p>
                    </div>

                    <div className="label-input-set mt-5">
                        <label className="label-base">이메일</label>
                        <input
                            type="email"
                            placeholder="이메일을 입력하세요."
                            className="input-base"
                            {...register('email',
                                { required: "이메일을 입력하세요.",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "유효한 이메일을 입력해주세요."
                                    },
                                }
                            )}
                        />
                        <p className="text-red-500 helper-text">{errors.email?.message}</p>
                    </div>
                    { error && 
                    <p className=' text-red-500 helper-text'>아이디 또는 이메일이 잘못되었습니다. </p>
                }
                    <Button type="submit" className="mt-10">비밀번호 재설정</Button>
                    </div>
            </form>
        </div>
    );
}

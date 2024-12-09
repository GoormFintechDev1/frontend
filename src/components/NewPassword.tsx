'use client';

import Button from "./Button";
import { useResetPassword } from "@/hooks/useAuthQuery";
import { SubmitHandler, useForm } from 'react-hook-form';
import { Reset } from "@/interface/resetPassword";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
    loginId: string
}

export default function NewPassword({loginId}:Props) {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isMatched, setIsMatched] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Reset>({
        mode: "onChange",
        defaultValues:{loginId:loginId}
    });
    
    const newPassword = watch("newPassword")?.trim();

    const mutation = useResetPassword();

    useEffect(()=>{
        setIsMatched(newPassword === confirmPassword);
    },[newPassword, confirmPassword]);

    const onSubmit: SubmitHandler<Reset> = (data) => {

        if(!isMatched) return;
    
        // 비밀번호가 일치하는 경우 백엔드로 요청
        console.log(data)
        
        mutation.mutate(data, {
            onSuccess: () => {
                alert("비밀번호가 성공적으로 변경되었습니다.");
                router.push('/login');
            },
            onError: () => {
                setErrorMessage("비밀번호 변경 중 오류가 발생했습니다.");
            },
        });
    };

    return (
        <div className="container flex flex-col justify-center h-full p-3 space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col space-y-8">
            <p className="text-2xl font-bold flex items-start ">새로운 비밀번호 설정</p>
                <div className="p-3 ">
                    <div className="label-input-set">
                        <label className="label-base">비밀번호</label>
                        <input
                            type="text"
                            placeholder="비밀번호를 입력하세요."
                            className="input-base"
                            {...register('newPassword', {
                                required: "비밀번호를 입력하세요.",
                                minLength: {
                                    value: 8,
                                    message: "비밀번호는 최소 8자리여야 합니다."
                                }
                            })}
                        />
                         <p className="text-red-500">{errors.newPassword?.message}</p>
                    </div>

                    <div className="label-input-set mt-5">
                        <label className="label-base">비밀번호 확인</label>
                        <input
                            type="password"
                            placeholder="비밀번호를 한번 더 입력하세요."
                            className="input-base"
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                        <p className="text-red-500">{errors.confirmPassword?.message}</p>
                    </div>

                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <Button type="submit" className="mt-10">비밀번호 재설정</Button>
                    </div>
            </form>
        </div>
    );
}

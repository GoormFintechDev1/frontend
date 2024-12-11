'use client';

import Button from "./Button";
import { useResetPassword } from "@/hooks/useAuthQuery";
import { SubmitHandler, useForm } from 'react-hook-form';
import { Reset } from "@/interface/resetPassword";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Alert from "./Alert";

interface Props {
    loginId: string
}

export default function NewPassword({loginId}:Props) {
    const router = useRouter();
    // const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isMatched, setIsMatched] = useState(false);
    const [alert, setAlert] = useState("");
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // 성공 메시지 상태 관리

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
        
        mutation.mutate(data, {
            onSuccess: () => {
                setSuccessMessage("비밀번호가 성공적으로 변경되었습니다.");
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            },
            onError: (error) => {
                setAlert(error.message);
                setIsAlertOpen(true);
            },
        });
    };

    const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(()=>{
        if (isAlertOpen){
            timerId.current = setTimeout(()=>setIsAlertOpen(false), 1500);
        };

        return ()=> {
            if (timerId.current !== null) {
                clearTimeout(timerId.current);
                timerId.current = null;
            }
        };
    },[isAlertOpen]);

    return (
        <div className="container2 flex flex-col justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col space-y-8 px-3">
            <p className="text-xl font-bold flex items-start ">새로운 비밀번호 설정</p>
                <div className="">
                    <div className="label-input-set">
                        <label className="label-base">비밀번호</label>
                        <input
                            type="password"
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
                         <p className="text-red-500 helper-text">{errors.newPassword?.message}</p>
                    </div>

                    <div className="label-input-set mt-5">
                        <label className="label-base">비밀번호 확인</label>
                        <input
                            type="password"
                            placeholder="비밀번호를 한번 더 입력하세요."
                            className="input-base"
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                        <p className="text-red-500 helper-text">{errors.confirmPassword?.message}</p>
                    </div>

                    { confirmPassword?.length > 0 && isMatched ? (<p className="text-blue-500 helper-text">비밀번호가 일치합니다.</p>)  : confirmPassword?.length > 0 && (<p className="text-red-500 helper-text">비밀번호가 같지 않습니다.</p>)}

                    <Button type="submit" className="mt-10">비밀번호 재설정</Button>
                    </div>
            </form>
            {successMessage && (
                 <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                 <div className="bg-white p-6 rounded-lg w-80 h-14 flex items-center justify-center">
                     <p className="text-center font-bold text-sm">💡 {successMessage}</p>
                 </div>
             </div>
            )}
            <Alert isOpen={isAlertOpen} message={alert}/>
        </div>
    );
}

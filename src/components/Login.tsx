'use client';

import { useLoginMutation } from '@/hooks/useAuthQuery';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from './Button';
import { useRouter } from 'next/navigation';
import { LoginType } from '@/interface/login';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useUserInfo } from '@/hooks/useUserQuery';

export default function Login() {
    const router = useRouter();


    const {data:user} = useUserInfo();

    useEffect(()=>{
        if(user && user.brNum) router.push("/");   
    },[user,router])

    const { register, handleSubmit, watch} = useForm<LoginType>({ mode: "onChange" });
    const [error, setError] = useState(false);
    const [redirect, setRedirect] = useState("");
    
    const loginId = watch("loginId");

    const mutation = useLoginMutation();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (redirect) {
            router.push(redirect);
        }
    }, [redirect, router, loginId]);

    const onSubmit: SubmitHandler<LoginType>  = (data) => {

        mutation.mutate(data, {
            onSuccess: async() => {
                const loggedIn = JSON.parse(localStorage.getItem(`loggedIn:${data.loginId}`) || "false");
                setRedirect(loggedIn ? "/" : "/validate");
                queryClient.invalidateQueries();

            },
            onError:()=>{
                setError(true);
            }
        });
    };


    return (
        <div className="flex flex-col justify-center h-full p-3 space-y-4">
            <div className="flex items-start mb-4">
                <Image src="/logo.png" alt="로고" width={70} height={70}/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col space-y-8'>
                
                <div className='label-input-set'>
                    <label className="label-base">아이디</label>
                    <input
                        type="text"
                        placeholder="아이디를 입력하세요."
                        className="input-base"
                        {...register("loginId")}
                    />
                </div>
                <div className='label-input-set '>
                    <label className="label-base">비밀번호</label>
                    <input
                        type="password"
                        placeholder="비밀번호를 입력하세요."
                        className="input-base"
                        {...register("password")}

                    />
                </div>
                { error && 
                    <p className='text-xs text-red-500'>아이디 또는 비밀번호가 잘못되었습니다. </p>
                }
                

                <Button type="submit">로그인</Button>


                <div className="flex justify-center mt-4 text-sm text-gray-500 ">
                    <a href="/findpassword" className="mr-10">비밀번호 찾기</a>
                    <a href="/register" className="ml-10">회원가입</a>
                </div>
            </form>
        </div>
    );
}

'use client';

import { useLoginMutation } from '@/hooks/useAuthQuery';
import Image from 'next/image';
import { useState } from 'react';
import Button from './Button';
import { useRouter } from 'next/navigation';
import { LoginType } from '@/interface/login';

export default function Login() {
    const router = useRouter();

    const [formData, setFormData] = useState<LoginType>({ loginId: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const mutation = useLoginMutation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 로그인 로직을 추가하거나, API 호출 등을 여기에 구현
        mutation.mutate(formData, {
            onSuccess: () => {
                const firstLogin = JSON.parse(localStorage.getItem("firstLogin") || "false");

                if(firstLogin){
                    router.push('/validate');
                } else {
                    router.push('/');
                }
            }
        });
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <form onSubmit={handleSubmit} className='w-full flex flex-col space-y-8'>
                 <div className="flex justify-start mb-4">
                    <Image src="/logo.png" alt="로고" width={70} height={70} /> {/* 필요에 따라 크기 조정 */}
                </div>
                
                <div className='label-input-set'>
                    <label className="label-base">아이디</label>
                    <input
                        type="text"
                        name="loginId"
                        value={formData.loginId}
                        onChange={handleChange}
                        placeholder="아이디를 입력하세요."
                        className="input-base"
                    />
                </div>
                <div className='label-input-set '>
                    <label className="label-base">비밀번호</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="비밀번호를 입력하세요."
                        className="input-base"
                    />
                </div>
                

                <Button type="submit">로그인</Button>


                <div className="flex justify-center mt-4 text-sm text-gray-500 ">
                    <a href="/findpassword" className="mr-10">비밀번호 찾기</a>
                    <a href="/register" className="ml-10">회원가입</a>
                </div>
            </form>
        </div>
    );
}

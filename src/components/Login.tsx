'use client';

import { useLoginMutation } from '@/hooks/useAuthQuery';
import Image from 'next/image';
import { useState } from 'react';
import Button from './Button';

export interface LoginFormType {
    account: string;
    password: string;
}

export default function Login() {
    const [formData, setFormData] = useState<LoginFormType>({ account: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const mutation = useLoginMutation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 로그인 로직을 추가하거나, API 호출 등을 여기에 구현
        mutation.mutate(formData);
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
                        name="account"
                        value={formData.account}
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
                

                <Button type="submit" href='./'>로그인</Button>


                <div className="flex justify-center mt-4 text-sm text-gray-500 ">
                    <a href="/findpassword" className="mr-10">비밀번호 찾기</a>
                    <a href="/register" className="ml-10">회원가입</a>
                </div>
            </form>
        </div>
    );
}

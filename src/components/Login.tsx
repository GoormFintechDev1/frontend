'use client';

import Image from 'next/image';
import { useState } from 'react';

interface LoginFormType {
    userId: string;
    password: string;
}

export default function Login() {
    const [formData, setFormData] = useState<LoginFormType>({ userId: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login Data:', formData);
        // 로그인 로직을 추가하거나, API 호출 등을 여기에 구현
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit}>
                 <div className="flex justify-start mb-12">
                    <Image src="/logo.png" alt="로고" width={70} height={70} /> {/* 필요에 따라 크기 조정 */}
                </div>
                
                <div>
                <label className="label-base">아이디</label>
                <input
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    placeholder="아이디를 입력하세요."
                    className="w-full mb-4 p-2 border rounded mt-3"
                />

                <label className="label-base">비밀번호</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="비밀번호를 입력하세요."
                    className="w-full mb-4 p-2 border rounded mt-3"
                />

                <button type="submit" className="button mt-3">로그인</button>
                </div>

                <div className="flex justify-center mt-4 text-sm text-gray-500 ">
                    <a href="/findpassword" className="mr-10">비밀번호 찾기</a>
                    <a href="/register" className="ml-10">회원가입</a>
                </div>
            </form>
        </div>
    );
}

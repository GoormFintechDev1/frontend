'use client';

import { useState } from "react";

export default function FindPassword() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Find Password Data:", { userId, password });
        // 비밀번호 찾기 로직 추가
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit}>
                <p className="text-xl font-bold mb-10">비밀번호 찾기</p>
                
                <div>
                    <label className="label-base">아이디</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="아이디를 입력하세요."
                        className="w-full mb-10 p-2 border rounded mt-3"
                    />
                
                    <label className="label-base">비밀번호</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호를 입력하세요."
                        className="w-full mb-7 p-2 border rounded mt-3"
                    />
                </div>
                
                <button type="submit" className="button mt-3">비밀번호 찾기</button>
            </form>
        </div>
    );
}

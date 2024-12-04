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
        <div className="container flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-8">
                <p className="text-xl font-bold">비밀번호 찾기</p>
                <div className="label-input-set">
                    <label className="label-base">아이디</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="아이디를 입력하세요."
                        className="input-base"
                    />
                </div>
                <div className="label-input-set">
                    <label className="label-base">비밀번호</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호를 입력하세요."
                        className="input-base"
                    />
                </div>
                <button type="submit" className="button mt-3">비밀번호 찾기</button>
            </form>
        </div>
    );
}

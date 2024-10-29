"use client"

// import Button from "@/components/Button";

import { useForm, SubmitHandler } from "react-hook-form";

interface InputType {
    userId: string,
    nickname: string, 
    password: string
}

interface Props {
    onNext: (data:InputType) => void,
}

export default function Register1({onNext}:Props){

    const {register, handleSubmit} = useForm<InputType>();
    const onSubmit: SubmitHandler<InputType> = (data) => onNext(data);

    return (
        <div className="h-full">
            <form className="flex flex-col space-y-6 h-full" onSubmit={handleSubmit(onSubmit)}>
                <p className="text-xl font-bold">회원가입</p>
                <div className="label-input-set">
                    <label className="label-base">아이디</label>
                    <div className="flex gap-3">
                        <input className="input-base flex-grow" placeholder="아이디를 입력하세요." {...register("userId")}></input>
                        <button className="p-3 bg-gray-200 rounded-xl text-xs">중복 확인</button>
                    </div>
                    <p className="helper-text text-blue-600">사용할 수 있는 아이디입니다.</p>
                </div>
                <div className="label-input-set">
                    <label className="label-base">닉네임</label>
                    <div className="flex gap-3">
                        <input className="input-base flex-grow" placeholder="닉네임을 입력하세요." {...register("nickname")}></input>
                        <button className="p-3 bg-gray-200 rounded-xl text-xs">중복 확인</button>
                    </div>
                    <p className=" helper-text text-red-600 ">사용할 수 없는 닉네임입니다.</p>
                </div>
                <div className="label-input-set">
                    <label className="label-base">비밀번호</label>
                    <input className="w-full input-base" placeholder="비밀번호를 입력하세요." type="password" {...register("password")}></input>
                    <div className="flex flex-row space-x-2 pl-1">
                        <p className="text-xs font-light text-red-600">8자</p>
                        <p className="text-xs font-light text-blue-600">영문</p>
                        <p className="text-xs font-light text-blue-600">숫자</p>
                    </div>
                </div>
                <div className="label-input-set">
                    <label className="label-base">비밀번호 확인</label>
                    <input className="w-full input-base" placeholder="비밀번호를 입력하세요." type="password"></input>
                    <p className="text-xs font-light text-blue-600 pl-1">비밀번호가 일치합니다.</p>
                </div>
                <div className="flex-grow"></div>
                <div className="py-8">
                    <button className="button" type="submit">다음</button>
                </div>
            </form>
        </div>
    )
}
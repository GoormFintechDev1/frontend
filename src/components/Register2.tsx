'use client'

import { SubmitHandler, useForm } from "react-hook-form";
import Button from "./Button";
import { useState } from "react";
import AdderssInput from "./AdderssInput";
interface InputType {
    username: string,
    phone: string, 
    address: string
}

interface Props {
    onReadySubmit: (data:InputType) => void,
    onPrev: () => void
}

export default function Register2({onReadySubmit}:Props){
    
    const {register, handleSubmit, setValue} = useForm<InputType>();
    const onSubmit: SubmitHandler<InputType> = (data) => {
        onReadySubmit(data);
    }; //나중에는 api 연결
    const [address, setAddress] = useState("");

    const handleAddressSelect = (selectedAddress:string) => {
        setAddress(selectedAddress);
        setValue("address", selectedAddress);
    }


    return(
        <div className="h-full">

            <form className="flex flex-col space-y-8 h-full" onSubmit={handleSubmit(onSubmit)}>
                <p className="text-xl font-bold">회원가입</p>
                <div className="label-input-set">
                    <label className="label-base">이름</label>
                    <input className="input-base flex-grow" placeholder="이름을 입력하세요." {...register("username")}></input>
                </div>
                <div className="label-input-set">
                    <label className="label-base">전화번호</label>
                    <input className="input-base flex-grow" placeholder="전화번호를 입력하세요." {...register("phone")}></input>
                </div>
                <div className="label-input-set">
                    <label className="label-base">주소</label>
                    <AdderssInput value={address} onAddressSelect={handleAddressSelect} />
                </div>
                <div className="flex-grow"></div>
                <div className="py-8">
                    <Button type="submit">다음</Button>
                </div>
            </form>
        </div>
    )
}
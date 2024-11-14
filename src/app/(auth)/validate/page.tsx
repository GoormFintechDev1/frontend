'use client'

import AddressInput from "@/components/AdderssInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { BusinessInfo } from "@/interface/business";
import { useRouter } from "next/navigation";
import { useValidateBR } from "@/hooks/useBRQuery";
import { useUserInfo } from "@/hooks/useUserQuery";

export default function Validate(){

    const router  = useRouter();

    const [address, setAddress] = useState("");
    const { register, handleSubmit, setValue, formState: { errors, isValid } } = useForm<BusinessInfo>({mode:'onChange'});

    const {data:userInfo} = useUserInfo();

    const handleAddressSelect = (selectedAddress: string) => {
        setAddress(selectedAddress);
        setValue("address", selectedAddress);
    };

    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault(); 
        }
      };

    const validateBRMutation = useValidateBR();

    const onSubmit: SubmitHandler<BusinessInfo> = (data) => {
        console.log(data);
        validateBRMutation.mutate(data,{
            onSuccess: () => { 
                router.push('/');
                localStorage.setItem(`firstLogin:${userInfo.loginId}`, "false");
            },
            onError: () => {
                alert('사업자등록번호가 유효하지 않습니다.');
            }
        });
    };

    const isButtonEnabled = isValid && address !== "";

    return (
        <div className="container2" onKeyDown={handleKeyDown}>
        <form className="flex flex-col space-y-8 h-full p-3" onSubmit={handleSubmit(onSubmit)}>
                <p className="text-xl font-bold">사업자 인증</p>
                <div className="label-input-set">
                    <label className="label-base">사업자등록번호</label>
                    <input className="input-base" placeholder="사업자등록번호를 입력하세요."
                        {...register("brNum", {
                            required: "사업자등록번호를 입력하세요."
                        })}
                    ></input>
                    {errors.brNum && <p className="helper-text text-red-500">{errors.brNum.message}</p>}
                </div>
                <div className="label-input-set">
                    <label className="label-base">사업장 주소</label>
                    <AddressInput value={address} onAddressSelect={handleAddressSelect} />
                    {errors.address && ( <p className="text-xs font-light text-red-500">{errors.address.message}</p>)}
                </div>
                <div className="flex-grow"></div>
                <div className="py-8">
                    <button type="submit" className={`button ${isButtonEnabled ? "" : "!bg-gray-200 !text-gray-700"}`}>인증하기</button>
                </div>
            </form>
        </div>
    )
}

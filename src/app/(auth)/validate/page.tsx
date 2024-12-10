'use client'

import AddressInput from "@/components/AdderssInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { BusinessInfo } from "@/interface/business";
import { useRouter } from "next/navigation";
import { useValidateBR } from "@/hooks/useBRQuery";
import Alert from "@/components/Alert";
import { useUserInfo } from "@/hooks/useUserQuery";
// import Alert from "@/components/Alert";

export default function Validate(){

    const router  = useRouter();

    const [address, setAddress] = useState("");
    const [alert, setAlert] = useState("");
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const { register, handleSubmit, setValue, formState: { errors, isValid } } = useForm<BusinessInfo>({mode:'onChange'});

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
    const {data:user} = useUserInfo();

    const onSubmit: SubmitHandler<BusinessInfo> = (data) => {
        validateBRMutation.mutate(data,{
            onSuccess: () => { 
                localStorage.setItem(`firstLogin:${user.loginId}`, "true");
                router.push('/progress');
            },
            onError: (error) => {
                setAlert(error.message);
                setIsAlertOpen(true);
            }
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

            <Alert isOpen={isAlertOpen} message={alert}/>
        </div>
    )
}

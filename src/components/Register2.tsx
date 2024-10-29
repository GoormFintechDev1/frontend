'use client'

import { SubmitHandler, useForm } from "react-hook-form";
import Button from "./Button";
import { useState } from "react";
import AddressInput from "./AdderssInput";
import { useCheckPhoneNumber } from "@/hooks/useAuthQuery";

interface InputType {
  name: string;
  phoneNumber: string;
  address: string;
}

interface Props {
  onReadySubmit: (data: InputType) => void;
  onPrev: () => void;
}

export default function Register2({ onReadySubmit }: Props) {
  const { register, handleSubmit, setValue, watch, clearErrors, setError, formState: { errors } } = useForm<InputType>({mode:'onChange'});
  
  const onSubmit: SubmitHandler<InputType> = (data) => {
    onReadySubmit(data);
  };
  
  const [address, setAddress] = useState("");
  const [isPhoneNumberAvailable, setIsPhoneNumberAvailable] = useState("");

  const handleAddressSelect = (selectedAddress: string) => {
    setAddress(selectedAddress);
    setValue("address", selectedAddress);
  };

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
        e.preventDefault(); 
    }
    };

  const checkPhoneNumberMutation = useCheckPhoneNumber();
  const phoneNumber = watch("phoneNumber");
  const handleCheckPhoneNumber = () => {
      clearErrors("phoneNumber");
      checkPhoneNumberMutation.mutate(phoneNumber, {
          onSuccess: (data) => {
              if(data) setError("phoneNumber", { type: "manual", message: "가입되어 있는 전화번호입니다." });
              else  setIsPhoneNumberAvailable("사용 가능한 전화번호입니다.");
          }, 
          onError: () => {
              setError("phoneNumber", { type: "manual", message: "전화번호 중복 검사 중 문제가 발생했습니다." });
          }
      })
  }  

  return (
    <div className="h-full" onKeyDown={handleKeyDown}>
      <form className="flex flex-col space-y-8 h-full" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-xl font-bold">회원가입</p>
        
        <div className="label-input-set">
          <label className="label-base">이름</label>
          <input className="input-base flex-grow" placeholder="이름을 입력하세요." {...register("name", { required: "이름을 입력하세요." })}/>
          {errors.name && (<p className="helper-text text-red-500">{errors.name.message}</p> )}
        </div>

        <div className="label-input-set">
          <label className="label-base">전화번호</label>
          <div className="flex gap-3">
            <input className="input-base flex-grow" placeholder="전화번호를 입력하세요."
              {...register("phoneNumber", { required: "전화번호를 입력하세요.",
                  pattern: {
                      value: /^[0-9]{11}$/,
                      message: "유효한 전화번호를 입력해주세요."
                  }
              })}
            />
            <button className="p-3 bg-gray-200 rounded-xl text-xs" onClick={handleCheckPhoneNumber}>중복 확인</button>
          </div>
          {errors.phoneNumber && ( <p className="helper-text text-red-500">{errors.phoneNumber.message}</p>)}
          {!errors.phoneNumber && isPhoneNumberAvailable && ( <p className="helper-text text-blue-600">{isPhoneNumberAvailable}</p>)}
        </div>

        <div className="label-input-set">
          <label className="label-base">주소</label>
          <AddressInput value={address} onAddressSelect={handleAddressSelect} />
          {errors.address && ( <p className="text-xs font-light text-red-500">{errors.address.message}</p>)}
        </div>

        <div className="flex-grow"></div>
        
        <div className="py-8">
          <Button type="submit" href="./login">다음</Button>
        </div>

      </form>
    </div>
  );
}
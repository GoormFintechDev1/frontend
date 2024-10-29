'use client'

import { SubmitHandler, useForm } from "react-hook-form";
import Button from "./Button";
import { useState } from "react";
import AddressInput from "./AdderssInput";

interface InputType {
  username: string;
  phone: string;
  address: string;
}

interface Props {
  onReadySubmit: (data: InputType) => void;
  onPrev: () => void;
}

export default function Register2({ onReadySubmit }: Props) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<InputType>({mode:'onChange'});
  
  const onSubmit: SubmitHandler<InputType> = (data) => {
    onReadySubmit(data);
  };
  
  const [address, setAddress] = useState("");

  const handleAddressSelect = (selectedAddress: string) => {
    setAddress(selectedAddress);
    setValue("address", selectedAddress);
  };

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
        e.preventDefault(); 
    }
    };

  return (
    <div className="h-full" onKeyDown={handleKeyDown}>
      <form className="flex flex-col space-y-8 h-full" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-xl font-bold">회원가입</p>
        
        <div className="label-input-set">
          <label className="label-base">이름</label>
          <input className="input-base flex-grow" placeholder="이름을 입력하세요." {...register("username", { required: "이름을 입력하세요." })}/>
          {errors.username && (<p className="helper-text text-red-500">{errors.username.message}</p> )}
        </div>

        <div className="label-input-set">
          <label className="label-base">전화번호</label>
          <input className="input-base flex-grow" placeholder="전화번호를 입력하세요."
            {...register("phone", { required: "전화번호를 입력하세요.",
                pattern: {
                    value: /^[0-9]{11}$/,
                    message: "유효한 전화번호를 입력해주세요."
                }
            })}
          />
          {errors.phone && ( <p className="helper-text text-red-500">{errors.phone.message}</p>)}
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
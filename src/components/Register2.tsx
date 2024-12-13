'use client'

import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useCheckEmail, useCheckPhoneNumber } from "@/hooks/useAuthQuery";
import { InputType2 } from "@/interface/register";

interface Props {
  onReadySubmit: (data: InputType2) => void;
  onPrev: () => void;
}

export default function Register2({ onReadySubmit }: Props) {
  const { register, handleSubmit, watch, clearErrors, setError, formState: { errors, isValid } } = useForm<InputType2>({mode:'onChange'});
  
  const onSubmit: SubmitHandler<InputType2> = (data) => {
    onReadySubmit(data);
  };

  const [isPhoneNumberAvailable, setIsPhoneNumberAvailable] = useState("");
  const [isEmailAvailable, setIsEmailAvailable] = useState("");
  const [isPhoneNumberChecked, setIsPhoneNumberChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);

  const phoneNumber = watch("phoneNumber");
  const email = watch("email");

  const checkPhoneNumberMutation = useCheckPhoneNumber();
  
  const handleCheckPhoneNumber = () => {
    if (phoneNumber === "" || errors.phoneNumber) return;

    clearErrors("phoneNumber");
    checkPhoneNumberMutation.mutate(phoneNumber, {
        onSuccess: (data) => {
            if(data) {
                setError("phoneNumber", { type: "manual", message: "가입되어 있는 전화번호입니다." });
                setIsPhoneNumberChecked(false);
            } else {
                setIsPhoneNumberAvailable("사용 가능한 전화번호입니다.");
                setIsPhoneNumberChecked(true);
            }
        }, 
        onError: () => {
            setError("phoneNumber", { type: "manual", message: "전화번호 중복 검사 중 문제가 발생했습니다." });
            setIsPhoneNumberChecked(false);
        }
    })
  };

  const checkEmailMutation = useCheckEmail();

  const handleCheckEmail = () => {
    if (email === "" || errors.email ) return; 
    
    clearErrors("email");
    checkEmailMutation.mutate(email, {
        onSuccess: (data) => {
            if(data) {
                setError("email", { type: "manual", message: "가입되어 있는 이메일입니다." });
                setIsEmailChecked(false);
            } else {
                setIsEmailAvailable("사용 가능한 이메일입니다.");
                setIsEmailChecked(true);
            }
        }, 
        onError: () => {
            setError("email", { type: "manual", message: "이메일 중복 검사 중 문제가 발생했습니다." });
            setIsEmailChecked(false);
        }
    })
  };

  // 다음 버튼 활성화 조건
  const isButtonEnabled = isValid && isPhoneNumberChecked && isEmailChecked;

  return (
    <div className="h-full p-3">
      <form className="flex flex-col space-y-8 h-full" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-xl font-bold">회원가입</p>
        <div className="h-[calc(var(--dynamic-vh)-173px)] space-y-6 overflow-y-scroll">
        
        <div className="label-input-set">
          <label className="label-base">이름</label>
          <input className="input-base flex-grow" placeholder="이름을 입력하세요." {...register("name", { required: "이름을 입력하세요." 
          })}/>
          {errors.name && (<p className="helper-text text-red-500">{errors.name.message}</p> )}
        </div>

        <div className="label-input-set">
          <label className="label-base">주민등록번호</label>
          <div className="flex items-center space-x-2 w-full">
              <input 
                  className="input-base w-1/2" 
                  placeholder="생년월일" 
                  type="text"
                  maxLength={6}
                  pattern="\d{6}"
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.value = target.value.replace(/\D/g, ''); // 숫자 외 입력 방지
                  }}
                  {...register("identityNumber.front", { required: "주민등록번호 앞자리를 입력하세요.",
                     minLength: {
                        value: 6,
                        message: "주민등록번호 앞자리를 입력하세요.",
                     }, 
                     maxLength: 6 })}
              />
              <p className="text-gray-500">-</p>
              <div className="flex items-center w-1/2 space-x-4">
                  <input 
                      className="input-base w-14 text-center" 
                      type="text" 
                      placeholder="성별"
                      maxLength={1}
                      pattern="\d{1}"
                      onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        target.value = target.value.replace(/\D/g, ''); // 숫자 외 입력 방지
                      }}
                      {...register("identityNumber.back", { required: "주민등록번호 뒷자리를 입력하세요.", minLength: 1, maxLength: 1 })}
                  />
                  <p className="text-3xl text-gray-400 flex-grow">******</p>
              </div>
          </div>
          {(errors.identityNumber?.front || errors.identityNumber?.back) && (
              <p className="helper-text text-red-500">
                  {errors.identityNumber?.front?.message || errors.identityNumber?.back?.message}
              </p>
          )}
        </div>

        <div className="label-input-set">
          <label className="label-base">전화번호</label>
          <div className="flex gap-4">
            <input className="input-base flex-grow w-9/12 appearance-none" placeholder="전화번호를 입력하세요."
              {...register("phoneNumber", { required: "전화번호를 입력하세요.",
                  pattern: {
                      value: /^[0-9]{11}$/,
                      message: "유효한 전화번호를 입력해주세요."
                  },
                  onChange: ()=>{      
                    setIsPhoneNumberChecked(false);
                    setIsPhoneNumberAvailable("");
                    clearErrors("phoneNumber");}
              })}
            />
            <button type="button"  className={`p-3 rounded-xl w-20 h-14 text-xs ${isPhoneNumberChecked ? 'bg-gray-200 text-gray-700' : 'bg-emerald-400 text-white font-bold'}`}
                disabled={isEmailChecked} onClick={handleCheckPhoneNumber}>중복 확인</button>
          </div>
          {errors.phoneNumber && ( <p className="helper-text text-red-500">{errors.phoneNumber.message}</p>)}
          {!errors.phoneNumber && isPhoneNumberAvailable && ( <p className="helper-text text-blue-600">{isPhoneNumberAvailable}</p>)}
        </div>

        <div className="label-input-set">
          <label className="label-base">이메일</label>
          <div className="flex gap-4">
            <input className="input-base flex-grow w-9/12 appearance-none" placeholder="이메일을 입력하세요."
              {...register("email", { required: "이메일을 입력하세요.",
                  pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "유효한 이메일을 입력해주세요."
                  },
                  onChange: () => {
                    setIsEmailChecked(false);
                    setIsEmailAvailable("");
                    clearErrors("email");
                  }
              })}
            />
            <button type="button" className={`p-3 w-20 h-14 rounded-xl text-xs ${isEmailChecked ? 'bg-gray-200 text-gray-700' : 'bg-emerald-400 text-white font-bold'}`}
                    disabled={isEmailChecked} onClick={handleCheckEmail}>중복 확인</button>
          </div>
          {errors.email && ( <p className="helper-text text-red-500">{errors.email.message}</p>)}
          {!errors.email && isEmailAvailable && ( <p className="helper-text text-blue-600">{isEmailAvailable}</p>)}
        </div>

        <div className="flex-grow"></div> 
        </div>
        
        <div className="py-14">
          <button type="submit" disabled={!isButtonEnabled} className={`button ${isButtonEnabled ? "" : "!bg-gray-200 !text-gray-700"}`}>
            회원가입
          </button>
        </div>

      </form>
    </div>
  );
}
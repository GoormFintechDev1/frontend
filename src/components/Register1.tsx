"use client"

import { useCheckAccount, useCheckNickname } from "@/hooks/useAuthQuery";
import { useEffect, useState } from "react";
// import Button from "@/components/Button";

import { useForm, SubmitHandler } from "react-hook-form";

interface InputType {
    account: string,
    nickname: string, 
    password: string
}

interface Props {
    onNext: (data:InputType) => void,
}

export default function Register1({onNext}:Props){

    const {register, handleSubmit, watch, setError,clearErrors, formState: { errors }} = useForm<InputType>({ mode: "onChange" });
    const onSubmit: SubmitHandler<InputType> = (data) => onNext(data);
    const password = watch("password");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isMatch, setIsMatch] = useState(false);
    const [isLengthValid, setIsLengthValid] = useState(false);
    const [hasLetter, setHasLetter] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [isAccountAvailable, setIsAccountAvailable] = useState("");
    const [isNicknameAvailable, setIsNicknameAvailable] = useState("");

    useEffect(() => {
        if (password)
            setIsLengthValid(password.length >= 8);
            setHasLetter(/[A-Za-z]/.test(password));
            setHasNumber(/\d/.test(password));
      }, [password]);

    
    useEffect(() => {
        setIsMatch(password === confirmPassword);
    }, [password, confirmPassword]);

    
    //아이디 중복 검사
    const account = watch("account");
    const checkAccountMutation = useCheckAccount();
    const handleCheckAccount = () => {
        clearErrors("account");
        checkAccountMutation.mutate(account, {
            onSuccess: (data) => {
                if(data) setError("account", { type: "manual", message: "중복된 아이디입니다." });
                else  setIsAccountAvailable("사용 가능한 아이디입니다.");
            }, 
            onError: () => {
                setError("account", { type: "manual", message: "아이디 중복 검사 중 문제가 발생했습니다." });
            }
        })
    }

    const checkNicknameMutation = useCheckNickname();
    const nickname = watch("nickname");
    const handleCheckNickname = () => {
        clearErrors("nickname");
        checkNicknameMutation.mutate(nickname, {
            onSuccess: (data) => {
                if(data) setError("account", { type: "manual", message: "중복된 닉네임입니다." });
                else  setIsNicknameAvailable("사용 가능한 닉네임입니다.");
            }, 
            onError: () => {
                setError("account", { type: "manual", message: "닉네임 중복 검사 중 문제가 발생했습니다." });
            }
        })
    }

    return (
        <div className="h-full">
            <form className="flex flex-col space-y-6 h-full" onSubmit={handleSubmit(onSubmit)}>
                <p className="text-xl font-bold">회원가입</p>
                <div className="label-input-set">
                    <label className="label-base">아이디</label>
                    <div className="flex gap-3">
                        <input className="input-base flex-grow" placeholder="아이디를 입력하세요."
                            {...register("account", {
                            required: "아이디를 입력하세요.",
                            minLength: {
                                value: 5,
                                message: "아이디는 최소 5자 이상이어야 합니다."
                            },
                            maxLength: {
                                value: 20,
                                message: "아이디는 최대 20자 이하로 입력해주세요."
                            },
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)(?!.*[ㄱ-ㅎㅏ-ㅣ가-힣]).+$/,
                                message: "아이디는 영문과 숫자를 포함해야 하며, 한글은 포함할 수 없습니다."
                            }
                            })}
                        />
                        <button className="p-3 bg-gray-200 rounded-xl text-xs" onClick={handleCheckAccount}>중복 확인</button>
                        </div>
                    {/* <p className="helper-text text-blue-600">사용할 수 있는 아이디입니다.</p> */}
                    {errors.account && ( <p className="helper-text text-red-600">{errors.account.message}</p>)}
                    {!errors.account && isAccountAvailable && ( <p className="helper-text text-blue-600">{isAccountAvailable}</p>)}
                </div>
                <div className="label-input-set">
                    <label className="label-base">닉네임</label>
                    <div className="flex gap-3">
                        <input className="input-base flex-grow" placeholder="닉네임을 입력하세요." {...register("nickname", {
                            required: "닉네임을 입력하세요.",
                            maxLength: {
                            value: 10,
                            message: "닉네임은 최대 10자 이하이어야 합니다."
                            }
                        })}
                        />
                        <button className="p-3 bg-gray-200 rounded-xl text-xs" onClick={handleCheckNickname}>중복 확인</button>
                    </div>
                    {errors.nickname && ( <p className="helper-text text-red-600">{errors.nickname.message}</p>)}
                    {!errors.nickname && isNicknameAvailable && ( <p className="helper-text text-blue-600">{isNicknameAvailable}</p>)}
                </div>
                <div className="label-input-set">
                    <label className="label-base">비밀번호</label>
                    <input className="w-full input-base" placeholder="비밀번호를 입력하세요." type="password" {...register("password", {required: true, minLength: 8, pattern: /^(?=.*[A-Za-z])(?=.*\d)(?!.*[ㄱ-ㅎㅏ-ㅣ가-힣]).+$/ })}></input>
                    {/* {errors.password && <p className="text-xs font-light ">{errors.password.message}</p>} */}
                    <div className="flex flex-row space-x-2 pl-1">
                        <p className={`text-xs font-light ${isLengthValid ? 'text-blue-600' : 'text-red-600'}`}>8자</p>
                        <p className={`text-xs font-light ${hasLetter ? 'text-blue-600' : 'text-red-600'}`}>영문</p>
                        <p className={`text-xs font-light ${hasNumber ? 'text-blue-600' : 'text-red-600'}`}>숫자</p>
                    </div>
                </div>
                <div className="label-input-set">
                    <label className="label-base">비밀번호 확인</label>
                    <input type="password" className="w-full input-base" placeholder="비밀번호를 다시 입력하세요." value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    {!isMatch && confirmPassword && ( <p className="text-xs font-light text-red-500">비밀번호가 일치하지 않습니다.</p>)}
                    {isMatch && confirmPassword && ( <p className="text-xs font-light text-blue-600 pl-1">비밀번호가 일치합니다.</p>)}
                </div>
                <div className="flex-grow"></div>
                <div className="py-8">
                    <button className="button" type="submit">다음</button>
                </div>
            </form>
        </div>
    )
}
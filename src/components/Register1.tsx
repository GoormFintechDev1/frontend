import { useCheckloginId } from "@/hooks/useAuthQuery";
import { InputType } from "@/interface/register";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
    onNext: (data: InputType) => void;
}

export default function Register1({ onNext }: Props) {
    const { register, handleSubmit, watch, setError, clearErrors, formState: { errors } } = useForm<InputType>({ mode: "onChange" });
    const onSubmit: SubmitHandler<InputType> = (data) => onNext(data);
    const password = watch("password");
    const loginId = watch("loginId");

    const [confirmPassword, setConfirmPassword] = useState("");
    const [isMatch, setIsMatch] = useState(false);
    const [isLengthValid, setIsLengthValid] = useState(false);
    const [hasLetter, setHasLetter] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [isloginIdAvailable, setIsloginIdAvailable] = useState("");
    const [isloginIdChecked, setIsloginIdChecked] = useState(false);

    const checkloginIdMutation = useCheckloginId();

    // 패스워드 유효성 검사
    useEffect(() => {
        if (password) {
            setIsLengthValid(password.length >= 8);
            setHasLetter(/[A-Za-z]/.test(password));
            setHasNumber(/\d/.test(password));
        }
    }, [password]);

    // 비밀번호 일치 여부 확인
    useEffect(() => {
        setIsMatch(password === confirmPassword);
    }, [password, confirmPassword]);

    // 아이디 변경 시 중복 확인 상태 초기화
    useEffect(() => {
        setIsloginIdChecked(false);
        setIsloginIdAvailable("");
        clearErrors("loginId");
    }, [clearErrors, loginId]);

    // 중복 확인 버튼 클릭 핸들러
    const handleCheckloginId = () => {
        if(loginId === "" || errors.loginId) return;

        clearErrors("loginId");
    
        checkloginIdMutation.mutate(loginId, {
            onSuccess: (data:boolean) => {
                if (data) setError("loginId", { type: "manual", message: "중복된 아이디입니다." });
                else {
                    
                    setIsloginIdAvailable("사용 가능한 아이디입니다.");
                    setIsloginIdChecked(true);
                }
            },
            onError: () => {
                setError("loginId", { type: "manual", message: "아이디 중복 검사 중 문제가 발생했습니다." });
            }
        });
    };

    const isButtonEnabled = isloginIdChecked && !errors.loginId && isMatch && isLengthValid && hasLetter && hasNumber;

    return (
        <div className="h-full p-3">
            <form className="flex flex-col space-y-6 h-full" onSubmit={handleSubmit(onSubmit)}>
                <p className="text-xl font-bold">회원가입</p>
                <div className="label-input-set">
                    <label className="label-base">아이디</label>
                    <div className="flex gap-3">
                        <input
                            className="input-base flex-grow"
                            placeholder="아이디를 입력하세요."
                            {...register("loginId", {
                                required: "아이디를 입력하세요.",
                                minLength: {
                                    value: 5,
                                    message: "아이디는 최소 5자 이상이어야 합니다.",
                                },
                                maxLength: {
                                    value: 20,
                                    message: "아이디는 최대 20자 이하로 입력해주세요.",
                                },
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)(?!.*[ㄱ-ㅎㅏ-ㅣ가-힣]).+$/,
                                    message: "아이디는 영문과 숫자를 포함해야합니다.",
                                },
                            })}
                        />
                        <button
                            className={`p-3 rounded-xl text-xs ${isloginIdChecked ?  "bg-gray-200 text-gray-700": "bg-emerald-400 text-white font-bold"}`}
                            onClick={handleCheckloginId}
                            type="button"
                        > 중복 확인</button>
                    </div>
                    {errors.loginId && <p className="helper-text text-red-600">{errors.loginId.message}</p>}
                    {!errors.loginId && isloginIdAvailable && (
                        <p className="helper-text text-blue-600">{isloginIdAvailable}</p>
                    )}
                </div>
                <div className="label-input-set">
                    <label className="label-base">비밀번호</label>
                    <input
                        className="w-full input-base"
                        placeholder="비밀번호를 입력하세요."
                        type="password"
                        {...register("password", { required: true, minLength: 8, pattern: /^(?=.*[A-Za-z])(?=.*\d)(?!.*[ㄱ-ㅎㅏ-ㅣ가-힣]).+$/ })}
                    />
                    <div className="flex flex-row space-x-2 pl-1">
                        <p className={`text-xs font-light ${isLengthValid ? "text-blue-600" : "text-red-600"}`}>8자</p>
                        <p className={`text-xs font-light ${hasLetter ? "text-blue-600" : "text-red-600"}`}>영문</p>
                        <p className={`text-xs font-light ${hasNumber ? "text-blue-600" : "text-red-600"}`}>숫자</p>
                    </div>
                </div>
                <div className="label-input-set">
                    <label className="label-base">비밀번호 확인</label>
                    <input
                        type="password"
                        className="w-full input-base"
                        placeholder="비밀번호를 다시 입력하세요."
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {!isMatch && confirmPassword && (
                        <p className="text-xs font-light text-red-500">비밀번호가 일치하지 않습니다.</p>
                    )}
                    {isMatch && confirmPassword && (
                        <p className="text-xs font-light text-blue-600 pl-1">비밀번호가 일치합니다.</p>
                    )}
                </div>
                <div className="flex-grow"></div>
                <div className="py-8">
                    <button
                        className={`button ${isButtonEnabled ? "" : "!bg-gray-200 !text-gray-700"}`}
                        type="submit"
                        disabled={!isButtonEnabled}
                    >
                        다음
                    </button>
                </div>
            </form>
        </div>
    );
}
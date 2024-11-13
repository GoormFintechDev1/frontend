'use client'

import Register1 from "@/components/Register1";
import Register2 from "@/components/Register2";
import { useRegisterMutation } from "@/hooks/useAuthQuery";
import { FormDataType, InputType, InputType2 } from "@/interface/register";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function Register() {

    const [step, setStep] = useState<number>(1)
    const [formData, setFormData] = useState<FormDataType>({
        loginId: "",
        password: "",
        name: "",
        phoneNumber: "",
        address: "",
        email: "",
        identityNumber: "",
    });
    const [isReady, setIsReady] = useState(false);

    const handleNextStep = (data:InputType) => {
        setFormData((prev) => ({...prev, ...data}))
        const next = step + 1
        setStep(next)
    }

    const handlePrevStep = () => {
        const prev = step - 1
        setStep(prev)
    }

    const mutation = useRegisterMutation();
    const router = useRouter();

    const handleSubmit = (data:InputType2) => {
        const cur = {
            ...data,
            identityNumber: data.identityNumber.front + data.identityNumber.back,
        }
        setFormData((prev) => ({...prev, ...cur})); //비동기로 동작하니까...
        setIsReady(true);
    }
    
    useEffect(()=>{
        if(isReady){
            setIsReady(false);
            mutation.mutate(formData, {
                onSuccess: ()=>{
                    localStorage.setItem(`firstLogin:${formData.loginId}`, "true");
                    router.push('/info?first=회원가입 완료!&second=🎉&buttonmessage=로그인&href=/login');
                }
            });
        }
    },[formData, isReady, mutation])
 
    return (
        <div className="h-full container">
            {step === 1 && <Register1 onNext={handleNextStep}/>}
            {step === 2 && <Register2 onReadySubmit={handleSubmit} onPrev={handlePrevStep}/>}
        </div>
    );
}

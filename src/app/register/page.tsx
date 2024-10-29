'use client'

import Register1 from "@/components/Register1";
import Register2 from "@/components/Register2";
import { useRegisterMutation } from "@/hooks/useAuthQuery";
import { useEffect, useState } from "react";

interface FormType {
    userId: string,
    nickname: string,
    password: string,

}
export interface FormType2 extends FormType {
    username: string,
    phone: string,
    address: string,
}

export default function Register() {

    const [step, setStep] = useState<number>(1)
    const [formData, setFormData] = useState<FormType2>({
        userId: "",
        password: "",
        nickname: "",
        username: "",
        phone: "",
        address: "",
    });
    const [isReady, setIsReady] = useState(false);

    const handleNextStep = (data:FormType) => {
        setFormData((prev) => ({...prev, ...data}))
        const next = step + 1
        setStep(next)
    }

    const handlePrevStep = () => {
        const prev = step - 1
        setStep(prev)
    }

    const mutation = useRegisterMutation();

    const handleSubmit = (data:FormType2) => {
        setFormData((prev) => ({...prev, ...data})); //비동기로 동작하니까...
        console.log(formData);
        setIsReady(true);
    }
    
    
    useEffect(()=>{
        if(isReady){
            setIsReady(false);
            mutation.mutate(formData);
            console.log(formData)
        }
    },[formData, isReady, mutation])
 
    return (
        <div className="h-full">
            {step === 1 && <Register1 onNext={handleNextStep}/>}
            {step === 2 && <Register2 onReadySubmit={handleSubmit} onPrev={handlePrevStep}/>}
        </div>
    );
}

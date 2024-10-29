'use client'

import Register1 from "@/components/Register1";
import Register2 from "@/components/Register2";
import { useRegisterMutation } from "@/hooks/useAuthQuery";
import { useEffect, useState } from "react";

interface FormType {
    account: string,
    nickname: string,
    password: string,

}
interface FormType2 {
    name: string,
    phoneNumber: string,
    address: string,
}

export interface FormDataType extends FormType, FormType2 {}


export default function Register() {

    const [step, setStep] = useState<number>(2)
    const [formData, setFormData] = useState<FormDataType>({
        account: "",
        nickname: "",
        password: "",
        name: "",
        phoneNumber: "",
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
        setIsReady(true);
    }
    
    useEffect(()=>{
        if(isReady){
            setIsReady(false);
            mutation.mutate(formData);
        }
    },[formData, isReady, mutation])
 
    return (
        <div className="h-full">
            {step === 1 && <Register1 onNext={handleNextStep}/>}
            {step === 2 && <Register2 onReadySubmit={handleSubmit} onPrev={handlePrevStep}/>}
        </div>
    );
}

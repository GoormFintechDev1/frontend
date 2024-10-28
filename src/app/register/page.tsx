'use client'

import Register1 from "@/components/Register1";
import Register2 from "@/components/Register2";
import { useEffect, useState } from "react";

interface FormType {
    userId: string,
    nickname: string,
    password: string,

}
interface FormType2 {
    username: string,
    phone: string,
    address: string,
}

export default function Register() {

    const [step, setStep] = useState<number>(1)
    const [formData, setFormData] = useState({});
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

    const handleSubmit = (data:FormType2) => {
        setFormData((prev) => ({...prev, ...data})); //비동기로 동작하니까...
        setIsReady(true);
    }

    useEffect(()=>{
        if(isReady){
            setIsReady(false);
            console.log(formData)
        }
    },[formData, isReady])
 
    return (
        <div className="h-full">
            {step === 1 && <Register1 onNext={handleNextStep}/>}
            {step === 2 && <Register2 onReadySubmit={handleSubmit} onPrev={handlePrevStep}/>}
        </div>
    );
}

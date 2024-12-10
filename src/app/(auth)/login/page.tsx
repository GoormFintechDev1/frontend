'use client'

import Login from "@/components/Login";
// import { useUserInfo } from "@/hooks/useUserQuery";
// import { useRouter } from "next/navigation";

export default function LoginPage() {

    // const {data:user} = useUserInfo();
    // const router = useRouter();
    // if(user) router.push("/");
    
    return (
        <div className="container2">
            <Login />
        </div>
    )
    
}

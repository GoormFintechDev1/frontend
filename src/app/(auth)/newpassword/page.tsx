'use client'

import NewPassword from "@/components/NewPassword";
import { useSearchParams } from "next/navigation";

export default function NewPasswordPage() {

    const searchParam = useSearchParams();
    const loginId = searchParam.get("loginId") || "";
    return <NewPassword loginId={loginId}/>;
}
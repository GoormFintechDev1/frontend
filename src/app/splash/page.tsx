"use client"
import { useUserInfo } from "@/hooks/useUserQuery";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Splash() {
    const router = useRouter();
    const { data, error, isLoading } = useUserInfo();
  
    useEffect(() => {

      if (isLoading) return;

      const timer = setTimeout(() => {
        if (data) {
          router.push("/");

        } else if (error && (error as any).status === 403) {
          router.push("/login");

        } else if (error) {
          console.error("인증 확인 중 오류 발생:", error);
          router.push("/login");
        }
      }, 2000);
  
      return () => clearTimeout(timer);
    }, [data, error, isLoading, router]);
  
    return <div>스플래시 페이지 로딩 중...</div>;
  }
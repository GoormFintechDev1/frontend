"use client";

import { useUserInfo } from "@/hooks/useUserQuery";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";


interface CustomError extends Error {
  status: number,
  data: string,
}

export default function Splash() {
    const router = useRouter();
    const { data, error, isLoading } = useUserInfo();

    useEffect(() => {
        if (isLoading) return;

        const timer = setTimeout(() => {
            if (data) {
                router.push("/");
            } else if (error) {
                const status = (error as CustomError)?.status || null;

                if (status === 403) {
                    router.push("/login");
                } else {
                    router.push("/login");
                }

            }
          }, 2000);
        

        return () => clearTimeout(timer); 
    }, [data, error, isLoading, router]);

    return (<div className="container flex items-center justify-center">
      <Image src={"/logo.png"} width={90} height={40} alt="splash"></Image>
    </div>);
  }
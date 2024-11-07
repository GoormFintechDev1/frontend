"use client";

import { useRouter } from "next/navigation";

type ButtonProps = {
  href?: string;
  type?: "button" | "submit";
  className?: string;
  children: React.ReactNode;
};

export default function Button({
  href,
  type = "button",
  className,
  children,
}: ButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    // console.log(type)
    if (href) {
      router.push(href);
    }
  };

  return (
    <button
      className={`w-full bg-emerald-400 text-white font-bold h-14 rounded-xl ${className}`}
      onClick={handleClick}
      type={type}

    >
      {children}
    </button>
  );
}

//다음 페이지로 넘기는 기능이 필요한 버튼에 사용하세요.
//페이지를 넘기기 전에 submit이 필요하다면 type을 보내주세요.
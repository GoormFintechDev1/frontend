"use client";

import { useRouter } from "next/navigation";

type ButtonProps = {
  href?: string;
  onSubmit?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

export default function Button({
  href,
  onSubmit,
  children,
  disabled = false,
}: ButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onSubmit) {
      onSubmit();
    }
    if (href) {
      router.push(href);
    }
  };

  return (
    <button
      className="w-full bg-emerald-400 text-white font-bold h-14 rounded-xl"
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
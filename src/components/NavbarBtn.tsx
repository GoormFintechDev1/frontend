"use client"

import Image from "next/image";
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"

interface BtnProps {
  path: string,
  btnName: string,
  imgName: string,
}

const NavbarBtn = (props: BtnProps) => {
  const router = useRouter()
  const pathname = usePathname();
  return (
    <button 
      className={`flex flex-col justify-center items-center w-[50px] h-[50px] rounded-lg`}
      onClick={() => router.push(`${props.path}`)}
    >
      <Image
      src={pathname === props.path ? `/nav/${props.imgName}_on.png` : `/nav/${props.imgName}.png`}
      alt={`${props.btnName}`} width={24} height={24} />
      <span className={`text-xs ${pathname === `${props.path}` ? 'text-emerald-400' : 'text-[#676767]'} leading-[22px]`}>
        {props.btnName}
      </span>
    </button>
  )
}

export default NavbarBtn
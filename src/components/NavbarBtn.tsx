"use client"

import Image from "next/image";
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"

interface BtnProps {
  path: string,
  btnName: string,
  imgPath: string,
}

const NavbarBtn = (props: BtnProps) => {
  const router = useRouter()
  const pathname = usePathname();
  return (
    <button 
      className={`flex flex-col items-center p-2 rounded-lg ${
        pathname === `${props.path}` ? 'bg-[#34D399]' : 'bg-transparent'
      }`}
      onClick={() => router.push(`${props.path}`)}
    >
      <Image src={`${props.imgPath}`} alt={`${props.btnName}`} width={24} height={24} />
      <span className={`text-sm ${pathname === `${props.path}` ? 'text-white' : 'text-gray-700'}`}>
        {props.btnName}
      </span>
    </button>
  )
}

export default NavbarBtn
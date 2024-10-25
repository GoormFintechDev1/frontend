"use client";

import Image from "next/image"
import { usePathname } from "next/navigation"

const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="fixed bottom-0 w-full left-1/2 transform -translate-x-1/2 bg-gray-100 border-t border-[#D9D9D9] max-w-md mx-auto">
      <div className="flex justify-around items-center h-16">
        <div className="flex flex-col items-center">
          <Image src="/nav/Menu.png" alt="카테고리" width={24} height={24} />
          <span className="text-sm text-gray-700">카테고리</span>
        </div>
        <div className="flex flex-col items-center">
          <Image src="/nav/Edit.png" alt="팔래요" width={24} height={24} />
          <span className="text-sm text-gray-700">팔래요</span>
        </div>
        <div className="flex flex-col items-center">
          <Image src="/nav/Home.png" alt="홈" width={24} height={24} />
          <span className="text-sm text-gray-700">홈</span>
        </div>
        <div className="flex flex-col items-center">
          <Image src="/nav/Heart.png" alt="관심상품" width={24} height={24} />
          <span className="text-sm text-gray-700">관심상품</span>
        </div>
        <div className="flex flex-col items-center">
          <Image src="/nav/User.png" alt="마이" width={24} height={24} />
          <span className="text-sm text-gray-700">마이</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
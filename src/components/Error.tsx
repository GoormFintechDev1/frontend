import React from 'react'
import Image from 'next/image'

const Error = () => {
  return (
    <div className="flex flex-col container2 justify-center items-center space-y-10">
        <Image alt="error" src={"/error.gif"} width={80} height={80} unoptimized priority></Image>
        <p className='text-gray-600'>잠시 후 다시 시도해주세요.</p>
    </div>
  )
}

export default Error
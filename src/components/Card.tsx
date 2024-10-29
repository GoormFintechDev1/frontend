import Image from "next/image";

// components/Card.tsx
interface CardProps {
  title: string;
  price: number;
  time: string;
}

const Card = ({ title, price, time }: CardProps) => {
  return (
    <div className="flex flex-row py-4">
      {/* 이미지 영역 */}
      <div className="bg-white flex flex-shrink-0 items-center justify-center rounded-lg w-[100px] h-[100px] break-all">
        <Image src={`/nav/Person.png`} alt="Profile" width={80} height={80} />
      </div>
      
      {/* 텍스트 영역 */}
      <div className="pl-[20px] pt-[2px]">
        <h2 className="font-semibold leading-6">{title}</h2>
        <p className="text-xs leading-6 text-[#676767]">{time}</p>
        <p className="leading-6">{price.toLocaleString()} 원</p>
      </div>
    </div>
  );
};

export default Card;
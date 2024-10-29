
// Infopage에서 받을 props의 타입 정의
interface InfopageProps {
  first: string; 
  second: string; 
  buttonmessage: string; 
}

export default function Infopage({ first, second, buttonmessage }: InfopageProps) {
  return (
<div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="text-xl font-bold my-2 items-center justify-center ">{first}</div>
        <div className="text-4xl my-2 mt-5">{second}</div>
      </div>

      <button className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white py-3 px-10 rounded-lg text-lg cursor-pointer hover:bg-emerald-600 transition duration-200 w-4/5 h-16">
        {buttonmessage}
      </button>
    </div>
  );
}

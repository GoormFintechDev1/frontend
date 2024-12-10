import { MarketReport } from "@/interface/report"
import Image from "next/image"
import { useState } from "react"

interface Props {
    report: MarketReport
}


export default function ReportMarket({report}: Props) {

    const [info, setInfo] = useState(false);

  return (
    <div className="py-3">
        <div className="text-xl font-bold pb-3">시장 동향</div>
        <div className="bg-zinc-100 p-5 rounded-xl">
        <div className="flex w-full space-x-5">
            <div className="min-h-7 w-1/2 rounded-xl p-5 my-2 bg-white items-center">
                <div className="flex justify-between">
                    <p className="font-bold text-sm pb-3 ">BSI 지수</p>
                    <Image alt="information" src={"/icons/Info.png"} width={20} height={20} style={{height:'20px'}} onClick={()=>setInfo(true)}></Image>
                </div>
                <div className="text-base h-10 justify-self-center" style={{color:"#333333"}}><p className="font-extrabold text-blue-600">{report?.BSI_index}</p></div>
            </div>
            {/* <div className="min-h-7 w-1/2 rounded-xl p-5 my-2 bg-zinc-50">
                <p className="font-bold text-sm pb-3 ">환율</p>
                <div className="text-base h-10 justify-self-center items-center" style={{color:"#333333"}}><p className="font-extrabold text-blue-600">{report?.exchange_rate} 원</p></div>
            </div> */}
        </div>
        <div className="text-sm" style={{color:"#333333", lineHeight:"24px"}}>
            <div className="py-3">
                <p className="font-bold text-base">BSI</p>
                <div>{report?.BSI_description}</div>
            </div>
            <div className="py-3">
                <p className="font-bold text-base">원가</p>
                <div>{report?.price_index}</div>
            </div>
            <div className="py-3">
                <p className="font-bold text-base">트렌드</p>
                <div>{report?.food_trend}</div>
            </div>
        </div>

        {info && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg w-80 flex flex-col p-5 justify-between" style={{height:'350px'}}>
                    <div className="flex flex-row justify-end">
                        <Image alt="x" src={"/icons/X.png"} width={20} height={20} onClick={()=>setInfo(false)}></Image>
                    </div>
                    <div className="overflow-y-scroll flex flex-col">
                        <p className="font-bold">BSI 지수란?</p>
                        <ul className="text-xs list-inside list-disc space-y-5 my-5">
                            <p className="bg-gray-100 rounded p-3 text-sm">사업체의 실적과 계획 등에 대한 주관적 의견을 수치화하여 전반적인 경기동향을 파악하는 경기 예측 지표</p>
                            <li className="px-2">BSI 지수가 100 이상인 경우 경기 실적이 호전되었다는 의미입니다.</li>
                            <li className="px-2">BSI 지수가 100 미만인 경우에는 경기 실적이 악화되었음을 의미합니다.</li>
                        </ul>
                    </div>
                    <p className="text-gray-700 text-right" style={{fontSize:'10px'}}>출처 중소벤처기업부 소상공인시장 경기동향조사</p>
                </div>
            </div>
        )}
        </div>
    </div>
  )
}

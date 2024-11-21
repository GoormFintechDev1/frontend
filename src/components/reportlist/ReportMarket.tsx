interface MarketReport {
    month: number,
    BSI_index: number,
    BSI_description: string,
    exchange_rate: string,
    price_index: string,
    food_trend: string,
    recommendations: string[],
}

interface Props {
    report: MarketReport
}


export default function ReportMarket({report}: Props) {
    console.log(report)
  return (
    <div>
        <div className="text-xl font-bold py-3">시장 동향</div>
        <div className="flex w-full space-x-5">
            <div className="min-h-7 w-1/2 rounded-xl p-5 my-2 bg-zinc-50 items-center">
                <p className="font-bold text-sm pb-3 ">BSI 지수</p>
                <div className="text-base h-10 justify-self-center" style={{color:"#333333"}}><p className="font-extrabold text-blue-600">{report?.BSI_index}</p></div>
            </div>
            <div className="min-h-7 w-1/2 rounded-xl p-5 my-2 bg-zinc-50">
                <p className="font-bold text-sm pb-3 ">환율</p>
                <div className="text-base h-10 justify-self-center items-center" style={{color:"#333333"}}><p className="font-extrabold text-blue-600">{report?.exchange_rate} 원</p></div>
            </div>
        </div>
        <div className="text-base" style={{color:"#333333", lineHeight:"28px"}}>
            <div className="py-3">
                <p className="font-bold">BSI</p>
                <div>{report?.BSI_description}</div>
            </div>
            <div className="py-3">
                <p className="font-bold">원가</p>
                <div>{report?.price_index}</div>
            </div>
            <div className="py-3">
                <p className="font-bold">트렌드</p>
                <div>{report?.food_trend}</div>
            </div>
            <div className="py-3">
                <p className="font-bold">추천</p>
                <ul className="ml-5 list-outside list-disc space-y-2">{report?.recommendations.map((r, i)=>(
                    <li key={i}>{r}</li>
                ))}</ul>
            </div>
        </div>
        {/* <div className="min-h-7 rounded-xl p-5" style={{backgroundColor:"#FAFAFA"}}>
            <p className="font-bold text-sm pb-3">매출/지출 비교</p>
            <div className="text-xs" style={{color:"#333333"}}>차트영역...</div>
        </div> */}
    </div>
  )
}


interface Props {
    report: string[]
}


export default function ReportMarket({report}: Props) {

  return (
    <div className="py-2">
        <div className="text-xl font-bold pb-3">추천</div>
        <div className="bg-zinc-100 p-5 rounded-xl">
        <div className="flex w-full space-x-5">
            <div className="py-3">
                <ul className="ml-5 list-outside list-disc space-y-4 text-sm text-gray-700" style={{color:"#333333", lineHeight:"24px"}}>{report?.map((r, i)=>(
                    <li key={i}>{r}</li>
                ))}</ul>
            </div>
        </div>
        </div>
    </div>
  )
}

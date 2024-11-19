
interface IndustryReport {
    average_sale: string,
    average_expense: string,
    expense_description: string,
    sale_description: string,
}

interface Props {
    report: IndustryReport;
  }

export default function ReportIndusty({report}:Props) {
    console.log(report)
  return (
    <div>
        <div className="text-xl font-bold">주변 상권 분석</div>
        <div className="text-base" style={{color:"#333333", lineHeight:"28px"}}>
            <div className="py-3">
                <p className="font-bold">매출은</p>
                <div>{report?.sale_description}</div>
            </div>
            <div className="py-3">
                <p className="font-bold">지출은</p>
                <div>{report?.expense_description}</div>
            </div>
        </div>
        <div className="min-h-7 rounded-xl p-5" style={{backgroundColor:"#FAFAFA"}}>
            <p className="font-bold text-sm">매출/지출 비교</p>
            <div>차트영역...</div>
        </div>
    </div>

  )
}

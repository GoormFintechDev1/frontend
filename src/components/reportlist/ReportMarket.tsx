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

    </div>
  )
}

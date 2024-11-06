import convertToKoreanWon from "@/utils/currency"
import Link from "next/link"

const Profit = () => {
  return (
    <div className="flex flex-col bg-white py-3 px-2 rounded-2xl shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold">지난 달 순이익</h2>
        <span className="text-gray-500">
          <Link href="/profit">&#62;</Link>
        </span>
      </div>
      <div className="flex flex-col h-full justify-center items-center">
        <p className="text-blue-600 text-base font-bold">
          {convertToKoreanWon(2500000)}
        </p>
      </div>
    </div>
  )
}

export default Profit
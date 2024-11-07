import convertToKoreanWon from "@/utils/currency"
import Link from "next/link"

const Profit = () => {
  return (
    <div className="box">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold">지난 달 순이익</h2>
        <span>
          <Link href="/profit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
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
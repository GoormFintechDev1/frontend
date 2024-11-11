import { useLastPorfit } from "@/hooks/useExpensesQuery";
import { useRevenueHistory } from "@/hooks/useRevenueQuery";
import convertToKoreanWon from "@/utils/currency"
import Link from "next/link"

interface RevenueProps {
  height: string;
}

const Profit: React.FC<RevenueProps> = ({height}) => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  const {data} = useLastPorfit(year, month);
  // console.log(data);

  return (
    <div className="box" style={{height}}>
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
              className="size-6 text-gray-400"
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
          {convertToKoreanWon(data)}
        </p>
      </div>
    </div>
  )
}

export default Profit
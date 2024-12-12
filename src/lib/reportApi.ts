import { IndustryReport, MarketReport } from "@/interface/report";

const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8080/api/report";
if (enviroment === "production") {
  url = process.env.NEXT_PUBLIC_DOMAIN ? `http://${process.env.NEXT_PUBLIC_DOMAIN}/api/report` : `http://localhost:8080/api/report`;
}

interface ReportData {
  reports: {
    INDUSTRY_REPORT: IndustryReport,
    MARKET_REPORT: MarketReport,
  }
}

export const getReportData = async (paramMonth: string): Promise<ReportData> => {
  const response = await fetch(`${url}/all?month=${paramMonth}`, {
    method: "GET",
    credentials: "include"
  });

  if(!response.ok) throw new Error("리포트 데이터 조회 에러");

  return response.json();
}

//새로운 리포트 생성했는지 체크
export const getReportCheck = async () => {
  const response = await fetch(`${url}/previous-month/check`, {
    method: "GET",
    credentials: "include"
  });

  if(!response.ok) throw new Error("리포트 데이터 조회 에러");

  return response.json();
}


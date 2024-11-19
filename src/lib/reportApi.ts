const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8080/api/report";
if (enviroment === "production") {
  url = process.env.NEXT_PUBLIC_DOMAIN ? `http://${process.env.NEXT_PUBLIC_DOMAIN}/api/report` : `http://localhost:8080/api/report`;
}

export const getReportData = async (paramMonth: string) => {
  const response = await fetch(`${url}/all?month=${paramMonth}`, {
    method: "GET",
    credentials: "include"
  });

  if(!response.ok) throw new Error("리포트 데이터 조회 에러");

  return response.json();

  // console.log(paramMonth);

  // const data = [
  //   {
  //     title:
  //       "1. 경제 지표(BSI, 환율, 소비자 물가지수, 인플레… 등) 활용 시장 동향",
  //     contents: [
  //       "**소비자 물가 지수 (CPI)**가 전년 동월 대비 3.7% 상승한 것으로 나타났습니다.",
  //       "커피 원두, 우유, 설탕 등 원재료 가격 상승이 소매가에 반영되었을 가능성이 크므로, 원가 관리가 더욱 중요해졌습니다.",
  //     ],
  //   },
  //   {
  //     title: "2. 소비자 심리지수 (BSI 지수)",
  //     contents: [
  //       "9월 BSI 지수가 92로, 전월보다 소폭 하락했습니다. 이는 소비자들이 경제 상황에 대해 다소 부정적인 인식을 가지고 있음을 의미합니다.",
  //       "영향: 카페와 같은 외식업의 소비 심리 위축이 예상되며, 기존 고객을 유지하고 신규 고객 유입을 위해 프로모션이나 멤버십 제도를 도입하는 것이 도움이 될 수 있습니다.",
  //     ],
  //   },
  //   {
  //     title: "3. 업종별 평균 매출 변화",
  //     contents: [
  //       "외식업 전체 매출은 전월 대비 1.5% 감소했지만, 카페 업종의 경우에는 소폭 증가한 것으로 나타났습니다.",
  //       "분석: 계절 메뉴 (예: 가을 시즌 메뉴)나 한정판 제품 출시가 효과를 본 것으로 보입니다. 이를 토대로 가을 시즌 마케팅을 강화하거나, 한정판 메뉴와 같은 특별한 경험을 제공하여 방문 유도를 강화할 수 있습니다.",
  //     ],
  //   },
  // ];

  // return data;
};

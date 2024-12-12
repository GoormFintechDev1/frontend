export interface revenueType {
  name: string,
  value: number,
  fill: string,
}

export interface MarketReport {
  month: number,
  BSI_index: number,
  BSI_description: string,
  CPI_index: number,
  CPI_description: string,
  market_issue: string,
  trend: string,
  recommendation: string,
  error?:string,
}

export interface IndustryReport {
  average_sale: string,
  average_expense: string,
  my_expense: string,
  my_income: string,
  expense_description: string,
  sale_description: string,
  recommendation: string,
  error?: string,
}

export interface ReportItemProps {
  item: {
    title: string;
    contents: string[];
  }
}
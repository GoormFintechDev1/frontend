export interface revenueType {
  name: string,
  value: number,
  fill: string,
}

export interface MarketReport {
  month: number,
  BSI_index: number,
  BSI_description: string,
  exchange_rate: string,
  price_index: string,
  food_trend: string,
  recommendations: string[],
}

export interface IndustryReport {
  average_sale: string,
  average_expense: string,
  my_expense: string,
  my_income: string,
  expense_description: string,
  sale_description: string,
}

export interface ReportItemProps {
  item: {
    title: string;
    contents: string[];
  }
}
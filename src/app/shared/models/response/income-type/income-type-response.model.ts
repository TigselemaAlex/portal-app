export enum IncomeTypePeriod {
  MONTHLY = 'MONTHLY',
  CASUAL = 'CASUAL',
}

export interface IncomeTypeResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  period: IncomeTypePeriod;
  active: boolean;
  canBeDeleted: boolean;
}

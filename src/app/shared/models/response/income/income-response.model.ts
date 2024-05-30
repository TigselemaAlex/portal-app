import { IncomeTypeResponse } from '../income-type/income-type-response.model';
import { ResidenceResponse } from '../residence/residence-response.model';

export interface IncomeResponse {
  id: number;
  description: string;
  code: string;
  amount: number;
  paidDate: Date;
  monthsPaid: number;
  paidSince: Date;
  paidUntil: Date;
  type: IncomeTypeResponse;
  residence: ResidenceResponse;
  canBeDeleted: boolean;
}

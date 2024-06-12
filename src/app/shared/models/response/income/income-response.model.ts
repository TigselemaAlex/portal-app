import { IncomeTypeResponse } from '../income-type/income-type-response.model';
import { ParkingResponse } from '../parking/parking-response.model';
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
  parking?: ParkingResponse;
  type: IncomeTypeResponse;
  residence: ResidenceResponse;
  canBeDeleted: boolean;
}

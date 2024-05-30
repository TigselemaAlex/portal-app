import { ResidenceResponse } from '../residence/residence-response.model';

export interface FinancialObligationStatusResponse {
  financialStatusDetails: FinancialStatusDetail[];
}

export interface FinancialStatusDetail {
  residence: ResidenceResponse;
  complement: Complement[];
}
export interface Complement {
  type: string;
  totalMonthsDelayed: number;
  parkingData: FinancialStatusComplementParkingData[];
}

export interface FinancialStatusComplementParkingData {
  code: string;
  totalMonthsDelayed: number;
}

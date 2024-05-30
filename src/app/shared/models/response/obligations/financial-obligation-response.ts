import { IncomeResponse } from '../income/income-response.model';
import { PenaltyResponse } from '../penalty/penalty-response.model';
import { ResidenceResponse } from '../residence/residence-response.model';

export interface FinancialObligationResponse {
  residencesObligations: ResidencesObligation[];
  residencesPaidPenalties: ResidencesPaidPenalty[];
  residencesUnpaidPenalties: ResidencesPaidPenalty[];
  residencesUnpaidAmounts: ResidencesUnpaidAmount[];
}

export interface ResidencesObligation {
  residence: ResidenceResponse;
  incomes: IncomeResponse[];
}

export interface ResidencesPaidPenalty {
  residence: ResidenceResponse;
  penalties: PenaltyResponse[];
}

export interface ResidencesUnpaidAmount {
  residence: ResidenceResponse;
  amount: number;
}

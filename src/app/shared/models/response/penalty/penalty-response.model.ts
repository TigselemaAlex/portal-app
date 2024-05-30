import { PenaltyEvidenceResponse } from '../penalty-evidence/penalty-evidence-response.model';
import { PenaltyTypeResponse } from '../penalty-type/penalty-type-response.model';
import { ResidenceResponse } from '../residence/residence-response.model';

export enum PaidStatus {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
}

export interface PenaltyResponse {
  id: number;
  description: string;
  code: string;
  amount: number;
  issueDate: Date;
  paidDate: Date;
  residence: ResidenceResponse;
  status: PaidStatus;
  type: PenaltyTypeResponse;
  evidences: PenaltyEvidenceResponse[];
}

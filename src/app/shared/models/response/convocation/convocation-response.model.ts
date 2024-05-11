import { UserResponse } from '../user/user-response.model';

export enum ConvocationType {
  MEETING = 'MEETING',
  ASSEMBLY = 'ASSEMBLY',
  SESSION = 'SESSION',
}

export interface ConvocationResponse {
  id: number;
  subject: string;
  description: string;
  date: Date;
  type: ConvocationType;
  place: string;
  attendanceDeadline: Date;
  createdBy: UserResponse;
  updatedBy: UserResponse;
  finalized: boolean;
  totalPresent: number;
  totalMissing: number;
}

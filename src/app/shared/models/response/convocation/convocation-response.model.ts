import { UserResponse } from '../user/user-response.model';

export enum ConvocationType {
  MEETING_ORDINARY = 'MEETING_ORDINARY',
  MEETING_EXTRAORDINARY = 'MEETING_EXTRAORDINARY',
  ASSEMBLY_ORDINARY = 'ASSEMBLY_ORDINARY',
  ASSEMBLY_EXTRAORDINARY = 'ASSEMBLY_EXTRAORDINARY',
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

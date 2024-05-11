import { ResidenceResponse } from '../residence/residence-response.model';

export interface ConvocationParticipantsResponse {
  id: number;
  participant: string;
  attendance: boolean;
  attendanceDate: Date;
  residence: ResidenceResponse;
}

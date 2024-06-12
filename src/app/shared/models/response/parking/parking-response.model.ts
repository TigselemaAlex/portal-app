import { ResidenceResponse } from '../residence/residence-response.model';

export interface ParkingResponse {
  id: number;
  code: string;
  status: ParkingStatus;
  residence: ResidenceResponse;
}

export enum ParkingStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
}

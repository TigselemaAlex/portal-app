import { UserResponse } from '../user/user-response.model';
import { PassageResponse } from '../passage/passage-response.model';

export interface ResidenceResponse {
  id: number;
  number: string;
  user: UserResponse;
  passage: PassageResponse;
}

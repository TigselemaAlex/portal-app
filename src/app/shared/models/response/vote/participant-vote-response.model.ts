import { UserResponse } from '../user/user-response.model';

export interface ParticipantVoteResponse {
  id: number;
  vote: boolean;
  voteBy: UserResponse;
}

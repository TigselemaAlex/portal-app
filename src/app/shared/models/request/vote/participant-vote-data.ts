export interface ParticipantVoteData {
  vote: boolean;
  assemblyQuestion: number;
  voteBy: number;
  geolocation: { latitude: number; longitude: number };
}

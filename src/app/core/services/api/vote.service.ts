import { ParticipantVoteData } from './../../../shared/models/request/vote/participant-vote-data';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from 'src/app/shared/models/response/api-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  private readonly END_POINT =
    environment.API_URL + '/protected/assembly-votes';
  private readonly http = inject(HttpClient);

  findAllAssemblyQuestions(id: number) {
    return this.http.get<ApiResponse>(
      `${this.END_POINT}/convocation-enabled/${id}`
    );
  }

  updateVote(data: ParticipantVoteData) {
    console.log(data);
    return this.http.put<ApiResponse>(`${this.END_POINT}/update-vote`, data);
  }

  getParticipantVote(id: number, userId: number) {
    return this.http.get<ApiResponse>(
      `${this.END_POINT}/participant-vote/${id}/${userId}`
    );
  }
}

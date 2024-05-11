import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ConvocationParticipantAttendanceData } from 'src/app/shared/models/request/convocation/convocation-participant-attendance-data.model';
import { ApiResponse } from 'src/app/shared/models/response/api-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConvocationService {
  private readonly END_POINT = environment.API_URL + '/protected/convocation';
  private readonly http = inject(HttpClient);

  getTodayConvocationsNotFinalized() {
    return this.http.get<ApiResponse>(this.END_POINT + '/today-not-finalized');
  }

  findAllByConvocationIdAndResidenceUserId(id: number, userId: number) {
    return this.http.get<ApiResponse>(
      `${this.END_POINT}/${id}/convocation-participants/${userId}`
    );
  }

  updateParticipantAttendance(
    id: number,
    data: ConvocationParticipantAttendanceData
  ) {
    return this.http.put<ApiResponse>(
      `${this.END_POINT}/${id}/participant-attendance`,
      data
    );
  }
}

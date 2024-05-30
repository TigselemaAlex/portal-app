import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from 'src/app/shared/models/response/api-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ObligationsService {
  private readonly END_POINT =
    environment.API_URL + '/protected/financial-obligations';
  private readonly http = inject(HttpClient);

  public getFinancialObligationsStatus(id: number) {
    return this.http.get<ApiResponse>(`${this.END_POINT}/status/${id}`);
  }

  public getFinancialObligations(id: number) {
    return this.http.get<ApiResponse>(`${this.END_POINT}/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from 'src/app/shared/models/response/api-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly END_POINT = environment.API_URL + '/protected/users';
  private readonly http = inject(HttpClient);

  findById(id: number) {
    return this.http.get<ApiResponse>(`${this.END_POINT}/${id}`);
  }

  updatePassword(id: number, data: { password: string }) {
    return this.http.put<ApiResponse>(
      `${this.END_POINT}/${id}/update-password`,
      data
    );
  }
}

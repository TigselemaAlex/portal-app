import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from 'src/app/shared/models/response/api-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocialEventService {
  END_POINT = environment.API_URL + '/protected/social-event';

  private readonly http = inject(HttpClient);

  findAll(from: Date, page: number = 0) {
    return this.http.get<ApiResponse>(this.END_POINT, {
      params: {
        from: from.getTime() ?? '',
        page: page,
      },
    });
  }
}

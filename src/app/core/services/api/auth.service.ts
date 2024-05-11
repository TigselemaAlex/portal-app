import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthLoginData } from 'src/app/shared/models/request/auth/auth-login-data.model';
import { MailResponse } from 'src/app/shared/models/response/auth/mail-response.model';
import { JwtResponse } from 'src/app/shared/models/response/jwt/jwt-response.model';
import { environment } from 'src/environments/environment';

export interface ValidationTokenResponse {
  isValid: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  END_POINT = environment.API_URL + '/public/auth';
  private readonly http = inject(HttpClient);

  login(loginData: AuthLoginData) {
    return this.http.post<JwtResponse>(this.END_POINT + '/login', loginData);
  }

  validateToken() {
    return this.http.get<ValidationTokenResponse>(
      this.END_POINT + '/validate-token'
    );
  }

  recoverPassword(dni: string) {
    return this.http.put<MailResponse>(
      this.END_POINT + `/recover-password/${dni}`,
      {}
    );
  }
}

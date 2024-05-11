import { Injectable, inject } from '@angular/core';

import { JwtResponse } from 'src/app/shared/models/response/jwt/jwt-response.model';

const JWT_KEY = 'auth-key';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  clean() {
    localStorage.clear();
  }

  saveAuth(auth: JwtResponse) {
    localStorage.setItem(JWT_KEY, JSON.stringify(auth));
  }

  getAuth() {
    const auth = localStorage.getItem(JWT_KEY);
    return auth ? (JSON.parse(auth) as JwtResponse) : null;
  }

  isLogged() {
    const auth = localStorage.getItem(JWT_KEY);
    return !!auth;
  }
}

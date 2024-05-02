import { Injectable, inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { JwtResponse } from 'src/app/shared/models/response/jwt/jwt-response.model';

const JWT_KEY = 'auth-key';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  private storage = inject(Storage);

  constructor() {
    this.init();
  }

  init() {
    this.storage.create().then((storage) => {
      this._storage = storage;
      this._storage.set(JWT_KEY, null);
    });
  }

  clean() {
    this._storage?.clear();
  }

  saveAuth(auth: JwtResponse) {
    return this._storage?.set(JWT_KEY, auth);
  }

  getAuth() {
    return this._storage?.get(JWT_KEY).then((auth) => {
      return auth;
    });
  }

  isLogged() {
    return this._storage?.get(JWT_KEY).then((auth) => !!auth);
  }
}

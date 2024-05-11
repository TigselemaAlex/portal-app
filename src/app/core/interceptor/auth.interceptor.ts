import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../services/resource/storage.service';
import { inject } from '@angular/core';
import { Observable, from, mergeMap } from 'rxjs';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let jwt = inject(StorageService).getAuth();

  if (jwt) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwt.token}`,
      },
    });
  }
  return next(req);

  /* return from(jwt).pipe(
    mergeMap((jwt) => {
      if (jwt) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${jwt.token}`,
          },
        });
      }
      return next(req);
    })
  ); */
};

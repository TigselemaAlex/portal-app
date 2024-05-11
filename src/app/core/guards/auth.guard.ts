import { AuthService } from 'src/app/core/services/api/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/resource/storage.service';
import { inject } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';
import { Observable, catchError, switchMap } from 'rxjs';
import { PushNotificationService } from '../services/fcm/push-notification.service';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const toastCtrl = inject(ToastController);
  const authService = inject(AuthService);
  const notificationService = inject(PushNotificationService);

  const isLogged = storageService.isLogged();

  if (!isLogged) {
    return handleUnauthorizedAccess(
      router,
      storageService,
      toastCtrl,
      notificationService
    );
  } else {
    return authService.validateToken().pipe(
      switchMap((response) => {
        if (response.isValid) {
          return new Observable<boolean>((observer) => observer.next(true));
        } else {
          return handleUnauthorizedAccess(
            router,
            storageService,
            toastCtrl,
            notificationService
          );
        }
      }),
      catchError(() => {
        return handleUnauthorizedAccess(
          router,
          storageService,
          toastCtrl,
          notificationService
        );
      })
    );
  }

  /* return from(isLogged).pipe(
    mergeMap((reslt) => {
      console.log('isLogged', reslt);
      if (!reslt) {
        return handleUnauthorizedAccess(router, storageService, toastCtrl);
      } else {
        return authService.validateToken().pipe(
          switchMap((response) => {
            if (response.isValid) {
              return new Observable<boolean>((observer) => observer.next(true));
            } else {
              return handleUnauthorizedAccess(
                router,
                storageService,
                toastCtrl
              );
            }
          }),
          catchError(() => {
            return handleUnauthorizedAccess(router, storageService, toastCtrl);
          })
        );
      }
    })
  ); */
};

function handleUnauthorizedAccess(
  router: Router,
  storageService: StorageService,
  toastCtrl: ToastController,
  notificationService: PushNotificationService,
  errorMessage: string = 'Acción no permitida, por favor inicie sesión nuevamente.',
  reload = false
) {
  const t = toastCtrl
    .create({
      message: errorMessage,
      duration: 2000,
      color: 'danger',
      position: 'top',
      buttons: [
        {
          icon: 'close',
          role: 'cancel',
        },
      ],
    })
    .then((toast) => {
      toast.present();
    });
  storageService.clean();
  router.navigate(['/login']);
  notificationService.unsubscribe();
  return new Observable<boolean>((observer) => observer.next(false));
}

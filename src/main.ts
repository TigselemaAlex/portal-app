import { LOCALE_ID, enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from './app/core/services/resource/storage.service';
import { authInterceptorInterceptor } from './app/core/interceptor/auth.interceptor';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { addIcons } from 'ionicons';
import {
  close,
  alert,
  home,
  calendarNumber,
  idCard,
  help,
} from 'ionicons/icons';

if (environment.production) {
  enableProdMode();
}

addIcons({
  close,
  alert,
  home,
  calendarNumber,
  idCard,
  help,
});

registerLocaleData(es);

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptorInterceptor])),
    {
      provide: LOCALE_ID,
      useValue: 'es-EC',
    },
    StorageService,
    Storage,
  ],
});

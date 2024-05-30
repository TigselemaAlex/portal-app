import { addIcons } from 'ionicons';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardSubtitle,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonInputPasswordToggle,
  IonIcon,
  IonList,
  ModalController,
  ToastController,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/core/services/api/auth.service';
import { StorageService } from 'src/app/core/services/resource/storage.service';
import { Router } from '@angular/router';

import { ErrorInputComponent } from 'src/app/shared/components/error-input/error-input.component';
import { getErrorMessage } from 'src/app/common/formHandler';

import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { AuthLoginData } from 'src/app/shared/models/request/auth/auth-login-data.model';
import { add, close } from 'ionicons/icons';
import { PushNotificationService } from 'src/app/core/services/fcm/push-notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonList,
    IonIcon,
    IonButton,
    IonLabel,
    IonItem,
    IonInput,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCardSubtitle,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    ReactiveFormsModule,
    IonInputPasswordToggle,
    ErrorInputComponent,
  ],
})
export class LoginPage {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);
  private readonly storageService = inject(StorageService);
  private readonly router = inject(Router);
  private readonly modalCrtl = inject(ModalController);
  private readonly toastCtrl = inject(ToastController);
  private readonly pushService = inject(PushNotificationService);

  protected readonly getErrorMessage = getErrorMessage;

  constructor() {
    addIcons({
      close,
    });
  }

  form = this.fb.group({
    dni: ['', Validators.required],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(15)],
    ],
  });

  async onLogin() {
    if (this.form.valid) {
      const loginRequest: AuthLoginData = this.form.getRawValue();
      const toast = await this.toastCtrl.create({
        duration: 2000,
        position: 'top',
        buttons: [
          {
            icon: 'close',
            role: 'cancel',
            handler: () => {
              toast.dismiss();
            },
          },
        ],
      });
      this.authService
        .login(loginRequest)
        .pipe()
        .subscribe({
          next: (jwt) => {
            this.storageService.saveAuth(jwt);
            toast.message = 'Inicio de sesión exitoso';
            toast.cssClass = 'success';
            toast.present();
            this.pushService.initPush(jwt.id);
            this.router.navigate(['/main']);
          },
          error: (error) => {
            this.storageService.clean();
            if (error.status === 401 || error.status === 404) {
              toast.message = 'Usuario o contraseña incorrectos';
            } else {
              toast.message = 'Error al iniciar sesión';
            }
            toast.color = 'danger';
            toast.present();
          },
        });
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  async onOpenRecoveryPassword() {
    const modal = await this.modalCrtl.create({
      component: RecoverPasswordComponent,
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    const toast = await this.toastCtrl.create({
      duration: 2000,
      position: 'top',
      buttons: [
        {
          icon: 'close',
          role: 'cancel',
          handler: () => {
            toast.dismiss();
          },
        },
      ],
    });
    if (data) {
      this.authService.recoverPassword(data).subscribe({
        next: (resp) => {
          toast.message = resp.message;
          toast.cssClass = 'success';
          toast.present();
        },
        error: (err) => {
          if (err.status == 404) {
            toast.message = 'El DNI ingresado no se encuentra registrado';
          } else {
            toast.message =
              'Ocurrió un error al intentar recuperar la contraseña, por favor intente nuevamente más tarde';
          }
          toast.color = 'danger';
          toast.present();
        },
      });
    }
  }
}

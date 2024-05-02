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
import { AuthLoginData } from 'src/app/shared/models/auth-login-data.model';
import { ErrorInputComponent } from 'src/app/shared/components/error-input/error-input.component';
import { getErrorMessage } from 'src/app/common/formHandler';

import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';

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

  protected readonly getErrorMessage = getErrorMessage;

  form = this.fb.group({
    dni: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async onLogin() {
    if (this.form.valid) {
      const loginRequest: AuthLoginData = this.form.getRawValue();
      const toast = await this.toastCtrl.create({
        duration: 3000,
      });
      this.authService
        .login(loginRequest)
        .pipe()
        .subscribe({
          next: (jwt) => {
            this.storageService.saveAuth(jwt)?.then(() => {
              /* this.toastCtrl
                .create({
                  message: 'Bienvenido',
                  duration: 2000,
                })
                .then((toast) => toast.present()); */

              toast.message = 'Inicio de sesión exitoso';
              toast.cssClass = 'success';
              toast.present();

              this.router.navigate(['/home']);
            });
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
      duration: 3000,
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

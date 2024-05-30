import { Component, OnInit, ViewChild, inject } from '@angular/core';
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
  IonCardHeader,
  IonCardContent,
  IonButton,
  IonImg,
  IonModal,
  IonButtons,
  IonItem,
  ToastController,
  IonInputPasswordToggle,
  IonInput,
} from '@ionic/angular/standalone';
import { UserResponse } from 'src/app/shared/models/response/user/user-response.model';
import { UserService } from 'src/app/core/services/api/user.service';
import { StorageService } from 'src/app/core/services/resource/storage.service';
import { Router } from '@angular/router';
import { IonModalCustomEvent, OverlayEventDetail } from '@ionic/core';
import { ErrorInputComponent } from '../../../shared/components/error-input/error-input.component';
import { getErrorMessage } from 'src/app/common/formHandler';

@Component({
  selector: 'app-my-profile-tab',
  templateUrl: './my-profile-tab.page.html',
  styleUrls: ['./my-profile-tab.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonImg,
    IonButton,
    IonCardContent,
    IonCardHeader,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    ReactiveFormsModule,
    IonModal,
    IonButtons,
    ErrorInputComponent,
    IonInputPasswordToggle,
    IonInput,
  ],
})
export class MyProfileTabPage implements OnInit {
  currentUser: UserResponse = {} as UserResponse;

  private readonly userService = inject(UserService);
  private readonly storageService = inject(StorageService);
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly toastController = inject(ToastController);
  protected readonly getErrorMessage = getErrorMessage;

  @ViewChild(IonModal) modal!: IonModal;

  form = this.fb.group({
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(15)],
    ],
  });

  ngOnInit() {
    const jwt = this.storageService.getAuth();
    if (jwt) {
      this.userService.findById(jwt.id).subscribe((response) => {
        this.currentUser = response.data;
      });
    }
  }

  logout() {
    this.storageService.clean();
    this.router.navigate(['/login']);
  }

  cancel() {
    this.modal.dismiss();
  }

  async confirm() {
    if (this.form.valid) {
      const data: { password: string } = {
        password: this.form.get('password')?.value!,
      };
      this.userService.updatePassword(this.currentUser.id, data).subscribe({
        next: () => {
          this.modal.dismiss();
          this.toastController
            .create({
              message: 'Contraseña cambiada con éxito!',
              duration: 3000,
              position: 'top',
              cssClass: 'success',
            })
            .then((toast) => {
              toast.present();
            });
        },
        error: (error) => {
          this.toastController
            .create({
              message: 'Error al cambiar la contraseña',
              duration: 3000,
              position: 'top',
              color: 'danger',
            })
            .then((toast) => {
              toast.present();
            });
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
}

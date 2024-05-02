import { Component, OnInit, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import {
  IonInput,
  IonHeader,
  IonButton,
  IonTitle,
  IonContent,
  IonItem,
  IonButtons,
  IonToolbar,
  ModalController,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { getErrorMessage } from 'src/app/common/formHandler';
import { ErrorInputComponent } from 'src/app/shared/components/error-input/error-input.component';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonButtons,
    IonItem,
    IonContent,
    IonTitle,
    IonButton,
    IonHeader,
    IonInput,
    IonToolbar,
    ReactiveFormsModule,
    ErrorInputComponent,
  ],
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent {
  private readonly modalCtrl = inject(ModalController);
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly getErrorMessage = getErrorMessage;

  form = this.fb.group({
    dni: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^[0-9]*$'),
      ],
    ],
  });

  cancel() {
    this.modalCtrl.dismiss();
  }
  confirm() {
    if (this.form.valid) {
      this.modalCtrl.dismiss(this.form.value.dni);
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

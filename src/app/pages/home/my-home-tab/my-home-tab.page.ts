import { ObligationsService } from './../../../core/services/api/obligations.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  ToastController,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonButton,
  IonRefresher,
  RefresherEventDetail,
  IonRefresherContent,
  ModalController,
} from '@ionic/angular/standalone';
import { StorageService } from 'src/app/core/services/resource/storage.service';
import { FinancialObligationResponse } from 'src/app/shared/models/response/obligations/financial-obligation-response';
import { FinancialObligationStatusResponse } from 'src/app/shared/models/response/obligations/financial-obligation-status-response';
import { IonRefresherCustomEvent } from '@ionic/core';
import { PenaltyViewComponent } from './penalty-view/penalty-view.component';

@Component({
  selector: 'app-my-home-tab',
  templateUrl: './my-home-tab.page.html',
  styleUrls: ['./my-home-tab.page.scss'],
  standalone: true,
  imports: [
    IonRefresherContent,
    IonRefresher,
    IonButton,
    IonItem,
    IonList,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class MyHomeTabPage implements OnInit {
  private readonly obligationsService = inject(ObligationsService);
  private readonly storageService = inject(StorageService);
  private readonly toastCtrl = inject(ToastController);
  private readonly modalCtrl = inject(ModalController);

  obligationsStatusData: FinancialObligationResponse =
    {} as FinancialObligationResponse;

  obligations: FinancialObligationStatusResponse =
    {} as FinancialObligationStatusResponse;

  user: number | undefined;
  ngOnInit() {
    this.getUserLogged();
    this.getObligationsStatus();
    this.getObligations();
  }
  ionViewWillEnter() {
    this.getUserLogged();
    this.getObligationsStatus();
    this.getObligations();
  }

  async getObligationsStatus() {
    if (this.user) {
      this.obligationsService
        .getFinancialObligationsStatus(this.user)
        .subscribe({
          next: (data) => {
            this.obligationsStatusData = data.data;
          },
          error: async (error) => {
            const toast = await this.toastCtrl.create({
              message: 'Error al obtener el estado de obligaciones financieras',
              duration: 3000,
              color: 'danger',
            });
            toast.present();
          },
        });
    }
  }

  async getObligations() {
    if (this.user) {
      this.obligationsService.getFinancialObligations(this.user).subscribe({
        next: (data) => {
          this.obligations = data.data;
          console.log(this.obligations);
        },
        error: async (error) => {
          const toast = await this.toastCtrl.create({
            message: 'Error al obtener las obligaciones financieras',
            duration: 3000,
            color: 'danger',
          });
          toast.present();
        },
      });
    }
  }

  async getUserLogged() {
    const jwt = this.storageService.getAuth();
    if (jwt) {
      this.user = jwt.id;
    }
  }

  async doRefresh($event: IonRefresherCustomEvent<RefresherEventDetail>) {
    this.getObligationsStatus().then(() => {
      this.getObligations();
      setTimeout(() => {
        $event.detail.complete();
      }, 500);
    });
  }

  async openPenaltyView() {
    const modal = await this.modalCtrl.create({
      component: PenaltyViewComponent,
      componentProps: {
        unpaidAmount: this.obligationsStatusData.residencesUnpaidAmounts,
        unpaidPenalties: this.obligationsStatusData.residencesUnpaidPenalties,
      },
    });
    await modal.present();
  }

  async openLastPenaltyView() {
    const modal = await this.modalCtrl.create({
      component: PenaltyViewComponent,
      componentProps: {
        paidPenalties: this.obligationsStatusData.residencesPaidPenalties,
      },
    });
    await modal.present();
  }

  async openLastPaymentView() {
    const modal = await this.modalCtrl.create({
      component: PenaltyViewComponent,
      componentProps: {
        obligations: this.obligationsStatusData.residencesObligations,
      },
    });
    await modal.present();
  }
}

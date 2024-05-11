import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonButton,
  IonButtons,
  IonModal,
  IonItem,
  ToastController,
  ModalController,
  IonRefresher,
  RefresherEventDetail,
  IonRefresherContent,
} from '@ionic/angular/standalone';
import { ConvocationResponse } from 'src/app/shared/models/response/convocation/convocation-response.model';
import { ConvocationService } from 'src/app/core/services/api/convocation.service';
import { AssemblieModalComponent } from './components/assemblie-modal/assemblie-modal.component';
import { IonRefresherCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-assemblie-tab',
  templateUrl: './assemblie-tab.page.html',
  styleUrls: ['./assemblie-tab.page.scss'],
  standalone: true,
  imports: [
    IonRefresherContent,
    IonRefresher,
    IonItem,
    IonModal,
    IonButtons,
    IonButton,
    IonIcon,
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
    DatePipe,
  ],
  providers: [DatePipe],
})
export class AssemblieTabPage implements OnInit {
  private convocationService = inject(ConvocationService);
  private readonly toastCtrl = inject(ToastController);
  private readonly modalCtrl = inject(ModalController);

  convocation: ConvocationResponse = {} as ConvocationResponse;

  loading = true;

  ngOnInit() {
    this.getConvocation();
  }

  ionViewWillEnter() {
    this.getConvocation();
  }

  async getConvocation() {
    this.loading = true;
    this.convocationService.getTodayConvocationsNotFinalized().subscribe({
      next: (response) => {
        this.convocation = response.data;
        setTimeout(() => {
          this.loading = false;
        }, 300);
      },
      error: (error) => {
        this.convocation = {} as ConvocationResponse;
        this.loading = false;
      },
    });
  }

  async openConvocation(convocation: ConvocationResponse) {
    const modal = await this.modalCtrl.create({
      component: AssemblieModalComponent,
      componentProps: { convocation: convocation },
    });
    modal.present();
  }

  doRefresh(event: IonRefresherCustomEvent<RefresherEventDetail>) {
    console.log(event);
    this.getConvocation().then(() => {
      setTimeout(() => {
        event.detail.complete();
      }, 500);
    });
  }
}

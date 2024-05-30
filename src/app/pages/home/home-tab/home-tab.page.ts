import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  ToastController,
  IonSegmentButton,
  IonButtons,
  IonLabel,
  IonList,
  IonRefresher,
  RefresherEventDetail,
  IonRefresherContent,
  IonSegment,
  IonItem,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonImg,
  ModalController,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from '@ionic/angular/standalone';
import { SocialEventResponse } from 'src/app/shared/models/response/social_event/social-event-response.model';
import { SocialEventService } from 'src/app/core/services/api/social-event.service';
import {
  IonInfiniteScrollCustomEvent,
  IonRefresherCustomEvent,
} from '@ionic/core';
import { PageResponse } from 'src/app/shared/models/response/page-response.model';
import { SocialEventViewComponent } from './social-event-view/social-event-view.component';
import { ConvocationResponse } from 'src/app/shared/models/response/convocation/convocation-response.model';
import { ConvocationService } from 'src/app/core/services/api/convocation.service';
import { AssemblyViewComponent } from './assembly-view/assembly-view.component';

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.page.html',
  styleUrls: ['./home-tab.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonImg,
    IonInfiniteScrollContent,
    IonInfiniteScroll,
    IonItem,
    IonSegment,
    IonRefresherContent,
    IonRefresher,
    IonList,
    IonLabel,
    IonButtons,
    IonSegmentButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    FormsModule,
    DatePipe,
  ],
  providers: [DatePipe],
})
export class HomeTabPage implements OnInit {
  selectedSegment = 'assembly';
  private readonly socialEventService = inject(SocialEventService);
  private readonly convocationService = inject(ConvocationService);
  private readonly toastCtrl = inject(ToastController);
  private readonly modalCtrl = inject(ModalController);

  socialEvents: SocialEventResponse[] = [];
  convocations: ConvocationResponse[] = [];

  now = new Date();
  currentPage = 0;
  convocationCurrentPage = 0;

  constructor() {}

  ngOnInit() {
    this.getSocialEvents();
    this.getConvocations();
  }

  async getSocialEvents(page?: number) {
    this.socialEventService.findAll(this.now, page).subscribe({
      next: (response) => {
        const pageResponse: PageResponse = response.data;
        this.socialEvents = this.socialEvents.concat(
          pageResponse.content as SocialEventResponse[]
        );
        this.currentPage = pageResponse.currentPage + 1;
      },
      error: (error) => {
        const toast = this.toastCtrl.create({
          message: 'Error al buscar eventos sociales. Intente nuevamente.',
          duration: 3000,
        });
      },
    });
  }

  async getConvocations(page?: number) {
    this.convocationService.getConvocationCalendar(page).subscribe({
      next: (response) => {
        const pageResponse: PageResponse = response.data;
        this.convocations = this.convocations.concat(
          pageResponse.content as ConvocationResponse[]
        );
        this.convocationCurrentPage = pageResponse.currentPage + 1;
        console.log(this.convocations);
      },
      error: (error) => {
        const toast = this.toastCtrl.create({
          message: 'Error al buscar convocatorias. Intente nuevamente.',
          duration: 3000,
        });
      },
    });
  }

  doRefresh($event: IonRefresherCustomEvent<RefresherEventDetail>) {
    if (this.selectedSegment === 'social') {
      this.socialEvents = [];
      console.log('doRefresh');
      this.currentPage = 0;
      this.getSocialEvents().then(() => {
        setTimeout(() => {
          $event.detail.complete();
        }, 300);
      });
    } else {
      this.convocations = [];
      this.convocationCurrentPage = 0;
      this.getConvocations().then(() => {
        setTimeout(() => {
          $event.detail.complete();
        }, 300);
      });
    }
  }

  onIonInfinite($event: IonInfiniteScrollCustomEvent<void>) {
    setTimeout(() => {
      $event.target.complete();
      if (this.selectedSegment === 'social') {
        this.getSocialEvents(this.currentPage);
      } else {
        this.getConvocations(this.convocationCurrentPage);
      }
    }, 1000);
  }

  async onViewEvent(event: SocialEventResponse) {
    const modal = await this.modalCtrl.create({
      component: SocialEventViewComponent,
      componentProps: {
        event,
      },
    });
    modal.present();
  }

  async onViewConvocation(convocation: ConvocationResponse) {
    const modal = await this.modalCtrl.create({
      component: AssemblyViewComponent,
      componentProps: {
        convocation,
      },
    });
    modal.present();
  }
}

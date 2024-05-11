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
} from '@ionic/angular/standalone';
import { SocialEventResponse } from 'src/app/shared/models/response/social_event/social-event-response.model';
import { SocialEventService } from 'src/app/core/services/api/social-event.service';
import {
  IonInfiniteScrollCustomEvent,
  IonRefresherCustomEvent,
} from '@ionic/core';
import { PageResponse } from 'src/app/shared/models/response/page-response.model';
import { SocialEventViewComponent } from './social-event-view/social-event-view.component';

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.page.html',
  styleUrls: ['./home-tab.page.scss'],
  standalone: true,
  imports: [
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
  selectedSegment = 'social';
  private readonly socialEventService = inject(SocialEventService);
  private readonly toastCtrl = inject(ToastController);
  private readonly modalCtrl = inject(ModalController);

  socialEvents: SocialEventResponse[] = [];

  now = new Date();
  currentPage = 0;

  constructor() {}

  ngOnInit() {
    this.getSocialEvents();
  }

  async getSocialEvents(page?: number) {
    this.socialEventService.findAll(this.now, page).subscribe({
      next: (response) => {
        const pageResponse: PageResponse = response.data;
        this.socialEvents = this.socialEvents.concat(
          pageResponse.content as SocialEventResponse[]
        );
        this.currentPage = pageResponse.currentPage + 1;
        console.log(pageResponse.content);
      },
      error: (error) => {
        const toast = this.toastCtrl.create({
          message: 'Error al buscar eventos sociales. Intente nuevamente.',
          duration: 3000,
        });
      },
    });
  }

  doRefresh($event: IonRefresherCustomEvent<RefresherEventDetail>) {
    this.socialEvents = [];
    this.getSocialEvents().then(() => {
      setTimeout(() => {
        $event.detail.complete();
      }, 500);
    });
  }

  onIonInfinite($event: IonInfiniteScrollCustomEvent<void>) {
    setTimeout(() => {
      $event.target.complete();
      this.getSocialEvents(this.currentPage);
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
}

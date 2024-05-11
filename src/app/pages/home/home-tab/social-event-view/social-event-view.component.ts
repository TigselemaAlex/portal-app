import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  ModalController,
  IonContent,
  IonImg,
} from '@ionic/angular/standalone';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { SocialEventResponse } from 'src/app/shared/models/response/social_event/social-event-response.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-social-event-view',
  standalone: true,
  imports: [
    IonImg,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonTitle,
    IonButton,
    DatePipe,
  ],
  providers: [DatePipe],
  templateUrl: './social-event-view.component.html',
  styleUrls: ['./social-event-view.component.scss'],
})
export class SocialEventViewComponent implements OnInit {
  @Input() event: SocialEventResponse = {} as SocialEventResponse;
  @ViewChild('description') description!: HTMLElement;

  private readonly modalCtrl = inject(ModalController);

  constructor() {}

  ngOnInit() {
    console.log(this.event);
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}

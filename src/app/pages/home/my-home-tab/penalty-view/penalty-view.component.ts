import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import {
  ResidencesObligation,
  ResidencesPaidPenalty,
  ResidencesUnpaidAmount,
} from 'src/app/shared/models/response/obligations/financial-obligation-response';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  ModalController,
  IonContent,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonAccordion,
  IonAccordionGroup,
} from '@ionic/angular/standalone';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-penalty-view',
  standalone: true,
  imports: [
    IonAccordionGroup,
    IonAccordion,
    IonLabel,
    IonItem,
    IonList,
    IonCardContent,
    IonCardHeader,
    IonCard,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    IonContent,
    DatePipe,
    IonImg,
  ],
  providers: [DatePipe],
  templateUrl: './penalty-view.component.html',
  styleUrls: ['./penalty-view.component.scss'],
})
export class PenaltyViewComponent implements OnInit {
  @Input() paidPenalties: ResidencesPaidPenalty[] = [];
  @Input() unpaidPenalties: ResidencesPaidPenalty[] = [];
  @Input() unpaidAmount: ResidencesUnpaidAmount[] = [];
  @Input() obligations: ResidencesObligation[] = [];

  private readonly modalCtrl = inject(ModalController);

  constructor() {}

  ngOnInit() {
    console.log(this.paidPenalties);
    console.log(this.unpaidPenalties);
    console.log(this.unpaidAmount);
  }

  cancel() {
    this.paidPenalties = [];
    this.unpaidPenalties = [];
    this.unpaidAmount = [];
    this.obligations = [];
    this.modalCtrl.dismiss();
  }
}

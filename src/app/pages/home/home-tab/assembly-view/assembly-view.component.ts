import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { ConvocationResponse } from 'src/app/shared/models/response/convocation/convocation-response.model';
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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-assembly-view',
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
  templateUrl: './assembly-view.component.html',
  styleUrls: ['./assembly-view.component.scss'],
})
export class AssemblyViewComponent implements OnInit {
  @Input() convocation: ConvocationResponse = {} as ConvocationResponse;
  @ViewChild('description') description!: HTMLElement;

  private readonly modalCtrl = inject(ModalController);

  constructor() {}

  ngOnInit() {
    console.log(this.convocation);
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}

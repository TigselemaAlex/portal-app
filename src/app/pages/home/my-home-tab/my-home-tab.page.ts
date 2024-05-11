import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-my-home-tab',
  templateUrl: './my-home-tab.page.html',
  styleUrls: ['./my-home-tab.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MyHomeTabPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

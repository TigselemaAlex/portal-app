import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-suggestion-box-tab',
  templateUrl: './suggestion-box-tab.page.html',
  styleUrls: ['./suggestion-box-tab.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SuggestionBoxTabPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

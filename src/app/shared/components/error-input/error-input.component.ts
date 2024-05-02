import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-input',
  standalone: true,
  templateUrl: './error-input.component.html',
  styleUrls: ['./error-input.component.scss'],
})
export class ErrorInputComponent {
  @Input() message: string | null = null;

  constructor() {}
}

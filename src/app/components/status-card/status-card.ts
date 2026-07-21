import { Component, input } from '@angular/core';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.html',
  styleUrl: './status-card.scss'
})
export class StatusCard {
  readonly title = input.required<string>();
  readonly status = input.required<string>();
  readonly description = input.required<string>();
}

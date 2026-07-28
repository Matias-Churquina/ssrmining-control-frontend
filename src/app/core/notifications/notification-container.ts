import { Component, inject } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification-container',
  templateUrl: './notification-container.html',
  styleUrl: './notification-container.scss'
})
export class NotificationContainer {
  readonly notifications = inject(NotificationService);
}

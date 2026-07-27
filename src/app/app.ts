import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationContainer } from './core/notifications/notification-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotificationContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ssrmining-control-frontend');
}

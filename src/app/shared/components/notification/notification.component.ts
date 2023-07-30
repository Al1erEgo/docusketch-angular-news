import { Component } from '@angular/core'
import { NotificationService } from '../../services'
import { Observable } from 'rxjs'
import { Notify } from '../../interfaces'

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  notify$?: Observable<Notify | null> = this.notificationService.notify$

  constructor(private readonly notificationService: NotificationService) {}

  closeNotification() {
    this.notificationService.clearNotification()
  }
}

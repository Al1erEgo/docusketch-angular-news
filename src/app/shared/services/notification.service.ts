import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Notify, Severity } from '../interfaces/notify.interfaces'

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notify$ = new BehaviorSubject<Notify | null>(null)

  handleNotification(message: string, severity: Severity) {
    this.notify$.next({ message, severity })
  }

  clearNotification() {
    this.notify$.next(null)
  }
}

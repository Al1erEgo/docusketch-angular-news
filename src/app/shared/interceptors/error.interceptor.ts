import { Injectable } from '@angular/core'
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs'
import { NotificationService } from '../services/notification.service'

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private readonly notificationService: NotificationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error) {
          this.notificationService.handleNotification(error.error, 'error')
        } else if (error.message) {
          this.notificationService.handleNotification(error.message, 'error')
        } else {
          this.notificationService.handleNotification('Something went wrong :(', 'error')
        }
        return throwError(error.error)
      })
    )
  }
}

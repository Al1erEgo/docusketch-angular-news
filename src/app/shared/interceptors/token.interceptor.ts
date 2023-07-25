import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { SessionStorageService } from '../services/session-storage.service'

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly sessionStorage: SessionStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.sessionStorage.getUserData()?.accessToken

    const request = req.clone({
      setHeaders: {
        ...(token ? { Authorization: `Token ${token}` } : {}),
      },
    })
    return next.handle(request)
  }
}

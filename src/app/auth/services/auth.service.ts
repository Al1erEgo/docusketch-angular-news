import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { CommonAuthRequest, CommonAuthResponse, User } from '../interfaces'
import { Observable, tap } from 'rxjs'
import { SessionStorageService } from './session-storage.service'
import { NotificationService } from '../../shared/services'

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser: User | null = null
  currentToken: string | null = null

  constructor(
    private readonly http: HttpClient,
    private readonly sessionStorageService: SessionStorageService,
    private readonly router: Router,
    private readonly notificationService: NotificationService
  ) {}

  initUser(): void {
    this.currentUser = this.sessionStorageService.getUserData()?.user || null
    this.currentToken = this.sessionStorageService.getUserData()?.accessToken || null
  }

  login(credentials: CommonAuthRequest): Observable<CommonAuthResponse> {
    return this.http
      .post<CommonAuthResponse>('login', credentials)
      .pipe(tap(authData => this.setAuth(authData)))
  }

  register(credentials: CommonAuthRequest): Observable<CommonAuthResponse> {
    return this.http
      .post<CommonAuthResponse>('register', credentials)
      .pipe(tap(authData => this.setAuth(authData)))
  }

  logout() {
    this.purgeAuth()
    this.notificationService.handleNotification('You`re logged out.', 'info')
    void this.router.navigate(['/'])
  }

  setAuth(authData: CommonAuthResponse): void {
    this.sessionStorageService.saveUserData(authData)
    this.currentUser = authData.user
    this.currentToken = authData.accessToken
  }

  purgeAuth(): void {
    this.sessionStorageService.cleanUserData()
    this.currentUser = null
    this.currentToken = null
  }

  get isAuth() {
    return !!this.currentUser
  }
}

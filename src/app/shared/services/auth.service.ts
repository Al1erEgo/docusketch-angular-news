import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { CommonAuthRequest, CommonAuthResponse, User } from '../interfaces/auth.interfaces'
import { Observable, tap } from 'rxjs'
import { SessionStorageService } from './session-storage.service'

@Injectable({ providedIn: 'root' })
export class AuthService {
  public currentUser: User | null = null
  public currentToken: string | null = null

  constructor(
    private readonly http: HttpClient,
    private readonly sessionStorageService: SessionStorageService,
    private readonly router: Router
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

  logout(): void {
    this.purgeAuth()
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
}

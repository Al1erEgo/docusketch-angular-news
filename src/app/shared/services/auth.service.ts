import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { JwtService } from './jwt.service'
import { Router } from '@angular/router'
import { CommonAuthRequest, CommonAuthResponse, User } from '../interfaces/auth.interfaces'
import { Observable, tap } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class AuthService {
  public currentUser: User | null = null
  public currentToken: string | null = null

  constructor(
    private readonly http: HttpClient,
    private readonly jwtService: JwtService,
    private readonly router: Router
  ) {}

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

  // getCurrentUser(): Observable<{ user: User }> {
  //   return this.http.get<{ user: User }>('/user').pipe(
  //     tap({
  //       next: ({ user }) => this.setAuth(user),
  //       error: () => this.purgeAuth(),
  //     }),
  //     shareReplay(1)
  //   )
  // }

  logout(): void {
    this.purgeAuth()
    void this.router.navigate(['/'])
  }

  setAuth(authData: CommonAuthResponse): void {
    this.jwtService.saveToken(authData.accessToken)
    this.currentUser = authData.user
    this.currentToken = authData.accessToken
  }

  purgeAuth(): void {
    this.jwtService.destroyToken()
    this.currentUser = null
    this.currentToken = null
  }
}

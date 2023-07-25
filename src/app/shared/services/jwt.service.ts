import { Injectable } from '@angular/core'

//TODO сделать сохранение токена в переменную, чтобы не дергать каждый раз LS
@Injectable({ providedIn: 'root' })
export class JwtService {
  getToken(): string {
    return window.localStorage['jwtToken']
  }

  saveToken(token: string): void {
    window.localStorage['jwtToken'] = token
  }

  destroyToken(): void {
    window.localStorage.removeItem('jwtToken')
  }
}

import { Injectable } from '@angular/core'
import { CommonAuthResponse } from '../interfaces'

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  getUserData(): CommonAuthResponse | undefined {
    if (window.sessionStorage['userData']) {
      return JSON.parse(window.sessionStorage['userData'])
    }
    return
  }

  saveUserData(userData: CommonAuthResponse) {
    window.sessionStorage['userData'] = JSON.stringify(userData)
  }

  cleanUserData(): void {
    window.sessionStorage.removeItem('userData')
  }
}

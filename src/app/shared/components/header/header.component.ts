import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../../auth/services'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get userEmail(): string | undefined {
    return this.authService.currentUser?.email
  }

  get isAuth(): boolean {
    return this.authService.isAuth
  }

  logout(): void {
    this.authService.logout()
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login'])
  }
}

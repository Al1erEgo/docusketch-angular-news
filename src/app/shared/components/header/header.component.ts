import { Component } from '@angular/core'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  get userEmail(): string | undefined {
    return this.authService.currentUser?.email
  }

  logout(): void {
    this.authService.logout()
  }
}

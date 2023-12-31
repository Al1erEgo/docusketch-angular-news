import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from '../services'
import { NotificationService } from '../../shared/services'

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const notificationService = inject(NotificationService)
  const router = inject(Router)

  if (!authService.isAuth) {
    router.navigate(['/auth'])
    notificationService.handleNotification('To access this page, please login!', 'info')
  }

  return authService.isAuth
}

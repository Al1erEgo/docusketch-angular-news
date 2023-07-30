import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from '../services'
import { NotificationService } from '../../shared/services'

export const notAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const notificationService = inject(NotificationService)
  if (authService.isAuth) {
    notificationService.handleNotification('You`re already logged in!', 'info')
    router.navigate(['../news'])
  }
  return !authService.isAuth
}

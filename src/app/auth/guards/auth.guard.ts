import { CanActivateFn } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { NotificationService } from '../../shared/services/notification.service'

//TODO проверять маршрут и кидать на логин если нет текущего маршрута(ввели в адресную строку на пустой вкладке)

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const notificationService = inject(NotificationService)
  if (!authService.isAuth) {
    notificationService.handleNotification('To access this page, please login!', 'info')
  }

  return authService.isAuth
}

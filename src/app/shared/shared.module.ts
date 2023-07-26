import { NgModule } from '@angular/core'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { Page404Component } from './components/page404/page404.component'
import { HeaderComponent } from './components/header/header.component'
import { RouterLink } from '@angular/router'
import { NotificationComponent } from './components/notification/notification.component'

@NgModule({
  declarations: [Page404Component, HeaderComponent, NotificationComponent],
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  providers: [],
  exports: [HeaderComponent, NotificationComponent],
})
export class SharedModule {}

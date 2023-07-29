import { NgModule } from '@angular/core'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { Page404Component } from './components/page404/page404.component'
import { HeaderComponent } from './components/header/header.component'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component'
import { NotificationComponent } from './components/notification/notification.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [Page404Component, HeaderComponent, NotificationComponent, SubscriptionsComponent],
  imports: [CommonModule, NgOptimizedImage, RouterLink, RouterLinkActive, ReactiveFormsModule],
  providers: [],
  exports: [HeaderComponent, NotificationComponent, SubscriptionsComponent],
})
export class SharedModule {}

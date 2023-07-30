import { NgModule } from '@angular/core'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import {
  HeaderComponent,
  NotificationComponent,
  Page404Component,
  SubscriptionsComponent,
} from './components'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [Page404Component, HeaderComponent, NotificationComponent, SubscriptionsComponent],
  imports: [CommonModule, NgOptimizedImage, RouterLink, RouterLinkActive, ReactiveFormsModule],
  providers: [],
  exports: [HeaderComponent, NotificationComponent, SubscriptionsComponent],
})
export class SharedModule {}

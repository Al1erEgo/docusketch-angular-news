import { NgModule } from '@angular/core'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { Page404Component } from './components/page404/page404.component'
import { HeaderComponent } from './components/header/header.component'
import { RouterLink } from '@angular/router'

@NgModule({
  declarations: [Page404Component, HeaderComponent],
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  providers: [],
  exports: [HeaderComponent],
})
export class SharedModule {}

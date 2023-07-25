import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { NewsComponent } from './components/news/news.component'

const authRoutes: Routes = [{ path: '', component: NewsComponent }]

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}

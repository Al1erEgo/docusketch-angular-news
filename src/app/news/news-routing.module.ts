import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { NewsComponent } from './components/news/news.component'
import { CreateArticleComponent } from './components/create-article/create-article.component'

const authRoutes: Routes = [
  { path: '', component: NewsComponent },
  {
    path: 'create-article',
    component: CreateArticleComponent,
    pathMatch: 'full',
  },
]

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}

import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { NewsComponent } from './components/news/news.component'
import { CreateArticleComponent } from './components/create-article/create-article.component'
import { ArticleComponent } from './components/article/article.component'
import { authGuard } from '../auth/guards/auth.guard'

const authRoutes: Routes = [
  { path: '', component: NewsComponent },
  {
    path: 'create-article',
    component: CreateArticleComponent,
    pathMatch: 'full',
    canActivate: [authGuard],
  },
  { path: ':id', component: ArticleComponent, pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}

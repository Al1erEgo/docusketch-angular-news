import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { ArticleComponent, CreateArticleComponent, NewsComponent } from './components'
import { authGuard } from '../auth/guards'
import { articlePageResolver } from './resolvers'

const authRoutes: Routes = [
  { path: '', component: NewsComponent },
  {
    path: 'create-article',
    component: CreateArticleComponent,
    pathMatch: 'full',
    canActivate: [authGuard],
  },
  {
    path: ':id',
    component: ArticleComponent,
    pathMatch: 'full',
    resolve: { article: articlePageResolver },
  },
]

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}

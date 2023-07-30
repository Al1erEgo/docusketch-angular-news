import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { Page404Component, SubscriptionsComponent } from './shared/components'
import { authGuard, notAuthGuard } from './auth/guards'

const appRoutes: Routes = [
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then(m => m.NewsModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [notAuthGuard],
  },
  {
    path: 'subscriptions',
    component: SubscriptionsComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'news',
  },
  { path: 'notfound', component: Page404Component },
  { path: '**', redirectTo: 'notfound' },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

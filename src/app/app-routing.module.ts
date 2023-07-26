import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { Page404Component } from './shared/components/page404/page404.component'
import { SubscriptionsComponent } from './shared/components/subscriptions/subscriptions.component'

const appRoutes: Routes = [
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then(m => m.NewsModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'subscriptions',
    component: SubscriptionsComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'news',
  },
  {
    path: '**',
    component: Page404Component,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

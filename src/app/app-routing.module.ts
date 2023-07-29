import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { Page404Component } from './shared/components/page404/page404.component'
import { SubscriptionsComponent } from './shared/components/subscriptions/subscriptions.component'
import { authGuard } from './auth/guards/auth.guard'
import { notAuthGuard } from './auth/guards/not-auth.guard'

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

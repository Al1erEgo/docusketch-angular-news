import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { AuthComponent } from './components'

let authRoutes: Routes
authRoutes = [
  { path: 'login', component: AuthComponent },
  { path: 'register', component: AuthComponent },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
]

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

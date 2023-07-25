import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './components/login/login.component'
import { NgModule } from '@angular/core'

const authRoutes: Routes = [{ path: '', component: LoginComponent }]

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

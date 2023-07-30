import { APP_INITIALIZER, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { SharedModule } from './shared/shared.module'
import { AppRoutingModule } from './app-routing.module'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { ApiInterceptor, ErrorInterceptor, TokenInterceptor } from './shared/interceptors'
import { AuthService, SessionStorageService } from './auth/services'
import { EMPTY } from 'rxjs'

export function initAuth(sessionStorage: SessionStorageService, authService: AuthService) {
  return () => (sessionStorage.getUserData() ? authService.initUser() : EMPTY)
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SharedModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [SessionStorageService, AuthService],
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

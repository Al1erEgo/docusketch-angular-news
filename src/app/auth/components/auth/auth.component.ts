import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CommonAuthResponse } from '../../interfaces'
import { AuthService } from '../../services'
import { NotificationService } from '../../../shared/services'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

interface AuthForm {
  email: FormControl<string>
  password: FormControl<string>
}

export interface Errors {
  errors: { [key: string]: string }
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authType: string = ''
  title: string = ''
  authForm = new FormGroup<AuthForm>({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
      nonNullable: true,
    }),
  })

  errors: Errors = { errors: {} }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.authType = this.route.snapshot.url.at(-1)!.path
    this.title = this.authType === 'login' ? 'Sign in' : 'Sign up'
  }

  get email() {
    return this.authForm.get('email')
  }

  get password() {
    return this.authForm.get('password')
  }

  submitForm(): void {
    this.authForm.disable()
    this.errors = { errors: {} }

    let observable =
      this.authType === 'login'
        ? this.authService.login(this.authForm.value as { email: string; password: string })
        : this.authService.register(
            this.authForm.value as {
              email: string
              password: string
            }
          )

    observable.pipe(takeUntilDestroyed()).subscribe({
      next: (res: CommonAuthResponse) => {
        this.notificationService.handleNotification(`Welcome ${res.user.email}`, 'success')
        void this.router.navigate(['/'])
      },
      error: () => {
        this.authForm.enable()
      },
    })
  }
}

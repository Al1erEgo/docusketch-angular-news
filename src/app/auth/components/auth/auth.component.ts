import { Component, OnDestroy, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { ActivatedRoute, Router } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Subject, takeUntil } from 'rxjs'

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
export class AuthComponent implements OnInit, OnDestroy {
  authType: string = ''
  title: string = ''
  authForm: FormGroup<AuthForm>
  errors: Errors = { errors: {} }
  isSubmitting = false
  destroy$ = new Subject<void>()

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.authForm = new FormGroup<AuthForm>({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8)],
        nonNullable: true,
      }),
    })
  }

  ngOnInit(): void {
    this.authType = this.route.snapshot.url.at(-1)!.path
    this.title = this.authType === 'login' ? 'Sign in' : 'Sign up'
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  get email() {
    return this.authForm.get('email')
  }

  get password() {
    return this.authForm.get('password')
  }

  submitForm(): void {
    this.isSubmitting = true
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

    observable.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => this.router.navigate(['/']),

      //TODO обработка ошибки тут ненужна?
      error: err => {
        this.errors = err
        this.isSubmitting = false
      },
    })
  }
}

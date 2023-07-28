import { Component, OnDestroy } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Article } from '../../interfaces/news.interfaces'
import { AuthService } from '../../../auth/services/auth.service'
import { NEWS_CATEGORIES } from '../../data/news-categories'
import { NewsService } from '../../services/news.service'
import { Subject, takeUntil } from 'rxjs'
import { Router } from '@angular/router'

interface NewArticleForm {
  category: FormControl<string>
  title: FormControl<string>
  body: FormControl<string>
}

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent implements OnDestroy {
  categories = NEWS_CATEGORIES
  destroy$ = new Subject<void>()
  newArticleForm = new FormGroup<NewArticleForm>({
    category: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: true,
    }),
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    body: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
  })

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly newsService: NewsService
  ) {}

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  submitArticle() {
    if (this.newArticleForm.value.title && this.newArticleForm.value.body) {
      this.newArticleForm.disable()

      const newArticle: Partial<Article> = {
        category: this.newArticleForm.value.category,
        title: this.newArticleForm.value.title,
        body: this.newArticleForm.value.body,
        date: new Date().toLocaleDateString(),
        userId: this.authService.currentUser?.id,
      }

      let observable = this.newsService.postArticle(newArticle)

      observable.pipe(takeUntil(this.destroy$)).subscribe({
        next: newArticle => {
          void this.router.navigate([`/news/${newArticle.id}`])
        },
        error: () => {
          this.newArticleForm.enable()
        },
      })
    }
  }
}

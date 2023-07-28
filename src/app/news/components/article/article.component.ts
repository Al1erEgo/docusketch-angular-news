import { Component, OnDestroy } from '@angular/core'
import { catchError, combineLatest, Subject, takeUntil, throwError } from 'rxjs'
import { Article, Comment } from '../../interfaces/news.interfaces'
import { NewsService } from '../../services/news.service'
import { ActivatedRoute, Router } from '@angular/router'
import { CommentsService } from '../../services/comments.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../../auth/services/auth.service'

//TODO добавить отображение пользователя-автора комментария

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnDestroy {
  article?: Article
  comments?: Comment[]
  destroy$ = new Subject<void>()
  isCommentsShow: boolean = false
  isAddingComment: boolean = false
  isSubmitting: boolean = false
  isAuth: boolean = !!this.authService.currentUser
  articleId: number = +this.route.snapshot.paramMap.get('id')!
  newCommentForm = new FormGroup<{
    newComment: FormControl<string>
  }>({
    newComment: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  })

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly newsService: NewsService,
    private readonly commentsService: CommentsService,
    private readonly authService: AuthService
  ) {
    combineLatest([
      this.newsService.getArticle(this.articleId),
      this.commentsService.getComments(this.articleId),
    ])
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          void this.router.navigate(['/notfound'])
          return throwError(err)
        })
      )
      .subscribe(([article, comments]) => {
        this.article = article
        this.comments = comments
      })
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  switchShowComments() {
    this.isCommentsShow = !this.isCommentsShow
    if (!this.isCommentsShow) {
      this.isAddingComment = false
    }
  }

  switchAddComment() {
    this.isAddingComment = !this.isAddingComment
  }

  submitComment() {
    if (this.newCommentForm.value) {
      this.isSubmitting = true

      let observable = this.commentsService
    }
  }
}

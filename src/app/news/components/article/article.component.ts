import { Component, OnDestroy } from '@angular/core'
import { Subject, takeUntil } from 'rxjs'
import { Article, Comment } from '../../interfaces/news.interfaces'
import { NewsService } from '../../services/news.service'
import { ActivatedRoute, Router } from '@angular/router'
import { CommentsService } from '../../services/comments.service'
import { FormControl, FormGroup } from '@angular/forms'
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
  isAuth: boolean = this.authService.isAuth
  articleId: number = +this.route.snapshot.paramMap.get('id')!
  newCommentForm = new FormGroup<{
    newComment: FormControl<string | null>
  }>({
    newComment: new FormControl(''),
  })

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly newsService: NewsService,
    private readonly commentsService: CommentsService,
    private readonly authService: AuthService
  ) {
    this.route.data.subscribe(({ article: { article, comments } }) => {
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
    if (this.newCommentForm.value.newComment) {
      this.newCommentForm.get('newComment')?.disable()

      const newComment: Partial<Comment> = {
        postId: this.articleId,
        userId: this.authService.currentUser?.id,
        body: this.newCommentForm.value.newComment,
        date: new Date().toLocaleDateString(),
      }

      let observable = this.commentsService.postComment(newComment)

      observable.pipe(takeUntil(this.destroy$)).subscribe({
        next: newComment => {
          this.comments?.push(newComment)
          this.newCommentForm.reset()
          this.isAddingComment = false
        },
        error: () => {
          this.newCommentForm.get('newComment')?.enable()
        },
      })
    }
  }
}

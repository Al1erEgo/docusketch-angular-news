import { Component } from '@angular/core'
import { Article, Comment } from '../../interfaces'
import { CommentsService, NewsService } from '../../services'
import { ActivatedRoute, Router } from '@angular/router'
import { FormControl, FormGroup } from '@angular/forms'
import { AuthService } from '../../../auth/services'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

//TODO добавить отображение пользователя-автора комментария

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  article?: Article
  comments?: Comment[]
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

      observable.pipe(takeUntilDestroyed()).subscribe({
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

import { Component, OnDestroy } from '@angular/core'
import { combineLatest, Subject, takeUntil } from 'rxjs'
import { Article, Comment } from '../../interfaces/news.interfaces'
import { NewsService } from '../../services/news.service'
import { ActivatedRoute } from '@angular/router'
import { CommentsService } from '../../services/comments.service'

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
  showComments: boolean = false
  addComment: boolean = false
  articleId: number = +this.route.snapshot.paramMap.get('id')!

  constructor(
    private readonly route: ActivatedRoute,
    private readonly newsService: NewsService,
    private readonly commentsService: CommentsService
  ) {
    combineLatest([
      this.newsService.getArticle(this.articleId),
      this.commentsService.getComments(this.articleId),
    ])
      .pipe(takeUntil(this.destroy$))
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
    this.showComments = !this.showComments
    if (!this.showComments) {
      this.addComment = false
    }
  }

  switchAddComment() {
    this.addComment = !this.addComment
  }
}

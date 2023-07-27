import { Component, OnDestroy } from '@angular/core'
import { Subject, takeUntil } from 'rxjs'
import { Article } from '../../interfaces/news.interfaces'
import { NewsService } from '../../services/news.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnDestroy {
  article?: Article
  destroy$ = new Subject<void>()
  showComments: boolean = false
  articleId: number = +this.route.snapshot.paramMap.get('id')!

  constructor(
    private readonly route: ActivatedRoute,
    private readonly newsService: NewsService
  ) {
    this.newsService
      .getNews()
      .pipe(takeUntil(this.destroy$))
      .subscribe(articles => {
        this.article = articles.find(article => article.id === this.articleId)
      })
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  switchShowComments() {
    this.showComments = !this.showComments
  }
}

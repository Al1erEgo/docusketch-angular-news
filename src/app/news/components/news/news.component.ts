import { Component, OnDestroy } from '@angular/core'
import { NewsService } from '../../services/news.service'
import { Article } from '../../interfaces/news.interfaces'
import { Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnDestroy {
  news: Article[] = []
  destroy$ = new Subject<void>()

  constructor(private readonly newsService: NewsService) {
    this.newsService
      .getNews()
      .pipe(takeUntil(this.destroy$))
      .subscribe(articles => {
        this.news = articles
      })
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }
}

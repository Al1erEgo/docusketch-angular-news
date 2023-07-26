import { Component } from '@angular/core'
import { NewsService } from '../../services/news.service'
import { Article } from '../../interfaces/news.interfaces'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent {
  news$ = new BehaviorSubject<Article[]>([])

  constructor(private readonly newsService: NewsService) {
    this.newsService.getNews().subscribe(articles => this.news$.next(articles))
  }
}

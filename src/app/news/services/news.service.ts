import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Article } from '../interfaces/news.interfaces'

@Injectable()
export class NewsService {
  news: Article[] = []

  constructor(private readonly http: HttpClient) {}

  getNews() {
    return this.http.get<Article[]>('news')
  }
}

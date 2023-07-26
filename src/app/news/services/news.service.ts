import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs'
import { Article } from '../interfaces/news.interfaces'

@Injectable()
export class NewsService {
  news$ = new BehaviorSubject<Article[]>([])

  constructor(private readonly http: HttpClient) {}

  getNews() {}
}

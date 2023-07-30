import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Article } from '../interfaces'

@Injectable()
export class NewsService {
  constructor(private readonly http: HttpClient) {}

  getNews() {
    return this.http.get<Article[]>('news')
  }

  getArticle(articleId: number) {
    return this.http.get<Article>(`news/${articleId}`)
  }

  postArticle(newArticle: Partial<Article>) {
    return this.http.post<Article>(`news`, newArticle)
  }
}

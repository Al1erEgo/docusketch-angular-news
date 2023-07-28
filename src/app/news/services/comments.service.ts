import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Comment } from '../interfaces/news.interfaces'

@Injectable()
export class CommentsService {
  constructor(private readonly http: HttpClient) {}

  getComments(articleId: number) {
    return this.http.get<Comment[]>(`comments?postId=${articleId}`)
  }

  postComment(comment: Comment) {
    // return this.http.post<Comment[]>(`comments?postId=${articleId}`)
  }
}

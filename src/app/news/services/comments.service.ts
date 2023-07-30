import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Comment } from '../interfaces'

@Injectable()
export class CommentsService {
  constructor(private readonly http: HttpClient) {}

  getComments(articleId: number) {
    return this.http.get<Comment[]>(`comments?postId=${articleId}`)
  }

  postComment(comment: Partial<Comment>) {
    return this.http.post<Comment>(`comments`, comment)
  }
}

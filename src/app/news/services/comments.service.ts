import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class CommentsService {
  constructor(private readonly http: HttpClient) {}

  getComments(articleId: number) {}
}

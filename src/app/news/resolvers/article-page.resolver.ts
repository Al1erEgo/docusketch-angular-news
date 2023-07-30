import { ResolveFn, Router } from '@angular/router'
import { NewsService } from '../services/news.service'
import { inject } from '@angular/core'
import { CommentsService } from '../services/comments.service'
import { lastValueFrom } from 'rxjs'
import { Article, Comment } from '../interfaces/news.interfaces'

export const articlePageResolver: ResolveFn<
  { article: Article; comments: Comment[] } | undefined
> = async route => {
  const newsService = inject(NewsService)
  const commentsService = inject(CommentsService)
  const router = inject(Router)
  const id = +route.paramMap.get('id')!

  try {
    const article = await lastValueFrom(newsService.getArticle(id))
    const comments = await lastValueFrom(commentsService.getComments(id))

    return { article, comments }
  } catch {
    await router.navigate(['/notfound'])
    return
  }
}

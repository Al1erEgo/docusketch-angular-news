import { ResolveFn, Router } from '@angular/router'
import { CommentsService, NewsService } from '../services'
import { inject } from '@angular/core'
import { lastValueFrom } from 'rxjs'
import { Article, Comment } from '../interfaces'

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

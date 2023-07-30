import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  ArticleComponent,
  ArticlePreviewComponent,
  CreateArticleComponent,
  NewsComponent,
} from './components'
import { NewsRoutingModule } from './news-routing.module'
import { CommentsService, NewsService } from './services'
import { ReactiveFormsModule } from '@angular/forms'
import { SearchPipe } from './pipes'

@NgModule({
  declarations: [
    NewsComponent,
    CreateArticleComponent,
    ArticlePreviewComponent,
    SearchPipe,
    ArticleComponent,
  ],
  imports: [CommonModule, NewsRoutingModule, ReactiveFormsModule],
  providers: [NewsService, CommentsService],
})
export class NewsModule {}

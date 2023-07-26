import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NewsComponent } from './components/news/news.component'
import { NewsRoutingModule } from './news-routing.module'
import { CreateArticleComponent } from './components/create-article/create-article.component'
import { NewsService } from './services/news.service'
import { ArticlePreviewComponent } from './components/article-preview/article-preview.component'
import { ReactiveFormsModule } from '@angular/forms'
import { SearchPipe } from './pipes/search.pipe'

import { ArticleComponent } from './components/article/article.component'

@NgModule({
  declarations: [
    NewsComponent,
    CreateArticleComponent,
    ArticlePreviewComponent,
    SearchPipe,
    ArticleComponent,
  ],
  imports: [CommonModule, NewsRoutingModule, ReactiveFormsModule],
  providers: [NewsService],
})
export class NewsModule {}

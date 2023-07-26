import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NewsComponent } from './components/news/news.component'
import { NewsRoutingModule } from './news-routing.module'
import { CreateArticleComponent } from './components/create-article/create-article.component'
import { NewsService } from './services/news.service'
import { ArticlePreviewComponent } from './components/article-preview/article-preview.component'

@NgModule({
  declarations: [NewsComponent, CreateArticleComponent, ArticlePreviewComponent],
  imports: [CommonModule, NewsRoutingModule],
  providers: [NewsService],
})
export class NewsModule {}

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NewsComponent } from './components/news/news.component'
import { NewsRoutingModule } from './news-routing.module'
import { CreateArticleComponent } from './components/create-article/create-article.component'
import { NewsService } from './services/news.service'

@NgModule({
  declarations: [NewsComponent, CreateArticleComponent],
  imports: [CommonModule, NewsRoutingModule],
  providers: [NewsService],
})
export class NewsModule {}

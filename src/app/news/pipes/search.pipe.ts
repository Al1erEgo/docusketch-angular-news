import { Pipe, PipeTransform } from '@angular/core'
import { Article } from '../interfaces/news.interfaces'

@Pipe({
  name: 'searchPipe',
})
export class SearchPipe implements PipeTransform {
  transform(news: Article[], inputValue: string | null): Article[] {
    if (inputValue) {
      return news.filter(article => article.title.toLowerCase().includes(inputValue.toLowerCase()))
    }
    return news
  }
}

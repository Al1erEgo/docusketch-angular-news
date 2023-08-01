import { Component } from '@angular/core'
import { NewsService } from '../../services'
import { Article } from '../../interfaces'
import { debounceTime } from 'rxjs'
import { FormBuilder } from '@angular/forms'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

const parseDate = (date: string): Date => {
  const dateParts = date.split('.')
  return new Date(+dateParts[2], +dateParts[1], +dateParts[0])
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent {
  news: Article[] = []
  newsToRender: Article[] = []
  categories: string[] = []
  currentCategory: string = 'All'

  filterForm = this.formBuilder.group({ title: [''] })
  debouncedControl$ = this.filterForm.controls.title.valueChanges.pipe(debounceTime(500))

  constructor(
    private readonly newsService: NewsService,
    private formBuilder: FormBuilder
  ) {
    this.newsService
      .getNews()
      .pipe(takeUntilDestroyed())
      .subscribe(articles => {
        this.news = articles.sort(
          (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()
        )
        this.newsToRender = articles
        this.categories = [
          'All',
          ...new Set(
            articles.map(
              article => `${article.category[0].toUpperCase()}${article.category.slice(1)}`
            )
          ).values(),
        ]
      })
  }

  changeCategory(newCategory: string) {
    this.currentCategory = newCategory
    this.newsToRender = this.filterByCategory(newCategory)
  }

  filterByCategory(newCategory: string) {
    if (newCategory === 'All') return this.news
    return this.news.filter(article => article.category === this.currentCategory.toLowerCase())
  }
}

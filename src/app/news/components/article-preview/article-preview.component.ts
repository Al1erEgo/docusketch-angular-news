import { Component, Input } from '@angular/core'
import { Article } from '../../interfaces'

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss'],
})
export class ArticlePreviewComponent {
  @Input() article!: Article
}

import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../core/services/article.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {
   content!: string;
   idArticle!: number;
   title!: string;
   
   constructor(
      private apiServiceArticle: ArticleService,
      private route: ActivatedRoute
   ) {}

   ngOnInit(): void {
      this.idArticle = this.route.snapshot.params['idArticle'];
      this.getPost();
   }

   private getPost():void  {
      if (!this.idArticle) return;

      this.apiServiceArticle.getArticleById(this.idArticle).subscribe({
         next: (res) => {
            this.title = res.title;
            this.content = res.content;
         },
         error: (error) => {
            throw new Error(error);
         }
      })
   }
}

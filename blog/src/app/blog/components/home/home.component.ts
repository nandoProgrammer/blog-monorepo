import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticleService } from '../../../core/services/article.service';
import { CommonModule } from '@angular/common';
import { IArticle } from '../../../core/interfaces/article.interface';
import { PipesModule } from '../../../core/pipes/pipes.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, PipesModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  listArticles: IArticle[] = [];
  
  constructor(
    private apiServiceArtcle: ArticleService
  ) {}

  ngOnInit() {
    this.getAllPosts();
  }

  private getAllPosts() {
     this.apiServiceArtcle.getAllArticles().subscribe({
        next: (res) => {
          this.listArticles = res;
        }, 
        error: (error) => {
          throw new Error(error.message);
        }
     })
  }
}

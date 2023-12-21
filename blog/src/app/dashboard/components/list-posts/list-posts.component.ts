import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../core/services/article.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { IArticle } from '../../../core/interfaces/article.interface';

@Component({
  selector: 'app-list-posts',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './list-posts.component.html',
  styleUrl: './list-posts.component.scss'
})
export class ListPostsComponent implements OnInit {
  listArticles: IArticle[] = [];
  constructor(
    private apiServiceArtcle: ArticleService
  ) {}

  ngOnInit() {
    this.getAllPosts();
  }

  private getAllPosts():void {
     this.apiServiceArtcle.getAllArticles().subscribe({
        next: (res) => {
          this.listArticles = res;
        }, 
        error: (error) => {
          throw new Error(error.message);
        }
     })
  }

  deleteArticle(idArticle: number):void {
    this.apiServiceArtcle.deleteArticle(idArticle).subscribe({
        next: () => {
          this.getAllPosts();
        },
        error: (error) => {
          throw new Error(error.message);
        }
    })
  }

  deleteArticleModal(idArticle: number):void {
      Swal.fire({
        title: "Deseja deletar esse artigo?",
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Não"
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteArticle(idArticle);
        }
      });
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IArticle } from '../interfaces/article.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getAllArticles(): Observable<any> {
    return this.httpClient.get('/article', this.httpOptions);
  }

  getArticleById(id: number): Observable<any> {
    return this.httpClient.get(`/article/${id}`, this.httpOptions);
  }

  createArticle(data: IArticle): Observable<any> {
    return this.httpClient.post('/article', data, this.httpOptions);
  }

  updateArticle(id: number, data: IArticle): Observable<any> {
    return this.httpClient.put(`/article/${id}`, data, this.httpOptions);
  }

  deleteArticle(id: number): Observable<any> {
    return this.httpClient.delete(`/article/${id}`, this.httpOptions);
  }
}

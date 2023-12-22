import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../../core/services/article.service';
import { NgIf } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { IArticle } from '../../../core/interfaces/article.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-post',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, EditorModule],
  templateUrl: './form-post.component.html',
  styleUrl: './form-post.component.scss'
})
export class FormPostComponent implements OnInit {
  form!: FormGroup;
  idArticle!: number;
  
  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private apiServiceArticle: ArticleService,
    private router: Router
  ) {}

  ngOnInit():void {
     this.idArticle = this.route.snapshot.params['idArticle'];
     this.createForm();
     this.getArticle();
  }

  createForm():void {
    this.form = this.fb.group({
      title: [null, Validators.required],
      content: [null, Validators.required],
    })
  }

  getArticle():void {
    if(!this.idArticle) {
      return;
    }

    this.apiServiceArticle.getArticleById(this.idArticle)
      .subscribe({
          next: (res) => {
            this.form.patchValue(res)
          }, 
          error: (error) => {
            throw new Error(error.message);
          }
      })
  }

  send():void {
      if(this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }

      const data = this.form.value;
      if(this.idArticle) {
        return this.updateArticle(data);
      }

      this.createArticle(data);
  }

  updateArticle(data: IArticle):void {
    this.apiServiceArticle.updateArticle(this.idArticle, data)
    .subscribe({
        next: () => {
          this.alert("Atualizado com sucesso");
          this.navigateTo('dashboard/all-articles')
        },
        error: (error) => {
          throw new Error(error.message);
        }
    })
  }

  createArticle(data: IArticle):void {
    this.apiServiceArticle.createArticle(data)
    .subscribe({
        next: () => {
          this.alert("Criado com sucesso");
          this.navigateTo('dashboard/all-articles');
        },
        error: (error) => {
          throw new Error(error.message);
        }
    })
  }

  get f():AbstractControl {
    return this.form;
  }

  navigateTo(path: string) {
     this.router.navigate([path])
  }

  alert(message: string):void {
    Swal.fire({
      title: message
    })
  }
}

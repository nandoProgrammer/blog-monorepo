import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../app/blog/blog.component').then(m => m.BlogComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('../app/blog/components/home/home.component').then(m => m.HomeComponent),
            },
            {
                path: 'article/:idArticle',
                loadComponent: () => import('../app/blog/components/article/article.component').then(m => m.ArticleComponent),
            }
        ]
    },
    {
        path: 'dashboard',
        loadComponent: () => import('../app/dashboard/dashboard.component').then(m => m.DashboardComponent),
        children: [
            {
                path: 'all-articles',
                loadComponent: () => import('../app/dashboard/components/list-posts/list-posts.component').then(m => m.ListPostsComponent)
            },
            {
                path: 'new-article',
                loadComponent: () => import('../app/dashboard/components/form-post/form-post.component').then(m => m.FormPostComponent)
            },
            {
                path: 'edit-post/:idArticle',
                loadComponent: () => import('../app/dashboard/components/form-post/form-post.component').then(m => m.FormPostComponent)
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

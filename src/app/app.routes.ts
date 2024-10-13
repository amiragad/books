import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'book/:id',
    loadComponent: () => import('./modules/components/book-details/book-details.component').then(m => m.BookDetailsComponent)
  },
  {
    path: 'author/:id',
    loadComponent: () => import('./modules/components/author-details/author-details.component').then(m => m.AuthorDetailsComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('./modules/components/search/search.component').then(m => m.SearchComponent)
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./modules/components/wishlist/wishlist.component').then(m => m.WishlistComponent)
  }
];

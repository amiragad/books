import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IBook } from '../../../core/interfaces/ibook';
import { CommonModule } from '@angular/common';



@Component({
  standalone: true,
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  imports:[MatCardModule,CommonModule]
})
export class WishlistComponent implements OnInit {
  wishlist: IBook[] = [];

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    const storedWishlist = localStorage.getItem('wishlist');
    this.wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
  }

  removeFromWishlist(book: IBook): void {
    if (confirm(`Are you sure you want to remove "${book.title}" from your wishlist?`)) {
      this.wishlist = this.wishlist.filter(b => b.key !== book.key);
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }
  }

  getBookCover(book: IBook): string {
    return book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : 'assets/default-placeholder.png';
  }
}

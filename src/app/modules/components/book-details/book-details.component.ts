import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card'; 
import { IBook } from '../../../core/interfaces/ibook';
import { BookService } from '../../../core/services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  imports: [CommonModule ,MatCardModule]
})
export class BookDetailsComponent implements OnInit {
  bookId!: string;
  bookDetails!: IBook;
  authorNames!: string 

  constructor(private route: ActivatedRoute, private bookService: BookService) {}

  ngOnInit(): void {
    // Retrieve the book ID from the route parameters
    this.bookId = this.route.snapshot.paramMap.get('id') || '';
    this.getBookDetails(this.bookId);
  }

  getBookDetails(bookId: string): void {
    this.bookService.getBookDetails(bookId).subscribe(
      response => {
        this.bookDetails = response;
        this.authorNames = this.bookDetails.authors?.map(author => author.name).join(', ') || 'Unknown';
      },
      error => {
        console.error('Error fetching book details:', error);
      }
    );
  }

  addToWishlist(): void {
    const currentWishlist = localStorage.getItem('wishlist');
    const wishlist: IBook[] = currentWishlist ? JSON.parse(currentWishlist) : [];
    
    // Avoid duplicates
    if (!wishlist.find((b: IBook) => b.key === this.bookDetails.key)) {
      wishlist.push({
        title: this.bookDetails.title,
        cover_i: this.bookDetails.cover_i,
        key: this.bookId // Use the book ID
      });
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      this.showToast('Book added to wishlist!'); // Replace alert with a toast
    } else {
      this.showToast('This book is already in your wishlist.'); // Replace alert with a toast
    }
  }

  private showToast(message: string): void {
    // Implement a simple toast notification logic here
    // This could be a snackbar from Angular Material or any other notification library you use
    console.log(message); // Placeholder for toast implementation
  }
}

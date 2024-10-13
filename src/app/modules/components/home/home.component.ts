import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button';  
import { CommonModule } from '@angular/common';
import { BookService } from '../../../core/services/book.service';

interface Book {
  cover_i?: string;
  publish_date?: string[];
  author_name?: string[];
  title: string;
}

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule ,MatCardModule, MatToolbarModule, MatButtonModule] 
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  readonly defaultCover = 'assets/images/default-placeholder.jpg'; // Path to the default placeholder image

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooksBySubject('finance');
  }

  getBooksBySubject(subject: string): void {
    this.bookService.getBooksBySubject(subject).subscribe(response => {
        // Take only the first 9 books
        this.books = response.works.slice(0, 9);
      }, error => {
        console.error('Error fetching books:', error);
      });
  }

  getBookCover(book: Book): string {
    return book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : this.defaultCover;
  }
}


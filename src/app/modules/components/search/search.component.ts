import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../../core/services/book.service';
import { IBook } from '../../../core/interfaces/ibook';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [CommonModule,MatCardModule,RouterModule,ReactiveFormsModule],
  providers:[BookService]
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;
  books: IBook[] = [];
  searchKey: string = 'title'; // Default search key
  readonly defaultCover = 'assets/default-placeholder.png';

  constructor(private bookService: BookService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      query: [''],
      searchKey: ['title'],
    });
  }

  onSearch(): void {
    const { query, searchKey } = this.searchForm.value;

    if (query) {
      this.bookService.searchBooks(query, searchKey).subscribe(
        (response: { docs: IBook[] }) => {
          this.books = response.docs.slice(0, 9); // Limit to first 9 results
        },
        (error: any) => {
          console.error('Error fetching search results:', error);
          this.books = []; // Reset books on error
        }
      );
    } else {
      this.books = []; // Reset books if query is empty
    }
  }

  getBookCover(book: IBook): string {
    return book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
      : this.defaultCover;
  }
}

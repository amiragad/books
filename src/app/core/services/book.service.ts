import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'https://openlibrary.org';

  constructor(private http: HttpClient) {}

  searchBooks(query: string, searchKey: string): Observable<any> {
    const encodedQuery = encodeURIComponent(query.trim());
    return this.http.get<any>(`${this.baseUrl}/search.json?${searchKey}=${encodedQuery}`);
  }

  getBookDetails(bookId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/works/${bookId}.json`);
  }

  getAuthorDetails(authorId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/authors/${authorId}.json`);
  }
  getBooksBySubject(subject: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${subject}.json`);
  }
}

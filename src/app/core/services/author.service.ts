import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthorDetails } from '../interfaces/i-author-details';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private baseUrl = 'https://openlibrary.org';

  constructor(private http: HttpClient) {}

  getAuthorDetails(authorId: string): Observable<IAuthorDetails> {
    return this.http.get<IAuthorDetails>(`${this.baseUrl}/authors/${authorId}.json`);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AuthorService } from '../../../core/services/author.service';

interface AuthorDetails {
  name: string;
  birth_date?: string;
  works_count?: number;
  top_subjects?: string[];
  photo_url?: string;
}

@Component({
  standalone: true,
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss'],
  imports: [CommonModule,MatCardModule],
})
export class AuthorDetailsComponent implements OnInit {
  authorId!: string;
  authorDetails!: AuthorDetails;

  constructor(private route: ActivatedRoute, private authorService: AuthorService) {}

  ngOnInit(): void {
    this.authorId = this.route.snapshot.paramMap.get('id') || '';
    this.getAuthorDetails(this.authorId);
  }

  getAuthorDetails(authorId: string): void {
    this.authorService.getAuthorDetails(authorId).subscribe(
        (response) => {
          this.authorDetails = {
            name: response.name,
            birth_date: response.birth_date,
            works_count: response.works_count,
            top_subjects: response.top_subjects?.slice(0, 5) || [], // Get the first 5 subjects
            photo_url:
              response.photo_url && response.photos&&  response.photos.length > 0
                ? response.photos[0]
                : '', // Get the first photo URL
          };
        },
        (error) => {
          console.error('Error fetching author details:', error);
        }
      );
  }
}

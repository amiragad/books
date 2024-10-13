export interface IBookDetails {
    title: string;
    first_publish_year?: number;
    authors?: { name: string }[];
    number_of_pages_median?: number;
    editions?: number; 
    cover_i?: string;
    key: string;
  }
  
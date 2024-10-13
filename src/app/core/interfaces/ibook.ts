export interface IBook {
    title: string;
    first_publish_year?: number;
    authors?: { name: string }[];
    editions?: number;
    number_of_pages_median?: number; // Add this line
    cover_i?: string;
    key: string; // Identifier for the book
  }
  
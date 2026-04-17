export interface Book {
  key: string;
  title: string;
  authors?: string[];
  author_names?: string[];
  first_publish_year?: number;
  cover_i?: number;
  isbn?: string[];
  publisher?: string[];
  languages?: string[];
  number_of_pages_median?: number;
  subject?: string[];
  edition_count?: number;
}

export interface BookDetails extends Book {
  description?: string | { value: string };
  extracts?: { text: string }[];
  covers?: number[];
  subjects?: string[];
  subject_places?: string[];
  subject_times?: string[];
  publishers?: { name: string }[];
  editions?: {
    entries: Array<{
      key: string;
      title: string;
      publish_date?: string;
      covers?: number[];
    }>;
  };
}

export interface SearchOptions {
  query: string;
  page?: number;
  limit?: number;
  language?: string;
  subject?: string;
  author?: string;
  sort?: SearchSort;
}

export type SearchSort = 'relevance' | 'title_asc' | 'first_publish_year';

export interface SearchDoc {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  isbn?: string[];
  publisher?: string[];
  languages?: string[];
  number_of_pages_median?: number;
  subject?: string[];
  edition_count?: number;
}

export interface SearchResponse {
  numFound: number;
  start: number;
  docs: SearchDoc[];
}

export interface Loan {
  id: string;
  bookKey: string;
  title: string;
  author: string;
  coverId?: number;
  borrowedDate: string;
  dueDate: string;
  returned: boolean;
}

export interface WishlistItem {
  id: string;
  bookKey: string;
  title: string;
  author: string;
  coverId?: number;
  addedDate: string;
}

export interface ReadingStatus {
  id: string;
  bookKey: string;
  title: string;
  author: string;
  coverId?: number;
  status: 'reading' | 'completed' | 'dropped';
  currentPage?: number;
  totalPages?: number;
  startedDate?: string;
  completedDate?: string;
  updatedDate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  libraryCardNumber: string;
}

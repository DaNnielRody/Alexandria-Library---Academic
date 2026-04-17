import type { Book, BookDetails } from '@/types/book';

export function getPrimaryAuthor(book: Book | BookDetails): string {
  return book.authors?.[0] || book.author_names?.[0] || 'Unknown Author';
}

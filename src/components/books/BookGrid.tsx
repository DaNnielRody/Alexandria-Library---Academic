import { BookCard } from './BookCard';
import { BookCardSkeleton } from '@/components/common';
import type { Book } from '@/types/book';
import styles from './BookGrid.module.css';

interface BookGridProps {
  books: Book[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function BookGrid({
  books,
  isLoading = false,
  emptyMessage = 'No books found',
}: BookGridProps) {
  if (isLoading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 8 }).map((_, i) => (
          <BookCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className={styles.empty}>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {books.map((book) => (
        <BookCard key={book.key} book={book} />
      ))}
    </div>
  );
}

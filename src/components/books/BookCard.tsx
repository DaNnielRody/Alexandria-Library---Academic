import { useState, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Heart, BookOpen } from 'lucide-react';
import { BookCover } from './BookCover';
import { Badge } from '@/components/common';
import { useWishlist } from '@/hooks/useWishlist';
import { getPrimaryAuthor } from '@/utils/authors';
import { extractWorkId } from '@/utils/bookKey';
import type { Book } from '@/types/book';
import styles from './BookCard.module.css';

interface BookCardProps {
  book: Book;
}

export const BookCard = memo(function BookCard({ book }: BookCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const authorName = getPrimaryAuthor(book);
  const bookKey = extractWorkId(book.key);

  const { isInWishlist, toggleWishlist } = useWishlist(
    book.key,
    book.title,
    authorName,
    book.cover_i
  );

  const handleWishlistClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist();
  }, [toggleWishlist]);

  return (
    <Link to={`/book/${bookKey}`} className={styles.card}>
      <div className={styles.coverWrapper}>
        <BookCover
          coverId={book.cover_i}
          title={book.title}
          size="M"
          className={`${styles.cover} ${!imageLoaded ? styles.hidden : ''}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />
        {!imageLoaded && <div className={styles.coverPlaceholder} />}
        {imageError && (
          <div className={styles.coverError}>
            <BookOpen size={32} />
          </div>
        )}
        <button
          className={`${styles.wishlistButton} ${isInWishlist ? styles.active : ''}`}
          onClick={handleWishlistClick}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>{authorName}</p>
        {book.first_publish_year && (
          <Badge size="sm" variant="default">
            {book.first_publish_year}
          </Badge>
        )}
      </div>
    </Link>
  );
});

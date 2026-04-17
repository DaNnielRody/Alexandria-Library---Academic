import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  Calendar,
  Globe,
  Bookmark,
  CheckCircle,
} from 'lucide-react';
import { BookCover } from './BookCover';
import { Button, Badge, Skeleton } from '@/components/common';
import { useBook } from '@/hooks/useBook';
import { useUserStore } from '@/stores/useUserStore';
import { useWishlist } from '@/hooks/useWishlist';
import { sanitizeHTML } from '@/utils';
import { createLoan } from '@/utils/loan';
import { getPrimaryAuthor } from '@/utils/authors';
import { extractWorkId, toBookKey } from '@/utils/bookKey';
import { MAX_DESCRIPTION_LENGTH } from '@/utils/date';
import type { BookDetails } from '@/types/book';
import styles from './BookDetail.module.css';

export function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { book, isLoading, error } = useBook(id);
  const {
    loans,
    readingStatuses,
    addLoan,
  } = useUserStore();

  const [showFullDescription, setShowFullDescription] = useState(false);

  const safeId = id ?? '';
  const bookKey = book ? toBookKey(safeId) : '';
  const { isInWishlist, toggleWishlist } = useWishlist(
    bookKey,
    book?.title || '',
    book ? getPrimaryAuthor(book) : 'Unknown Author',
    book?.covers?.[0]
  );

  const currentLoan = book && id ? loans.find(
    (l) => l.bookKey === toBookKey(id) && !l.returned
  ) : null;
  const readingStatus = book && id
    ? readingStatuses.find((r) => r.bookKey === toBookKey(id))
    : null;

  const handleBorrow = () => {
    if (!book || currentLoan || !id) return;
    addLoan(createLoan(book as BookDetails, extractWorkId(id)));
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.skeleton}>
          <Skeleton variant="rectangular" height={300} width={200} />
          <div className={styles.skeletonContent}>
            <Skeleton width="80%" height="2rem" />
            <Skeleton width="60%" height="1.5rem" />
            <Skeleton width="40%" height="1rem" />
            <Skeleton width="100%" height="6rem" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Book not found</h2>
          <p>The book you're looking for doesn't exist or couldn't be loaded.</p>
          <Button onClick={() => navigate('/')}>Back to Catalog</Button>
        </div>
      </div>
    );
  }

  const rawDescription =
    typeof book.description === 'string'
      ? book.description
      : book.description?.value || '';
  const description = sanitizeHTML(rawDescription);

  const truncatedDescription =
    description.length > MAX_DESCRIPTION_LENGTH && !showFullDescription
      ? description.slice(0, MAX_DESCRIPTION_LENGTH) + '...'
      : description;

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      <div className={styles.content}>
        <div className={styles.coverSection}>
          <BookCover
            coverId={book.covers?.[0]}
            title={book.title}
            size="L"
            className={styles.cover}
          />
          <div className={styles.actions}>
            <Button
              variant={isInWishlist ? 'secondary' : 'outline'}
              onClick={toggleWishlist}
              fullWidth
            >
              <Heart
                size={18}
                fill={isInWishlist ? 'currentColor' : 'none'}
              />
              {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
            </Button>
            {currentLoan ? (
              <Badge variant="success" className={styles.statusBadge}>
                <CheckCircle size={14} />
                Return by {new Date(currentLoan.dueDate).toLocaleDateString()}
              </Badge>
            ) : (
              <Button onClick={handleBorrow} fullWidth>
                <Bookmark size={18} />
                Borrow Book
              </Button>
            )}
          </div>
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.title}>{book.title}</h1>

          <p className={styles.author}>
            by {book.authors?.join(', ') || 'Unknown Author'}
          </p>

          <div className={styles.meta}>
            {book.first_publish_year && (
              <span className={styles.metaItem}>
                <Calendar size={16} />
                {book.first_publish_year}
              </span>
            )}
            {book.subjects && book.subjects.length > 0 && (
              <span className={styles.metaItem}>
                <Globe size={16} />
                {book.subjects[0]}
              </span>
            )}
          </div>

          {readingStatus && (
            <Badge variant="info" className={styles.readingStatus}>
              Currently {readingStatus.status}
            </Badge>
          )}

          {description && (
            <div className={styles.description}>
              <h3>About this book</h3>
              <p>
                {truncatedDescription}
                {description.length > MAX_DESCRIPTION_LENGTH && (
                  <button
                    className={styles.showMore}
                    onClick={() => setShowFullDescription(!showFullDescription)}
                  >
                    {showFullDescription ? 'Show less' : 'Read more'}
                  </button>
                )}
              </p>
            </div>
          )}

          {book.subjects && book.subjects.length > 0 && (
            <div className={styles.subjects}>
              <h3>Subjects</h3>
              <div className={styles.tags}>
                {book.subjects.slice(0, 8).map((subject) => (
                  <Badge key={subject} variant="default">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

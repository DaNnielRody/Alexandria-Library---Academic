import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { useUserStore } from '@/stores/useUserStore';
import { BookCover } from '@/components/books';
import { Card, Button } from '@/components/common';
import { extractWorkId } from '@/utils/bookKey';
import styles from './Wishlist.module.css';

export function Wishlist() {
  const { wishlist, removeFromWishlist } = useUserStore();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Wishlist</h1>

      {wishlist.length === 0 ? (
        <Card className={styles.emptyCard}>
          <div className={styles.empty}>
            <Heart size={48} className={styles.emptyIcon} />
            <h2>Your wishlist is empty</h2>
            <p>Save books you're interested in to find them easily later.</p>
            <Link to="/">
              <Button>Browse Catalog</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className={styles.wishlistGrid}>
          {wishlist.map((item) => (
            <Card key={item.id} className={styles.wishlistCard}>
              <div className={styles.cardContent}>
                <Link
                  to={`/book/${extractWorkId(item.bookKey)}`}
                  className={styles.coverLink}
                >
                  <BookCover
                    coverId={item.coverId}
                    title={item.title}
                    size="S"
                    className={styles.cover}
                  />
                </Link>
                <div className={styles.info}>
                  <Link
                    to={`/book/${extractWorkId(item.bookKey)}`}
                    className={styles.bookTitle}
                  >
                    {item.title}
                  </Link>
                  <p className={styles.author}>{item.author}</p>
                  <p className={styles.addedDate}>
                    Added {new Date(item.addedDate).toLocaleDateString()}
                  </p>
                </div>
                <button
                  className={styles.removeButton}
                  onClick={() => removeFromWishlist(item.bookKey)}
                  aria-label="Remove from wishlist"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { getCoverUrl } from '@/services/api/openLibraryApi';
import styles from './BookCover.module.css';

interface BookCoverProps {
  coverId?: number;
  title: string;
  size?: 'S' | 'M' | 'L';
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function BookCover({
  coverId,
  title,
  size = 'M',
  className = '',
  onLoad,
  onError,
}: BookCoverProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const coverUrl = getCoverUrl(coverId, size);

  const handleLoad = () => {
    setLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
    onError?.();
  };

  if (!coverUrl || error) {
    return (
      <div
        className={`${styles.placeholder} ${styles[size.toLowerCase()]} ${className}`}
        aria-label={`Cover of ${title}`}
      >
        <span className={styles.initials}>
          {title.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <img
      src={coverUrl}
      alt={`Cover of ${title}`}
      className={`${styles.cover} ${loaded ? styles.loaded : ''} ${
        styles[size.toLowerCase()]
      } ${className}`}
      onLoad={handleLoad}
      onError={handleError}
      loading="lazy"
    />
  );
}

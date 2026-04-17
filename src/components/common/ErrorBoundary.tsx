import { useState, useEffect } from 'react';
import { Button } from './Button';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ErrorBoundary({ children, fallback }: Props) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      setHasError(true);
      if (import.meta.env.DEV) {
        console.error('ErrorBoundary caught an error:', event.error);
      }
    };

    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  const handleRetry = () => {
    setHasError(false);
  };

  if (hasError) {
    if (fallback) {
      return fallback;
    }

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.icon}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className={styles.title}>Something went wrong</h2>
          <p className={styles.message}>
            Something went wrong
          </p>
          <Button onClick={handleRetry} variant="primary">
            Try again
          </Button>
        </div>
      </div>
    );
  }

  return children;
}

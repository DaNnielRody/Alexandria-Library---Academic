import React from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'circular' | 'rectangular';
  className?: string;
}

export function Skeleton({
  width,
  height,
  variant = 'text',
  className = '',
}: SkeletonProps) {
  const style: React.CSSProperties = {
    width: width ?? (variant === 'text' ? '100%' : undefined),
    height: height ?? (variant === 'text' ? '1em' : undefined),
  };

  return (
    <div
      className={`${styles.skeleton} ${styles[variant]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

export function BookCardSkeleton() {
  return (
    <div className={styles.bookCard}>
      <Skeleton variant="rectangular" height={200} className={styles.cover} />
      <div className={styles.content}>
        <Skeleton width="80%" height="1.25rem" />
        <Skeleton width="60%" height="1rem" />
        <Skeleton width="40%" height="0.875rem" />
      </div>
    </div>
  );
}

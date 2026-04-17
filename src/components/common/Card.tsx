import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
  children,
  className = '',
  onClick,
  variant = 'default',
  padding = 'md',
}: CardProps) {
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      className={`${styles.card} ${styles[variant]} ${styles[`padding-${padding}`]} ${
        onClick ? styles.clickable : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}

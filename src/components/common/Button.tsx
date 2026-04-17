import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
} & (
  | ({ component?: 'button' } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>)
  | ({ component: 'link'; to: string } & Omit<React.LinkHTMLAttributes<HTMLAnchorElement>, 'className' | 'href'>)
);

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const classes = `${styles.button} ${styles[variant]} ${styles[size]} ${
    fullWidth ? styles.fullWidth : ''
  } ${className}`.trim();

  if (props.component === 'link') {
    const { to, ...linkProps } = props as { component: 'link'; to: string } & React.LinkHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link className={classes} to={to} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { disabled, ...buttonProps } = props as Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;
  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...buttonProps}
    >
      {isLoading ? <span className={styles.spinner} /> : children}
    </button>
  );
}

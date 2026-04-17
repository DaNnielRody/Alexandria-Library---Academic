import { useCallback, useId } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/theme';
import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const id = useId();
  const isDark = theme === 'dark';

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    },
    [toggleTheme]
  );

return (
    <button
      type="button"
      onClick={toggleTheme}
      onKeyDown={handleKeyDown}
      className={styles.toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      id={id}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

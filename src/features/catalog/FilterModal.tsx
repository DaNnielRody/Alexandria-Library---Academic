import { useState } from 'react';
import { Modal } from '@/components/common/Modal';
import { Button, Input } from '@/components/common';
import styles from './FilterModal.module.css';

export type SortOption = 'relevance' | 'title_asc' | 'first_publish_year';

const CATEGORIES = [
  'fiction',
  'science fiction',
  'fantasy',
  'mystery',
  'thriller',
  'romance',
  'horror',
  'biography',
  'history',
  'science',
  'philosophy',
  'poetry',
  'children',
  'young adult',
  'comics',
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'title_asc', label: 'Title (A-Z)' },
  { value: 'first_publish_year', label: 'Publication Year' },
];

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSort: SortOption;
  currentCategory: string;
  currentAuthor: string;
  onApply: (sort: SortOption, category: string, author: string) => void;
}

export function FilterModal({
  isOpen,
  onClose,
  currentSort,
  currentCategory,
  currentAuthor,
  onApply,
}: FilterModalProps) {
  const [sort, setSort] = useState<SortOption>(currentSort);
  const [category, setCategory] = useState(currentCategory);
  const [author, setAuthor] = useState(currentAuthor);

  const handleApply = () => {
    onApply(sort, category, author);
    onClose();
  };

  const handleClear = () => {
    setSort('relevance');
    setCategory('');
    setAuthor('');
    onApply('relevance', '', '');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filters" size="sm">
      <p className={styles.subtitle}>
        Adjust your filters to find the perfect book. Click Apply Filters when you're done.
      </p>

      <div className={styles.section}>
        <label className={styles.sectionLabel}>Categories</label>
        <select
          className={styles.categorySelect}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.section}>
        <label className={styles.sectionLabel}>Author</label>
        <Input
          placeholder="Filter by author name..."
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          fullWidth
        />
      </div>

      <div className={styles.section}>
        <label className={styles.sectionLabel}>Sort By</label>
        <div className={styles.radioGroup}>
          {SORT_OPTIONS.map((opt) => (
            <label key={opt.value} className={styles.radioLabel}>
              <input
                type="radio"
                name="sort"
                value={opt.value}
                checked={sort === opt.value}
                onChange={() => setSort(opt.value)}
                className={styles.radioInput}
              />
              <span className={styles.radioCustom} />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <Button variant="outline" onClick={handleClear}>
          Clear
        </Button>
        <Button variant="primary" onClick={handleApply}>
          Apply Filters
        </Button>
      </div>
    </Modal>
  );
}

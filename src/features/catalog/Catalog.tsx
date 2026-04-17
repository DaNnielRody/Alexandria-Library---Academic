import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { BookGrid } from '@/components/books';
import { Input, Button } from '@/components/common';
import { useBooks } from '@/hooks/useBooks';
import { useDebounce } from '@/hooks/useDebounce';
import { FilterModal, type SortOption } from './FilterModal';
import { DEBOUNCE_DELAY, PAGE_SIZE } from '@/utils';
import styles from './Catalog.module.css';

const DEFAULT_QUERY = 'subject:fiction';
const MAX_QUERY_LENGTH = 200;
const SAFE_QUERY_PATTERN = /^[a-zA-Z0-9\s\-_.,'":;!?()&]+$/;

function isValidQuery(query: string): boolean {
  return query.length <= MAX_QUERY_LENGTH && SAFE_QUERY_PATTERN.test(query);
}

function htmlEncode(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function sanitizeAuthor(author: string): string {
  return author.slice(0, MAX_QUERY_LENGTH).replace(/[^a-zA-Z0-9\s\-_.,'":;!?()&]/g, '');
}

export function Catalog() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortOption>('relevance');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const debouncedQuery = useDebounce(isValidQuery(query) ? query : query.slice(0, MAX_QUERY_LENGTH), DEBOUNCE_DELAY);

  const activeQuery = (() => {
    if (category && !debouncedQuery) return category;
    if (category && debouncedQuery) return `${debouncedQuery} ${category}`;
    if (debouncedQuery) return debouncedQuery;
    return DEFAULT_QUERY;
  })();

  const { books, numFound, isLoading, hasNextPage, hasPreviousPage } = useBooks(
    activeQuery,
    { page, sort, author }
  );

  const handleApplyFilters = (newSort: SortOption, newCategory: string, newAuthor: string) => {
    setSort(newSort);
    setCategory(newCategory);
    setAuthor(sanitizeAuthor(newAuthor));
    setPage(1);
  };

  const hasActiveFilters = sort !== 'relevance' || category !== '' || author !== '';

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {debouncedQuery ? 'Search Results' : 'The Library of Alexandria'}
        </h1>
        <p className={styles.subtitle}>
          {debouncedQuery
            ? `${numFound.toLocaleString()} books matching "${htmlEncode(debouncedQuery)}"`
            : 'Popular books from Open Library'}
        </p>
      </div>

      <div className={styles.searchSection}>
        <div className={styles.searchRow}>
          <div className={styles.searchBar}>
            <Input
              placeholder="Search by title, author, or ISBN..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value.slice(0, MAX_QUERY_LENGTH));
                setPage(1);
              }}
              leftIcon={<Search size={20} />}
              fullWidth
            />
          </div>
          <Button
            variant={hasActiveFilters ? 'primary' : 'outline'}
            onClick={() => setIsFilterOpen(true)}
            className={styles.filterButton}
          >
            <SlidersHorizontal size={16} />
            Filters
          </Button>
        </div>
      </div>

      <p className={styles.resultsCount}>
        {isLoading ? 'Loading...' : `${numFound.toLocaleString()} books`}
      </p>

      <BookGrid
        books={books}
        isLoading={isLoading}
        emptyMessage="No books found. Try a different search term."
      />

      {numFound > PAGE_SIZE && (
        <div className={styles.pagination}>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={!hasPreviousPage || isLoading}
          >
            <ChevronLeft size={18} />
            Previous
          </Button>
          <span className={styles.pageInfo}>
            Page {page} of {Math.ceil(numFound / PAGE_SIZE)}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage((p) => p + 1)}
            disabled={!hasNextPage || isLoading}
          >
            Next
            <ChevronRight size={18} />
          </Button>
        </div>
      )}

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        currentSort={sort}
        currentCategory={category}
        currentAuthor={author}
        onApply={handleApplyFilters}
      />
    </div>
  );
}

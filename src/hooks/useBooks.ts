import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchBooks, buildBookFromSearch } from '@/services/api/openLibraryApi';
import type { SearchOptions, Book } from '@/types/book';
import { PAGE_SIZE, SEARCH_STALE_TIME, MAX_PUBLISH_YEAR } from '@/utils';

interface UseBooksResult {
  books: Book[];
  numFound: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function useBooks(
  query: string,
  options: Omit<SearchOptions, 'query'> = {}
): UseBooksResult {
  const { page = 1, limit = PAGE_SIZE, language, author, sort } = options;

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ['books', query, page, sort, author],
    queryFn: () =>
      searchBooks({
        query,
        page,
        limit,
        language,
        author,
        sort,
      }),
    enabled: true,
    staleTime: SEARCH_STALE_TIME,
  });

  const books = useMemo(() => {
    return (data?.docs.map(buildBookFromSearch) || []).filter(
      (book) => !book.first_publish_year || book.first_publish_year <= MAX_PUBLISH_YEAR
    );
  }, [data?.docs]);

  const numFound = data?.numFound || 0;
  const totalPages = Math.ceil(numFound / limit);

  return {
    books,
    numFound,
    isLoading: isFetching,
    error: error as Error | null,
    refetch,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

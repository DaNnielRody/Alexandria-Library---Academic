import { useQuery } from '@tanstack/react-query';
import { getBookDetails } from '@/services/api/openLibraryApi';
import type { BookDetails } from '@/types/book';
import { BOOK_DETAIL_STALE_TIME } from '@/utils';

interface UseBookResult {
  book: BookDetails | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useBook(bookId: string | undefined): UseBookResult {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => getBookDetails(bookId!),
    enabled: !!bookId,
    staleTime: BOOK_DETAIL_STALE_TIME,
  });

  return {
    book: data || null,
    isLoading: isLoading && !data,
    error: error as Error | null,
    refetch,
  };
}

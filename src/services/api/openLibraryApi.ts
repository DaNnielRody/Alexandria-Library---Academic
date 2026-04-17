import type { Book, BookDetails, SearchOptions, SearchResponse, SearchDoc } from '@/types/book';

const BASE_URL = 'https://openlibrary.org';
const COVER_BASE_URL = 'https://covers.openlibrary.org/b';

const MAX_CACHE_SIZE = 100;

class LRUCache<K, V> {
  private cache = new Map<K, V>();

  constructor(private maxSize: number) {}

  get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }
}

const RATE_LIMIT_WINDOW_MS = 1000;
const MAX_REQUESTS_PER_WINDOW = 10;
const requestTimestamps: number[] = [];

function throttleRequests(): void {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  while (requestTimestamps.length > 0 && requestTimestamps[0] < windowStart) {
    requestTimestamps.shift();
  }
  if (requestTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const sleepTime = RATE_LIMIT_WINDOW_MS - (now - requestTimestamps[0]);
    if (sleepTime > 0) {
      throw new Error('Rate limit exceeded. Please slow down your requests.');
    }
  }
  requestTimestamps.push(now);
}

class AuthorService {
  private authorCache = new LRUCache<string, string>(MAX_CACHE_SIZE);
  private authorFetchPromises = new Map<string, Promise<string>>();

  async fetchAuthorName(key: string, signal?: AbortSignal): Promise<string> {
    if (this.authorCache.has(key)) {
      return this.authorCache.get(key)!;
    }

    if (this.authorFetchPromises.has(key)) {
      return this.authorFetchPromises.get(key)!;
    }

    const fetchPromise = (async () => {
      const response = await fetch(`${BASE_URL}/authors/${key}.json`, { signal });
      if (response.ok) {
        const authorData = await response.json();
        const name = authorData.name || 'Unknown Author';
        this.authorCache.set(key, name);
        return name;
      }
      return 'Unknown Author';
    })();

    this.authorFetchPromises.set(key, fetchPromise);

    try {
      return await fetchPromise;
    } finally {
      this.authorFetchPromises.delete(key);
    }
  }
}

const authorService = new AuthorService();

export function getCoverUrl(
  coverId: number | undefined,
  size: 'S' | 'M' | 'L' = 'M'
): string | undefined {
  if (!coverId) return undefined;
  return `${COVER_BASE_URL}/id/${coverId}-${size}.jpg`;
}

export async function searchBooks(
  options: SearchOptions
): Promise<SearchResponse> {
  throttleRequests();
  const { query, page = 1, limit = 20, language, author, sort } = options;

  const params = new URLSearchParams({
    q: query,
    page: String(page),
    limit: String(limit),
    fields:
      'key,title,author_name,first_publish_year,cover_i,isbn,publisher,languages,number_of_pages_median,subject,edition_count',
  });

  if (language) {
    params.set('lang', language);
  }

  if (author) {
    params.set('author', author);
  }

  if (sort && sort !== 'relevance') {
    const sortMap: Record<string, string> = {
      title_asc: 'title',
      first_publish_year: 'new',
    };
    if (sortMap[sort]) {
      params.set('sort', sortMap[sort]);
    }
  }

  const response = await fetch(
    `${BASE_URL}/search.json?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error('Search failed. Please try again.');
  }

  return response.json();
}

async function fetchAuthorName(key: string, signal?: AbortSignal): Promise<string> {
  return authorService.fetchAuthorName(key, signal);
}

export async function getBookDetails(
  bookId: string,
  signal?: AbortSignal
): Promise<BookDetails> {
  const response = await fetch(`${BASE_URL}/works/${bookId}.json`, { signal });

  if (!response.ok) {
    throw new Error('Failed to fetch book details. Please try again.');
  }

  const data = await response.json();

  const authorKeys = data.authors?.map(
    (a: { author?: { key?: string } }) => a.author?.key?.replace('/authors/', '') || ''
  ) || [];

  let authorNames: string[] = [];
  if (data.author_names) {
    authorNames = data.author_names;
  } else if (authorKeys.length > 0) {
    try {
      const authorPromises = authorKeys.slice(0, 3).map((key: string) =>
        fetchAuthorName(key, signal)
      );
      authorNames = await Promise.all(authorPromises);
    } catch (error) {
      console.error(`Failed to fetch author names for book ${bookId}:`, error);
      authorNames = ['Unknown Author'];
    }
  }

  return {
    key: data.key,
    title: data.title,
    authors: authorNames,
    description:
      typeof data.description === 'string'
        ? data.description
        : data.description?.value || '',
    covers: data.covers,
    subjects: data.subjects,
    subject_places: data.subject_places,
    subject_times: data.subject_times,
    first_publish_year: data.first_publish_year,
    editions: data.editions,
  };
}

export function buildBookFromSearch(doc: SearchDoc): Book {
  return {
    key: doc.key as string,
    title: doc.title as string,
    authors: doc.author_name as string[] | undefined,
    first_publish_year: doc.first_publish_year as number | undefined,
    cover_i: doc.cover_i as number | undefined,
    isbn: doc.isbn as string[] | undefined,
    publisher: doc.publisher as string[] | undefined,
    languages: doc.languages as string[] | undefined,
    number_of_pages_median: doc.number_of_pages_median as number | undefined,
    subject: doc.subject as string[] | undefined,
    edition_count: doc.edition_count as number | undefined,
  };
}

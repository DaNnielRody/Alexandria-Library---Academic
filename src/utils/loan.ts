import type { BookDetails, Loan } from '@/types/book';
import { toBookKey, extractWorkId } from './bookKey';
import { getPrimaryAuthor } from './authors';
import { toISODate, addDays, LOAN_DURATION_DAYS } from './date';
import { generateId } from './id';

export function createLoan(book: BookDetails, workId: string): Loan {
  const borrowedDate = new Date();
  const dueDate = addDays(borrowedDate, LOAN_DURATION_DAYS);

  return {
    id: generateId('loan'),
    bookKey: toBookKey(extractWorkId(workId)),
    title: book.title,
    author: getPrimaryAuthor(book),
    coverId: book.covers?.[0],
    borrowedDate: toISODate(borrowedDate),
    dueDate: toISODate(dueDate),
    returned: false,
  };
}

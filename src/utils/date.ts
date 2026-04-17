export const LOAN_DURATION_DAYS = 14;
export const DUE_SOON_THRESHOLD_DAYS = 3;
export const MAX_DESCRIPTION_LENGTH = 300;

export function toISODate(date: Date = new Date()): string {
  return date.toISOString();
}

export function toLocaleDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString();
}

export function daysUntil(dueDate: string): number {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function isDueSoon(dueDate: string): boolean {
  const days = daysUntil(dueDate);
  return days >= 0 && days <= DUE_SOON_THRESHOLD_DAYS;
}

export function isOverdue(dueDate: string): boolean {
  return daysUntil(dueDate) < 0;
}

export function formatDueDate(dueDate: string): string {
  const days = daysUntil(dueDate);
  if (days < 0) {
    return `${Math.abs(days)} days overdue`;
  }
  if (days === 0) {
    return 'Due today';
  }
  if (days === 1) {
    return 'Due tomorrow';
  }
  return `Due in ${days} days`;
}

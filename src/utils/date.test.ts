import { describe, it, expect } from 'vitest';
import {
  daysUntil,
  isDueSoon,
  addDays,
  DUE_SOON_THRESHOLD_DAYS,
  toISODate,
  isOverdue,
} from './date';

describe('date utils', () => {
  describe('daysUntil', () => {
    it('returns positive days for future date', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5);
      const result = daysUntil(futureDate.toISOString());
      expect(result).toBe(5);
    });

    it('returns negative days for past date', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 3);
      const result = daysUntil(pastDate.toISOString());
      expect(result).toBe(-3);
    });

    it('returns 0 for today', () => {
      const today = new Date().toISOString();
      const result = daysUntil(today);
      expect(result).toBe(0);
    });

    it('rounds up to next day for tomorrow', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const result = daysUntil(tomorrow.toISOString());
      expect(result).toBe(1);
    });
  });

  describe('isDueSoon', () => {
    it('returns true when due within threshold', () => {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 2);
      expect(isDueSoon(dueDate.toISOString())).toBe(true);
    });

    it('returns true when due today', () => {
      const today = new Date().toISOString();
      expect(isDueSoon(today)).toBe(true);
    });

    it('returns false when due beyond threshold', () => {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + DUE_SOON_THRESHOLD_DAYS + 5);
      expect(isDueSoon(dueDate.toISOString())).toBe(false);
    });

    it('returns false when overdue', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      expect(isDueSoon(pastDate.toISOString())).toBe(false);
    });
  });

  describe('addDays', () => {
    it('adds positive days', () => {
      const date = new Date(2024, 0, 15);
      const result = addDays(date, 5);
      expect(result.getDate()).toBe(20);
    });

    it('subtracts days with negative input', () => {
      const date = new Date(2024, 0, 15);
      const result = addDays(date, -5);
      expect(result.getDate()).toBe(10);
    });

    it('handles month overflow', () => {
      const date = new Date(2024, 0, 31);
      const result = addDays(date, 1);
      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(1);
    });

    it('does not mutate original date', () => {
      const date = new Date(2024, 0, 15);
      addDays(date, 5);
      expect(date.getDate()).toBe(15);
    });
  });

  describe('isOverdue', () => {
    it('returns true for past date', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      expect(isOverdue(pastDate.toISOString())).toBe(true);
    });

    it('returns false for today', () => {
      const today = new Date().toISOString();
      expect(isOverdue(today)).toBe(false);
    });

    it('returns false for future date', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      expect(isOverdue(futureDate.toISOString())).toBe(false);
    });
  });

  describe('toISODate', () => {
    it('returns ISO string for default date', () => {
      const result = toISODate();
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });

    it('returns ISO string for specified date', () => {
      const date = new Date('2024-06-15');
      const result = toISODate(date);
      expect(result).toContain('2024-06-15');
    });
  });
});

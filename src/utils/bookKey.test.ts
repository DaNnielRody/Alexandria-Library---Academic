import { describe, it, expect } from 'vitest';
import { normalizeBookKey, toBookKey, extractWorkId } from './bookKey';

describe('bookKey utils', () => {
  describe('normalizeBookKey', () => {
    it('removes /works/ prefix', () => {
      expect(normalizeBookKey('/works/OL123456W')).toBe('OL123456W');
    });

    it('returns unchanged string without prefix', () => {
      expect(normalizeBookKey('OL123456W')).toBe('OL123456W');
    });

    it('handles empty string', () => {
      expect(normalizeBookKey('')).toBe('');
    });
  });

  describe('toBookKey', () => {
    it('adds /works/ prefix', () => {
      expect(toBookKey('OL123456W')).toBe('/works/OL123456W');
    });

    it('handles already prefixed input', () => {
      expect(toBookKey('/works/OL123456W')).toBe('/works/OL123456W');
    });

    it('handles empty string', () => {
      expect(toBookKey('')).toBe('/works/');
    });
  });

  describe('extractWorkId', () => {
    it('extracts id from /works/ prefixed key', () => {
      expect(extractWorkId('/works/OL123456W')).toBe('OL123456W');
    });

    it('returns original string if not prefixed', () => {
      expect(extractWorkId('OL123456W')).toBe('OL123456W');
    });

    it('handles complex book key', () => {
      expect(extractWorkId('/works/OL1234567W')).toBe('OL1234567W');
    });

    it('handles empty string', () => {
      expect(extractWorkId('')).toBe('');
    });
  });
});

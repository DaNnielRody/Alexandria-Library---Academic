import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 300));
    expect(result.current).toBe('hello');
  });

  it('returns debounced value after delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) => useDebounce(value, delay),
      { initialProps: { value: 'hello', delay: 300 } }
    );

    expect(result.current).toBe('hello');

    rerender({ value: 'world', delay: 300 });
    expect(result.current).toBe('hello');

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe('world');
  });

  it('resets timer when value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) => useDebounce(value, delay),
      { initialProps: { value: 'hello', delay: 300 } }
    );

    rerender({ value: 'world', delay: 300 });
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(result.current).toBe('hello');

    rerender({ value: 'foo', delay: 300 });
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(result.current).toBe('hello');

    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(result.current).toBe('foo');
  });

  it('uses default delay of 300ms', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDebounce(value),
      { initialProps: { value: 'hello' } }
    );

    expect(result.current).toBe('hello');

    rerender({ value: 'world' });
    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(result.current).toBe('hello');

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe('world');
  });

  it('cleans up timeout on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');
    const { unmount } = renderHook(() => useDebounce('hello', 300));

    unmount();
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
  });
});

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Loan, WishlistItem, ReadingStatus, User } from '@/types/book';

interface UserState {
  user: User | null;
  loans: Loan[];
  wishlist: WishlistItem[];
  readingStatuses: ReadingStatus[];
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  addLoan: (loan: Loan) => void;
  removeLoan: (loanId: string) => void;
  returnLoan: (loanId: string) => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (bookKey: string) => void;
  isInWishlist: (bookKey: string) => boolean;
  updateReadingStatus: (status: ReadingStatus) => void;
  removeReadingStatus: (bookKey: string) => void;
  getReadingStatus: (bookKey: string) => ReadingStatus | undefined;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      loans: [],
      wishlist: [],
      readingStatuses: [],
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      addLoan: (loan) =>
        set((state) => ({
          loans: [...state.loans, loan],
        })),

      removeLoan: (loanId) =>
        set((state) => ({
          loans: state.loans.filter((l) => l.id !== loanId),
        })),

      returnLoan: (loanId) =>
        set((state) => ({
          loans: state.loans.map((l) =>
            l.id === loanId ? { ...l, returned: true } : l
          ),
        })),

      addToWishlist: (item) =>
        set((state) => ({
          wishlist: state.wishlist.some((w) => w.bookKey === item.bookKey)
            ? state.wishlist
            : [...state.wishlist, item],
        })),

      removeFromWishlist: (bookKey) =>
        set((state) => ({
          wishlist: state.wishlist.filter((w) => w.bookKey !== bookKey),
        })),

      isInWishlist: (bookKey) => {
        return get().wishlist.some((w) => w.bookKey === bookKey);
      },

      updateReadingStatus: (status) =>
        set((state) => {
          const existing = state.readingStatuses.findIndex(
            (r) => r.bookKey === status.bookKey
          );
          if (existing >= 0) {
            const updated = [...state.readingStatuses];
            updated[existing] = status;
            return { readingStatuses: updated };
          }
          return { readingStatuses: [...state.readingStatuses, status] };
        }),

      removeReadingStatus: (bookKey) =>
        set((state) => ({
          readingStatuses: state.readingStatuses.filter(
            (r) => r.bookKey !== bookKey
          ),
        })),

      getReadingStatus: (bookKey) => {
        return get().readingStatuses.find((r) => r.bookKey === bookKey);
      },

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          loans: [],
          wishlist: [],
          readingStatuses: [],
        }),
    }),
    {
      name: 'library-user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loans: state.loans,
        wishlist: state.wishlist,
        readingStatuses: state.readingStatuses,
      }),
    }
  )
);

import { useCallback } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import type { WishlistItem } from '@/types/book';
import { generateId } from '@/utils/id';

export function useWishlist(bookKey: string, title: string, author: string, coverId?: number) {
  const { addToWishlist, removeFromWishlist, isInWishlist: checkIsInWishlist } = useUserStore();

  const isInWishlist = checkIsInWishlist(bookKey);

  const toggleWishlist = useCallback(() => {
    if (isInWishlist) {
      removeFromWishlist(bookKey);
    } else {
      const item: WishlistItem = {
        id: generateId('wishlist'),
        bookKey,
        title,
        author,
        coverId,
        addedDate: new Date().toISOString(),
      };
      addToWishlist(item);
    }
  }, [isInWishlist, bookKey, title, author, coverId, addToWishlist, removeFromWishlist]);

  return { isInWishlist, toggleWishlist };
}

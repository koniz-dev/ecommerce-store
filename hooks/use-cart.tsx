import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from 'zustand/middleware';

import { CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  decreaseItemQuantity: (variantId: string) => void;
  removeItem: (variantId: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],

      addItem: (item: CartItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (i) => i.variantId === item.variantId,
        );

        if (existingItem) {
          const updatedItems = currentItems.map((i) =>
            i.variantId === item.variantId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i,
          );
          set({ items: updatedItems });
          toast.success('Increased quantity in cart.');
        } else {
          set({ items: [...currentItems, item] });
          toast.success('Item added to cart.');
        }
      },

      decreaseItemQuantity: (variantId: string) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (i) => i.variantId === variantId,
        );

        if (!existingItem) return;

        if (existingItem.quantity === 1) {
          set({ items: currentItems.filter((i) => i.variantId !== variantId) });
          toast.success('Item removed from cart.');
        } else {
          const updatedItems = currentItems.map((i) =>
            i.variantId === variantId ? { ...i, quantity: i.quantity - 1 } : i,
          );
          set({ items: updatedItems });
          toast.success('Decreased quantity.');
        }
      },

      removeItem: (variantId: string) => {
        set({
          items: get().items.filter((i) => i.variantId !== variantId),
        });
        toast.success('Item removed from cart.');
      },

      removeAll: () => {
        set({ items: [] });
        toast.success('Cart cleared.');
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCart;

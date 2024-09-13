import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  deleteItem: (id: number) => void;
  //decreaseItemQuantity: (id: number, count: number) => void
}
export const useCart = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        items: [],
        addItem: (item: CartItem) =>
          set((state) => {
            const existingItem = state.items.find((i) => i.id === item.id);
            if (!existingItem) return { items: [...state.items, item] };

            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            };
          }),

        deleteItem: (id) =>
          set((state) => ({
            items: state.items.filter((curItem) => curItem.id !== id),
          })),
      }),
      { name: 'cart-storage' },
    ),
  ),
);

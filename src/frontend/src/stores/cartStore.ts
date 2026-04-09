import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "../types";

interface CartStore {
  items: CartItem[];
  restaurantId: string | null;
  addItem: (item: CartItem) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: () => number;
  cartTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      restaurantId: null,

      addItem: (item: CartItem) => {
        set((state) => {
          // Different restaurant — clear cart first
          if (state.restaurantId && state.restaurantId !== item.restaurantId) {
            return {
              items: [{ ...item, quantity: 1 }],
              restaurantId: item.restaurantId,
            };
          }

          const existing = state.items.find(
            (i) => i.menuItemId === item.menuItemId,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.menuItemId === item.menuItemId
                  ? { ...i, quantity: i.quantity + 1 }
                  : i,
              ),
              restaurantId: item.restaurantId,
            };
          }

          return {
            items: [...state.items, { ...item, quantity: 1 }],
            restaurantId: item.restaurantId,
          };
        });
      },

      removeItem: (menuItemId: string) => {
        set((state) => {
          const items = state.items.filter((i) => i.menuItemId !== menuItemId);
          return {
            items,
            restaurantId: items.length ? state.restaurantId : null,
          };
        });
      },

      updateQuantity: (menuItemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(menuItemId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.menuItemId === menuItemId ? { ...i, quantity } : i,
          ),
        }));
      },

      clearCart: () => set({ items: [], restaurantId: null }),

      cartCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      cartTotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: "foodie-cart",
    },
  ),
);

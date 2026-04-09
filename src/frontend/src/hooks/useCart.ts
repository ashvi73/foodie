import { useCartStore } from "../stores/cartStore";
import type { CartItem } from "../types";

export function useCart() {
  const store = useCartStore();

  return {
    items: store.items,
    restaurantId: store.restaurantId,
    addItem: (item: CartItem) => store.addItem(item),
    removeItem: (menuItemId: string) => store.removeItem(menuItemId),
    updateQuantity: (menuItemId: string, quantity: number) =>
      store.updateQuantity(menuItemId, quantity),
    clearCart: () => store.clearCart(),
    cartCount: store.cartCount(),
    cartTotal: store.cartTotal(),
    isEmpty: store.items.length === 0,
  };
}

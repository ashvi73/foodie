import Map "mo:core/Map";
import CommonTypes "../types/common";
import CartTypes "../types/cart";

module {
  public type UserId = CommonTypes.UserId;
  public type MenuItemId = CommonTypes.MenuItemId;
  public type Cart = CartTypes.Cart;
  public type CartItem = CartTypes.CartItem;
  public type AddToCartInput = CartTypes.AddToCartInput;

  public func getCart(
    carts : Map.Map<UserId, Cart>,
    userId : UserId,
  ) : Cart {
    switch (carts.get(userId)) {
      case (?cart) { cart };
      case null { { userId = userId; items = [] } };
    };
  };

  public func addItem(
    carts : Map.Map<UserId, Cart>,
    userId : UserId,
    input : AddToCartInput,
  ) : () {
    let existing = getCart(carts, userId);
    // If different restaurant, clear first
    let currentItems = if (existing.items.size() > 0) {
      let firstItem = existing.items[0];
      if (firstItem.restaurantId != input.restaurantId) {
        // Clear cart from different restaurant
        []
      } else {
        existing.items
      }
    } else {
      existing.items
    };

    // Check if item already exists
    let existingItem = currentItems.find(func(item : CartItem) : Bool {
      item.menuItemId == input.menuItemId
    });

    let newItems = switch (existingItem) {
      case (?_) {
        // Increase quantity
        currentItems.map(func(item) {
          if (item.menuItemId == input.menuItemId) {
            { item with quantity = item.quantity + input.quantity }
          } else {
            item
          }
        })
      };
      case null {
        // Add new item
        let newItem : CartItem = {
          restaurantId = input.restaurantId;
          menuItemId = input.menuItemId;
          quantity = input.quantity;
          price = input.price;
          name = input.name;
        };
        currentItems.concat([newItem])
      };
    };

    let updatedCart : Cart = { userId = userId; items = newItems };
    carts.add(userId, updatedCart);
  };

  public func updateQuantity(
    carts : Map.Map<UserId, Cart>,
    userId : UserId,
    menuItemId : MenuItemId,
    quantity : Nat,
  ) : () {
    let existing = getCart(carts, userId);
    let newItems = if (quantity == 0) {
      existing.items.filter(func(item : CartItem) : Bool {
        item.menuItemId != menuItemId
      })
    } else {
      existing.items.map(func(item) {
        if (item.menuItemId == menuItemId) {
          { item with quantity = quantity }
        } else {
          item
        }
      })
    };
    let updatedCart : Cart = { userId = userId; items = newItems };
    carts.add(userId, updatedCart);
  };

  public func removeItem(
    carts : Map.Map<UserId, Cart>,
    userId : UserId,
    menuItemId : MenuItemId,
  ) : () {
    let existing = getCart(carts, userId);
    let newItems = existing.items.filter(func(item : CartItem) : Bool {
      item.menuItemId != menuItemId
    });
    let updatedCart : Cart = { userId = userId; items = newItems };
    carts.add(userId, updatedCart);
  };

  public func clearCart(
    carts : Map.Map<UserId, Cart>,
    userId : UserId,
  ) : () {
    let emptyCart : Cart = { userId = userId; items = [] };
    carts.add(userId, emptyCart);
  };
};

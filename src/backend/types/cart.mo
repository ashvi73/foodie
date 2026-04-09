import Common "common";

module {
  public type CartItem = {
    restaurantId : Common.RestaurantId;
    menuItemId : Common.MenuItemId;
    quantity : Nat;
    price : Nat;
    name : Text;
  };

  public type Cart = {
    userId : Common.UserId;
    items : [CartItem];
  };

  public type AddToCartInput = {
    restaurantId : Common.RestaurantId;
    menuItemId : Common.MenuItemId;
    quantity : Nat;
    price : Nat;
    name : Text;
  };
};

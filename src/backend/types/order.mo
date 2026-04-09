import Common "common";

module {
  public type OrderItem = {
    menuItemId : Common.MenuItemId;
    name : Text;
    quantity : Nat;
    price : Nat;
  };

  public type Order = {
    id : Common.OrderId;
    userId : Common.UserId;
    restaurantId : Common.RestaurantId;
    restaurantName : Text;
    items : [OrderItem];
    deliveryAddress : Text;
    specialInstructions : Text;
    subtotal : Nat;
    deliveryFee : Nat;
    tax : Nat;
    total : Nat;
    status : Common.OrderStatus;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type PlaceOrderInput = {
    restaurantId : Common.RestaurantId;
    restaurantName : Text;
    items : [OrderItem];
    deliveryAddress : Text;
    specialInstructions : Text;
    subtotal : Nat;
    deliveryFee : Nat;
    tax : Nat;
    total : Nat;
  };
};

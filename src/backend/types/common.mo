import Time "mo:core/Time";

module {
  public type UserId = Principal;
  public type RestaurantId = Nat;
  public type MenuItemId = Nat;
  public type OrderId = Nat;
  public type ReviewId = Nat;
  public type Timestamp = Time.Time;

  public type OrderStatus = {
    #Placed;
    #Confirmed;
    #Preparing;
    #OutForDelivery;
    #Delivered;
    #Cancelled;
  };
};

import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type Restaurant = {
    id : Common.RestaurantId;
    name : Text;
    category : Text;
    description : Text;
    address : Text;
    phone : Text;
    imageBlob : ?Storage.ExternalBlob;
    rating : Float;
    reviewCount : Nat;
    deliveryFee : Nat;
    deliveryTimeMinutes : Nat;
    isActive : Bool;
    createdAt : Common.Timestamp;
  };

  public type RestaurantInput = {
    name : Text;
    category : Text;
    description : Text;
    address : Text;
    phone : Text;
    imageBlob : ?Storage.ExternalBlob;
    deliveryFee : Nat;
    deliveryTimeMinutes : Nat;
  };

  public type RestaurantFilter = {
    category : ?Text;
    minRating : ?Float;
    searchTerm : ?Text;
  };

  public type MenuItem = {
    id : Common.MenuItemId;
    restaurantId : Common.RestaurantId;
    name : Text;
    description : Text;
    price : Nat;
    imageBlob : ?Storage.ExternalBlob;
    category : Text;
    isAvailable : Bool;
  };

  public type MenuItemInput = {
    restaurantId : Common.RestaurantId;
    name : Text;
    description : Text;
    price : Nat;
    imageBlob : ?Storage.ExternalBlob;
    category : Text;
  };
};

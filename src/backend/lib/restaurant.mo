import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import CommonTypes "../types/common";
import RestaurantTypes "../types/restaurant";

module {
  public type RestaurantId = CommonTypes.RestaurantId;
  public type MenuItemId = CommonTypes.MenuItemId;
  public type Restaurant = RestaurantTypes.Restaurant;
  public type RestaurantInput = RestaurantTypes.RestaurantInput;
  public type RestaurantFilter = RestaurantTypes.RestaurantFilter;
  public type MenuItem = RestaurantTypes.MenuItem;
  public type MenuItemInput = RestaurantTypes.MenuItemInput;

  public func listRestaurants(
    restaurants : Map.Map<RestaurantId, Restaurant>,
  ) : [Restaurant] {
    restaurants.values().toArray();
  };

  public func getRestaurant(
    restaurants : Map.Map<RestaurantId, Restaurant>,
    id : RestaurantId,
  ) : ?Restaurant {
    restaurants.get(id);
  };

  public func searchRestaurants(
    restaurants : Map.Map<RestaurantId, Restaurant>,
    filter : RestaurantFilter,
  ) : [Restaurant] {
    restaurants.values().filter(func(r : Restaurant) : Bool {
      let matchesCategory = switch (filter.category) {
        case null { true };
        case (?cat) { r.category == cat };
      };
      let matchesRating = switch (filter.minRating) {
        case null { true };
        case (?minR) { r.rating >= minR };
      };
      let matchesSearch = switch (filter.searchTerm) {
        case null { true };
        case (?term) {
          let lowerTerm = term.toLower();
          r.name.toLower().contains(#text lowerTerm) or r.category.toLower().contains(#text lowerTerm);
        };
      };
      r.isActive and matchesCategory and matchesRating and matchesSearch;
    }).toArray();
  };

  public func addRestaurant(
    restaurants : Map.Map<RestaurantId, Restaurant>,
    nextId : Nat,
    input : RestaurantInput,
  ) : RestaurantId {
    let restaurant : Restaurant = {
      id = nextId;
      name = input.name;
      category = input.category;
      description = input.description;
      address = input.address;
      phone = input.phone;
      imageBlob = input.imageBlob;
      rating = 0.0;
      reviewCount = 0;
      deliveryFee = input.deliveryFee;
      deliveryTimeMinutes = input.deliveryTimeMinutes;
      isActive = true;
      createdAt = Time.now();
    };
    restaurants.add(nextId, restaurant);
    nextId;
  };

  public func updateRestaurant(
    restaurants : Map.Map<RestaurantId, Restaurant>,
    id : RestaurantId,
    input : RestaurantInput,
  ) : () {
    switch (restaurants.get(id)) {
      case null { Runtime.trap("Restaurant not found") };
      case (?existing) {
        let updated : Restaurant = {
          existing with
          name = input.name;
          category = input.category;
          description = input.description;
          address = input.address;
          phone = input.phone;
          imageBlob = input.imageBlob;
          deliveryFee = input.deliveryFee;
          deliveryTimeMinutes = input.deliveryTimeMinutes;
        };
        restaurants.add(id, updated);
      };
    };
  };

  public func updateRestaurantRating(
    restaurants : Map.Map<RestaurantId, Restaurant>,
    id : RestaurantId,
    newRating : Float,
    newCount : Nat,
  ) : () {
    switch (restaurants.get(id)) {
      case null {};
      case (?existing) {
        let updated : Restaurant = {
          existing with
          rating = newRating;
          reviewCount = newCount;
        };
        restaurants.add(id, updated);
      };
    };
  };

  public func toggleRestaurantStatus(
    restaurants : Map.Map<RestaurantId, Restaurant>,
    id : RestaurantId,
  ) : () {
    switch (restaurants.get(id)) {
      case null { Runtime.trap("Restaurant not found") };
      case (?existing) {
        let updated : Restaurant = {
          existing with
          isActive = not existing.isActive;
        };
        restaurants.add(id, updated);
      };
    };
  };

  public func deleteRestaurant(
    restaurants : Map.Map<RestaurantId, Restaurant>,
    id : RestaurantId,
  ) : () {
    restaurants.remove(id);
  };

  public func listMenuItems(
    menuItems : Map.Map<MenuItemId, MenuItem>,
    restaurantId : RestaurantId,
  ) : [MenuItem] {
    menuItems.values().filter(func(item : MenuItem) : Bool {
      item.restaurantId == restaurantId;
    }).toArray();
  };

  public func getMenuItem(
    menuItems : Map.Map<MenuItemId, MenuItem>,
    id : MenuItemId,
  ) : ?MenuItem {
    menuItems.get(id);
  };

  public func addMenuItem(
    menuItems : Map.Map<MenuItemId, MenuItem>,
    nextId : Nat,
    input : MenuItemInput,
  ) : MenuItemId {
    let item : MenuItem = {
      id = nextId;
      restaurantId = input.restaurantId;
      name = input.name;
      description = input.description;
      price = input.price;
      imageBlob = input.imageBlob;
      category = input.category;
      isAvailable = true;
    };
    menuItems.add(nextId, item);
    nextId;
  };

  public func updateMenuItem(
    menuItems : Map.Map<MenuItemId, MenuItem>,
    id : MenuItemId,
    input : MenuItemInput,
  ) : () {
    switch (menuItems.get(id)) {
      case null { Runtime.trap("Menu item not found") };
      case (?existing) {
        let updated : MenuItem = {
          existing with
          name = input.name;
          description = input.description;
          price = input.price;
          imageBlob = input.imageBlob;
          category = input.category;
        };
        menuItems.add(id, updated);
      };
    };
  };

  public func deleteMenuItem(
    menuItems : Map.Map<MenuItemId, MenuItem>,
    id : MenuItemId,
  ) : () {
    menuItems.remove(id);
  };
};

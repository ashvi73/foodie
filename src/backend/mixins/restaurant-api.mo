import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import RestaurantTypes "../types/restaurant";
import RestaurantLib "../lib/restaurant";

mixin (
  accessControlState : AccessControl.AccessControlState,
  restaurants : Map.Map<CommonTypes.RestaurantId, RestaurantTypes.Restaurant>,
  menuItems : Map.Map<CommonTypes.MenuItemId, RestaurantTypes.MenuItem>,
  nextRestaurantId : { var value : Nat },
  nextMenuItemId : { var value : Nat },
) {
  public query func listRestaurants() : async [RestaurantTypes.Restaurant] {
    RestaurantLib.listRestaurants(restaurants);
  };

  public query func getRestaurant(id : CommonTypes.RestaurantId) : async ?RestaurantTypes.Restaurant {
    RestaurantLib.getRestaurant(restaurants, id);
  };

  public query func searchRestaurants(filter : RestaurantTypes.RestaurantFilter) : async [RestaurantTypes.Restaurant] {
    RestaurantLib.searchRestaurants(restaurants, filter);
  };

  public shared ({ caller }) func addRestaurant(input : RestaurantTypes.RestaurantInput) : async CommonTypes.RestaurantId {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add restaurants");
    };
    let id = nextRestaurantId.value;
    nextRestaurantId.value += 1;
    RestaurantLib.addRestaurant(restaurants, id, input);
  };

  public shared ({ caller }) func updateRestaurant(id : CommonTypes.RestaurantId, input : RestaurantTypes.RestaurantInput) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update restaurants");
    };
    RestaurantLib.updateRestaurant(restaurants, id, input);
  };

  public shared ({ caller }) func toggleRestaurantStatus(id : CommonTypes.RestaurantId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can toggle restaurant status");
    };
    RestaurantLib.toggleRestaurantStatus(restaurants, id);
  };

  public shared ({ caller }) func deleteRestaurant(id : CommonTypes.RestaurantId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete restaurants");
    };
    RestaurantLib.deleteRestaurant(restaurants, id);
  };

  public query func listMenuItems(restaurantId : CommonTypes.RestaurantId) : async [RestaurantTypes.MenuItem] {
    RestaurantLib.listMenuItems(menuItems, restaurantId);
  };

  public query func getMenuItem(id : CommonTypes.MenuItemId) : async ?RestaurantTypes.MenuItem {
    RestaurantLib.getMenuItem(menuItems, id);
  };

  public shared ({ caller }) func addMenuItem(input : RestaurantTypes.MenuItemInput) : async CommonTypes.MenuItemId {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add menu items");
    };
    let id = nextMenuItemId.value;
    nextMenuItemId.value += 1;
    RestaurantLib.addMenuItem(menuItems, id, input);
  };

  public shared ({ caller }) func updateMenuItem(id : CommonTypes.MenuItemId, input : RestaurantTypes.MenuItemInput) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update menu items");
    };
    RestaurantLib.updateMenuItem(menuItems, id, input);
  };

  public shared ({ caller }) func deleteMenuItem(id : CommonTypes.MenuItemId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete menu items");
    };
    RestaurantLib.deleteMenuItem(menuItems, id);
  };
};

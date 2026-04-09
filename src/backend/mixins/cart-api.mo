import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import CartTypes "../types/cart";
import CartLib "../lib/cart";

mixin (
  accessControlState : AccessControl.AccessControlState,
  carts : Map.Map<CommonTypes.UserId, CartTypes.Cart>,
) {
  public query ({ caller }) func getCart() : async CartTypes.Cart {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.getCart(carts, caller);
  };

  public shared ({ caller }) func addToCart(input : CartTypes.AddToCartInput) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.addItem(carts, caller, input);
  };

  public shared ({ caller }) func updateCartItem(menuItemId : CommonTypes.MenuItemId, quantity : Nat) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.updateQuantity(carts, caller, menuItemId, quantity);
  };

  public shared ({ caller }) func removeFromCart(menuItemId : CommonTypes.MenuItemId) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.removeItem(carts, caller, menuItemId);
  };

  public shared ({ caller }) func clearCart() : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.clearCart(carts, caller);
  };
};

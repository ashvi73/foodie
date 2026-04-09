import List "mo:core/List";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import OrderTypes "../types/order";
import OrderLib "../lib/order";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : List.List<OrderTypes.Order>,
  nextOrderId : { var value : Nat },
  orderedRestaurants : Map.Map<CommonTypes.UserId, Set.Set<CommonTypes.RestaurantId>>,
) {
  public shared ({ caller }) func placeOrder(input : OrderTypes.PlaceOrderInput) : async CommonTypes.OrderId {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    let id = nextOrderId.value;
    nextOrderId.value += 1;
    OrderLib.placeOrder(orders, id, caller, input, orderedRestaurants);
  };

  public query ({ caller }) func listUserOrders() : async [OrderTypes.Order] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    OrderLib.getUserOrders(orders, caller);
  };

  public query ({ caller }) func listAllOrders() : async [OrderTypes.Order] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    OrderLib.getAllOrders(orders);
  };

  public query ({ caller }) func getOrder(orderId : CommonTypes.OrderId) : async ?OrderTypes.Order {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    let order = OrderLib.getOrder(orders, orderId);
    switch (order) {
      case null { null };
      case (?o) {
        // Users can only see their own orders; admins can see all
        if (not Principal.equal(o.userId, caller) and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Cannot view another user's order");
        };
        ?o;
      };
    };
  };

  public shared ({ caller }) func updateOrderStatus(orderId : CommonTypes.OrderId, status : CommonTypes.OrderStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    OrderLib.updateOrderStatus(orders, orderId, status);
  };
};

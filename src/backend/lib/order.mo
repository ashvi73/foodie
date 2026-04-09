import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import CommonTypes "../types/common";
import OrderTypes "../types/order";

module {
  public type UserId = CommonTypes.UserId;
  public type OrderId = CommonTypes.OrderId;
  public type RestaurantId = CommonTypes.RestaurantId;
  public type OrderStatus = CommonTypes.OrderStatus;
  public type Order = OrderTypes.Order;
  public type PlaceOrderInput = OrderTypes.PlaceOrderInput;

  public func placeOrder(
    orders : List.List<Order>,
    nextId : Nat,
    userId : UserId,
    input : PlaceOrderInput,
    orderedRestaurants : Map.Map<UserId, Set.Set<RestaurantId>>,
  ) : OrderId {
    let now = Time.now();
    let order : Order = {
      id = nextId;
      userId = userId;
      restaurantId = input.restaurantId;
      restaurantName = input.restaurantName;
      items = input.items;
      deliveryAddress = input.deliveryAddress;
      specialInstructions = input.specialInstructions;
      subtotal = input.subtotal;
      deliveryFee = input.deliveryFee;
      tax = input.tax;
      total = input.total;
      status = #Placed;
      createdAt = now;
      updatedAt = now;
    };
    orders.add(order);

    // Track this user ordered from this restaurant
    let userRestaurants = switch (orderedRestaurants.get(userId)) {
      case (?s) { s };
      case null { Set.empty<RestaurantId>() };
    };
    userRestaurants.add(input.restaurantId);
    orderedRestaurants.add(userId, userRestaurants);

    nextId;
  };

  public func getUserOrders(
    orders : List.List<Order>,
    userId : UserId,
  ) : [Order] {
    orders.filter(func(o : Order) : Bool {
      Principal.equal(o.userId, userId)
    }).toArray();
  };

  public func getAllOrders(
    orders : List.List<Order>,
  ) : [Order] {
    orders.toArray();
  };

  public func getOrder(
    orders : List.List<Order>,
    orderId : OrderId,
  ) : ?Order {
    orders.find(func(o : Order) : Bool { o.id == orderId });
  };

  public func updateOrderStatus(
    orders : List.List<Order>,
    orderId : OrderId,
    status : OrderStatus,
  ) : () {
    orders.mapInPlace(func(o : Order) : Order {
      if (o.id == orderId) {
        { o with status = status; updatedAt = Time.now() }
      } else {
        o
      }
    });
  };

  public func getRestaurantOrders(
    orders : List.List<Order>,
    restaurantId : RestaurantId,
  ) : [Order] {
    orders.filter(func(o : Order) : Bool {
      o.restaurantId == restaurantId
    }).toArray();
  };
};

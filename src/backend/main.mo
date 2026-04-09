import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Stripe "mo:caffeineai-stripe/stripe";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import CommonTypes "types/common";
import UserTypes "types/user";
import RestaurantTypes "types/restaurant";
import CartTypes "types/cart";
import OrderTypes "types/order";
import ReviewTypes "types/review";
import UserApi "mixins/user-api";
import RestaurantApi "mixins/restaurant-api";
import CartApi "mixins/cart-api";
import OrderApi "mixins/order-api";
import ReviewApi "mixins/review-api";
import RestaurantLib "lib/restaurant";
import Runtime "mo:core/Runtime";

actor {
  // Authorization state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Alias for assignCallerUserRole — frontend calls this as assignRole
  public shared ({ caller }) func assignRole(user : Principal, role : AccessControl.UserRole) : async () {
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  // Object storage
  include MixinObjectStorage();

  // User profiles
  let userProfiles = Map.empty<CommonTypes.UserId, UserTypes.UserProfile>();
  include UserApi(accessControlState, userProfiles);

  // Restaurant & menu data
  let restaurants = Map.empty<CommonTypes.RestaurantId, RestaurantTypes.Restaurant>();
  let menuItems = Map.empty<CommonTypes.MenuItemId, RestaurantTypes.MenuItem>();
  let nextRestaurantId = { var value : Nat = 1 };
  let nextMenuItemId = { var value : Nat = 1 };
  include RestaurantApi(accessControlState, restaurants, menuItems, nextRestaurantId, nextMenuItemId);

  // Carts
  let carts = Map.empty<CommonTypes.UserId, CartTypes.Cart>();
  include CartApi(accessControlState, carts);

  // Orders & tracking of which restaurants each user has ordered from
  let orders = List.empty<OrderTypes.Order>();
  let nextOrderId = { var value : Nat = 1 };
  let orderedRestaurants = Map.empty<CommonTypes.UserId, Set.Set<CommonTypes.RestaurantId>>();
  include OrderApi(accessControlState, orders, nextOrderId, orderedRestaurants);

  // Reviews
  let reviews = List.empty<ReviewTypes.Review>();
  let nextReviewId = { var value : Nat = 1 };
  include ReviewApi(accessControlState, reviews, nextReviewId, orderedRestaurants);

  // Stripe
  var stripeConfiguration : ?Stripe.StripeConfiguration = null;

  public query func isStripeConfigured() : async Bool {
    stripeConfiguration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfiguration := ?config;
  };

  func getStripeConfig() : Stripe.StripeConfiguration {
    switch (stripeConfiguration) {
      case (null) { Runtime.trap("Stripe is not configured") };
      case (?cfg) { cfg };
    };
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    await Stripe.createCheckoutSession(getStripeConfig(), caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfig(), sessionId, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // Seed flag — ensures seed data is only inserted once
  var seeded : Bool = false;

  // seedData: Insert sample restaurants and menu items on first call
  public shared func seedData() : async () {
    if (seeded) { return };
    seeded := true;

    // --- Restaurant 1: Pizza Palace ---
    let r1Id = nextRestaurantId.value;
    nextRestaurantId.value += 1;
    let _r1 = RestaurantLib.addRestaurant(restaurants, r1Id, {
      name = "Pizza Palace";
      category = "Pizza";
      description = "Authentic Italian pizzas baked in a wood-fired oven with the finest ingredients.";
      address = "123 Main Street, Downtown";
      phone = "+1-555-0101";
      imageBlob = null;
      deliveryFee = 49;
      deliveryTimeMinutes = 30;
    });
    // Menu items for Pizza Palace
    let m1 = nextMenuItemId.value;
    nextMenuItemId.value += 1;
    let _m1 = RestaurantLib.addMenuItem(menuItems, m1, {
      restaurantId = r1Id;
      name = "Margherita Pizza";
      description = "Classic tomato sauce, fresh mozzarella and basil";
      price = 1299;
      imageBlob = null;
      category = "Pizza";
    });
    let m2 = nextMenuItemId.value;
    nextMenuItemId.value += 1;
    let _m2 = RestaurantLib.addMenuItem(menuItems, m2, {
      restaurantId = r1Id;
      name = "Pepperoni Pizza";
      description = "Loaded with premium pepperoni and mozzarella cheese";
      price = 1499;
      imageBlob = null;
      category = "Pizza";
    });
    let m3 = nextMenuItemId.value;
    nextMenuItemId.value += 1;
    let _m3 = RestaurantLib.addMenuItem(menuItems, m3, {
      restaurantId = r1Id;
      name = "Garlic Breadsticks";
      description = "Crispy breadsticks with garlic butter and herbs";
      price = 599;
      imageBlob = null;
      category = "Sides";
    });
    let m4 = nextMenuItemId.value;
    nextMenuItemId.value += 1;
    let _m4 = RestaurantLib.addMenuItem(menuItems, m4, {
      restaurantId = r1Id;
      name = "BBQ Chicken Pizza";
      description = "Smoky BBQ sauce, grilled chicken, red onion and cilantro";
      price = 1599;
      imageBlob = null;
      category = "Pizza";
    });

    // --- Restaurant 2: Burger Barn ---
    let r2Id = nextRestaurantId.value;
    nextRestaurantId.value += 1;
    let _r2 = RestaurantLib.addRestaurant(restaurants, r2Id, {
      name = "Burger Barn";
      category = "Burger";
      description = "Juicy handcrafted burgers with fresh ingredients and secret sauces.";
      address = "456 Oak Avenue, Midtown";
      phone = "+1-555-0202";
      imageBlob = null;
      deliveryFee = 39;
      deliveryTimeMinutes = 25;
    });
    let m5 = nextMenuItemId.value;
    nextMenuItemId.value += 1;
    let _m5 = RestaurantLib.addMenuItem(menuItems, m5, {
      restaurantId = r2Id;
      name = "Classic Cheeseburger";
      description = "Beef patty, cheddar cheese, lettuce, tomato, pickles and special sauce";
      price = 999;
      imageBlob = null;
      category = "Burger";
    });
    let m6 = nextMenuItemId.value;
    nextMenuItemId.value += 1;
    let _m6 = RestaurantLib.addMenuItem(menuItems, m6, {
      restaurantId = r2Id;
      name = "Double Smash Burger";
      description = "Two smashed patties, American cheese, caramelized onions";
      price = 1399;
      imageBlob = null;
      category = "Burger";
    });
    let m7 = nextMenuItemId.value;
    nextMenuItemId.value += 1;
    let _m7 = RestaurantLib.addMenuItem(menuItems, m7, {
      restaurantId = r2Id;
      name = "Crispy Chicken Burger";
      description = "Fried chicken breast, coleslaw, pickles and honey mustard";
      price = 1099;
      imageBlob = null;
      category = "Burger";
    });
    let m8 = nextMenuItemId.value;
    nextMenuItemId.value += 1;
    let _m8 = RestaurantLib.addMenuItem(menuItems, m8, {
      restaurantId = r2Id;
      name = "Loaded Fries";
      description = "Crispy fries topped with cheese sauce, bacon and jalapeños";
      price = 699;
      imageBlob = null;
      category = "Sides";
    });

    // --- Restaurant 3: Spice Garden (Indian) ---
    let r3Id = nextRestaurantId.value;
    nextRestaurantId.value += 1;
    let _r3 = RestaurantLib.addRestaurant(restaurants, r3Id, {
      name = "Spice Garden";
      category = "Indian";
      description = "Authentic North Indian cuisine with rich curries, tandoor specials and aromatic biryanis.";
      address = "789 Curry Lane, Eastside";
      phone = "+1-555-0303";
      imageBlob = null;
      deliveryFee = 59;
      deliveryTimeMinutes = 40;
    });
    let m9 = nextMenuItemId.value;
    nextMenuItemId.value += 1;
    let _m9 = RestaurantLib.addMenuItem(menuItems, m9, {
      restaurantId = r3Id;
      name = "Butter Chicken";
      description = "Tender chicken in a rich creamy tomato-butter sauce";
      price = 1599;
      imageBlob = null;
      category = "Curry";
    });
    let m10 = nextMenuItemId.value;
    nextMenuItemId.value += 1;
    let _m10 = RestaurantLib.addMenuItem(menuItems, m10, {
      restaurantId = r3Id;
      name = "Paneer Tikka Masala";
      description = "Grilled cottage cheese in spiced tomato-onion gravy";
      price = 1399;
      imageBlob = null;
      category = "Curry";
    });
    let m11 = nextMenuItemId.value;
    nextMenuItemId.value += 1;
    let _m11 = RestaurantLib.addMenuItem(menuItems, m11, {
      restaurantId = r3Id;
      name = "Chicken Biryani";
      description = "Fragrant basmati rice slow-cooked with spiced chicken and saffron";
      price = 1799;
      imageBlob = null;
      category = "Rice";
    });
    let m12 = nextMenuItemId.value;
    nextMenuItemId.value += 1;
    let _m12 = RestaurantLib.addMenuItem(menuItems, m12, {
      restaurantId = r3Id;
      name = "Garlic Naan";
      description = "Fluffy tandoor-baked flatbread with garlic and butter";
      price = 449;
      imageBlob = null;
      category = "Bread";
    });

    // --- Restaurant 4: Golden Dragon (Chinese) ---
    let r4Id = nextRestaurantId.value;
    nextRestaurantId.value += 1;
    let _r4 = RestaurantLib.addRestaurant(restaurants, r4Id, {
      name = "Golden Dragon";
      category = "Chinese";
      description = "Traditional Chinese recipes with a modern twist. Dim sum, noodles and wok-fired favorites.";
      address = "321 Lotus Street, Chinatown";
      phone = "+1-555-0404";
      imageBlob = null;
      deliveryFee = 49;
      deliveryTimeMinutes = 35;
    });
    let m13 = nextMenuItemId.value;
    nextMenuItemId.value += 1;
    let _m13 = RestaurantLib.addMenuItem(menuItems, m13, {
      restaurantId = r4Id;
      name = "Kung Pao Chicken";
      description = "Spicy stir-fried chicken with peanuts, vegetables and dried chilies";
      price = 1299;
      imageBlob = null;
      category = "Wok";
    });
    let m14 = nextMenuItemId.value;
    nextMenuItemId.value += 1;
    let _m14 = RestaurantLib.addMenuItem(menuItems, m14, {
      restaurantId = r4Id;
      name = "Beef Fried Rice";
      description = "Wok-fried rice with tender beef strips, egg and scallions";
      price = 1199;
      imageBlob = null;
      category = "Rice";
    });
    let m15 = nextMenuItemId.value;
    nextMenuItemId.value += 1;
    let _m15 = RestaurantLib.addMenuItem(menuItems, m15, {
      restaurantId = r4Id;
      name = "Dim Sum Platter";
      description = "Assorted steamed dumplings — shrimp har gow, pork siu mai and vegetable dumplings";
      price = 1599;
      imageBlob = null;
      category = "Dim Sum";
    });
    let m16 = nextMenuItemId.value;
    nextMenuItemId.value += 1;
    let _m16 = RestaurantLib.addMenuItem(menuItems, m16, {
      restaurantId = r4Id;
      name = "Hot and Sour Soup";
      description = "Classic spicy-tangy soup with tofu, mushrooms and bamboo shoots";
      price = 799;
      imageBlob = null;
      category = "Soup";
    });

    // --- Restaurant 5: Sweet Dreams (Dessert) ---
    let r5Id = nextRestaurantId.value;
    nextRestaurantId.value += 1;
    let _r5 = RestaurantLib.addRestaurant(restaurants, r5Id, {
      name = "Sweet Dreams";
      category = "Dessert";
      description = "Indulgent desserts, artisan ice creams and freshly baked pastries for every sweet tooth.";
      address = "555 Sugar Road, Westfield";
      phone = "+1-555-0505";
      imageBlob = null;
      deliveryFee = 29;
      deliveryTimeMinutes = 20;
    });
    let m17 = nextMenuItemId.value;
    nextMenuItemId.value += 1;
    let _m17 = RestaurantLib.addMenuItem(menuItems, m17, {
      restaurantId = r5Id;
      name = "Chocolate Lava Cake";
      description = "Warm chocolate cake with a gooey molten center, served with vanilla ice cream";
      price = 899;
      imageBlob = null;
      category = "Cake";
    });
    let m18 = nextMenuItemId.value;
    nextMenuItemId.value += 1;
    let _m18 = RestaurantLib.addMenuItem(menuItems, m18, {
      restaurantId = r5Id;
      name = "Mango Kulfi";
      description = "Traditional Indian frozen dessert with real mango pulp and pistachios";
      price = 599;
      imageBlob = null;
      category = "Ice Cream";
    });
    let m19 = nextMenuItemId.value;
    nextMenuItemId.value += 1;
    let _m19 = RestaurantLib.addMenuItem(menuItems, m19, {
      restaurantId = r5Id;
      name = "Tiramisu";
      description = "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone cream";
      price = 799;
      imageBlob = null;
      category = "Cake";
    });
    let m20 = nextMenuItemId.value;
    nextMenuItemId.value += 1;
    let _m20 = RestaurantLib.addMenuItem(menuItems, m20, {
      restaurantId = r5Id;
      name = "Waffle with Berries";
      description = "Crispy Belgian waffle topped with mixed berries and whipped cream";
      price = 749;
      imageBlob = null;
      category = "Waffle";
    });
    let m21 = nextMenuItemId.value;
    nextMenuItemId.value += 1;
    let _m21 = RestaurantLib.addMenuItem(menuItems, m21, {
      restaurantId = r5Id;
      name = "Cheesecake Slice";
      description = "New York-style baked cheesecake with strawberry compote";
      price = 699;
      imageBlob = null;
      category = "Cake";
    });
  };
};

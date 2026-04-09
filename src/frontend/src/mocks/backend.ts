import type { backendInterface, Address, AddReviewInput, AddToCartInput, Cart, MenuItem, MenuItemId, MenuItemInput, Order, OrderId, OrderStatus, OrderItem, PlaceOrderInput, Restaurant, RestaurantFilter, RestaurantId, RestaurantInput, RestaurantRatingSummary, Review, ReviewId, ShoppingItem, StripeConfiguration, StripeSessionStatus, TransformationInput, TransformationOutput, UserProfile, UserProfileInput, UserRole } from "../backend.d";
import type { Principal } from "@icp-sdk/core/principal";

const samplePrincipal = { toText: () => "aaaaa-aa" } as Principal;

const sampleRestaurants: Restaurant[] = [
  {
    id: BigInt(1),
    name: "Pizza Palace",
    category: "Pizza",
    description: "Authentic Italian pizzas baked in a wood-fired oven with the finest ingredients.",
    address: "123 Main Street, Downtown",
    phone: "+1-555-0101",
    deliveryFee: BigInt(49),
    deliveryTimeMinutes: BigInt(30),
    rating: 4.5,
    reviewCount: BigInt(128),
    isActive: true,
    createdAt: BigInt(0),
  },
  {
    id: BigInt(2),
    name: "Burger Barn",
    category: "Burger",
    description: "Juicy handcrafted burgers with fresh ingredients and secret sauces.",
    address: "456 Oak Avenue, Midtown",
    phone: "+1-555-0202",
    deliveryFee: BigInt(39),
    deliveryTimeMinutes: BigInt(25),
    rating: 4.3,
    reviewCount: BigInt(96),
    isActive: true,
    createdAt: BigInt(0),
  },
  {
    id: BigInt(3),
    name: "Spice Garden",
    category: "Indian",
    description: "Authentic North Indian cuisine with rich curries, tandoor specials and aromatic biryanis.",
    address: "789 Curry Lane, Eastside",
    phone: "+1-555-0303",
    deliveryFee: BigInt(59),
    deliveryTimeMinutes: BigInt(40),
    rating: 4.7,
    reviewCount: BigInt(215),
    isActive: true,
    createdAt: BigInt(0),
  },
  {
    id: BigInt(4),
    name: "Golden Dragon",
    category: "Chinese",
    description: "Traditional Chinese recipes with a modern twist. Dim sum, noodles and wok-fired favorites.",
    address: "321 Lotus Street, Chinatown",
    phone: "+1-555-0404",
    deliveryFee: BigInt(49),
    deliveryTimeMinutes: BigInt(35),
    rating: 4.2,
    reviewCount: BigInt(74),
    isActive: true,
    createdAt: BigInt(0),
  },
  {
    id: BigInt(5),
    name: "Sweet Dreams",
    category: "Dessert",
    description: "Indulgent desserts, artisan ice creams and freshly baked pastries for every sweet tooth.",
    address: "555 Sugar Road, Westfield",
    phone: "+1-555-0505",
    deliveryFee: BigInt(29),
    deliveryTimeMinutes: BigInt(20),
    rating: 4.8,
    reviewCount: BigInt(183),
    isActive: true,
    createdAt: BigInt(0),
  },
];

const sampleMenuItems: MenuItem[] = [
  {
    id: BigInt(1),
    restaurantId: BigInt(1),
    name: "Margherita Pizza",
    description: "Classic tomato sauce, fresh mozzarella and basil",
    price: BigInt(1299),
    category: "Pizza",
    isAvailable: true,
  },
  {
    id: BigInt(2),
    restaurantId: BigInt(1),
    name: "Pepperoni Pizza",
    description: "Loaded with premium pepperoni and mozzarella cheese",
    price: BigInt(1499),
    category: "Pizza",
    isAvailable: true,
  },
  {
    id: BigInt(3),
    restaurantId: BigInt(1),
    name: "Garlic Breadsticks",
    description: "Crispy breadsticks with garlic butter and herbs",
    price: BigInt(599),
    category: "Sides",
    isAvailable: true,
  },
  {
    id: BigInt(4),
    restaurantId: BigInt(2),
    name: "Classic Cheeseburger",
    description: "Beef patty, cheddar cheese, lettuce, tomato, pickles and special sauce",
    price: BigInt(999),
    category: "Burger",
    isAvailable: true,
  },
  {
    id: BigInt(5),
    restaurantId: BigInt(2),
    name: "Double Smash Burger",
    description: "Two smashed patties, American cheese, caramelized onions",
    price: BigInt(1399),
    category: "Burger",
    isAvailable: true,
  },
];

export const mockBackend: backendInterface = {
  addDeliveryAddress: async (_address: Address) => {},
  addMenuItem: async (_input: MenuItemInput) => BigInt(99),
  addRestaurant: async (_input: RestaurantInput) => BigInt(99),
  addReview: async (_input: AddReviewInput) => BigInt(1),
  addToCart: async (_input: AddToCartInput) => {},
  assignCallerUserRole: async (_user: Principal, _role: UserRole) => {},
  assignRole: async (_user: Principal, _role: UserRole) => {},
  clearCart: async () => {},
  createCheckoutSession: async (_items: Array<ShoppingItem>, _successUrl: string, _cancelUrl: string) => "https://checkout.stripe.com/test",
  deleteMenuItem: async (_id: MenuItemId) => {},
  deleteRestaurant: async (_id: RestaurantId) => {},
  getCallerUserProfile: async () => ({
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "+1-555-9999",
    isAdmin: false,
    createdAt: BigInt(0),
    savedAddresses: [
      { tag: "Home", street: "10 Elm Street", city: "Springfield", postalCode: "12345", state: "IL" }
    ],
  }),
  getCallerUserRole: async () => "user" as unknown as UserRole,
  getCart: async () => ({
    userId: samplePrincipal,
    items: [
      { menuItemId: BigInt(1), restaurantId: BigInt(1), name: "Margherita Pizza", price: BigInt(1299), quantity: BigInt(2) },
    ],
  }),
  getMenuItem: async (id: MenuItemId) => sampleMenuItems.find(m => m.id === id) ?? null,
  getOrder: async (_orderId: OrderId) => null,
  getRestaurant: async (id: RestaurantId) => sampleRestaurants.find(r => r.id === id) ?? null,
  getRestaurantRatingSummary: async (restaurantId: RestaurantId) => ({
    restaurantId,
    averageRating: 4.5,
    reviewCount: BigInt(128),
  }),
  getRestaurantReviews: async (_restaurantId: RestaurantId) => [
    {
      id: BigInt(1),
      restaurantId: _restaurantId,
      userId: samplePrincipal,
      userName: "Maria K.",
      comment: "Amazing food! The pizza was perfectly crispy.",
      rating: BigInt(5),
      createdAt: BigInt(Date.now()),
    },
    {
      id: BigInt(2),
      restaurantId: _restaurantId,
      userId: samplePrincipal,
      userName: "James T.",
      comment: "Great value, fast delivery. Will order again!",
      rating: BigInt(4),
      createdAt: BigInt(Date.now()),
    },
  ],
  getStripeSessionStatus: async (_sessionId: string): Promise<StripeSessionStatus> => ({
    __kind__: "failed",
    failed: { error: "No session" },
  }),
  getUserProfile: async (_userId: Principal) => null,
  isCallerAdmin: async () => false,
  isStripeConfigured: async () => false,
  listAllOrders: async () => [],
  listMenuItems: async (restaurantId: RestaurantId) => sampleMenuItems.filter(m => m.restaurantId === restaurantId),
  listRestaurants: async () => sampleRestaurants,
  listUserOrders: async () => [],
  placeOrder: async (_input: PlaceOrderInput) => BigInt(1),
  removeDeliveryAddress: async (_index: bigint) => {},
  removeFromCart: async (_menuItemId: MenuItemId) => {},
  saveCallerUserProfile: async (_input: UserProfileInput) => {},
  searchRestaurants: async (filter: RestaurantFilter) => {
    let results = sampleRestaurants;
    if (filter.searchTerm) {
      const term = filter.searchTerm.toLowerCase();
      results = results.filter(r => r.name.toLowerCase().includes(term) || r.category.toLowerCase().includes(term));
    }
    if (filter.category) {
      results = results.filter(r => r.category === filter.category);
    }
    if (filter.minRating !== undefined) {
      results = results.filter(r => r.rating >= filter.minRating!);
    }
    return results;
  },
  seedData: async () => {},
  setStripeConfiguration: async (_config: StripeConfiguration) => {},
  toggleRestaurantStatus: async (_id: RestaurantId) => {},
  transform: async (_input: TransformationInput): Promise<TransformationOutput> => ({
    status: BigInt(200),
    body: new Uint8Array(),
    headers: [],
  }),
  updateCartItem: async (_menuItemId: MenuItemId, _quantity: bigint) => {},
  updateMenuItem: async (_id: MenuItemId, _input: MenuItemInput) => {},
  updateOrderStatus: async (_orderId: OrderId, _status: OrderStatus) => {},
  updateRestaurant: async (_id: RestaurantId, _input: RestaurantInput) => {},
};

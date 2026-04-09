import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Address {
    tag: string;
    street: string;
    city: string;
    postalCode: string;
    state: string;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface OrderItem {
    name: string;
    quantity: bigint;
    price: bigint;
    menuItemId: MenuItemId;
}
export interface AddReviewInput {
    userName: string;
    restaurantId: RestaurantId;
    comment: string;
    rating: bigint;
}
export interface RestaurantInput {
    imageBlob?: ExternalBlob;
    deliveryFee: bigint;
    name: string;
    description: string;
    deliveryTimeMinutes: bigint;
    address: string;
    category: string;
    phone: string;
}
export type RestaurantId = bigint;
export interface MenuItemInput {
    imageBlob?: ExternalBlob;
    name: string;
    description: string;
    restaurantId: RestaurantId;
    category: string;
    price: bigint;
}
export interface RestaurantRatingSummary {
    restaurantId: RestaurantId;
    averageRating: number;
    reviewCount: bigint;
}
export type MenuItemId = bigint;
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface Cart {
    userId: UserId;
    items: Array<CartItem>;
}
export interface RestaurantFilter {
    minRating?: number;
    searchTerm?: string;
    category?: string;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export type ReviewId = bigint;
export interface Review {
    id: ReviewId;
    userName: string;
    userId: UserId;
    createdAt: Timestamp;
    restaurantId: RestaurantId;
    comment: string;
    rating: bigint;
}
export interface PlaceOrderInput {
    tax: bigint;
    deliveryAddress: string;
    total: bigint;
    deliveryFee: bigint;
    restaurantId: RestaurantId;
    specialInstructions: string;
    restaurantName: string;
    items: Array<OrderItem>;
    subtotal: bigint;
}
export interface Restaurant {
    id: RestaurantId;
    imageBlob?: ExternalBlob;
    deliveryFee: bigint;
    name: string;
    createdAt: Timestamp;
    description: string;
    isActive: boolean;
    deliveryTimeMinutes: bigint;
    address: string;
    category: string;
    rating: number;
    phone: string;
    reviewCount: bigint;
}
export interface Order {
    id: OrderId;
    tax: bigint;
    status: OrderStatus;
    deliveryAddress: string;
    total: bigint;
    deliveryFee: bigint;
    userId: UserId;
    createdAt: Timestamp;
    restaurantId: RestaurantId;
    updatedAt: Timestamp;
    specialInstructions: string;
    restaurantName: string;
    items: Array<OrderItem>;
    subtotal: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface AddToCartInput {
    name: string;
    restaurantId: RestaurantId;
    quantity: bigint;
    price: bigint;
    menuItemId: MenuItemId;
}
export type UserId = Principal;
export interface MenuItem {
    id: MenuItemId;
    imageBlob?: ExternalBlob;
    name: string;
    isAvailable: boolean;
    description: string;
    restaurantId: RestaurantId;
    category: string;
    price: bigint;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface CartItem {
    name: string;
    restaurantId: RestaurantId;
    quantity: bigint;
    price: bigint;
    menuItemId: MenuItemId;
}
export interface UserProfileInput {
    name: string;
    email: string;
    phone: string;
}
export type OrderId = bigint;
export interface UserProfile {
    name: string;
    createdAt: Timestamp;
    savedAddresses: Array<Address>;
    email: string;
    isAdmin: boolean;
    phone: string;
}
export enum OrderStatus {
    Delivered = "Delivered",
    Confirmed = "Confirmed",
    Placed = "Placed",
    Preparing = "Preparing",
    Cancelled = "Cancelled",
    OutForDelivery = "OutForDelivery"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addDeliveryAddress(address: Address): Promise<void>;
    addMenuItem(input: MenuItemInput): Promise<MenuItemId>;
    addRestaurant(input: RestaurantInput): Promise<RestaurantId>;
    addReview(input: AddReviewInput): Promise<ReviewId>;
    addToCart(input: AddToCartInput): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    assignRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    deleteMenuItem(id: MenuItemId): Promise<void>;
    deleteRestaurant(id: RestaurantId): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Cart>;
    getMenuItem(id: MenuItemId): Promise<MenuItem | null>;
    getOrder(orderId: OrderId): Promise<Order | null>;
    getRestaurant(id: RestaurantId): Promise<Restaurant | null>;
    getRestaurantRatingSummary(restaurantId: RestaurantId): Promise<RestaurantRatingSummary>;
    getRestaurantReviews(restaurantId: RestaurantId): Promise<Array<Review>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(userId: UserId): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    listAllOrders(): Promise<Array<Order>>;
    listMenuItems(restaurantId: RestaurantId): Promise<Array<MenuItem>>;
    listRestaurants(): Promise<Array<Restaurant>>;
    listUserOrders(): Promise<Array<Order>>;
    placeOrder(input: PlaceOrderInput): Promise<OrderId>;
    removeDeliveryAddress(index: bigint): Promise<void>;
    removeFromCart(menuItemId: MenuItemId): Promise<void>;
    saveCallerUserProfile(input: UserProfileInput): Promise<void>;
    searchRestaurants(filter: RestaurantFilter): Promise<Array<Restaurant>>;
    seedData(): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    toggleRestaurantStatus(id: RestaurantId): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateCartItem(menuItemId: MenuItemId, quantity: bigint): Promise<void>;
    updateMenuItem(id: MenuItemId, input: MenuItemInput): Promise<void>;
    updateOrderStatus(orderId: OrderId, status: OrderStatus): Promise<void>;
    updateRestaurant(id: RestaurantId, input: RestaurantInput): Promise<void>;
}

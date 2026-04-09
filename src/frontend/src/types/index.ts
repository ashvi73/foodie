export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  isPopular?: boolean;
  rating?: number;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  coverImage?: string;
  cuisine: string[];
  rating: number;
  reviewCount: number;
  deliveryTime: number;
  deliveryFee: number;
  minOrder: number;
  priceForTwo: number;
  location: string;
  distance?: number;
  isOpen: boolean;
  offers?: string[];
  tags?: string[];
  menu?: MenuItem[];
}

export interface CartItem {
  id: string;
  menuItemId: string;
  restaurantId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Cart {
  id: string;
  userId: string;
  restaurantId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  status: OrderStatus;
  address: Address;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
  paymentMethod: string;
}

export type ToastVariant = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

export type FoodCategory =
  | "All"
  | "Pizza"
  | "Burgers"
  | "Biryani"
  | "Indian"
  | "Chinese"
  | "Rolls"
  | "Desserts"
  | "Drinks";

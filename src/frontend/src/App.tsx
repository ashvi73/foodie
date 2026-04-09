import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { FullPageSpinner } from "./components/LoadingSpinner";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Lazy pages
const Home = lazy(() => import("./pages/Home"));
const Restaurants = lazy(() => import("./pages/Restaurants"));
const RestaurantDetail = lazy(() => import("./pages/RestaurantDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CheckoutSuccess = lazy(() => import("./pages/CheckoutSuccess"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetail = lazy(() => import("./pages/OrderDetail"));
const About = lazy(() => import("./pages/About"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminRestaurants = lazy(() => import("./pages/AdminRestaurants"));
const AdminOrders = lazy(() => import("./pages/AdminOrders"));
const AdminUsers = lazy(() => import("./pages/AdminUsers"));

function PageLoader() {
  return <FullPageSpinner label="Loading..." />;
}

const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  ),
});

// Public routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const restaurantsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/restaurants",
  component: Restaurants,
});
const restaurantDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/restaurants/$id",
  component: RestaurantDetail,
});
const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: Cart,
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

// Protected routes
const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: () => (
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  ),
});
const checkoutSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout/success",
  component: () => (
    <ProtectedRoute>
      <CheckoutSuccess />
    </ProtectedRoute>
  ),
});
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  ),
});
const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: () => (
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  ),
});
const orderDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders/$id",
  component: () => (
    <ProtectedRoute>
      <OrderDetail />
    </ProtectedRoute>
  ),
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  ),
});
const adminRestaurantsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/restaurants",
  component: () => (
    <ProtectedRoute>
      <AdminRestaurants />
    </ProtectedRoute>
  ),
});
const adminOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/orders",
  component: () => (
    <ProtectedRoute>
      <AdminOrders />
    </ProtectedRoute>
  ),
});
const adminUsersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/users",
  component: () => (
    <ProtectedRoute>
      <AdminUsers />
    </ProtectedRoute>
  ),
});

// Catch-all
const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: () => <Navigate to="/" />,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  restaurantsRoute,
  restaurantDetailRoute,
  cartRoute,
  loginRoute,
  aboutRoute,
  checkoutRoute,
  checkoutSuccessRoute,
  profileRoute,
  ordersRoute,
  orderDetailRoute,
  adminRoute,
  adminRestaurantsRoute,
  adminOrdersRoute,
  adminUsersRoute,
  notFoundRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}

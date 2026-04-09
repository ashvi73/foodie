import { useActor } from "@caffeineai/core-infrastructure";
import { Link, Navigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ChevronRight,
  Clock,
  LayoutDashboard,
  ShoppingBag,
  TrendingUp,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useState } from "react";
import { createActor } from "../backend";
import { OrderStatus } from "../backend";
import type { Order, Restaurant } from "../backend.d.ts";
import { Layout } from "../components/Layout";
import { FullPageSpinner } from "../components/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";

function AdminSidebar({ active }: { active: string }) {
  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { label: "Restaurants", icon: UtensilsCrossed, path: "/admin/restaurants" },
    { label: "Orders", icon: ShoppingBag, path: "/admin/orders" },
    { label: "Users", icon: Users, path: "/admin/users" },
  ];
  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col min-h-full shrink-0">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-foreground">
            Admin Panel
          </span>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = active === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-smooth ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              data-ocid={`admin-nav-${item.label.toLowerCase()}`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export { AdminSidebar };

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  colorClass: string;
  sub?: string;
}

function StatCard({
  label,
  value,
  icon: Icon,
  colorClass,
  sub,
}: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4 card-elevated">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-display text-2xl font-bold text-foreground">
          {value}
        </p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

export default function Admin() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { actor, isFetching } = useActor(createActor);

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!actor || isFetching) return;
    async function load() {
      try {
        const [adminCheck, rList, oList] = await Promise.all([
          actor!.isCallerAdmin(),
          actor!.listRestaurants(),
          actor!.listAllOrders(),
        ]);
        setIsAdmin(adminCheck);
        setRestaurants(rList);
        setOrders(oList);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [actor, isFetching]);

  if (authLoading || loading || isFetching)
    return <FullPageSpinner label="Loading dashboard..." />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (isAdmin === false) return <Navigate to="/" />;

  const pending = orders.filter(
    (o) =>
      o.status === OrderStatus.Placed || o.status === OrderStatus.Confirmed,
  ).length;
  const delivered = orders.filter(
    (o) => o.status === OrderStatus.Delivered,
  ).length;
  const activeRestaurants = restaurants.filter((r) => r.isActive).length;
  const uniqueUsers = new Set(orders.map((o) => o.userId.toText())).size;

  const recentOrders = [...orders]
    .sort((a, b) => Number(b.createdAt - a.createdAt))
    .slice(0, 5);

  return (
    <Layout hideFooter>
      <div className="flex flex-1 min-h-[calc(100vh-64px)]">
        <AdminSidebar active="/admin" />
        <main className="flex-1 p-8 bg-background overflow-auto">
          <div className="max-w-5xl mx-auto fade-in">
            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold text-foreground">
                Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Overview of your Foodie platform
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                label="Restaurants"
                value={restaurants.length}
                icon={UtensilsCrossed}
                colorClass="bg-primary/15 text-primary"
                sub={`${activeRestaurants} active`}
              />
              <StatCard
                label="Total Orders"
                value={orders.length}
                icon={ShoppingBag}
                colorClass="bg-secondary/15 text-secondary"
                sub={`${delivered} delivered`}
              />
              <StatCard
                label="Pending Orders"
                value={pending}
                icon={Clock}
                colorClass="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                sub="needs attention"
              />
              <StatCard
                label="Unique Users"
                value={uniqueUsers}
                icon={Users}
                colorClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                sub="placed orders"
              />
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                {
                  label: "Manage Restaurants",
                  path: "/admin/restaurants",
                  icon: UtensilsCrossed,
                  desc: "Add, edit & toggle status",
                },
                {
                  label: "Manage Orders",
                  path: "/admin/orders",
                  icon: ShoppingBag,
                  desc: "View & update order statuses",
                },
                {
                  label: "View Users",
                  path: "/admin/users",
                  icon: Users,
                  desc: "See all platform users",
                },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4 hover:border-primary/50 hover:shadow-md transition-smooth group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Recent Orders
                </h2>
                <Link
                  to="/admin/orders"
                  className="text-sm text-primary hover:underline font-medium"
                >
                  View all
                </Link>
              </div>
              {recentOrders.length === 0 ? (
                <div className="p-10 text-center text-muted-foreground">
                  <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  No orders yet
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id.toString()}
                      className="flex items-center px-6 py-3 gap-4 hover:bg-muted/40 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">
                          {order.restaurantName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {order.userId.toText().slice(0, 20)}...
                        </p>
                      </div>
                      <p className="font-semibold text-foreground text-sm shrink-0">
                        ₹{(Number(order.total) / 100).toFixed(0)}
                      </p>
                      <StatusBadge status={order.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export function StatusBadge({ status }: { status: OrderStatus }) {
  const map: Record<OrderStatus, { label: string; className: string }> = {
    [OrderStatus.Placed]: {
      label: "Placed",
      className:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    },
    [OrderStatus.Confirmed]: {
      label: "Confirmed",
      className:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    },
    [OrderStatus.Preparing]: {
      label: "Preparing",
      className:
        "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    },
    [OrderStatus.OutForDelivery]: {
      label: "Out for Delivery",
      className:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    },
    [OrderStatus.Delivered]: {
      label: "Delivered",
      className:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    },
    [OrderStatus.Cancelled]: {
      label: "Cancelled",
      className: "bg-destructive/15 text-destructive",
    },
  };
  const { label, className } = map[status] ?? {
    label: status,
    className: "bg-muted text-muted-foreground",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${className}`}
    >
      {label}
    </span>
  );
}

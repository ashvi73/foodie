import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Package,
  ShoppingBag,
} from "lucide-react";
import { motion } from "motion/react";
import { createActor } from "../backend";
import type { Order as BackendOrder } from "../backend.d";
import { Badge } from "../components/Badge";
import { Layout } from "../components/Layout";

// ─── Status config ────────────────────────────────────────────────────────────
type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "destructive"
  | "outline"
  | "veg"
  | "nonveg";

const statusConfig: Record<
  string,
  { label: string; variant: BadgeVariant; dot: string }
> = {
  Placed: {
    label: "Placed",
    variant: "primary",
    dot: "bg-blue-500",
  },
  Confirmed: {
    label: "Confirmed",
    variant: "warning",
    dot: "bg-amber-500",
  },
  Preparing: {
    label: "Preparing",
    variant: "warning",
    dot: "bg-orange-500",
  },
  OutForDelivery: {
    label: "Out for Delivery",
    variant: "secondary",
    dot: "bg-purple-500",
  },
  Delivered: {
    label: "Delivered",
    variant: "success",
    dot: "bg-emerald-500",
  },
  Cancelled: {
    label: "Cancelled",
    variant: "destructive",
    dot: "bg-red-500",
  },
};

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp / 1_000_000n);
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(ms));
}

function formatPrice(paise: bigint): string {
  return `₹${Number(paise / 100n).toLocaleString("en-IN")}`;
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────
function OrderRowSkeleton() {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4">
      <Skeleton className="w-14 h-14 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-56" />
        <Skeleton className="h-3 w-24" />
      </div>
      <div className="flex flex-col items-end gap-2">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-4 w-14" />
      </div>
    </div>
  );
}

// ─── Order Row ────────────────────────────────────────────────────────────────
interface OrderRowProps {
  order: BackendOrder;
  index: number;
}

function OrderRow({ order, index }: OrderRowProps) {
  const navigate = useNavigate();
  const statusKey = String(order.status);
  const config = statusConfig[statusKey] ?? statusConfig.Placed;
  const itemCount = order.items.reduce((sum, i) => sum + Number(i.quantity), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      data-ocid="order-row"
      onClick={() =>
        navigate({ to: "/orders/$id", params: { id: order.id.toString() } })
      }
      className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-smooth group"
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
        <ShoppingBag className="w-7 h-7 text-primary" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-foreground text-base truncate">
          {order.restaurantName}
        </p>
        <div className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
          <CalendarDays className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{formatDate(order.createdAt)}</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5 text-muted-foreground text-xs">
          <Package className="w-3.5 h-3.5 flex-shrink-0" />
          <span>
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
          <span className="mx-1">·</span>
          <span className="font-semibold text-foreground">
            {formatPrice(order.total)}
          </span>
        </div>
      </div>

      {/* Status + arrow */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <Badge variant={config.variant} className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
          {config.label}
        </Badge>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </motion.div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyOrders() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      data-ocid="orders-empty"
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
        <ClipboardList className="w-12 h-12 text-muted-foreground" />
      </div>
      <h2 className="font-display text-xl font-bold text-foreground mb-2">
        No orders yet
      </h2>
      <p className="text-muted-foreground text-sm mb-8 max-w-xs">
        You haven't placed any orders. Discover restaurants and order your
        favourite food!
      </p>
      <Link to="/restaurants">
        <Button
          className="btn-gradient rounded-full px-8 py-2.5 h-auto"
          data-ocid="browse-restaurants-cta"
        >
          Browse Restaurants
        </Button>
      </Link>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Orders() {
  const { actor, isFetching: actorLoading } = useActor(createActor);

  const { data: orders, isLoading } = useQuery<BackendOrder[]>({
    queryKey: ["user-orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listUserOrders();
    },
    enabled: !!actor && !actorLoading,
  });

  const sorted = orders
    ? [...orders].sort((a, b) => Number(b.createdAt - a.createdAt))
    : [];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl font-bold text-foreground">
            My Orders
          </h1>
          {orders && orders.length > 0 && (
            <p className="text-muted-foreground mt-1 text-sm">
              {orders.length} {orders.length === 1 ? "order" : "orders"} placed
            </p>
          )}
        </motion.div>

        {/* Loading skeletons */}
        {isLoading || actorLoading ? (
          <div className="space-y-3" data-ocid="orders-loading">
            {["s1", "s2", "s3", "s4"].map((k) => (
              <OrderRowSkeleton key={k} />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <EmptyOrders />
        ) : (
          <div className="space-y-3" data-ocid="orders-list">
            {sorted.map((order, i) => (
              <OrderRow key={order.id.toString()} order={order} index={i} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

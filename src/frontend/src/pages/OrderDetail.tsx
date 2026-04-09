import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bike,
  CheckCircle2,
  Clock,
  Flame,
  MapPin,
  PackageCheck,
  RotateCcw,
  Store,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { createActor } from "../backend";
import type {
  Order as BackendOrder,
  OrderItem as BackendOrderItem,
} from "../backend.d";
import { Badge } from "../components/Badge";
import { Layout } from "../components/Layout";
import { useCartStore } from "../stores/cartStore";

// ─── Types ─────────────────────────────────────────────────────────────────────
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

interface StatusStep {
  key: string;
  label: string;
  icon: React.ReactNode;
}

// ─── Status helpers ────────────────────────────────────────────────────────────
const STATUS_STEPS: StatusStep[] = [
  {
    key: "Placed",
    label: "Placed",
    icon: <CheckCircle2 className="w-5 h-5" />,
  },
  { key: "Confirmed", label: "Confirmed", icon: <Clock className="w-5 h-5" /> },
  { key: "Preparing", label: "Preparing", icon: <Flame className="w-5 h-5" /> },
  {
    key: "OutForDelivery",
    label: "Out for Delivery",
    icon: <Bike className="w-5 h-5" />,
  },
  {
    key: "Delivered",
    label: "Delivered",
    icon: <PackageCheck className="w-5 h-5" />,
  },
];

const STATUS_ORDER = [
  "Placed",
  "Confirmed",
  "Preparing",
  "OutForDelivery",
  "Delivered",
];

const statusConfig: Record<string, { label: string; variant: BadgeVariant }> = {
  Placed: { label: "Placed", variant: "primary" },
  Confirmed: { label: "Confirmed", variant: "warning" },
  Preparing: { label: "Preparing", variant: "warning" },
  OutForDelivery: { label: "Out for Delivery", variant: "secondary" },
  Delivered: { label: "Delivered", variant: "success" },
  Cancelled: { label: "Cancelled", variant: "destructive" },
};

function getStepIndex(status: string): number {
  return STATUS_ORDER.indexOf(status);
}

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp / 1_000_000n);
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(ms));
}

function formatPrice(paise: bigint): string {
  return `₹${Number(paise / 100n).toLocaleString("en-IN")}`;
}

// ─── Status Tracker ────────────────────────────────────────────────────────────
function StatusTracker({ status }: { status: string }) {
  const isCancelled = status === "Cancelled";
  const activeIdx = getStepIndex(status);

  if (isCancelled) {
    return (
      <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-2xl">
        <XCircle className="w-6 h-6 text-destructive flex-shrink-0" />
        <div>
          <p className="font-semibold text-destructive text-sm">
            Order Cancelled
          </p>
          <p className="text-muted-foreground text-xs mt-0.5">
            This order has been cancelled.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" data-ocid="status-tracker">
      {/* Progress line */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-border mx-8 z-0" />
      <div
        className="absolute top-5 left-0 h-0.5 bg-primary z-0 transition-all duration-700 mx-8"
        style={{
          width:
            activeIdx <= 0
              ? "0%"
              : `${(activeIdx / (STATUS_STEPS.length - 1)) * 100}%`,
        }}
      />

      <div className="relative z-10 flex justify-between">
        {STATUS_STEPS.map((step, idx) => {
          const isCompleted = idx < activeIdx;
          const isActive = idx === activeIdx;
          return (
            <div
              key={step.key}
              className="flex flex-col items-center gap-2 flex-1"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-smooth ${
                  isCompleted
                    ? "bg-primary border-primary text-primary-foreground"
                    : isActive
                      ? "bg-primary/15 border-primary text-primary"
                      : "bg-card border-border text-muted-foreground"
                }`}
              >
                {step.icon}
              </div>
              <span
                className={`text-xs font-medium text-center leading-tight max-w-[64px] ${
                  isCompleted || isActive
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Item Row ──────────────────────────────────────────────────────────────────
function ItemRow({ item }: { item: BackendOrderItem }) {
  return (
    <div
      className="flex items-center justify-between py-3"
      data-ocid="order-item-row"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">
          {Number(item.quantity)}×
        </div>
        <span className="text-sm text-foreground font-medium truncate">
          {item.name}
        </span>
      </div>
      <div className="text-sm text-right flex-shrink-0 pl-4">
        <span className="text-muted-foreground text-xs">
          {formatPrice(item.price)} each
        </span>
        <p className="font-semibold text-foreground">
          {formatPrice(item.price * item.quantity)}
        </p>
      </div>
    </div>
  );
}

// ─── Loading Skeleton ──────────────────────────────────────────────────────────
function DetailSkeleton() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
      </div>
    </Layout>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function OrderDetail() {
  const { id } = useParams({ from: "/orders/$id" });
  const navigate = useNavigate();
  const { addItem } = useCartStore();

  const { actor, isFetching: actorLoading } = useActor(createActor);

  const { data: order, isLoading } = useQuery<BackendOrder | null>({
    queryKey: ["order", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getOrder(BigInt(id));
    },
    enabled: !!actor && !actorLoading,
  });

  const reorderMutation = useMutation({
    mutationFn: async () => {
      if (!order) return;
      for (const item of order.items) {
        addItem({
          id: item.menuItemId.toString(),
          menuItemId: item.menuItemId.toString(),
          restaurantId: order.restaurantId.toString(),
          name: item.name,
          price: Number(item.price) / 100,
          image: "",
          quantity: Number(item.quantity),
        });
      }
    },
    onSuccess: () => {
      toast.success("Items added to cart!", {
        description: `${order?.items.length} item(s) from ${order?.restaurantName} added.`,
        duration: 4000,
      });
      navigate({ to: "/cart" });
    },
    onError: () => {
      toast.error("Failed to reorder. Please try again.");
    },
  });

  if (isLoading || actorLoading) return <DetailSkeleton />;

  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center max-w-md">
          <XCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold text-foreground mb-2">
            Order not found
          </h2>
          <p className="text-muted-foreground text-sm mb-8">
            We couldn't find this order. It may have been removed or you don't
            have access.
          </p>
          <Link to="/orders">
            <Button variant="outline" className="rounded-full">
              Back to Orders
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const statusKey = String(order.status);
  const config = statusConfig[statusKey] ?? statusConfig.Placed;
  const isCancelled = statusKey === "Cancelled";
  const isDelivered = statusKey === "Delivered";

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl space-y-5">
        {/* Back button + header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate({ to: "/orders" })}
              type="button"
              data-ocid="order-back-btn"
              className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70 transition-smooth"
              aria-label="Back to orders"
            >
              <ArrowLeft className="w-4 h-4 text-foreground" />
            </button>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">
                Order #{order.id.toString()}
              </h1>
              <p className="text-muted-foreground text-xs">
                {formatDate(order.createdAt)}
              </p>
            </div>
          </div>
          <Badge variant={config.variant}>{config.label}</Badge>
        </motion.div>

        {/* Status tracker */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="bg-card border border-border rounded-2xl p-5"
          data-ocid="order-status-section"
        >
          <h2 className="font-display font-semibold text-foreground text-sm mb-5">
            Order Status
          </h2>
          <StatusTracker status={statusKey} />
        </motion.div>

        {/* Restaurant info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="bg-card border border-border rounded-2xl p-5"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Store className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-foreground">
                {order.restaurantName}
              </h2>
              <p className="text-muted-foreground text-sm mt-0.5">Restaurant</p>
            </div>
          </div>
        </motion.div>

        {/* Items list */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="bg-card border border-border rounded-2xl p-5"
        >
          <h2 className="font-display font-semibold text-foreground text-sm mb-1">
            Items Ordered
          </h2>
          <div className="divide-y divide-border">
            {order.items.map((item) => (
              <ItemRow key={item.menuItemId.toString()} item={item} />
            ))}
          </div>
        </motion.div>

        {/* Delivery info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-5 space-y-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <h2 className="font-display font-semibold text-foreground text-sm">
                Delivery Address
              </h2>
            </div>
            <p className="text-muted-foreground text-sm pl-6">
              {order.deliveryAddress}
            </p>
          </div>
          {order.specialInstructions && (
            <>
              <Separator />
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">
                  Special Instructions
                </p>
                <p className="text-sm text-foreground">
                  {order.specialInstructions}
                </p>
              </div>
            </>
          )}
        </motion.div>

        {/* Order summary */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.25 }}
          className="bg-card border border-border rounded-2xl p-5 space-y-3"
          data-ocid="order-summary"
        >
          <h2 className="font-display font-semibold text-foreground text-sm">
            Order Summary
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">
                {formatPrice(order.subtotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span className="text-foreground">
                {formatPrice(order.deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span className="text-foreground">{formatPrice(order.tax)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-base">
              <span className="text-foreground">Total</span>
              <span className="text-primary">{formatPrice(order.total)}</span>
            </div>
          </div>
        </motion.div>

        {/* Reorder button — show if delivered or not cancelled */}
        {!isCancelled && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.3 }}
          >
            <Button
              onClick={() => reorderMutation.mutate()}
              disabled={reorderMutation.isPending}
              className="w-full btn-gradient rounded-full h-12 text-base font-semibold flex items-center gap-2"
              data-ocid="reorder-btn"
            >
              <RotateCcw className="w-4 h-4" />
              {isDelivered ? "Reorder" : "Add Items to Cart"}
            </Button>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}

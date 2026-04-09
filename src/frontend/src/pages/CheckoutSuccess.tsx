import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import {
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  ShoppingBag,
  Utensils,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createActor } from "../backend";
import { Layout } from "../components/Layout";
import { useCart } from "../hooks/useCart";

type PageStatus = "verifying" | "success" | "failed" | "already_processed";

export default function CheckoutSuccess() {
  const { actor, isFetching: actorLoading } = useActor(createActor);
  const { items, restaurantId, cartTotal, clearCart } = useCart();
  const searchParams = useSearch({ strict: false }) as Record<string, string>;
  const sessionId = searchParams?.session_id as string | undefined;

  const [pageStatus, setPageStatus] = useState<PageStatus>("verifying");
  const [orderId, setOrderId] = useState<bigint | null>(null);
  const processedRef = useRef(false);

  const subtotal = cartTotal;
  const tax = Math.round(subtotal * 0.1);
  const deliveryFee = 49;
  const total = subtotal + deliveryFee + tax;

  // Get session status
  const sessionQuery = useQuery({
    queryKey: ["stripeSession", sessionId],
    queryFn: async () => {
      if (!actor || !sessionId) return null;
      return actor.getStripeSessionStatus(sessionId);
    },
    enabled: !!actor && !actorLoading && !!sessionId,
    retry: 3,
    retryDelay: 1500,
  });

  // Place order mutation
  const placeOrderMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      if (items.length === 0) throw new Error("Cart is empty");

      const deliveryAddress =
        sessionStorage.getItem("foodie_delivery_address") ?? "";

      const orderItems = items.map((item) => ({
        menuItemId: BigInt(item.menuItemId),
        name: item.name,
        quantity: BigInt(item.quantity),
        price: BigInt(Math.round(item.price * 100)),
      }));

      const id = await actor.placeOrder({
        restaurantId: BigInt(restaurantId ?? "0"),
        restaurantName: items[0] ? `Restaurant #${restaurantId}` : "Unknown",
        items: orderItems,
        subtotal: BigInt(Math.round(subtotal * 100)),
        deliveryFee: BigInt(Math.round(deliveryFee * 100)),
        tax: BigInt(Math.round(tax * 100)),
        total: BigInt(Math.round(total * 100)),
        deliveryAddress,
        specialInstructions: "",
      });
      return id;
    },
    onSuccess: (id) => {
      setOrderId(id);
      setPageStatus("success");
      sessionStorage.removeItem("foodie_delivery_address");
      clearCart();
    },
    onError: () => {
      setPageStatus("failed");
    },
  });

  const itemsCount = items.length;
  const mutate = placeOrderMutation.mutate;

  useEffect(() => {
    if (!sessionQuery.data || processedRef.current) return;

    const status = sessionQuery.data;

    if (status.__kind__ === "completed") {
      processedRef.current = true;
      if (itemsCount > 0) {
        mutate();
      } else {
        setPageStatus("already_processed");
      }
    } else if (status.__kind__ === "failed") {
      setPageStatus("failed");
    }
  }, [sessionQuery.data, itemsCount, mutate]);

  if (!sessionId) {
    return (
      <Layout>
        <div className="flex-1 flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <XCircle className="w-16 h-16 text-destructive mx-auto" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              Invalid Page
            </h2>
            <p className="text-muted-foreground">
              No payment session found. Please try again.
            </p>
            <Link to="/cart">
              <Button className="btn-gradient rounded-full px-8">
                Return to Cart
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout hideFooter>
      <div className="flex-1 flex items-center justify-center bg-muted/30 py-16 px-4">
        <div className="w-full max-w-lg">
          {/* Verifying state */}
          {(pageStatus === "verifying" ||
            sessionQuery.isLoading ||
            placeOrderMutation.isPending) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-3xl shadow-lg border border-border p-10 text-center space-y-6"
              data-ocid="checkout-success-verifying"
            >
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
              </div>
              <div className="space-y-2">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Verifying Payment...
                </h2>
                <p className="text-muted-foreground">
                  Please wait while we confirm your payment and place your
                  order.
                </p>
              </div>
            </motion.div>
          )}

          {/* Success state */}
          {pageStatus === "success" && !placeOrderMutation.isPending && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-card rounded-3xl shadow-lg border border-border overflow-hidden"
              data-ocid="checkout-success-confirmed"
            >
              {/* Success header */}
              <div className="bg-primary/5 border-b border-border p-8 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                  className="w-24 h-24 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle2 className="w-14 h-14 text-primary" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                    Order Confirmed! 🎉
                  </h2>
                  <p className="text-muted-foreground">
                    Your order has been placed successfully
                  </p>
                </motion.div>
              </div>

              {/* Order details */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="p-6 space-y-4"
              >
                {orderId !== null && (
                  <div className="bg-muted/40 rounded-xl p-4 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground font-medium">
                      Order ID
                    </span>
                    <span className="font-mono text-sm font-bold text-foreground">
                      #{orderId.toString()}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/40 rounded-xl p-4 text-center">
                    <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">
                      Estimated delivery
                    </p>
                    <p className="font-bold text-foreground text-sm">
                      30–45 mins
                    </p>
                  </div>
                  <div className="bg-muted/40 rounded-xl p-4 text-center">
                    <ShoppingBag className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">
                      Total paid
                    </p>
                    <p className="font-bold text-foreground text-sm">
                      ₹{total}
                    </p>
                  </div>
                </div>

                {/* Items summary */}
                {items.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-foreground">
                        Items ordered
                      </h3>
                      {items.slice(0, 3).map((item) => (
                        <div
                          key={item.menuItemId}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-muted-foreground">
                            {item.name} ×{item.quantity}
                          </span>
                          <span className="font-medium text-foreground">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                      {items.length > 3 && (
                        <p className="text-xs text-muted-foreground">
                          +{items.length - 3} more items
                        </p>
                      )}
                    </div>
                  </>
                )}

                <Separator />

                {/* Info cards */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 text-sm">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Your food is being prepared and will be delivered shortly
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 text-sm">
                    <Utensils className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Track your order in the Orders section
                    </span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {orderId !== null && (
                    <Link to="/orders/$id" params={{ id: String(orderId) }}>
                      <Button
                        variant="outline"
                        className="w-full rounded-full border-primary/40 text-primary hover:bg-primary/10 hover:border-primary transition-smooth"
                        data-ocid="checkout-success-track-order"
                      >
                        Track Order
                      </Button>
                    </Link>
                  )}
                  <Link to="/restaurants">
                    <Button
                      className="btn-gradient w-full rounded-full"
                      data-ocid="checkout-success-continue-shopping"
                    >
                      Order More
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Already processed */}
          {pageStatus === "already_processed" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-3xl shadow-lg border border-border p-10 text-center space-y-6"
              data-ocid="checkout-success-processed"
            >
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-14 h-14 text-primary" />
              </div>
              <div className="space-y-2">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Payment Successful!
                </h2>
                <p className="text-muted-foreground">
                  Your order was previously confirmed.
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <Link to="/orders">
                  <Button
                    variant="outline"
                    className="rounded-full border-primary/40 text-primary"
                    data-ocid="checkout-success-view-orders"
                  >
                    View Orders
                  </Button>
                </Link>
                <Link to="/restaurants">
                  <Button
                    className="btn-gradient rounded-full"
                    data-ocid="checkout-success-browse"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Failed state */}
          {pageStatus === "failed" && !placeOrderMutation.isPending && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-3xl shadow-lg border border-border p-10 text-center space-y-6"
              data-ocid="checkout-success-failed"
            >
              <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                <XCircle className="w-14 h-14 text-destructive" />
              </div>
              <div className="space-y-2">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Payment Failed
                </h2>
                <p className="text-muted-foreground">
                  We couldn't verify your payment. Your cart is saved — please
                  try again.
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <Link to="/cart">
                  <Button
                    variant="outline"
                    className="rounded-full"
                    data-ocid="checkout-failed-back-to-cart"
                  >
                    Back to Cart
                  </Button>
                </Link>
                <Link to="/checkout">
                  <Button
                    className="btn-gradient rounded-full"
                    data-ocid="checkout-failed-retry"
                  >
                    Try Again
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}

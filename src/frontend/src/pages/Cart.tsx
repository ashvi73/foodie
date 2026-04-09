import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  UtensilsCrossed,
} from "lucide-react";
import { motion } from "motion/react";
import { Layout } from "../components/Layout";
import { useCart } from "../hooks/useCart";

const TAX_RATE = 0.1;
const DELIVERY_FEE = 49;

export default function Cart() {
  const { items, updateQuantity, removeItem, cartTotal, isEmpty } = useCart();

  const subtotal = cartTotal;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + DELIVERY_FEE + tax;

  const restaurantName = items[0] ? `Restaurant #${items[0].restaurantId}` : "";

  if (isEmpty) {
    return (
      <Layout>
        <div
          className="flex-1 flex flex-col items-center justify-center py-24 px-4"
          data-ocid="cart-empty-state"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center gap-6 max-w-sm text-center"
          >
            <div className="w-28 h-28 rounded-full bg-muted flex items-center justify-center">
              <ShoppingCart className="w-14 h-14 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground text-base">
                Looks like you haven't added anything yet. Explore our delicious
                menu and get started!
              </p>
            </div>
            <Link to="/restaurants">
              <Button
                className="btn-gradient rounded-full px-8 py-3 text-base gap-2"
                data-ocid="cart-browse-restaurants"
              >
                <UtensilsCrossed className="w-4 h-4" />
                Browse Restaurants
              </Button>
            </Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-muted/30 min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-1">
              <ShoppingCart className="w-6 h-6 text-primary" />
              <h1 className="font-display text-3xl font-bold text-foreground">
                Your Cart
              </h1>
            </div>
            <p className="text-muted-foreground ml-9">
              {items.length} {items.length === 1 ? "item" : "items"} from{" "}
              <span className="font-semibold text-foreground">
                {restaurantName}
              </span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden"
              >
                <div className="p-5 border-b border-border flex items-center justify-between">
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Order Items
                  </h2>
                  <Badge variant="secondary" className="text-xs">
                    {items.length} items
                  </Badge>
                </div>

                <div className="divide-y divide-border">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.menuItemId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-5 flex items-start gap-4"
                      data-ocid={`cart-item-${item.menuItemId}`}
                    >
                      {/* Food image */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <UtensilsCrossed className="w-8 h-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      {/* Item details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-base truncate">
                          {item.name}
                        </h3>
                        <p className="text-primary font-bold text-lg mt-1">
                          ₹{item.price}
                          <span className="text-muted-foreground text-sm font-normal">
                            {" "}
                            each
                          </span>
                        </p>
                        <p className="text-muted-foreground text-sm mt-0.5">
                          Subtotal:{" "}
                          <span className="font-semibold text-foreground">
                            ₹{item.price * item.quantity}
                          </span>
                        </p>
                      </div>

                      {/* Quantity selector + Remove */}
                      <div className="flex flex-col items-end gap-3 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => removeItem(item.menuItemId)}
                          className="text-destructive hover:text-destructive/80 transition-smooth p-1.5 rounded-lg hover:bg-destructive/10"
                          aria-label={`Remove ${item.name}`}
                          data-ocid={`cart-remove-${item.menuItemId}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-2 bg-muted rounded-full px-2 py-1">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.menuItemId, item.quantity - 1)
                            }
                            className="w-7 h-7 rounded-full flex items-center justify-center bg-background shadow-sm hover:bg-primary hover:text-primary-foreground transition-smooth"
                            aria-label="Decrease quantity"
                            data-ocid={`cart-decrease-${item.menuItemId}`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span
                            className="text-foreground font-bold text-base w-6 text-center"
                            data-ocid={`cart-qty-${item.menuItemId}`}
                          >
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.menuItemId, item.quantity + 1)
                            }
                            className="w-7 h-7 rounded-full flex items-center justify-center bg-primary text-primary-foreground shadow-sm hover:bg-accent transition-smooth"
                            aria-label="Increase quantity"
                            data-ocid={`cart-increase-${item.menuItemId}`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Continue shopping */}
              <Link to="/restaurants">
                <Button
                  variant="outline"
                  className="w-full rounded-xl border-dashed gap-2 hover:border-primary hover:text-primary transition-smooth"
                  data-ocid="cart-continue-shopping"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {/* Order Summary sticky panel */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden sticky top-24"
                data-ocid="cart-summary"
              >
                <div className="p-5 border-b border-border">
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Order Summary
                  </h2>
                </div>

                <div className="p-5 space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Subtotal ({items.length} items)
                      </span>
                      <span className="font-medium text-foreground">
                        ₹{subtotal}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Delivery fee
                      </span>
                      <span className="font-medium text-foreground">
                        ₹{DELIVERY_FEE}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (10%)</span>
                      <span className="font-medium text-foreground">
                        ₹{tax}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between">
                    <span className="font-display font-bold text-foreground text-lg">
                      Total
                    </span>
                    <span className="font-display font-bold text-primary text-xl">
                      ₹{total}
                    </span>
                  </div>

                  <div className="pt-1 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-xl px-3 py-2.5">
                      <span>🕐</span>
                      <span>Estimated delivery: 30–45 mins</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-xl px-3 py-2.5">
                      <span>🔒</span>
                      <span>Secure payment via Stripe</span>
                    </div>
                  </div>

                  <Link to="/checkout">
                    <Button
                      className="btn-gradient w-full rounded-full py-3 text-base gap-2 mt-2"
                      data-ocid="cart-proceed-checkout"
                    >
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

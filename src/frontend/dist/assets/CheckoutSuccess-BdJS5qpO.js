import { e as useSearch, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-DnwehUM6.js";
import { B as Button } from "./button-D5t3PDVn.js";
import { S as Separator } from "./separator-CH8LPPEE.js";
import { a as useActor, u as useQuery, c as createActor } from "./backend-C4anb5sy.js";
import { u as useMutation } from "./useMutation-DGCRxlfq.js";
import { u as useCart, L as Layout, M as MapPin } from "./Layout-CMdgGqmX.js";
import { C as CircleX } from "./circle-x-BrYVCMEt.js";
import { m as motion } from "./proxy-DdmWhjES.js";
import { L as LoaderCircle } from "./loader-circle-BdhSRpTA.js";
import { C as CircleCheck } from "./circle-check-Dojx_Wy9.js";
import { C as Clock } from "./clock-BmlPv7li.js";
import { S as ShoppingBag } from "./shopping-bag-t5LjaFX2.js";
import { U as Utensils } from "./utensils-B8FbuBnQ.js";
import "./index-KG9Sdx_T.js";
import "./utensils-crossed-C5p56U27.js";
function CheckoutSuccess() {
  const { actor, isFetching: actorLoading } = useActor(createActor);
  const { items, restaurantId, cartTotal, clearCart } = useCart();
  const searchParams = useSearch({ strict: false });
  const sessionId = searchParams == null ? void 0 : searchParams.session_id;
  const [pageStatus, setPageStatus] = reactExports.useState("verifying");
  const [orderId, setOrderId] = reactExports.useState(null);
  const processedRef = reactExports.useRef(false);
  const subtotal = cartTotal;
  const tax = Math.round(subtotal * 0.1);
  const deliveryFee = 49;
  const total = subtotal + deliveryFee + tax;
  const sessionQuery = useQuery({
    queryKey: ["stripeSession", sessionId],
    queryFn: async () => {
      if (!actor || !sessionId) return null;
      return actor.getStripeSessionStatus(sessionId);
    },
    enabled: !!actor && !actorLoading && !!sessionId,
    retry: 3,
    retryDelay: 1500
  });
  const placeOrderMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      if (items.length === 0) throw new Error("Cart is empty");
      const deliveryAddress = sessionStorage.getItem("foodie_delivery_address") ?? "";
      const orderItems = items.map((item) => ({
        menuItemId: BigInt(item.menuItemId),
        name: item.name,
        quantity: BigInt(item.quantity),
        price: BigInt(Math.round(item.price * 100))
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
        specialInstructions: ""
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
    }
  });
  const itemsCount = items.length;
  const mutate = placeOrderMutation.mutate;
  reactExports.useEffect(() => {
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center min-h-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-16 h-16 text-destructive mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Invalid Page" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No payment session found. Please try again." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cart", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "btn-gradient rounded-full px-8", children: "Return to Cart" }) })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { hideFooter: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center bg-muted/30 py-16 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg", children: [
    (pageStatus === "verifying" || sessionQuery.isLoading || placeOrderMutation.isPending) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        className: "bg-card rounded-3xl shadow-lg border border-border p-10 text-center space-y-6",
        "data-ocid": "checkout-success-verifying",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-12 h-12 text-primary animate-spin" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Verifying Payment..." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Please wait while we confirm your payment and place your order." })
          ] })
        ]
      }
    ),
    pageStatus === "success" && !placeOrderMutation.isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5, ease: "easeOut" },
        className: "bg-card rounded-3xl shadow-lg border border-border overflow-hidden",
        "data-ocid": "checkout-success-confirmed",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border-b border-border p-8 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { scale: 0, rotate: -180 },
                animate: { scale: 1, rotate: 0 },
                transition: { delay: 0.2, duration: 0.5, ease: "easeOut" },
                className: "w-24 h-24 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-14 h-14 text-primary" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.4 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-2", children: "Order Confirmed! 🎉" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Your order has been placed successfully" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.5 },
              className: "p-6 space-y-4",
              children: [
                orderId !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-4 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground font-medium", children: "Order ID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-sm font-bold text-foreground", children: [
                    "#",
                    orderId.toString()
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-4 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-6 h-6 text-primary mx-auto mb-2" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Estimated delivery" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-sm", children: "30–45 mins" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-4 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-6 h-6 text-primary mx-auto mb-2" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Total paid" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-foreground text-sm", children: [
                      "₹",
                      total
                    ] })
                  ] })
                ] }),
                items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Items ordered" }),
                    items.slice(0, 3).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex justify-between text-sm",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                            item.name,
                            " ×",
                            item.quantity
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                            "₹",
                            item.price * item.quantity
                          ] })
                        ]
                      },
                      item.menuItemId
                    )),
                    items.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "+",
                      items.length - 3,
                      " more items"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-muted/40 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Your food is being prepared and will be delivered shortly" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-muted/40 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Utensils, { className: "w-4 h-4 text-primary flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Track your order in the Orders section" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 pt-2", children: [
                  orderId !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders/$id", params: { id: String(orderId) }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      className: "w-full rounded-full border-primary/40 text-primary hover:bg-primary/10 hover:border-primary transition-smooth",
                      "data-ocid": "checkout-success-track-order",
                      children: "Track Order"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/restaurants", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      className: "btn-gradient w-full rounded-full",
                      "data-ocid": "checkout-success-continue-shopping",
                      children: "Order More"
                    }
                  ) })
                ] })
              ]
            }
          )
        ]
      }
    ),
    pageStatus === "already_processed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        className: "bg-card rounded-3xl shadow-lg border border-border p-10 text-center space-y-6",
        "data-ocid": "checkout-success-processed",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-14 h-14 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Payment Successful!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Your order was previously confirmed." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "rounded-full border-primary/40 text-primary",
                "data-ocid": "checkout-success-view-orders",
                children: "View Orders"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/restaurants", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "btn-gradient rounded-full",
                "data-ocid": "checkout-success-browse",
                children: "Continue Shopping"
              }
            ) })
          ] })
        ]
      }
    ),
    pageStatus === "failed" && !placeOrderMutation.isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        className: "bg-card rounded-3xl shadow-lg border border-border p-10 text-center space-y-6",
        "data-ocid": "checkout-success-failed",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-14 h-14 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Payment Failed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "We couldn't verify your payment. Your cart is saved — please try again." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cart", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "rounded-full",
                "data-ocid": "checkout-failed-back-to-cart",
                children: "Back to Cart"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "btn-gradient rounded-full",
                "data-ocid": "checkout-failed-retry",
                children: "Try Again"
              }
            ) })
          ] })
        ]
      }
    )
  ] }) }) });
}
export {
  CheckoutSuccess as default
};

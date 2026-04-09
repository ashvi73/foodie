import { j as jsxRuntimeExports, L as Link } from "./index-DnwehUM6.js";
import { B as Badge } from "./badge-payX39_2.js";
import { B as Button } from "./button-D5t3PDVn.js";
import { S as Separator } from "./separator-CH8LPPEE.js";
import { u as useCart, L as Layout, S as ShoppingCart } from "./Layout-CMdgGqmX.js";
import { m as motion } from "./proxy-DdmWhjES.js";
import { U as UtensilsCrossed } from "./utensils-crossed-C5p56U27.js";
import { T as Trash2 } from "./trash-2-C4jExYHJ.js";
import { M as Minus } from "./minus-cPljasiw.js";
import { P as Plus } from "./plus-Bhp6GNZS.js";
import { A as ArrowRight } from "./arrow-right-BnmRRx3K.js";
import "./index-KG9Sdx_T.js";
const TAX_RATE = 0.1;
const DELIVERY_FEE = 49;
function Cart() {
  const { items, updateQuantity, removeItem, cartTotal, isEmpty } = useCart();
  const subtotal = cartTotal;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + DELIVERY_FEE + tax;
  const restaurantName = items[0] ? `Restaurant #${items[0].restaurantId}` : "";
  if (isEmpty) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex-1 flex flex-col items-center justify-center py-24 px-4",
        "data-ocid": "cart-empty-state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.4, ease: "easeOut" },
            className: "flex flex-col items-center gap-6 max-w-sm text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 h-28 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-14 h-14 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Your cart is empty" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base", children: "Looks like you haven't added anything yet. Explore our delicious menu and get started!" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/restaurants", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "btn-gradient rounded-full px-8 py-3 text-base gap-2",
                  "data-ocid": "cart-browse-restaurants",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UtensilsCrossed, { className: "w-4 h-4" }),
                    "Browse Restaurants"
                  ]
                }
              ) })
            ]
          }
        )
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-6xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        className: "mb-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-6 h-6 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Your Cart" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground ml-9", children: [
            items.length,
            " ",
            items.length === 1 ? "item" : "items",
            " from",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: restaurantName })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            className: "bg-card rounded-2xl shadow-sm border border-border overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-b border-border flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Order Items" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
                  items.length,
                  " items"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: items.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, x: -20 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: 0.1 + index * 0.05 },
                  exit: { opacity: 0, x: -20 },
                  className: "p-5 flex items-start gap-4",
                  "data-ocid": `cart-item-${item.menuItemId}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-muted", children: item.image ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: item.image,
                        alt: item.name,
                        className: "w-full h-full object-cover"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UtensilsCrossed, { className: "w-8 h-8 text-muted-foreground" }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base truncate", children: item.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-primary font-bold text-lg mt-1", children: [
                        "₹",
                        item.price,
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-sm font-normal", children: [
                          " ",
                          "each"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-0.5", children: [
                        "Subtotal:",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                          "₹",
                          item.price * item.quantity
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-3 flex-shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => removeItem(item.menuItemId),
                          className: "text-destructive hover:text-destructive/80 transition-smooth p-1.5 rounded-lg hover:bg-destructive/10",
                          "aria-label": `Remove ${item.name}`,
                          "data-ocid": `cart-remove-${item.menuItemId}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-muted rounded-full px-2 py-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => updateQuantity(item.menuItemId, item.quantity - 1),
                            className: "w-7 h-7 rounded-full flex items-center justify-center bg-background shadow-sm hover:bg-primary hover:text-primary-foreground transition-smooth",
                            "aria-label": "Decrease quantity",
                            "data-ocid": `cart-decrease-${item.menuItemId}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-foreground font-bold text-base w-6 text-center",
                            "data-ocid": `cart-qty-${item.menuItemId}`,
                            children: item.quantity
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => updateQuantity(item.menuItemId, item.quantity + 1),
                            className: "w-7 h-7 rounded-full flex items-center justify-center bg-primary text-primary-foreground shadow-sm hover:bg-accent transition-smooth",
                            "aria-label": "Increase quantity",
                            "data-ocid": `cart-increase-${item.menuItemId}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" })
                          }
                        )
                      ] })
                    ] })
                  ]
                },
                item.menuItemId
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/restaurants", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "w-full rounded-xl border-dashed gap-2 hover:border-primary hover:text-primary transition-smooth",
            "data-ocid": "cart-continue-shopping",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UtensilsCrossed, { className: "w-4 h-4" }),
              "Continue Shopping"
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.2 },
          className: "bg-card rounded-2xl shadow-sm border border-border overflow-hidden sticky top-24",
          "data-ocid": "cart-summary",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Order Summary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                    "Subtotal (",
                    items.length,
                    " items)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                    "₹",
                    subtotal
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Delivery fee" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                    "₹",
                    DELIVERY_FEE
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Tax (10%)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                    "₹",
                    tax
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground text-lg", children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-primary text-xl", children: [
                  "₹",
                  total
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-1 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-xl px-3 py-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🕐" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Estimated delivery: 30–45 mins" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-xl px-3 py-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🔒" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Secure payment via Stripe" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "btn-gradient w-full rounded-full py-3 text-base gap-2 mt-2",
                  "data-ocid": "cart-proceed-checkout",
                  children: [
                    "Proceed to Checkout",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                  ]
                }
              ) })
            ] })
          ]
        }
      ) })
    ] })
  ] }) }) });
}
export {
  Cart as default
};

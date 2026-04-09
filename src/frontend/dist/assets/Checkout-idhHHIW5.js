import { b as useAuth, r as reactExports, j as jsxRuntimeExports, N as Navigate } from "./index-DnwehUM6.js";
import { B as Button } from "./button-D5t3PDVn.js";
import { I as Input } from "./input-CSRa9Y8x.js";
import { L as Label } from "./label-JbPaPxYz.js";
import { S as Separator } from "./separator-CH8LPPEE.js";
import { T as Textarea } from "./textarea-KCrfpDfE.js";
import { a as useActor, u as useQuery, c as createActor } from "./backend-C4anb5sy.js";
import { u as useMutation } from "./useMutation-DGCRxlfq.js";
import { u as useCart, L as Layout, M as MapPin, C as ChevronDown } from "./Layout-CMdgGqmX.js";
import { L as LoaderCircle } from "./loader-circle-BdhSRpTA.js";
import { m as motion } from "./proxy-DdmWhjES.js";
import { S as ShoppingBag } from "./shopping-bag-t5LjaFX2.js";
import { c as createLucideIcon } from "./utensils-crossed-C5p56U27.js";
import { P as Plus } from "./plus-Bhp6GNZS.js";
import { A as AnimatePresence } from "./index-BZdtlAnH.js";
import "./index-KG9Sdx_T.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode);
const TAX_RATE = 0.1;
const DELIVERY_FEE = 49;
const TAG_COLORS = {
  Home: "bg-primary/10 text-primary border-primary/30",
  Work: "bg-secondary/10 text-secondary border-secondary/30",
  Other: "bg-muted text-muted-foreground border-border"
};
function Checkout() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { items, cartTotal, isEmpty } = useCart();
  const { actor, isFetching: actorLoading } = useActor(createActor);
  const [selectedAddressIdx, setSelectedAddressIdx] = reactExports.useState(
    null
  );
  const [showNewAddressForm, setShowNewAddressForm] = reactExports.useState(false);
  const [specialInstructions, setSpecialInstructions] = reactExports.useState("");
  const [isRedirecting, setIsRedirecting] = reactExports.useState(false);
  const [newAddress, setNewAddress] = reactExports.useState({
    tag: "Home",
    street: "",
    city: "",
    state: "",
    postalCode: ""
  });
  const subtotal = cartTotal;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + DELIVERY_FEE + tax;
  const { data: profile, refetch: refetchProfile } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorLoading && isAuthenticated
  });
  const savedAddresses = (profile == null ? void 0 : profile.savedAddresses) ?? [];
  const addAddressMutation = useMutation({
    mutationFn: async (address) => {
      if (!actor) throw new Error("No actor");
      await actor.addDeliveryAddress(address);
    },
    onSuccess: async () => {
      await refetchProfile();
      setShowNewAddressForm(false);
      setNewAddress({
        tag: "Home",
        street: "",
        city: "",
        state: "",
        postalCode: ""
      });
      const newIdx = (profile == null ? void 0 : profile.savedAddresses.length) ?? 0;
      setSelectedAddressIdx(newIdx);
    }
  });
  const checkoutMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      const selectedAddr = selectedAddressIdx !== null ? savedAddresses[selectedAddressIdx] : null;
      if (!selectedAddr) throw new Error("No address selected");
      const shoppingItems = items.map((item) => ({
        productName: item.name,
        productDescription: item.name,
        currency: "inr",
        quantity: BigInt(item.quantity),
        priceInCents: BigInt(Math.round(item.price * 100))
      }));
      const origin = window.location.origin;
      const sessionId = await actor.createCheckoutSession(
        shoppingItems,
        `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        `${origin}/cart`
      );
      return sessionId;
    },
    onSuccess: (sessionId) => {
      setIsRedirecting(true);
      const selectedAddr = selectedAddressIdx !== null ? savedAddresses[selectedAddressIdx] : null;
      if (selectedAddr) {
        const addrString = `${selectedAddr.street}, ${selectedAddr.city}, ${selectedAddr.state} ${selectedAddr.postalCode}`;
        sessionStorage.setItem("foodie_delivery_address", addrString);
      }
      window.location.href = sessionId;
    }
  });
  const handleAddAddress = () => {
    if (!newAddress.street.trim() || !newAddress.city.trim() || !newAddress.state.trim() || !newAddress.postalCode.trim())
      return;
    addAddressMutation.mutate({
      tag: newAddress.tag,
      street: newAddress.street.trim(),
      city: newAddress.city.trim(),
      state: newAddress.state.trim(),
      postalCode: newAddress.postalCode.trim()
    });
  };
  if (authLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center min-h-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary" }) }) });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/login" });
  }
  if (isEmpty) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/cart" });
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-6 h-6 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Checkout" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground ml-9", children: "Complete your order — just a few steps away!" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            className: "bg-card rounded-2xl shadow-sm border border-border overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-b border-border flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Delivery Address" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
                savedAddresses.length === 0 && !showNewAddressForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "No saved addresses. Add one below." })
                ] }),
                savedAddresses.map((addr, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSelectedAddressIdx(idx),
                    className: `w-full text-left p-4 rounded-xl border-2 transition-smooth cursor-pointer ${selectedAddressIdx === idx ? "border-primary bg-primary/5" : "border-border bg-muted/30 hover:border-primary/50"}`,
                    "data-ocid": `checkout-address-${idx}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-smooth ${selectedAddressIdx === idx ? "border-primary bg-primary" : "border-muted-foreground/40"}`,
                          children: selectedAddressIdx === idx && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-primary-foreground" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: `text-xs font-semibold px-2 py-0.5 rounded-full border ${TAG_COLORS[addr.tag] ?? TAG_COLORS.Other}`,
                            children: addr.tag
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-sm font-medium", children: addr.street }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
                          addr.city,
                          ", ",
                          addr.state,
                          " ",
                          addr.postalCode
                        ] })
                      ] })
                    ] })
                  },
                  `addr-${addr.tag}-${addr.street}-${idx}`
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowNewAddressForm(!showNewAddressForm),
                    className: "w-full flex items-center justify-between p-4 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/50 transition-smooth text-sm font-medium text-muted-foreground hover:text-primary",
                    "data-ocid": "checkout-add-address-toggle",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                        "Add New Address"
                      ] }),
                      showNewAddressForm ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showNewAddressForm && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, height: 0 },
                    animate: { opacity: 1, height: "auto" },
                    exit: { opacity: 0, height: 0 },
                    transition: { duration: 0.25 },
                    className: "overflow-hidden",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 space-y-4 border-t border-border", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium text-foreground mb-2 block", children: "Address Type" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["Home", "Work", "Other"].map(
                          (tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => setNewAddress((p) => ({ ...p, tag })),
                              className: `px-4 py-2 rounded-full text-sm font-medium border-2 transition-smooth ${newAddress.tag === tag ? "border-primary bg-primary text-primary-foreground" : "border-border bg-muted/30 text-muted-foreground hover:border-primary/50"}`,
                              "data-ocid": `checkout-tag-${tag}`,
                              children: tag
                            },
                            tag
                          )
                        ) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Label,
                          {
                            htmlFor: "street",
                            className: "text-sm font-medium mb-1.5 block",
                            children: "Street Address *"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "street",
                            placeholder: "123 Main Street, Apt 4B",
                            value: newAddress.street,
                            onChange: (e) => setNewAddress((p) => ({
                              ...p,
                              street: e.target.value
                            })),
                            className: "rounded-xl",
                            "data-ocid": "checkout-street"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Label,
                            {
                              htmlFor: "city",
                              className: "text-sm font-medium mb-1.5 block",
                              children: "City *"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "city",
                              placeholder: "Mumbai",
                              value: newAddress.city,
                              onChange: (e) => setNewAddress((p) => ({
                                ...p,
                                city: e.target.value
                              })),
                              className: "rounded-xl",
                              "data-ocid": "checkout-city"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Label,
                            {
                              htmlFor: "state",
                              className: "text-sm font-medium mb-1.5 block",
                              children: "State *"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "state",
                              placeholder: "Maharashtra",
                              value: newAddress.state,
                              onChange: (e) => setNewAddress((p) => ({
                                ...p,
                                state: e.target.value
                              })),
                              className: "rounded-xl",
                              "data-ocid": "checkout-state"
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Label,
                          {
                            htmlFor: "postalCode",
                            className: "text-sm font-medium mb-1.5 block",
                            children: "Postal Code *"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "postalCode",
                            placeholder: "400001",
                            value: newAddress.postalCode,
                            onChange: (e) => setNewAddress((p) => ({
                              ...p,
                              postalCode: e.target.value
                            })),
                            className: "rounded-xl",
                            "data-ocid": "checkout-postal"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          onClick: handleAddAddress,
                          disabled: addAddressMutation.isPending || !newAddress.street.trim() || !newAddress.city.trim() || !newAddress.state.trim() || !newAddress.postalCode.trim(),
                          className: "w-full rounded-xl gap-2",
                          "data-ocid": "checkout-save-address",
                          children: addAddressMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                            "Saving..."
                          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                            "Save Address"
                          ] })
                        }
                      ),
                      addAddressMutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-sm text-center", children: "Failed to save address. Please try again." })
                    ] })
                  }
                ) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.2 },
            className: "bg-card rounded-2xl shadow-sm border border-border overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Special Instructions" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: "Any dietary requirements or preferences?" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  placeholder: "e.g. No onions, extra spicy, ring the doorbell...",
                  value: specialInstructions,
                  onChange: (e) => setSpecialInstructions(e.target.value),
                  className: "rounded-xl resize-none min-h-[100px]",
                  "data-ocid": "checkout-special-instructions"
                }
              ) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.15 },
          className: "bg-card rounded-2xl shadow-sm border border-border overflow-hidden sticky top-24",
          "data-ocid": "checkout-summary",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Order Summary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-4", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex justify-between items-start gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: item.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                        "×",
                        item.quantity,
                        " @ ₹",
                        item.price
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground flex-shrink-0", children: [
                      "₹",
                      item.price * item.quantity
                    ] })
                  ]
                },
                item.menuItemId
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
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
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground text-lg", children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-primary text-xl", children: [
                  "₹",
                  total
                ] })
              ] }),
              selectedAddressIdx === null && savedAddresses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-xl px-3 py-2 mb-3 text-center", children: "⚠️ Please select a delivery address" }),
              selectedAddressIdx === null && savedAddresses.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-xl px-3 py-2 mb-3 text-center", children: "⚠️ Please add a delivery address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => checkoutMutation.mutate(),
                  disabled: checkoutMutation.isPending || isRedirecting || selectedAddressIdx === null || actorLoading,
                  className: "btn-gradient w-full rounded-full py-3 text-base gap-2",
                  "data-ocid": "checkout-pay-stripe",
                  children: checkoutMutation.isPending || isRedirecting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                    isRedirecting ? "Redirecting..." : "Creating session..."
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    "🔒 Pay ₹",
                    total,
                    " with Stripe"
                  ] })
                }
              ),
              checkoutMutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs text-center mt-2", children: "Payment session failed. Please try again." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-3", children: "Secured by Stripe. Your payment info is never stored." })
            ] })
          ]
        }
      ) })
    ] })
  ] }) }) });
}
export {
  Checkout as default
};

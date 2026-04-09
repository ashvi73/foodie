import { j as jsxRuntimeExports, L as Link, u as useNavigate } from "./index-DnwehUM6.js";
import { B as Button } from "./button-D5t3PDVn.js";
import { S as Skeleton } from "./skeleton-BA6yISXK.js";
import { a as useActor, u as useQuery, c as createActor } from "./backend-C4anb5sy.js";
import { B as Badge } from "./Badge-CQf0QIRk.js";
import { L as Layout } from "./Layout-CMdgGqmX.js";
import { m as motion } from "./proxy-DdmWhjES.js";
import { c as createLucideIcon } from "./utensils-crossed-C5p56U27.js";
import { S as ShoppingBag } from "./shopping-bag-t5LjaFX2.js";
import { C as ChevronRight } from "./chevron-right-UDIpsfrJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
];
const Package = createLucideIcon("package", __iconNode);
const statusConfig = {
  Placed: {
    label: "Placed",
    variant: "primary",
    dot: "bg-blue-500"
  },
  Confirmed: {
    label: "Confirmed",
    variant: "warning",
    dot: "bg-amber-500"
  },
  Preparing: {
    label: "Preparing",
    variant: "warning",
    dot: "bg-orange-500"
  },
  OutForDelivery: {
    label: "Out for Delivery",
    variant: "secondary",
    dot: "bg-purple-500"
  },
  Delivered: {
    label: "Delivered",
    variant: "success",
    dot: "bg-emerald-500"
  },
  Cancelled: {
    label: "Cancelled",
    variant: "destructive",
    dot: "bg-red-500"
  }
};
function formatDate(timestamp) {
  const ms = Number(timestamp / 1000000n);
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(ms));
}
function formatPrice(paise) {
  return `₹${Number(paise / 100n).toLocaleString("en-IN")}`;
}
function OrderRowSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4 flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-14 h-14 rounded-xl flex-shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-56" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-14" })
    ] })
  ] });
}
function OrderRow({ order, index }) {
  const navigate = useNavigate();
  const statusKey = String(order.status);
  const config = statusConfig[statusKey] ?? statusConfig.Placed;
  const itemCount = order.items.reduce((sum, i) => sum + Number(i.quantity), 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35, delay: index * 0.06 },
      "data-ocid": "order-row",
      onClick: () => navigate({ to: "/orders/$id", params: { id: order.id.toString() } }),
      className: "bg-card border border-border rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-smooth group",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-7 h-7 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-base truncate", children: order.restaurantName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1 text-muted-foreground text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3.5 h-3.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: formatDate(order.createdAt) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-0.5 text-muted-foreground text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3.5 h-3.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              itemCount,
              " ",
              itemCount === 1 ? "item" : "items"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1", children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: formatPrice(order.total) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: config.variant, className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-1.5 h-1.5 rounded-full ${config.dot}` }),
            config.label
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" })
        ] })
      ]
    }
  );
}
function EmptyOrders() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.97 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.4 },
      "data-ocid": "orders-empty",
      className: "flex flex-col items-center justify-center py-24 text-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-12 h-12 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-2", children: "No orders yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-8 max-w-xs", children: "You haven't placed any orders. Discover restaurants and order your favourite food!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/restaurants", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "btn-gradient rounded-full px-8 py-2.5 h-auto",
            "data-ocid": "browse-restaurants-cta",
            children: "Browse Restaurants"
          }
        ) })
      ]
    }
  );
}
function Orders() {
  const { actor, isFetching: actorLoading } = useActor(createActor);
  const { data: orders, isLoading } = useQuery({
    queryKey: ["user-orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listUserOrders();
    },
    enabled: !!actor && !actorLoading
  });
  const sorted = orders ? [...orders].sort((a, b) => Number(b.createdAt - a.createdAt)) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
        className: "mb-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "My Orders" }),
          orders && orders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1 text-sm", children: [
            orders.length,
            " ",
            orders.length === 1 ? "order" : "orders",
            " placed"
          ] })
        ]
      }
    ),
    isLoading || actorLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "orders-loading", children: ["s1", "s2", "s3", "s4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderRowSkeleton, {}, k)) }) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyOrders, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "orders-list", children: sorted.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderRow, { order, index: i }, order.id.toString())) })
  ] }) });
}
export {
  Orders as default
};

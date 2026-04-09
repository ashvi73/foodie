import { b as useAuth, r as reactExports, j as jsxRuntimeExports, F as FullPageSpinner, N as Navigate, L as Link } from "./index-DnwehUM6.js";
import { a as useActor, O as OrderStatus, c as createActor } from "./backend-C4anb5sy.js";
import { L as Layout } from "./Layout-CMdgGqmX.js";
import { c as createLucideIcon, U as UtensilsCrossed } from "./utensils-crossed-C5p56U27.js";
import { S as ShoppingBag } from "./shopping-bag-t5LjaFX2.js";
import { C as Clock } from "./clock-BmlPv7li.js";
import { U as Users, T as TrendingUp } from "./users-D_o_boGl.js";
import { C as ChevronRight } from "./chevron-right-UDIpsfrJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode$1);
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
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
function AdminSidebar({ active }) {
  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { label: "Restaurants", icon: UtensilsCrossed, path: "/admin/restaurants" },
    { label: "Orders", icon: ShoppingBag, path: "/admin/orders" },
    { label: "Users", icon: Users, path: "/admin/users" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "w-64 bg-card border-r border-border flex flex-col min-h-full shrink-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg btn-gradient flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "w-4 h-4 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground", children: "Admin Panel" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 p-4 space-y-1", children: navItems.map((item) => {
      const isActive = active === item.path;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: item.path,
          className: `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-smooth ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`,
          "data-ocid": `admin-nav-${item.label.toLowerCase()}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-4 h-4 shrink-0" }),
            item.label
          ]
        },
        item.path
      );
    }) })
  ] });
}
function StatCard({
  label,
  value,
  icon: Icon,
  colorClass,
  sub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5 flex items-center gap-4 card-elevated", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-foreground", children: value }),
      sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: sub })
    ] })
  ] });
}
function Admin() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { actor, isFetching } = useActor(createActor);
  const [isAdmin, setIsAdmin] = reactExports.useState(null);
  const [restaurants, setRestaurants] = reactExports.useState([]);
  const [orders, setOrders] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (!actor || isFetching) return;
    async function load() {
      try {
        const [adminCheck, rList, oList] = await Promise.all([
          actor.isCallerAdmin(),
          actor.listRestaurants(),
          actor.listAllOrders()
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FullPageSpinner, { label: "Loading dashboard..." });
  if (!isAuthenticated) return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/login" });
  if (isAdmin === false) return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/" });
  const pending = orders.filter(
    (o) => o.status === OrderStatus.Placed || o.status === OrderStatus.Confirmed
  ).length;
  const delivered = orders.filter(
    (o) => o.status === OrderStatus.Delivered
  ).length;
  const activeRestaurants = restaurants.filter((r) => r.isActive).length;
  const uniqueUsers = new Set(orders.map((o) => o.userId.toText())).size;
  const recentOrders = [...orders].sort((a, b) => Number(b.createdAt - a.createdAt)).slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { hideFooter: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 min-h-[calc(100vh-64px)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminSidebar, { active: "/admin" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-8 bg-background overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Overview of your Foodie platform" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Restaurants",
            value: restaurants.length,
            icon: UtensilsCrossed,
            colorClass: "bg-primary/15 text-primary",
            sub: `${activeRestaurants} active`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Total Orders",
            value: orders.length,
            icon: ShoppingBag,
            colorClass: "bg-secondary/15 text-secondary",
            sub: `${delivered} delivered`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Pending Orders",
            value: pending,
            icon: Clock,
            colorClass: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
            sub: "needs attention"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Unique Users",
            value: uniqueUsers,
            icon: Users,
            colorClass: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
            sub: "placed orders"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-8", children: [
        {
          label: "Manage Restaurants",
          path: "/admin/restaurants",
          icon: UtensilsCrossed,
          desc: "Add, edit & toggle status"
        },
        {
          label: "Manage Orders",
          path: "/admin/orders",
          icon: ShoppingBag,
          desc: "View & update order statuses"
        },
        {
          label: "View Users",
          path: "/admin/users",
          icon: Users,
          desc: "See all platform users"
        }
      ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: item.path,
          className: "bg-card border border-border rounded-2xl p-5 flex items-center gap-4 hover:border-primary/50 hover:shadow-md transition-smooth group",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: item.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: item.desc })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" })
          ]
        },
        item.path
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
            "Recent Orders"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/admin/orders",
              className: "text-sm text-primary hover:underline font-medium",
              children: "View all"
            }
          )
        ] }),
        recentOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-10 text-center text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-8 h-8 mx-auto mb-2 opacity-40" }),
          "No orders yet"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: recentOrders.map((order) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center px-6 py-3 gap-4 hover:bg-muted/40 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm truncate", children: order.restaurantName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                  order.userId.toText().slice(0, 20),
                  "..."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground text-sm shrink-0", children: [
                "₹",
                (Number(order.total) / 100).toFixed(0)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.status })
            ]
          },
          order.id.toString()
        )) })
      ] })
    ] }) })
  ] }) });
}
function StatusBadge({ status }) {
  const map = {
    [OrderStatus.Placed]: {
      label: "Placed",
      className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
    },
    [OrderStatus.Confirmed]: {
      label: "Confirmed",
      className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
    },
    [OrderStatus.Preparing]: {
      label: "Preparing",
      className: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
    },
    [OrderStatus.OutForDelivery]: {
      label: "Out for Delivery",
      className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
    },
    [OrderStatus.Delivered]: {
      label: "Delivered",
      className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
    },
    [OrderStatus.Cancelled]: {
      label: "Cancelled",
      className: "bg-destructive/15 text-destructive"
    }
  };
  const { label, className } = map[status] ?? {
    label: status,
    className: "bg-muted text-muted-foreground"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${className}`,
      children: label
    }
  );
}
export {
  AdminSidebar,
  StatusBadge,
  Admin as default
};

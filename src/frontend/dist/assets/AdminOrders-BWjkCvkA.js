import { b as useAuth, r as reactExports, j as jsxRuntimeExports, F as FullPageSpinner, N as Navigate } from "./index-DnwehUM6.js";
import { a as useActor, O as OrderStatus, c as createActor } from "./backend-C4anb5sy.js";
import { u as ue } from "./index-BlmAZSpX.js";
import { L as Layout, C as ChevronDown } from "./Layout-CMdgGqmX.js";
import { M as Modal } from "./Modal-C8oW4IhX.js";
import { AdminSidebar, StatusBadge } from "./Admin-CoEdNwjo.js";
import { C as CircleAlert } from "./circle-alert-Cmxr47Yg.js";
import "./utensils-crossed-C5p56U27.js";
import "./shopping-bag-t5LjaFX2.js";
import "./clock-BmlPv7li.js";
import "./users-D_o_boGl.js";
import "./chevron-right-UDIpsfrJ.js";
const STATUS_OPTIONS = [
  OrderStatus.Placed,
  OrderStatus.Confirmed,
  OrderStatus.Preparing,
  OrderStatus.OutForDelivery,
  OrderStatus.Delivered,
  OrderStatus.Cancelled
];
const STATUS_LABELS = {
  [OrderStatus.Placed]: "Placed",
  [OrderStatus.Confirmed]: "Confirmed",
  [OrderStatus.Preparing]: "Preparing",
  [OrderStatus.OutForDelivery]: "Out for Delivery",
  [OrderStatus.Delivered]: "Delivered",
  [OrderStatus.Cancelled]: "Cancelled"
};
function isActiveStatus(status) {
  return [
    OrderStatus.Placed,
    OrderStatus.Confirmed,
    OrderStatus.Preparing,
    OrderStatus.OutForDelivery
  ].includes(status);
}
function AdminOrders() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { actor, isFetching } = useActor(createActor);
  const [isAdmin, setIsAdmin] = reactExports.useState(null);
  const [orders, setOrders] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [activeTab, setActiveTab] = reactExports.useState("all");
  const [expandedOrder, setExpandedOrder] = reactExports.useState(null);
  const [updatingId, setUpdatingId] = reactExports.useState(null);
  const loadData = reactExports.useCallback(async () => {
    if (!actor) return;
    const [adminCheck, list] = await Promise.all([
      actor.isCallerAdmin(),
      actor.listAllOrders()
    ]);
    setIsAdmin(adminCheck);
    setOrders([...list].sort((a, b) => Number(b.createdAt - a.createdAt)));
    setLoading(false);
  }, [actor]);
  reactExports.useEffect(() => {
    if (!actor || isFetching) return;
    loadData();
  }, [actor, isFetching, loadData]);
  const handleStatusChange = async (orderId, newStatus) => {
    if (!actor) return;
    setUpdatingId(orderId);
    try {
      await actor.updateOrderStatus(orderId, newStatus);
      setOrders(
        (prev) => prev.map((o) => o.id === orderId ? { ...o, status: newStatus } : o)
      );
      if ((expandedOrder == null ? void 0 : expandedOrder.id) === orderId) {
        setExpandedOrder(
          (prev) => prev ? { ...prev, status: newStatus } : prev
        );
      }
      ue.success("Order status updated");
    } catch {
      ue.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };
  const filtered = orders.filter((o) => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return isActiveStatus(o.status);
    if (activeTab === "delivered") return o.status === OrderStatus.Delivered;
    if (activeTab === "cancelled") return o.status === OrderStatus.Cancelled;
    return true;
  });
  if (authLoading || loading || isFetching)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FullPageSpinner, { label: "Loading orders..." });
  if (!isAuthenticated) return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/login" });
  if (isAdmin === false) return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/" });
  const tabs = [
    { key: "all", label: "All Orders", count: orders.length },
    {
      key: "active",
      label: "Active",
      count: orders.filter((o) => isActiveStatus(o.status)).length
    },
    {
      key: "delivered",
      label: "Delivered",
      count: orders.filter((o) => o.status === OrderStatus.Delivered).length
    },
    {
      key: "cancelled",
      label: "Cancelled",
      count: orders.filter((o) => o.status === OrderStatus.Cancelled).length
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { hideFooter: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 min-h-[calc(100vh-64px)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdminSidebar, { active: "/admin/orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-8 bg-background overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto fade-in", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Orders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1", children: [
            orders.length,
            " total orders"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-2 mb-6 flex-wrap",
            "data-ocid": "admin-orders-tabs",
            children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setActiveTab(tab.key),
                className: `flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-smooth ${activeTab === tab.key ? "bg-primary text-primary-foreground shadow-sm" : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"}`,
                "data-ocid": `admin-tab-${tab.key}`,
                children: [
                  tab.label,
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold ${activeTab === tab.key ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`,
                      children: tab.count
                    }
                  )
                ]
              },
              tab.key
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-semibold text-foreground", children: "Order" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-semibold text-foreground hidden md:table-cell", children: "Restaurant" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-semibold text-foreground hidden lg:table-cell", children: "Customer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-semibold text-foreground", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-semibold text-foreground hidden sm:table-cell", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-semibold text-foreground", children: "Update" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-border", children: [
            filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "td",
              {
                colSpan: 6,
                className: "px-4 py-12 text-center text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 mx-auto mb-2 opacity-40" }),
                  "No orders in this category"
                ]
              }
            ) }),
            filtered.map((order) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "hover:bg-muted/20 transition-colors cursor-pointer",
                onClick: () => setExpandedOrder(order),
                onKeyDown: (e) => e.key === "Enter" && setExpandedOrder(order),
                tabIndex: 0,
                "data-ocid": "admin-order-row",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-foreground font-mono text-xs", children: [
                      "#",
                      order.id.toString().slice(-6).padStart(6, "0")
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(
                      Number(order.createdAt) / 1e6
                    ).toLocaleDateString() })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden md:table-cell truncate max-w-[140px]", children: order.restaurantName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
                    order.userId.toText().slice(0, 12),
                    "..."
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-semibold text-foreground", children: [
                    "₹",
                    (Number(order.total) / 100).toFixed(0)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "td",
                    {
                      className: "px-4 py-3 hidden sm:table-cell",
                      onClick: (e) => e.stopPropagation(),
                      onKeyDown: (e) => e.stopPropagation(),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.status })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "td",
                    {
                      className: "px-4 py-3",
                      onClick: (e) => e.stopPropagation(),
                      onKeyDown: (e) => e.stopPropagation(),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "select",
                          {
                            value: order.status,
                            disabled: updatingId === order.id,
                            onChange: (e) => handleStatusChange(
                              order.id,
                              e.target.value
                            ),
                            className: "appearance-none pl-3 pr-8 py-1.5 rounded-lg border border-input bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer disabled:opacity-50",
                            "data-ocid": "admin-order-status-select",
                            children: STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: STATUS_LABELS[s] }, s))
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" })
                      ] }) })
                    }
                  )
                ]
              },
              order.id.toString()
            ))
          ] })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: expandedOrder !== null,
        onClose: () => setExpandedOrder(null),
        title: `Order #${expandedOrder == null ? void 0 : expandedOrder.id.toString().slice(-6).padStart(6, "0")}`,
        size: "lg",
        children: expandedOrder && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Restaurant" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: expandedOrder.restaurantName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: expandedOrder.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium mb-2", children: "Customer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-foreground break-all", children: expandedOrder.userId.toText() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium mb-2", children: "Items" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: expandedOrder.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                    item.name,
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                      "x",
                      item.quantity.toString()
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                    "₹",
                    (Number(item.price) / 100).toFixed(0)
                  ] })
                ]
              },
              `item-${i}-${item.menuItemId.toString()}`
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-3 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "₹",
                (Number(expandedOrder.subtotal) / 100).toFixed(0)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Delivery" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "₹",
                (Number(expandedOrder.deliveryFee) / 100).toFixed(0)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tax" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "₹",
                (Number(expandedOrder.tax) / 100).toFixed(0)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "₹",
                (Number(expandedOrder.total) / 100).toFixed(0)
              ] })
            ] })
          ] }),
          expandedOrder.deliveryAddress && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium mb-1", children: "Delivery Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: expandedOrder.deliveryAddress })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "order-detail-status",
                className: "text-sm font-medium text-foreground shrink-0",
                children: "Update Status:"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "select",
                {
                  id: "order-detail-status",
                  value: expandedOrder.status,
                  disabled: updatingId === expandedOrder.id,
                  onChange: (e) => handleStatusChange(
                    expandedOrder.id,
                    e.target.value
                  ),
                  className: "w-full appearance-none pl-3 pr-8 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50",
                  "data-ocid": "admin-order-detail-status",
                  children: STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: STATUS_LABELS[s] }, s))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" })
            ] })
          ] })
        ] })
      }
    )
  ] });
}
export {
  AdminOrders as default
};

import { useActor } from "@caffeineai/core-infrastructure";
import { Navigate } from "@tanstack/react-router";
import { AlertCircle, ChevronDown } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import { OrderStatus } from "../backend";
import type { Order } from "../backend.d.ts";
import { Layout } from "../components/Layout";
import { FullPageSpinner } from "../components/LoadingSpinner";
import { Modal } from "../components/Modal";
import { useAuth } from "../hooks/useAuth";
import { AdminSidebar, StatusBadge } from "./Admin";

const STATUS_OPTIONS = [
  OrderStatus.Placed,
  OrderStatus.Confirmed,
  OrderStatus.Preparing,
  OrderStatus.OutForDelivery,
  OrderStatus.Delivered,
  OrderStatus.Cancelled,
];

const STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.Placed]: "Placed",
  [OrderStatus.Confirmed]: "Confirmed",
  [OrderStatus.Preparing]: "Preparing",
  [OrderStatus.OutForDelivery]: "Out for Delivery",
  [OrderStatus.Delivered]: "Delivered",
  [OrderStatus.Cancelled]: "Cancelled",
};

type FilterTab = "all" | "active" | "delivered" | "cancelled";

function isActiveStatus(status: OrderStatus) {
  return [
    OrderStatus.Placed,
    OrderStatus.Confirmed,
    OrderStatus.Preparing,
    OrderStatus.OutForDelivery,
  ].includes(status);
}

export default function AdminOrders() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { actor, isFetching } = useActor(createActor);

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [expandedOrder, setExpandedOrder] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<bigint | null>(null);

  const loadData = useCallback(async () => {
    if (!actor) return;
    const [adminCheck, list] = await Promise.all([
      actor.isCallerAdmin(),
      actor.listAllOrders(),
    ]);
    setIsAdmin(adminCheck);
    setOrders([...list].sort((a, b) => Number(b.createdAt - a.createdAt)));
    setLoading(false);
  }, [actor]);

  useEffect(() => {
    if (!actor || isFetching) return;
    loadData();
  }, [actor, isFetching, loadData]);

  const handleStatusChange = async (
    orderId: bigint,
    newStatus: OrderStatus,
  ) => {
    if (!actor) return;
    setUpdatingId(orderId);
    try {
      await actor.updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
      );
      if (expandedOrder?.id === orderId) {
        setExpandedOrder((prev) =>
          prev ? { ...prev, status: newStatus } : prev,
        );
      }
      toast.success("Order status updated");
    } catch {
      toast.error("Failed to update status");
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
    return <FullPageSpinner label="Loading orders..." />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (isAdmin === false) return <Navigate to="/" />;

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "all", label: "All Orders", count: orders.length },
    {
      key: "active",
      label: "Active",
      count: orders.filter((o) => isActiveStatus(o.status)).length,
    },
    {
      key: "delivered",
      label: "Delivered",
      count: orders.filter((o) => o.status === OrderStatus.Delivered).length,
    },
    {
      key: "cancelled",
      label: "Cancelled",
      count: orders.filter((o) => o.status === OrderStatus.Cancelled).length,
    },
  ];

  return (
    <Layout hideFooter>
      <div className="flex flex-1 min-h-[calc(100vh-64px)]">
        <AdminSidebar active="/admin/orders" />
        <main className="flex-1 p-8 bg-background overflow-auto">
          <div className="max-w-5xl mx-auto fade-in">
            <div className="mb-6">
              <h1 className="font-display text-3xl font-bold text-foreground">
                Orders
              </h1>
              <p className="text-muted-foreground mt-1">
                {orders.length} total orders
              </p>
            </div>

            {/* Filter Tabs */}
            <div
              className="flex gap-2 mb-6 flex-wrap"
              data-ocid="admin-orders-tabs"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-smooth ${
                    activeTab === tab.key
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                  }`}
                  data-ocid={`admin-tab-${tab.key}`}
                >
                  {tab.label}
                  <span
                    className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold ${
                      activeTab === tab.key
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Order
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground hidden md:table-cell">
                      Restaurant
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground hidden lg:table-cell">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-foreground">
                      Total
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground hidden sm:table-cell">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-foreground">
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-12 text-center text-muted-foreground"
                      >
                        <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-40" />
                        No orders in this category
                      </td>
                    </tr>
                  )}
                  {filtered.map((order) => (
                    <tr
                      key={order.id.toString()}
                      className="hover:bg-muted/20 transition-colors cursor-pointer"
                      onClick={() => setExpandedOrder(order)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && setExpandedOrder(order)
                      }
                      tabIndex={0}
                      data-ocid="admin-order-row"
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-foreground font-mono text-xs">
                          #{order.id.toString().slice(-6).padStart(6, "0")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(
                            Number(order.createdAt) / 1_000_000,
                          ).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell truncate max-w-[140px]">
                        {order.restaurantName}
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className="font-mono text-xs text-muted-foreground">
                          {order.userId.toText().slice(0, 12)}...
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-foreground">
                        ₹{(Number(order.total) / 100).toFixed(0)}
                      </td>
                      <td
                        className="px-4 py-3 hidden sm:table-cell"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      >
                        <StatusBadge status={order.status} />
                      </td>
                      <td
                        className="px-4 py-3"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      >
                        <div className="flex justify-end">
                          <div className="relative">
                            <select
                              value={order.status}
                              disabled={updatingId === order.id}
                              onChange={(e) =>
                                handleStatusChange(
                                  order.id,
                                  e.target.value as OrderStatus,
                                )
                              }
                              className="appearance-none pl-3 pr-8 py-1.5 rounded-lg border border-input bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer disabled:opacity-50"
                              data-ocid="admin-order-status-select"
                            >
                              {STATUS_OPTIONS.map((s) => (
                                <option key={s} value={s}>
                                  {STATUS_LABELS[s]}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Order Detail Modal */}
      <Modal
        isOpen={expandedOrder !== null}
        onClose={() => setExpandedOrder(null)}
        title={`Order #${expandedOrder?.id.toString().slice(-6).padStart(6, "0")}`}
        size="lg"
      >
        {expandedOrder && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Restaurant</p>
                <p className="font-semibold text-foreground">
                  {expandedOrder.restaurantName}
                </p>
              </div>
              <StatusBadge status={expandedOrder.status} />
            </div>

            <div className="bg-muted/40 rounded-xl p-4">
              <p className="text-xs text-muted-foreground font-medium mb-2">
                Customer
              </p>
              <p className="font-mono text-xs text-foreground break-all">
                {expandedOrder.userId.toText()}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground font-medium mb-2">
                Items
              </p>
              <div className="space-y-2">
                {expandedOrder.items.map((item, i) => (
                  <div
                    key={`item-${i}-${item.menuItemId.toString()}`}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-foreground">
                      {item.name}{" "}
                      <span className="text-muted-foreground">
                        x{item.quantity.toString()}
                      </span>
                    </span>
                    <span className="font-medium text-foreground">
                      ₹{(Number(item.price) / 100).toFixed(0)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-3 space-y-1">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>
                  ₹{(Number(expandedOrder.subtotal) / 100).toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Delivery</span>
                <span>
                  ₹{(Number(expandedOrder.deliveryFee) / 100).toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Tax</span>
                <span>₹{(Number(expandedOrder.tax) / 100).toFixed(0)}</span>
              </div>
              <div className="flex justify-between font-bold text-foreground">
                <span>Total</span>
                <span>₹{(Number(expandedOrder.total) / 100).toFixed(0)}</span>
              </div>
            </div>

            {expandedOrder.deliveryAddress && (
              <div className="bg-muted/40 rounded-xl p-3">
                <p className="text-xs text-muted-foreground font-medium mb-1">
                  Delivery Address
                </p>
                <p className="text-sm text-foreground">
                  {expandedOrder.deliveryAddress}
                </p>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <label
                htmlFor="order-detail-status"
                className="text-sm font-medium text-foreground shrink-0"
              >
                Update Status:
              </label>
              <div className="relative flex-1">
                <select
                  id="order-detail-status"
                  value={expandedOrder.status}
                  disabled={updatingId === expandedOrder.id}
                  onChange={(e) =>
                    handleStatusChange(
                      expandedOrder.id,
                      e.target.value as OrderStatus,
                    )
                  }
                  className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                  data-ocid="admin-order-detail-status"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
}

import { useActor } from "@caffeineai/core-infrastructure";
import { Navigate } from "@tanstack/react-router";
import {
  AlertCircle,
  Calendar,
  Eye,
  Mail,
  Phone,
  ShoppingBag,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { createActor } from "../backend";
import type { Order, UserProfile } from "../backend.d.ts";
import { Layout } from "../components/Layout";
import { FullPageSpinner } from "../components/LoadingSpinner";
import { Modal } from "../components/Modal";
import { useAuth } from "../hooks/useAuth";
import { AdminSidebar } from "./Admin";

interface AggregatedUser {
  principalText: string;
  profile: UserProfile | null;
  orderCount: number;
  totalSpent: bigint;
  lastOrderDate: bigint;
  userId: Order["userId"];
}

export default function AdminUsers() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { actor, isFetching } = useActor(createActor);

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [users, setUsers] = useState<AggregatedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<AggregatedUser | null>(null);
  const [search, setSearch] = useState("");

  const loadData = useCallback(async () => {
    if (!actor) return;
    const [adminCheck, allOrders] = await Promise.all([
      actor.isCallerAdmin(),
      actor.listAllOrders(),
    ]);
    setIsAdmin(adminCheck);

    // Aggregate unique users from all orders
    const userMap = new Map<
      string,
      { orders: Order[]; userId: Order["userId"] }
    >();
    for (const order of allOrders) {
      const key = order.userId.toText();
      if (!userMap.has(key))
        userMap.set(key, { orders: [], userId: order.userId });
      userMap.get(key)!.orders.push(order);
    }

    // Fetch profiles for each unique user
    const aggregated: AggregatedUser[] = await Promise.all(
      Array.from(userMap.entries()).map(async ([principalText, data]) => {
        let profile: UserProfile | null = null;
        try {
          profile = await actor.getUserProfile(data.userId);
        } catch {
          // profile may not exist — silently ignore
        }
        const totalSpent = data.orders.reduce(
          (sum, o) => sum + o.total,
          BigInt(0),
        );
        const lastOrderDate = data.orders.reduce(
          (max, o) => (o.createdAt > max ? o.createdAt : max),
          BigInt(0),
        );
        return {
          principalText,
          profile,
          orderCount: data.orders.length,
          totalSpent,
          lastOrderDate,
          userId: data.userId,
        };
      }),
    );

    setUsers(
      aggregated.sort((a, b) => Number(b.lastOrderDate - a.lastOrderDate)),
    );
    setLoading(false);
  }, [actor]);

  useEffect(() => {
    if (!actor || isFetching) return;
    loadData();
  }, [actor, isFetching, loadData]);

  const filteredUsers = users.filter((u) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      u.principalText.toLowerCase().includes(q) ||
      (u.profile?.name ?? "").toLowerCase().includes(q) ||
      (u.profile?.email ?? "").toLowerCase().includes(q)
    );
  });

  if (authLoading || loading || isFetching)
    return <FullPageSpinner label="Loading users..." />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (isAdmin === false) return <Navigate to="/" />;

  return (
    <Layout hideFooter>
      <div className="flex flex-1 min-h-[calc(100vh-64px)]">
        <AdminSidebar active="/admin/users" />
        <main className="flex-1 p-8 bg-background overflow-auto">
          <div className="max-w-5xl mx-auto fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground">
                  Users
                </h1>
                <p className="text-muted-foreground mt-1">
                  {users.length} unique users
                </p>
              </div>
              <div className="flex items-center gap-2 bg-card border border-input rounded-xl px-3 py-2">
                <Users className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Search by name, email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none w-52"
                  data-ocid="admin-users-search"
                />
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      User
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground hidden md:table-cell">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground hidden lg:table-cell">
                      Phone
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-foreground">
                      Orders
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-foreground hidden sm:table-cell">
                      Spent
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-foreground">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-12 text-center text-muted-foreground"
                      >
                        <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-40" />
                        {search
                          ? "No users match your search"
                          : "No users have placed orders yet"}
                      </td>
                    </tr>
                  )}
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.principalText}
                      className="hover:bg-muted/20 transition-colors"
                      data-ocid="admin-user-row"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-primary">
                              {user.profile?.name?.[0]?.toUpperCase() ?? "?"}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-foreground truncate">
                              {user.profile?.name || "Unknown User"}
                            </p>
                            <p className="text-xs font-mono text-muted-foreground truncate max-w-[160px]">
                              {user.principalText.slice(0, 16)}...
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell truncate max-w-[160px]">
                        {user.profile?.email || "—"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                        {user.profile?.phone || "—"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                          <ShoppingBag className="w-3.5 h-3.5 text-muted-foreground" />
                          {user.orderCount}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-foreground hidden sm:table-cell">
                        ₹{(Number(user.totalSpent) / 100).toFixed(0)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedUser(user)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/70 text-foreground text-xs font-medium transition-colors"
                          aria-label="View user profile"
                          data-ocid="admin-view-user"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* User Detail Modal */}
      <Modal
        isOpen={selectedUser !== null}
        onClose={() => setSelectedUser(null)}
        title="User Profile"
        size="md"
      >
        {selectedUser && (
          <div className="space-y-4">
            {/* Avatar + name */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                <span className="text-xl font-bold text-primary">
                  {selectedUser.profile?.name?.[0]?.toUpperCase() ?? "?"}
                </span>
              </div>
              <div>
                <p className="font-display font-bold text-xl text-foreground">
                  {selectedUser.profile?.name || "Unknown User"}
                </p>
                {selectedUser.profile?.isAdmin && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/15 text-primary">
                    Admin
                  </span>
                )}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-muted/40 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-foreground">
                  {selectedUser.profile?.email || "No email provided"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-foreground">
                  {selectedUser.profile?.phone || "No phone provided"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-foreground">
                  Joined{" "}
                  {selectedUser.profile?.createdAt
                    ? new Date(
                        Number(selectedUser.profile.createdAt) / 1_000_000,
                      ).toLocaleDateString()
                    : "unknown"}
                </span>
              </div>
            </div>

            {/* Order summary */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/40 rounded-xl p-4 text-center">
                <p className="font-display text-2xl font-bold text-foreground">
                  {selectedUser.orderCount}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Total Orders
                </p>
              </div>
              <div className="bg-muted/40 rounded-xl p-4 text-center">
                <p className="font-display text-2xl font-bold text-foreground">
                  ₹{(Number(selectedUser.totalSpent) / 100).toFixed(0)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Total Spent
                </p>
              </div>
            </div>

            {/* Principal */}
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">
                Principal ID
              </p>
              <p className="font-mono text-xs text-foreground bg-muted/40 rounded-lg px-3 py-2 break-all">
                {selectedUser.principalText}
              </p>
            </div>

            {/* Saved addresses */}
            {selectedUser.profile?.savedAddresses &&
              selectedUser.profile.savedAddresses.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-2">
                    Saved Addresses
                  </p>
                  <div className="space-y-2">
                    {selectedUser.profile.savedAddresses.map((addr, i) => (
                      <div
                        key={`addr-${i}-${addr.tag}`}
                        className="bg-muted/40 rounded-xl p-3 text-sm text-foreground"
                      >
                        <p className="font-medium">{addr.tag}</p>
                        <p className="text-muted-foreground text-xs">
                          {addr.street}, {addr.city}, {addr.state}{" "}
                          {addr.postalCode}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        )}
      </Modal>
    </Layout>
  );
}

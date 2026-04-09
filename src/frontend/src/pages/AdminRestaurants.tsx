import { useActor } from "@caffeineai/core-infrastructure";
import { Navigate } from "@tanstack/react-router";
import {
  AlertCircle,
  Pencil,
  Plus,
  ToggleLeft,
  ToggleRight,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import type { Restaurant, RestaurantInput } from "../backend.d.ts";
import { Layout } from "../components/Layout";
import { FullPageSpinner } from "../components/LoadingSpinner";
import { Modal } from "../components/Modal";
import { useAuth } from "../hooks/useAuth";
import { AdminSidebar } from "./Admin";

const CATEGORIES = [
  "Indian",
  "Chinese",
  "Pizza",
  "Burgers",
  "Biryani",
  "Rolls",
  "Desserts",
  "Multi-cuisine",
  "Continental",
];

interface RestaurantFormData {
  name: string;
  category: string;
  description: string;
  address: string;
  phone: string;
  deliveryFee: string;
  deliveryTimeMinutes: string;
}

const defaultForm: RestaurantFormData = {
  name: "",
  category: "Indian",
  description: "",
  address: "",
  phone: "",
  deliveryFee: "0",
  deliveryTimeMinutes: "30",
};

export default function AdminRestaurants() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { actor, isFetching } = useActor(createActor);

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<bigint | null>(null);
  const [form, setForm] = useState<RestaurantFormData>(defaultForm);

  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const loadData = useCallback(async () => {
    if (!actor) return;
    const [adminCheck, list] = await Promise.all([
      actor.isCallerAdmin(),
      actor.listRestaurants(),
    ]);
    setIsAdmin(adminCheck);
    setRestaurants(list);
    setLoading(false);
  }, [actor]);

  useEffect(() => {
    if (!actor || isFetching) return;
    loadData();
  }, [actor, isFetching, loadData]);

  const openAdd = () => {
    setEditingId(null);
    setForm(defaultForm);
    setShowForm(true);
  };

  const openEdit = (r: Restaurant) => {
    setEditingId(r.id);
    setForm({
      name: r.name,
      category: r.category,
      description: r.description,
      address: r.address,
      phone: r.phone,
      deliveryFee: String(r.deliveryFee),
      deliveryTimeMinutes: String(r.deliveryTimeMinutes),
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setSubmitting(true);
    const input: RestaurantInput = {
      name: form.name,
      category: form.category,
      description: form.description,
      address: form.address,
      phone: form.phone,
      deliveryFee: BigInt(Number(form.deliveryFee)),
      deliveryTimeMinutes: BigInt(Number(form.deliveryTimeMinutes)),
    };
    try {
      if (editingId !== null) {
        await actor.updateRestaurant(editingId, input);
        toast.success("Restaurant updated successfully");
      } else {
        await actor.addRestaurant(input);
        toast.success("Restaurant added successfully");
      }
      setShowForm(false);
      await loadData();
    } catch {
      toast.error("Failed to save restaurant");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (r: Restaurant) => {
    if (!actor) return;
    try {
      await actor.toggleRestaurantStatus(r.id);
      setRestaurants((prev) =>
        prev.map((x) => (x.id === r.id ? { ...x, isActive: !x.isActive } : x)),
      );
      toast.success(`Restaurant ${r.isActive ? "deactivated" : "activated"}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const confirmDelete = (id: bigint) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (!actor || deleteId === null) return;
    try {
      await actor.deleteRestaurant(deleteId);
      setRestaurants((prev) => prev.filter((r) => r.id !== deleteId));
      toast.success("Restaurant deleted");
    } catch {
      toast.error("Failed to delete restaurant");
    } finally {
      setShowDeleteConfirm(false);
      setDeleteId(null);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (authLoading || loading || isFetching)
    return <FullPageSpinner label="Loading restaurants..." />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (isAdmin === false) return <Navigate to="/" />;

  return (
    <Layout hideFooter>
      <div className="flex flex-1 min-h-[calc(100vh-64px)]">
        <AdminSidebar active="/admin/restaurants" />
        <main className="flex-1 p-8 bg-background overflow-auto">
          <div className="max-w-5xl mx-auto fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground">
                  Restaurants
                </h1>
                <p className="text-muted-foreground mt-1">
                  {restaurants.length} restaurants total
                </p>
              </div>
              <button
                type="button"
                onClick={openAdd}
                className="btn-gradient flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
                data-ocid="admin-add-restaurant"
              >
                <Plus className="w-4 h-4" />
                Add Restaurant
              </button>
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground hidden md:table-cell">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground hidden lg:table-cell">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-foreground hidden md:table-cell">
                      Delivery Fee
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {restaurants.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-12 text-center text-muted-foreground"
                      >
                        <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-40" />
                        No restaurants yet. Add one to get started.
                      </td>
                    </tr>
                  )}
                  {restaurants.map((r) => (
                    <tr
                      key={r.id.toString()}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium text-foreground truncate max-w-[200px]">
                          {r.name}
                        </div>
                        <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {r.address}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                        {r.category}
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            r.isActive
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {r.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-muted-foreground hidden md:table-cell">
                        ₹{(Number(r.deliveryFee) / 100).toFixed(0)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => openEdit(r)}
                            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Edit restaurant"
                            data-ocid="admin-edit-restaurant"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggle(r)}
                            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Toggle status"
                            data-ocid="admin-toggle-restaurant"
                          >
                            {r.isActive ? (
                              <ToggleRight className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <ToggleLeft className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => confirmDelete(r.id)}
                            className="p-1.5 rounded-lg hover:bg-destructive/15 text-muted-foreground hover:text-destructive transition-colors"
                            aria-label="Delete restaurant"
                            data-ocid="admin-delete-restaurant"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
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

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={editingId !== null ? "Edit Restaurant" : "Add Restaurant"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label
                className="block text-sm font-medium text-foreground mb-1"
                htmlFor="name"
              >
                Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="admin-restaurant-name"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-foreground mb-1"
                htmlFor="category"
              >
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="admin-restaurant-category"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-foreground mb-1"
                htmlFor="phone"
              >
                Phone *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={form.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="admin-restaurant-phone"
              />
            </div>
            <div className="col-span-2">
              <label
                className="block text-sm font-medium text-foreground mb-1"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={2}
                value={form.description}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                data-ocid="admin-restaurant-description"
              />
            </div>
            <div className="col-span-2">
              <label
                className="block text-sm font-medium text-foreground mb-1"
                htmlFor="address"
              >
                Address *
              </label>
              <input
                id="address"
                name="address"
                type="text"
                required
                value={form.address}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="admin-restaurant-address"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-foreground mb-1"
                htmlFor="deliveryFee"
              >
                Delivery Fee (paise)
              </label>
              <input
                id="deliveryFee"
                name="deliveryFee"
                type="number"
                min="0"
                value={form.deliveryFee}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="admin-restaurant-delivery-fee"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-foreground mb-1"
                htmlFor="deliveryTimeMinutes"
              >
                Delivery Time (mins)
              </label>
              <input
                id="deliveryTimeMinutes"
                name="deliveryTimeMinutes"
                type="number"
                min="5"
                value={form.deliveryTimeMinutes}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="admin-restaurant-delivery-time"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-xl border border-border text-foreground text-sm hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-gradient px-4 py-2 rounded-xl text-sm disabled:opacity-50"
              data-ocid="admin-restaurant-submit"
            >
              {submitting
                ? "Saving..."
                : editingId !== null
                  ? "Update"
                  : "Add Restaurant"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Delete Restaurant"
        size="sm"
      >
        <p className="text-muted-foreground text-sm mb-6">
          Are you sure you want to delete this restaurant? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(false)}
            className="px-4 py-2 rounded-xl border border-border text-foreground text-sm hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 rounded-xl bg-destructive text-destructive-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            data-ocid="admin-confirm-delete"
          >
            Delete
          </button>
        </div>
      </Modal>
    </Layout>
  );
}

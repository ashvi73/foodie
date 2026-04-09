import { b as useAuth, r as reactExports, j as jsxRuntimeExports, F as FullPageSpinner, N as Navigate } from "./index-DnwehUM6.js";
import { a as useActor, c as createActor } from "./backend-C4anb5sy.js";
import { u as ue } from "./index-BlmAZSpX.js";
import { L as Layout } from "./Layout-CMdgGqmX.js";
import { M as Modal } from "./Modal-C8oW4IhX.js";
import { AdminSidebar } from "./Admin-CoEdNwjo.js";
import { P as Plus } from "./plus-Bhp6GNZS.js";
import { C as CircleAlert } from "./circle-alert-Cmxr47Yg.js";
import { c as createLucideIcon } from "./utensils-crossed-C5p56U27.js";
import { T as Trash2 } from "./trash-2-C4jExYHJ.js";
import "./shopping-bag-t5LjaFX2.js";
import "./clock-BmlPv7li.js";
import "./users-D_o_boGl.js";
import "./chevron-right-UDIpsfrJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "9", cy: "12", r: "3", key: "u3jwor" }],
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "7", key: "g7kal2" }]
];
const ToggleLeft = createLucideIcon("toggle-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "15", cy: "12", r: "3", key: "1afu0r" }],
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "7", key: "g7kal2" }]
];
const ToggleRight = createLucideIcon("toggle-right", __iconNode);
const CATEGORIES = [
  "Indian",
  "Chinese",
  "Pizza",
  "Burgers",
  "Biryani",
  "Rolls",
  "Desserts",
  "Multi-cuisine",
  "Continental"
];
const defaultForm = {
  name: "",
  category: "Indian",
  description: "",
  address: "",
  phone: "",
  deliveryFee: "0",
  deliveryTimeMinutes: "30"
};
function AdminRestaurants() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { actor, isFetching } = useActor(createActor);
  const [isAdmin, setIsAdmin] = reactExports.useState(null);
  const [restaurants, setRestaurants] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(defaultForm);
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = reactExports.useState(false);
  const loadData = reactExports.useCallback(async () => {
    if (!actor) return;
    const [adminCheck, list] = await Promise.all([
      actor.isCallerAdmin(),
      actor.listRestaurants()
    ]);
    setIsAdmin(adminCheck);
    setRestaurants(list);
    setLoading(false);
  }, [actor]);
  reactExports.useEffect(() => {
    if (!actor || isFetching) return;
    loadData();
  }, [actor, isFetching, loadData]);
  const openAdd = () => {
    setEditingId(null);
    setForm(defaultForm);
    setShowForm(true);
  };
  const openEdit = (r) => {
    setEditingId(r.id);
    setForm({
      name: r.name,
      category: r.category,
      description: r.description,
      address: r.address,
      phone: r.phone,
      deliveryFee: String(r.deliveryFee),
      deliveryTimeMinutes: String(r.deliveryTimeMinutes)
    });
    setShowForm(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!actor) return;
    setSubmitting(true);
    const input = {
      name: form.name,
      category: form.category,
      description: form.description,
      address: form.address,
      phone: form.phone,
      deliveryFee: BigInt(Number(form.deliveryFee)),
      deliveryTimeMinutes: BigInt(Number(form.deliveryTimeMinutes))
    };
    try {
      if (editingId !== null) {
        await actor.updateRestaurant(editingId, input);
        ue.success("Restaurant updated successfully");
      } else {
        await actor.addRestaurant(input);
        ue.success("Restaurant added successfully");
      }
      setShowForm(false);
      await loadData();
    } catch {
      ue.error("Failed to save restaurant");
    } finally {
      setSubmitting(false);
    }
  };
  const handleToggle = async (r) => {
    if (!actor) return;
    try {
      await actor.toggleRestaurantStatus(r.id);
      setRestaurants(
        (prev) => prev.map((x) => x.id === r.id ? { ...x, isActive: !x.isActive } : x)
      );
      ue.success(`Restaurant ${r.isActive ? "deactivated" : "activated"}`);
    } catch {
      ue.error("Failed to update status");
    }
  };
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };
  const handleDelete = async () => {
    if (!actor || deleteId === null) return;
    try {
      await actor.deleteRestaurant(deleteId);
      setRestaurants((prev) => prev.filter((r) => r.id !== deleteId));
      ue.success("Restaurant deleted");
    } catch {
      ue.error("Failed to delete restaurant");
    } finally {
      setShowDeleteConfirm(false);
      setDeleteId(null);
    }
  };
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  if (authLoading || loading || isFetching)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FullPageSpinner, { label: "Loading restaurants..." });
  if (!isAuthenticated) return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/login" });
  if (isAdmin === false) return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { hideFooter: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 min-h-[calc(100vh-64px)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdminSidebar, { active: "/admin/restaurants" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-8 bg-background overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto fade-in", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Restaurants" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1", children: [
              restaurants.length,
              " restaurants total"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: openAdd,
              className: "btn-gradient flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm",
              "data-ocid": "admin-add-restaurant",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                "Add Restaurant"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-semibold text-foreground", children: "Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-semibold text-foreground hidden md:table-cell", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-semibold text-foreground hidden lg:table-cell", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-semibold text-foreground hidden md:table-cell", children: "Delivery Fee" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-semibold text-foreground", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-border", children: [
            restaurants.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "td",
              {
                colSpan: 5,
                className: "px-4 py-12 text-center text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 mx-auto mb-2 opacity-40" }),
                  "No restaurants yet. Add one to get started."
                ]
              }
            ) }),
            restaurants.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "hover:bg-muted/20 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground truncate max-w-[200px]", children: r.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate max-w-[200px]", children: r.address })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden md:table-cell", children: r.category }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${r.isActive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-muted text-muted-foreground"}`,
                      children: r.isActive ? "Active" : "Inactive"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right text-muted-foreground hidden md:table-cell", children: [
                    "₹",
                    (Number(r.deliveryFee) / 100).toFixed(0)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => openEdit(r),
                        className: "p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors",
                        "aria-label": "Edit restaurant",
                        "data-ocid": "admin-edit-restaurant",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => handleToggle(r),
                        className: "p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors",
                        "aria-label": "Toggle status",
                        "data-ocid": "admin-toggle-restaurant",
                        children: r.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleRight, { className: "w-4 h-4 text-emerald-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleLeft, { className: "w-4 h-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => confirmDelete(r.id),
                        className: "p-1.5 rounded-lg hover:bg-destructive/15 text-muted-foreground hover:text-destructive transition-colors",
                        "aria-label": "Delete restaurant",
                        "data-ocid": "admin-delete-restaurant",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                      }
                    )
                  ] }) })
                ]
              },
              r.id.toString()
            ))
          ] })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: showForm,
        onClose: () => setShowForm(false),
        title: editingId !== null ? "Edit Restaurant" : "Add Restaurant",
        size: "lg",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  className: "block text-sm font-medium text-foreground mb-1",
                  htmlFor: "name",
                  children: "Name *"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "name",
                  name: "name",
                  type: "text",
                  required: true,
                  value: form.name,
                  onChange: handleChange,
                  className: "w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                  "data-ocid": "admin-restaurant-name"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  className: "block text-sm font-medium text-foreground mb-1",
                  htmlFor: "category",
                  children: "Category *"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "select",
                {
                  id: "category",
                  name: "category",
                  value: form.category,
                  onChange: handleChange,
                  className: "w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                  "data-ocid": "admin-restaurant-category",
                  children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  className: "block text-sm font-medium text-foreground mb-1",
                  htmlFor: "phone",
                  children: "Phone *"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "phone",
                  name: "phone",
                  type: "tel",
                  required: true,
                  value: form.phone,
                  onChange: handleChange,
                  className: "w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                  "data-ocid": "admin-restaurant-phone"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  className: "block text-sm font-medium text-foreground mb-1",
                  htmlFor: "description",
                  children: "Description"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "description",
                  name: "description",
                  rows: 2,
                  value: form.description,
                  onChange: handleChange,
                  className: "w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none",
                  "data-ocid": "admin-restaurant-description"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  className: "block text-sm font-medium text-foreground mb-1",
                  htmlFor: "address",
                  children: "Address *"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "address",
                  name: "address",
                  type: "text",
                  required: true,
                  value: form.address,
                  onChange: handleChange,
                  className: "w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                  "data-ocid": "admin-restaurant-address"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  className: "block text-sm font-medium text-foreground mb-1",
                  htmlFor: "deliveryFee",
                  children: "Delivery Fee (paise)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "deliveryFee",
                  name: "deliveryFee",
                  type: "number",
                  min: "0",
                  value: form.deliveryFee,
                  onChange: handleChange,
                  className: "w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                  "data-ocid": "admin-restaurant-delivery-fee"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  className: "block text-sm font-medium text-foreground mb-1",
                  htmlFor: "deliveryTimeMinutes",
                  children: "Delivery Time (mins)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "deliveryTimeMinutes",
                  name: "deliveryTimeMinutes",
                  type: "number",
                  min: "5",
                  value: form.deliveryTimeMinutes,
                  onChange: handleChange,
                  className: "w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                  "data-ocid": "admin-restaurant-delivery-time"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowForm(false),
                className: "px-4 py-2 rounded-xl border border-border text-foreground text-sm hover:bg-muted transition-colors",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                disabled: submitting,
                className: "btn-gradient px-4 py-2 rounded-xl text-sm disabled:opacity-50",
                "data-ocid": "admin-restaurant-submit",
                children: submitting ? "Saving..." : editingId !== null ? "Update" : "Add Restaurant"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Modal,
      {
        isOpen: showDeleteConfirm,
        onClose: () => setShowDeleteConfirm(false),
        title: "Delete Restaurant",
        size: "sm",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Are you sure you want to delete this restaurant? This action cannot be undone." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowDeleteConfirm(false),
                className: "px-4 py-2 rounded-xl border border-border text-foreground text-sm hover:bg-muted transition-colors",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleDelete,
                className: "px-4 py-2 rounded-xl bg-destructive text-destructive-foreground text-sm font-medium hover:opacity-90 transition-opacity",
                "data-ocid": "admin-confirm-delete",
                children: "Delete"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
export {
  AdminRestaurants as default
};

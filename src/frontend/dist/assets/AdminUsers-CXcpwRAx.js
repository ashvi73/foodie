import { b as useAuth, r as reactExports, j as jsxRuntimeExports, F as FullPageSpinner, N as Navigate } from "./index-DnwehUM6.js";
import { a as useActor, c as createActor } from "./backend-C4anb5sy.js";
import { L as Layout, a as Mail, P as Phone } from "./Layout-CMdgGqmX.js";
import { M as Modal } from "./Modal-C8oW4IhX.js";
import { AdminSidebar } from "./Admin-CoEdNwjo.js";
import { U as Users } from "./users-D_o_boGl.js";
import { C as CircleAlert } from "./circle-alert-Cmxr47Yg.js";
import { S as ShoppingBag } from "./shopping-bag-t5LjaFX2.js";
import { c as createLucideIcon } from "./utensils-crossed-C5p56U27.js";
import "./clock-BmlPv7li.js";
import "./chevron-right-UDIpsfrJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$1);
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
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode);
function AdminUsers() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { actor, isFetching } = useActor(createActor);
  const [isAdmin, setIsAdmin] = reactExports.useState(null);
  const [users, setUsers] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [selectedUser, setSelectedUser] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const loadData = reactExports.useCallback(async () => {
    if (!actor) return;
    const [adminCheck, allOrders] = await Promise.all([
      actor.isCallerAdmin(),
      actor.listAllOrders()
    ]);
    setIsAdmin(adminCheck);
    const userMap = /* @__PURE__ */ new Map();
    for (const order of allOrders) {
      const key = order.userId.toText();
      if (!userMap.has(key))
        userMap.set(key, { orders: [], userId: order.userId });
      userMap.get(key).orders.push(order);
    }
    const aggregated = await Promise.all(
      Array.from(userMap.entries()).map(async ([principalText, data]) => {
        let profile = null;
        try {
          profile = await actor.getUserProfile(data.userId);
        } catch {
        }
        const totalSpent = data.orders.reduce(
          (sum, o) => sum + o.total,
          BigInt(0)
        );
        const lastOrderDate = data.orders.reduce(
          (max, o) => o.createdAt > max ? o.createdAt : max,
          BigInt(0)
        );
        return {
          principalText,
          profile,
          orderCount: data.orders.length,
          totalSpent,
          lastOrderDate,
          userId: data.userId
        };
      })
    );
    setUsers(
      aggregated.sort((a, b) => Number(b.lastOrderDate - a.lastOrderDate))
    );
    setLoading(false);
  }, [actor]);
  reactExports.useEffect(() => {
    if (!actor || isFetching) return;
    loadData();
  }, [actor, isFetching, loadData]);
  const filteredUsers = users.filter((u) => {
    var _a2, _b2;
    if (!search) return true;
    const q = search.toLowerCase();
    return u.principalText.toLowerCase().includes(q) || (((_a2 = u.profile) == null ? void 0 : _a2.name) ?? "").toLowerCase().includes(q) || (((_b2 = u.profile) == null ? void 0 : _b2.email) ?? "").toLowerCase().includes(q);
  });
  if (authLoading || loading || isFetching)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FullPageSpinner, { label: "Loading users..." });
  if (!isAuthenticated) return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/login" });
  if (isAdmin === false) return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { hideFooter: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 min-h-[calc(100vh-64px)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdminSidebar, { active: "/admin/users" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-8 bg-background overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto fade-in", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Users" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1", children: [
              users.length,
              " unique users"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-card border border-input rounded-xl px-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "Search by name, email...",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none w-52",
                "data-ocid": "admin-users-search"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-semibold text-foreground", children: "User" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-semibold text-foreground hidden md:table-cell", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-semibold text-foreground hidden lg:table-cell", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-semibold text-foreground", children: "Orders" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-semibold text-foreground hidden sm:table-cell", children: "Spent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-semibold text-foreground", children: "Action" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-border", children: [
            filteredUsers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "td",
              {
                colSpan: 6,
                className: "px-4 py-12 text-center text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 mx-auto mb-2 opacity-40" }),
                  search ? "No users match your search" : "No users have placed orders yet"
                ]
              }
            ) }),
            filteredUsers.map((user) => {
              var _a2, _b2, _c2, _d2, _e2, _f2;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "hover:bg-muted/20 transition-colors",
                  "data-ocid": "admin-user-row",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary", children: ((_c2 = (_b2 = (_a2 = user.profile) == null ? void 0 : _a2.name) == null ? void 0 : _b2[0]) == null ? void 0 : _c2.toUpperCase()) ?? "?" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate", children: ((_d2 = user.profile) == null ? void 0 : _d2.name) || "Unknown User" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono text-muted-foreground truncate max-w-[160px]", children: [
                          user.principalText.slice(0, 16),
                          "..."
                        ] })
                      ] })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden md:table-cell truncate max-w-[160px]", children: ((_e2 = user.profile) == null ? void 0 : _e2.email) || "—" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden lg:table-cell", children: ((_f2 = user.profile) == null ? void 0 : _f2.phone) || "—" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 font-semibold text-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                      user.orderCount
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-semibold text-foreground hidden sm:table-cell", children: [
                      "₹",
                      (Number(user.totalSpent) / 100).toFixed(0)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => setSelectedUser(user),
                        className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/70 text-foreground text-xs font-medium transition-colors",
                        "aria-label": "View user profile",
                        "data-ocid": "admin-view-user",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
                          "View"
                        ]
                      }
                    ) })
                  ]
                },
                user.principalText
              );
            })
          ] })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: selectedUser !== null,
        onClose: () => setSelectedUser(null),
        title: "User Profile",
        size: "md",
        children: selectedUser && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-primary", children: ((_c = (_b = (_a = selectedUser.profile) == null ? void 0 : _a.name) == null ? void 0 : _b[0]) == null ? void 0 : _c.toUpperCase()) ?? "?" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-foreground", children: ((_d = selectedUser.profile) == null ? void 0 : _d.name) || "Unknown User" }),
              ((_e = selectedUser.profile) == null ? void 0 : _e.isAdmin) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/15 text-primary", children: "Admin" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-4 space-y-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: ((_f = selectedUser.profile) == null ? void 0 : _f.email) || "No email provided" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: ((_g = selectedUser.profile) == null ? void 0 : _g.phone) || "No phone provided" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                "Joined",
                " ",
                ((_h = selectedUser.profile) == null ? void 0 : _h.createdAt) ? new Date(
                  Number(selectedUser.profile.createdAt) / 1e6
                ).toLocaleDateString() : "unknown"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-4 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-foreground", children: selectedUser.orderCount }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Total Orders" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-4 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-2xl font-bold text-foreground", children: [
                "₹",
                (Number(selectedUser.totalSpent) / 100).toFixed(0)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Total Spent" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium mb-1", children: "Principal ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-foreground bg-muted/40 rounded-lg px-3 py-2 break-all", children: selectedUser.principalText })
          ] }),
          ((_i = selectedUser.profile) == null ? void 0 : _i.savedAddresses) && selectedUser.profile.savedAddresses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium mb-2", children: "Saved Addresses" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: selectedUser.profile.savedAddresses.map((addr, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-muted/40 rounded-xl p-3 text-sm text-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: addr.tag }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs", children: [
                    addr.street,
                    ", ",
                    addr.city,
                    ", ",
                    addr.state,
                    " ",
                    addr.postalCode
                  ] })
                ]
              },
              `addr-${i}-${addr.tag}`
            )) })
          ] })
        ] })
      }
    )
  ] });
}
export {
  AdminUsers as default
};

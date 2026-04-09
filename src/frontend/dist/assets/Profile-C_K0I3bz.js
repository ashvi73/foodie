import { b as useAuth, u as useNavigate, d as useQueryClient, r as reactExports, j as jsxRuntimeExports, g as LoadingSpinner } from "./index-DnwehUM6.js";
import { B as Badge } from "./badge-payX39_2.js";
import { B as Button } from "./button-D5t3PDVn.js";
import { I as Input } from "./input-CSRa9Y8x.js";
import { L as Label } from "./label-JbPaPxYz.js";
import { S as Skeleton } from "./skeleton-BA6yISXK.js";
import { a as useActor, u as useQuery, c as createActor } from "./backend-C4anb5sy.js";
import { u as useMutation } from "./useMutation-DGCRxlfq.js";
import { u as ue } from "./index-BlmAZSpX.js";
import { L as Layout, U as User, a as Mail, P as Phone, X, M as MapPin } from "./Layout-CMdgGqmX.js";
import { M as Modal } from "./Modal-C8oW4IhX.js";
import { c as createLucideIcon } from "./utensils-crossed-C5p56U27.js";
import { P as Plus } from "./plus-Bhp6GNZS.js";
import { T as Trash2 } from "./trash-2-C4jExYHJ.js";
import "./index-KG9Sdx_T.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
const Briefcase = createLucideIcon("briefcase", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
];
const Ellipsis = createLucideIcon("ellipsis", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$1);
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
const TAG_ICONS = {
  Home: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-4 h-4" }),
  Work: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-4 h-4" }),
  Other: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "w-4 h-4" })
};
const TAG_OPTIONS = ["Home", "Work", "Other"];
const emptyAddress = {
  tag: "Home",
  street: "",
  city: "",
  state: "",
  postalCode: ""
};
function ProfileSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-20 h-20 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-56" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-2xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-2xl" })
  ] });
}
function AddressCard({
  address,
  index,
  isDefault,
  onDelete,
  onSetDefault
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `address-card-${index}`,
      className: `relative bg-card rounded-2xl border p-5 transition-smooth hover:shadow-md ${isDefault ? "border-primary/50 shadow-sm" : "border-border"}`,
      children: [
        isDefault && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "secondary",
            className: "text-xs px-2 py-0.5 bg-primary/10 text-primary border-primary/30",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 mr-1" }),
              "Default"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5",
              style: { background: "var(--gradient-primary)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground", children: TAG_ICONS[address.tag] ?? /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "w-4 h-4" }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: address.tag }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5 truncate", children: address.street }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
              address.city,
              ", ",
              address.state,
              " ",
              address.postalCode
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-4 pt-3 border-t border-border", children: [
          !isDefault && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onSetDefault(index),
              "data-ocid": `set-default-${index}`,
              className: "text-xs text-primary font-medium hover:underline transition-colors",
              children: "Set as Default"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onDelete(index),
              "data-ocid": `delete-address-${index}`,
              className: "p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-smooth",
              "aria-label": "Delete address",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
            }
          ) })
        ] })
      ]
    }
  );
}
function Profile() {
  const { isAuthenticated, isLoading: authLoading, principal } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { actor, isFetching: actorLoading } = useActor(createActor);
  reactExports.useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [isAuthenticated, authLoading, navigate]);
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorLoading && isAuthenticated
  });
  const [profileForm, setProfileForm] = reactExports.useState({
    name: "",
    email: "",
    phone: ""
  });
  const [profileDirty, setProfileDirty] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (profile) {
      setProfileForm({
        name: profile.name,
        email: profile.email,
        phone: profile.phone
      });
    }
  }, [profile]);
  const [addressModalOpen, setAddressModalOpen] = reactExports.useState(false);
  const [addressForm, setAddressForm] = reactExports.useState(emptyAddress);
  const [defaultIndex, setDefaultIndex] = reactExports.useState(0);
  const saveProfileMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      await actor.saveCallerUserProfile({
        name: profileForm.name,
        email: profileForm.email,
        phone: profileForm.phone
      });
    },
    onSuccess: () => {
      ue.success("Profile saved successfully!");
      setProfileDirty(false);
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: () => ue.error("Failed to save profile. Please try again.")
  });
  const addAddressMutation = useMutation({
    mutationFn: async (addr) => {
      if (!actor) throw new Error("Not connected");
      await actor.addDeliveryAddress({
        tag: addr.tag,
        street: addr.street,
        city: addr.city,
        state: addr.state,
        postalCode: addr.postalCode
      });
    },
    onSuccess: () => {
      ue.success("Address added!");
      setAddressModalOpen(false);
      setAddressForm(emptyAddress);
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: () => ue.error("Failed to add address.")
  });
  const removeAddressMutation = useMutation({
    mutationFn: async (index) => {
      if (!actor) throw new Error("Not connected");
      await actor.removeDeliveryAddress(BigInt(index));
    },
    onSuccess: () => {
      ue.success("Address removed.");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: () => ue.error("Failed to remove address.")
  });
  function getInitials(name) {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "?";
  }
  const isLoading = authLoading || profileLoading || actorLoading;
  const addresses = (profile == null ? void 0 : profile.savedAddresses) ?? [];
  if (!isAuthenticated && !authLoading) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 min-h-screen py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-3xl", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileSkeleton, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 slide-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-sm overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-24 w-full",
            style: {
              background: "var(--gradient-primary)",
              opacity: 0.85
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-4 -mt-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-lg border-4 border-card flex-shrink-0",
              style: { background: "var(--gradient-primary)" },
              children: getInitials(
                (profile == null ? void 0 : profile.name) || (principal == null ? void 0 : principal.slice(0, 4)) || "?"
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground truncate", children: (profile == null ? void 0 : profile.name) || "Set up your profile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground truncate", children: (profile == null ? void 0 : profile.email) || "No email set" })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-sm p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-semibold text-foreground mb-5 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5 text-primary" }),
          "Personal Information"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "profile-name",
                className: "text-sm font-medium",
                children: "Full Name"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "profile-name",
                  "data-ocid": "profile-name-input",
                  value: profileForm.name,
                  onChange: (e) => {
                    setProfileForm((p) => ({
                      ...p,
                      name: e.target.value
                    }));
                    setProfileDirty(true);
                  },
                  className: "pl-10",
                  placeholder: "Your full name"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "profile-email",
                className: "text-sm font-medium",
                children: "Email Address"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "profile-email",
                  "data-ocid": "profile-email-input",
                  type: "email",
                  value: profileForm.email,
                  onChange: (e) => {
                    setProfileForm((p) => ({
                      ...p,
                      email: e.target.value
                    }));
                    setProfileDirty(true);
                  },
                  className: "pl-10",
                  placeholder: "your@email.com"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "profile-phone",
                className: "text-sm font-medium",
                children: "Phone Number"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "profile-phone",
                  "data-ocid": "profile-phone-input",
                  type: "tel",
                  value: profileForm.phone,
                  onChange: (e) => {
                    setProfileForm((p) => ({
                      ...p,
                      phone: e.target.value
                    }));
                    setProfileDirty(true);
                  },
                  className: "pl-10",
                  placeholder: "+1 234 567 8900"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => saveProfileMutation.mutate(),
              disabled: !profileDirty || saveProfileMutation.isPending,
              "data-ocid": "save-profile-btn",
              className: "btn-gradient rounded-xl px-6",
              children: saveProfileMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4 mr-2" }),
                "Save Changes"
              ] })
            }
          ),
          profileDirty && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setProfileForm({
                  name: (profile == null ? void 0 : profile.name) ?? "",
                  email: (profile == null ? void 0 : profile.email) ?? "",
                  phone: (profile == null ? void 0 : profile.phone) ?? ""
                });
                setProfileDirty(false);
              },
              className: "text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
                "Discard"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-sm p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 text-primary" }),
            "Saved Addresses"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => setAddressModalOpen(true),
              "data-ocid": "add-address-btn",
              className: "gap-2 border-primary/30 text-primary hover:bg-primary/5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                "Add New"
              ]
            }
          )
        ] }),
        addresses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "addresses-empty-state",
            className: "text-center py-10 rounded-xl bg-muted/50 border border-dashed border-border",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mb-1", children: "No saved addresses" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Add a delivery address to check out faster." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => setAddressModalOpen(true),
                  className: "gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                    "Add Address"
                  ]
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: addresses.map((addr, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          AddressCard,
          {
            address: addr,
            index: idx,
            isDefault: idx === defaultIndex,
            onDelete: (i) => removeAddressMutation.mutate(i),
            onSetDefault: (i) => setDefaultIndex(i)
          },
          `${addr.street}-${idx}`
        )) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: addressModalOpen,
        onClose: () => {
          setAddressModalOpen(false);
          setAddressForm(emptyAddress);
        },
        title: "Add New Address",
        size: "md",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Address Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: TAG_OPTIONS.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `address-tag-${tag.toLowerCase()}`,
                onClick: () => setAddressForm((p) => ({ ...p, tag })),
                className: `flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-sm font-medium transition-smooth ${addressForm.tag === tag ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/40"}`,
                children: [
                  TAG_ICONS[tag],
                  tag
                ]
              },
              tag
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "addr-street", className: "text-sm font-medium", children: "Street Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "addr-street",
                "data-ocid": "addr-street-input",
                value: addressForm.street,
                onChange: (e) => setAddressForm((p) => ({ ...p, street: e.target.value })),
                placeholder: "123 Main Street, Apt 4B"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "addr-city", className: "text-sm font-medium", children: "City" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "addr-city",
                  "data-ocid": "addr-city-input",
                  value: addressForm.city,
                  onChange: (e) => setAddressForm((p) => ({ ...p, city: e.target.value })),
                  placeholder: "Mumbai"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "addr-state", className: "text-sm font-medium", children: "State" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "addr-state",
                  "data-ocid": "addr-state-input",
                  value: addressForm.state,
                  onChange: (e) => setAddressForm((p) => ({ ...p, state: e.target.value })),
                  placeholder: "Maharashtra"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "addr-postal", className: "text-sm font-medium", children: "Postal Code" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "addr-postal",
                "data-ocid": "addr-postal-input",
                value: addressForm.postalCode,
                onChange: (e) => setAddressForm((p) => ({ ...p, postalCode: e.target.value })),
                placeholder: "400001"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: () => {
                  setAddressModalOpen(false);
                  setAddressForm(emptyAddress);
                },
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-1 btn-gradient",
                "data-ocid": "save-address-btn",
                disabled: !addressForm.street || !addressForm.city || !addressForm.state || !addressForm.postalCode || addAddressMutation.isPending,
                onClick: () => addAddressMutation.mutate(addressForm),
                children: addAddressMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
                  "Add Address"
                ] })
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  Profile as default
};

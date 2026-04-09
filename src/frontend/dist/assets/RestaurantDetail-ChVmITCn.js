import { j as jsxRuntimeExports, c as cn, a as useParams, r as reactExports, b as useAuth, L as Link } from "./index-DnwehUM6.js";
import { B as Button } from "./button-D5t3PDVn.js";
import { S as Skeleton } from "./skeleton-BA6yISXK.js";
import { T as Textarea } from "./textarea-KCrfpDfE.js";
import { u as ue } from "./index-BlmAZSpX.js";
import { B as Badge } from "./Badge-CQf0QIRk.js";
import { u as useCart, S as ShoppingCart, U as User, L as Layout, M as MapPin, P as Phone } from "./Layout-CMdgGqmX.js";
import { M as Minus } from "./minus-cPljasiw.js";
import { P as Plus } from "./plus-Bhp6GNZS.js";
import { M as Modal } from "./Modal-C8oW4IhX.js";
import { S as Star } from "./star-CMrYIhEF.js";
import { c as useGetRestaurant, d as useListMenuItems, e as useGetRestaurantReviews, f as useGetRestaurantRatingSummary, g as useAddReview } from "./useQueries-DDdWsSfr.js";
import { A as ArrowLeft } from "./arrow-left-BGLjQgy1.js";
import { c as createLucideIcon, U as UtensilsCrossed } from "./utensils-crossed-C5p56U27.js";
import { C as Clock } from "./clock-BmlPv7li.js";
import { m as motion } from "./proxy-DdmWhjES.js";
import "./backend-C4anb5sy.js";
import "./useMutation-DGCRxlfq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }],
  ["path", { d: "M12 7v6", key: "lw1j43" }],
  ["path", { d: "M9 10h6", key: "9gxzsh" }]
];
const MessageSquarePlus = createLucideIcon("message-square-plus", __iconNode);
function MenuItemCard({
  item,
  restaurantId,
  restaurantName
}) {
  var _a;
  const { items, addItem, updateQuantity } = useCart();
  const menuItemIdStr = item.id.toString();
  const cartItem = items.find((i) => i.menuItemId === menuItemIdStr);
  const quantity = (cartItem == null ? void 0 : cartItem.quantity) ?? 0;
  const price = Number(item.price);
  const imageUrl = (_a = item.imageBlob) == null ? void 0 : _a.getDirectURL();
  const handleAdd = () => {
    addItem({
      id: `${restaurantId}-${item.id}`,
      menuItemId: menuItemIdStr,
      restaurantId: restaurantId.toString(),
      name: item.name,
      price,
      image: imageUrl ?? "",
      quantity: 1
    });
  };
  const handleDecrease = () => {
    updateQuantity(menuItemIdStr, quantity - 1);
  };
  const handleIncrease = () => {
    updateQuantity(menuItemIdStr, quantity + 1);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "menu-item-card",
      className: cn(
        "flex gap-4 bg-card rounded-2xl p-4 border border-border transition-smooth",
        "hover:border-primary/30 hover:shadow-md",
        !item.isAvailable && "opacity-60"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-muted", children: [
          imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imageUrl,
              alt: item.name,
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl opacity-50", children: "🍴" }) }),
          item.category === "Veg" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1 left-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-emerald-600 rounded flex items-center justify-center bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-emerald-600" }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 flex flex-col justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground leading-tight line-clamp-1", children: item.name }),
              !item.isAvailable && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", className: "flex-shrink-0 text-xs", children: "Unavailable" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: item.description || `Delicious ${item.name} from ${restaurantName ?? "our kitchen"}` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-base text-foreground", children: [
              "₹",
              price.toLocaleString()
            ] }),
            item.isAvailable ? quantity > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 bg-primary rounded-xl overflow-hidden",
                "data-ocid": "qty-selector",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleDecrease,
                      className: "w-8 h-8 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors",
                      "aria-label": `Decrease quantity of ${item.name}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3.5 h-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground text-sm font-bold min-w-[1.5rem] text-center", children: quantity }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleIncrease,
                      className: "w-8 h-8 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors",
                      "aria-label": `Increase quantity of ${item.name}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" })
                    }
                  )
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                onClick: handleAdd,
                "data-ocid": "add-to-cart-btn",
                className: "btn-gradient rounded-xl h-8 px-3 text-xs gap-1 flex-shrink-0",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-3.5 h-3.5" }),
                  "Add"
                ]
              }
            ) : null
          ] })
        ] })
      ]
    }
  );
}
const sizeClasses = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5"
};
const textClasses = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base"
};
function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showValue = true,
  reviewCount,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex items-center gap-1", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: Array.from({ length: maxRating }, (_, i) => i).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Star,
      {
        className: cn(
          sizeClasses[size],
          i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground"
        )
      },
      `star-${i}`
    )) }),
    showValue && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: cn("font-semibold text-foreground", textClasses[size]),
        children: rating.toFixed(1)
      }
    ),
    reviewCount !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("text-muted-foreground", textClasses[size]), children: [
      "(",
      reviewCount.toLocaleString(),
      ")"
    ] })
  ] });
}
function formatDate(timestamp) {
  try {
    const ms = Number(timestamp / BigInt(1e6));
    const date = new Date(ms);
    if (Number.isNaN(date.getTime())) return "Recently";
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  } catch {
    return "Recently";
  }
}
function getInitials(name) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}
function ReviewCard({ review }) {
  const initials = getInitials(review.userName || "Anonymous");
  const dateStr = formatDate(review.createdAt);
  const rating = Number(review.rating);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "review-card",
      className: "bg-card rounded-2xl p-4 border border-border space-y-3 transition-smooth hover:border-primary/20",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0", children: initials ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary", children: initials }) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground truncate", children: review.userName || "Anonymous" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground flex-shrink-0", children: dateStr })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StarRating,
              {
                rating,
                size: "sm",
                showValue: false,
                className: "mt-0.5"
              }
            )
          ] })
        ] }),
        review.comment && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed pl-12", children: review.comment })
      ]
    }
  );
}
function SkeletonBox({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("bg-muted rounded-md animate-pulse-soft", className) });
}
function SkeletonMenuItem() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 bg-card rounded-xl p-4 border border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBox, { className: "w-24 h-24 rounded-lg flex-shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBox, { className: "h-4 w-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBox, { className: "h-4 w-2/3" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBox, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBox, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBox, { className: "h-5 w-16" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBox, { className: "h-9 w-24 rounded-lg" })
      ] })
    ] })
  ] });
}
function SkeletonMenuList({ count = 5 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({ length: count }, (_, i) => i).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonMenuItem, {}, `skeleton-menu-${i}`)) });
}
const MENU_CATEGORIES_ALL = "All";
function RestaurantDetail() {
  var _a;
  const { id } = useParams({ from: "/restaurants/$id" });
  const restaurantId = BigInt(id);
  const { data: restaurant, isLoading: rLoading } = useGetRestaurant(restaurantId);
  const { data: menuItems = [], isLoading: mLoading } = useListMenuItems(restaurantId);
  const { data: reviews = [], isLoading: revLoading } = useGetRestaurantReviews(restaurantId);
  const { data: ratingSummary } = useGetRestaurantRatingSummary(restaurantId);
  const [menuCategory, setMenuCategory] = reactExports.useState(MENU_CATEGORIES_ALL);
  const [reviewModalOpen, setReviewModalOpen] = reactExports.useState(false);
  const { isAuthenticated } = useAuth();
  const menuCategories = [
    MENU_CATEGORIES_ALL,
    ...Array.from(new Set(menuItems.map((i) => i.category).filter(Boolean)))
  ];
  const filteredMenu = menuCategory === MENU_CATEGORIES_ALL ? menuItems : menuItems.filter((i) => i.category === menuCategory);
  const imageUrl = (_a = restaurant == null ? void 0 : restaurant.imageBlob) == null ? void 0 : _a.getDirectURL();
  if (!rLoading && !restaurant) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl mb-4 block", children: "🍽️" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Restaurant not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "This restaurant may have been removed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/restaurants", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
        "Browse Restaurants"
      ] }) })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-52 sm:h-72 overflow-hidden bg-muted", children: [
      rLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full h-full rounded-none" }) : imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: imageUrl,
          alt: restaurant == null ? void 0 : restaurant.name,
          className: "w-full h-full object-cover"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UtensilsCrossed, { className: "w-20 h-20 text-primary/30" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/restaurants",
          className: "absolute top-4 left-4 flex items-center gap-1.5 bg-card/90 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-medium text-foreground hover:bg-card transition-smooth shadow-md",
          "data-ocid": "back-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back"
          ]
        }
      ),
      restaurant && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: cn(
            "px-3 py-1.5 rounded-full text-xs font-semibold shadow",
            restaurant.isActive ? "bg-emerald-500 text-white" : "bg-foreground/80 text-background"
          ),
          "data-ocid": "open-status-badge",
          children: restaurant.isActive ? "Open Now" : "Closed"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-5", children: rLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-64" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" })
    ] }) : restaurant ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl sm:text-3xl font-bold text-foreground", children: restaurant.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "primary", children: restaurant.category }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xl", children: restaurant.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary" }),
            Number(restaurant.deliveryTimeMinutes),
            " min delivery"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary" }),
            restaurant.address
          ] }),
          restaurant.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-primary" }),
            restaurant.phone
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center bg-muted/40 rounded-2xl px-6 py-4 min-w-[120px] border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-4xl font-black text-foreground", children: ((ratingSummary == null ? void 0 : ratingSummary.averageRating) ?? restaurant.rating).toFixed(
          1
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StarRating,
          {
            rating: (ratingSummary == null ? void 0 : ratingSummary.averageRating) ?? restaurant.rating,
            size: "sm",
            showValue: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground mt-1", children: [
          Number(
            (ratingSummary == null ? void 0 : ratingSummary.reviewCount) ?? restaurant.reviewCount
          ).toLocaleString(),
          " ",
          "reviews"
        ] })
      ] })
    ] }) : null }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-6 space-y-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-labelledby": "menu-heading", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-4 gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            id: "menu-heading",
            className: "font-display text-xl font-bold text-foreground",
            children: "Menu"
          }
        ) }),
        menuCategories.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto -mx-4 px-4 mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 w-max", "data-ocid": "menu-category-tabs", children: menuCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setMenuCategory(cat),
            className: cn(
              "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-smooth border",
              menuCategory === cat ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary/50"
            ),
            "data-ocid": `menu-cat-${cat.toLowerCase().replace(/\s/g, "-")}`,
            children: cat
          },
          cat
        )) }) }),
        mLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonMenuList, { count: 4 }) : filteredMenu.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "menu-empty-state",
            className: "text-center py-16 text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl mb-3 block", children: "🍴" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No items in this category." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-3", children: filteredMenu.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.04, duration: 0.3 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              MenuItemCard,
              {
                item,
                restaurantId,
                restaurantName: restaurant == null ? void 0 : restaurant.name
              }
            )
          },
          item.id.toString()
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          "aria-labelledby": "reviews-heading",
          className: "border-t border-border pt-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "h2",
                {
                  id: "reviews-heading",
                  className: "font-display text-xl font-bold text-foreground",
                  children: [
                    "Reviews",
                    reviews.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-sm font-normal text-muted-foreground", children: [
                      "(",
                      reviews.length,
                      ")"
                    ] })
                  ]
                }
              ),
              isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => setReviewModalOpen(true),
                  className: "gap-2",
                  "data-ocid": "add-review-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquarePlus, { className: "w-4 h-4" }),
                    "Write a Review"
                  ]
                }
              )
            ] }),
            revLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({ length: 3 }, (_, i) => i).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-2xl" }, `rev-skel-${i}`)) }) : reviews.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "reviews-empty-state",
                className: "text-center py-12 text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-10 h-10 mx-auto mb-3 opacity-30" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: "No reviews yet." }),
                  isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Be the first to leave a review!" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: reviews.map((review) => /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewCard, { review }, review.id.toString())) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddReviewModal,
      {
        isOpen: reviewModalOpen,
        onClose: () => setReviewModalOpen(false),
        restaurantId
      }
    )
  ] });
}
function AddReviewModal({
  isOpen,
  onClose,
  restaurantId
}) {
  const [rating, setRating] = reactExports.useState(5);
  const [comment, setComment] = reactExports.useState("");
  const [userName, setUserName] = reactExports.useState("");
  const addReview = useAddReview();
  const handleSubmit = async () => {
    if (!userName.trim()) {
      ue.error("Please enter your name.");
      return;
    }
    if (rating < 1 || rating > 5) {
      ue.error("Please select a rating.");
      return;
    }
    try {
      await addReview.mutateAsync({
        restaurantId,
        rating: BigInt(rating),
        comment: comment.trim(),
        userName: userName.trim()
      });
      ue.success("Review submitted! Thank you.");
      setComment("");
      setRating(5);
      setUserName("");
      onClose();
    } catch {
      ue.error("Failed to submit review. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { isOpen, onClose, title: "Write a Review", size: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "review-modal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "reviewer-name",
          className: "text-sm font-medium text-foreground",
          children: "Your Name"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "reviewer-name",
          type: "text",
          value: userName,
          onChange: (e) => setUserName(e.target.value),
          placeholder: "Enter your name",
          className: "w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "data-ocid": "reviewer-name-input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Rating" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-1",
          "data-ocid": "star-rating-selector",
          children: [
            [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setRating(s),
                className: "p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
                "aria-label": `Rate ${s} out of 5`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    className: cn(
                      "w-7 h-7 transition-colors",
                      s <= rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground"
                    )
                  }
                )
              },
              s
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-sm text-muted-foreground", children: [
              rating,
              " / 5"
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "label",
        {
          htmlFor: "review-comment",
          className: "text-sm font-medium text-foreground",
          children: [
            "Comment ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "(optional)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          id: "review-comment",
          value: comment,
          onChange: (e) => setComment(e.target.value),
          placeholder: "Share your experience...",
          rows: 3,
          "data-ocid": "review-comment-input",
          className: "resize-none"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: onClose,
          className: "flex-1",
          type: "button",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: handleSubmit,
          className: "flex-1 btn-gradient",
          disabled: addReview.isPending,
          type: "button",
          "data-ocid": "submit-review-btn",
          children: addReview.isPending ? "Submitting..." : "Submit Review"
        }
      )
    ] })
  ] }) });
}
export {
  RestaurantDetail as default
};

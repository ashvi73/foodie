import { c as createLucideIcon } from "./utensils-crossed-C5p56U27.js";
import { j as jsxRuntimeExports, L as Link, c as cn } from "./index-DnwehUM6.js";
import { B as Badge } from "./Badge-CQf0QIRk.js";
import { U as Utensils } from "./utensils-B8FbuBnQ.js";
import { S as Star } from "./star-CMrYIhEF.js";
import { C as Clock } from "./clock-BmlPv7li.js";
import { M as MapPin } from "./Layout-CMdgGqmX.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const PLACEHOLDER_GRADIENTS = [
  "from-orange-400 to-rose-500",
  "from-amber-400 to-orange-500",
  "from-red-400 to-pink-500",
  "from-yellow-400 to-amber-500",
  "from-emerald-400 to-teal-500",
  "from-violet-400 to-purple-500"
];
function getPlaceholderGradient(id) {
  return PLACEHOLDER_GRADIENTS[Number(id) % PLACEHOLDER_GRADIENTS.length];
}
function RestaurantCard({ restaurant, className }) {
  var _a;
  const imageUrl = (_a = restaurant.imageBlob) == null ? void 0 : _a.getDirectURL();
  const gradient = getPlaceholderGradient(restaurant.id);
  const deliveryFeeDisplay = Number(restaurant.deliveryFee) === 0 ? "Free delivery" : `₹${Number(restaurant.deliveryFee)} delivery`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/restaurants/$id",
      params: { id: restaurant.id.toString() },
      className: cn(
        "group block bg-card rounded-2xl overflow-hidden border border-border",
        "card-elevated cursor-pointer",
        className
      ),
      "data-ocid": "restaurant-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-48 overflow-hidden", children: [
          imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imageUrl,
              alt: restaurant.name,
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "w-full h-full bg-gradient-to-br flex items-center justify-center",
                gradient
              ),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Utensils, { className: "w-14 h-14 text-white/60" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3 flex gap-1.5 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "primary", className: "text-xs backdrop-blur-sm", children: restaurant.category }) }),
          !restaurant.isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-semibold text-sm bg-foreground/70 px-3 py-1.5 rounded-full", children: "Closed" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-base leading-tight line-clamp-1 min-w-0", children: restaurant.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-shrink-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 fill-current" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold", children: restaurant.rating.toFixed(1) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                "(",
                Number(restaurant.reviewCount).toLocaleString(),
                ")"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs line-clamp-1", children: restaurant.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground pt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
              Number(restaurant.deliveryTimeMinutes),
              " mins"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: deliveryFeeDisplay })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: restaurant.address })
          ] })
        ] })
      ]
    }
  );
}
function SkeletonBox({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("bg-muted rounded-md animate-pulse-soft", className) });
}
function SkeletonCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl overflow-hidden border border-border shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBox, { className: "w-full h-48" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBox, { className: "h-5 flex-1 max-w-[60%]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBox, { className: "h-5 w-12" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBox, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBox, { className: "h-4 w-16" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBox, { className: "h-4 w-20" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBox, { className: "h-6 w-14 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBox, { className: "h-6 w-14 rounded-full" })
      ] })
    ] })
  ] });
}
function SkeletonCardGrid({ count = 6 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: Array.from({ length: count }, (_, i) => i).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, `skeleton-card-${i}`)) });
}
export {
  RestaurantCard as R,
  Search as S,
  SkeletonCard as a,
  SkeletonCardGrid as b
};

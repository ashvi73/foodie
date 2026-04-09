import { r as reactExports, j as jsxRuntimeExports, c as cn } from "./index-DnwehUM6.js";
import { B as Button } from "./button-D5t3PDVn.js";
import { I as Input } from "./input-CSRa9Y8x.js";
import { L as Layout, X } from "./Layout-CMdgGqmX.js";
import { S as Search, b as SkeletonCardGrid, R as RestaurantCard } from "./SkeletonCard-C6JmkKgL.js";
import { u as useListRestaurants, b as useSearchRestaurants } from "./useQueries-DDdWsSfr.js";
import { c as createLucideIcon } from "./utensils-crossed-C5p56U27.js";
import { A as AnimatePresence } from "./index-BZdtlAnH.js";
import { m as motion } from "./proxy-DdmWhjES.js";
import "./Badge-CQf0QIRk.js";
import "./utensils-B8FbuBnQ.js";
import "./star-CMrYIhEF.js";
import "./clock-BmlPv7li.js";
import "./backend-C4anb5sy.js";
import "./useMutation-DGCRxlfq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const CATEGORIES = [
  "All",
  "Pizza",
  "Burgers",
  "Biryani",
  "Indian",
  "Chinese",
  "Rolls",
  "Desserts",
  "Drinks"
];
function sortRestaurants(list, sort) {
  const copy = [...list];
  if (sort === "rating") return copy.sort((a, b) => b.rating - a.rating);
  if (sort === "delivery_time")
    return copy.sort(
      (a, b) => Number(a.deliveryTimeMinutes) - Number(b.deliveryTimeMinutes)
    );
  if (sort === "newest")
    return copy.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
  return copy;
}
function Restaurants() {
  const [searchInput, setSearchInput] = reactExports.useState("");
  const deferredSearch = reactExports.useDeferredValue(searchInput);
  const [category, setCategory] = reactExports.useState("All");
  const [minRating, setMinRating] = reactExports.useState("");
  const [sort, setSort] = reactExports.useState("default");
  const [filtersOpen, setFiltersOpen] = reactExports.useState(false);
  const searchRef = reactExports.useRef(null);
  const hasActiveFilter = deferredSearch !== "" || category !== "All" || minRating !== "";
  const filter = {
    searchTerm: deferredSearch || void 0,
    category: category !== "All" ? category : void 0,
    minRating: minRating ? Number.parseFloat(minRating) : void 0
  };
  const allQuery = useListRestaurants();
  const searchQuery = useSearchRestaurants(filter);
  const isFiltering = hasActiveFilter;
  const rawList = isFiltering ? searchQuery.data ?? [] : allQuery.data ?? [];
  const isLoading = isFiltering ? searchQuery.isLoading : allQuery.isLoading;
  const restaurants = sortRestaurants(rawList, sort);
  const clearFilters = reactExports.useCallback(() => {
    setSearchInput("");
    setCategory("All");
    setMinRating("");
    setSort("default");
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border sticky top-[64px] z-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-3 flex gap-3 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              ref: searchRef,
              value: searchInput,
              onChange: (e) => setSearchInput(e.target.value),
              placeholder: "Search restaurants...",
              className: "pl-9 pr-9 h-10 bg-background",
              "data-ocid": "search-input"
            }
          ),
          searchInput && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSearchInput(""),
              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
              "aria-label": "Clear search",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: filtersOpen ? "default" : "outline",
            size: "sm",
            onClick: () => setFiltersOpen((o) => !o),
            className: "gap-1.5 flex-shrink-0 lg:hidden",
            "data-ocid": "filter-toggle-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-4 h-4" }),
              "Filters",
              hasActiveFilter && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary-foreground" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 pb-3 overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 w-max", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setCategory(cat),
          "data-ocid": `category-${cat.toLowerCase()}`,
          className: cn(
            "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-smooth border",
            category === cat ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
          ),
          children: cat
        },
        cat
      )) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-6 flex gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden lg:block w-56 flex-shrink-0 space-y-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border p-4 sticky top-[160px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-sm text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4" }),
            " Filters"
          ] }),
          hasActiveFilter && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: clearFilters,
              className: "text-xs text-primary hover:underline",
              "data-ocid": "clear-filters-btn",
              children: "Clear all"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilterPanel,
          {
            minRating,
            sort,
            onMinRating: setMinRating,
            onSort: setSort
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: filtersOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            className: "lg:hidden overflow-hidden mb-4 bg-card rounded-2xl border border-border",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: "Filters" }),
                hasActiveFilter && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: clearFilters,
                    className: "text-xs text-primary hover:underline",
                    "data-ocid": "clear-filters-mobile-btn",
                    children: "Clear all"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FilterPanel,
                {
                  minRating,
                  sort,
                  onMinRating: setMinRating,
                  onSort: setSort
                }
              )
            ] })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: isLoading ? "Loading..." : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: restaurants.length }),
          " ",
          "restaurant",
          restaurants.length !== 1 ? "s" : "",
          " found"
        ] }) }) }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCardGrid, { count: 6 }) : restaurants.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { onClear: clearFilters, hasFilters: hasActiveFilter }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            layout: true,
            className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5",
            children: restaurants.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: i * 0.04, duration: 0.3 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(RestaurantCard, { restaurant: r })
              },
              r.id.toString()
            ))
          }
        )
      ] })
    ] })
  ] });
}
function FilterPanel({
  minRating,
  sort,
  onMinRating,
  onSort
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Min Rating" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: ["", "3", "4", "4.5"].map((val) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "label",
        {
          className: "flex items-center gap-2 cursor-pointer group",
          "data-ocid": `rating-filter-${val || "all"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "radio",
                name: "rating",
                value: val,
                checked: minRating === val,
                onChange: () => onMinRating(val),
                className: "accent-primary"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground group-hover:text-primary transition-colors", children: val === "" ? "All ratings" : `${val}★ & above` })
          ]
        },
        val
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Sort By" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: [
        ["default", "Recommended"],
        ["rating", "Rating: High to Low"],
        ["delivery_time", "Delivery Time"],
        ["newest", "Newest First"]
      ].map(([val, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "label",
        {
          className: "flex items-center gap-2 cursor-pointer group",
          "data-ocid": `sort-${val}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "radio",
                name: "sort",
                value: val,
                checked: sort === val,
                onChange: () => onSort(val),
                className: "accent-primary"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground group-hover:text-primary transition-colors", children: label })
          ]
        },
        val
      )) })
    ] })
  ] });
}
function EmptyState({
  onClear,
  hasFilters
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "empty-state",
      className: "flex flex-col items-center justify-center py-24 gap-4 text-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl", children: "🍽️" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground", children: "No restaurants found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs", children: hasFilters ? "No restaurants match your current filters. Try adjusting or clearing them." : "No restaurants available right now. Check back soon!" }),
        hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: onClear,
            "data-ocid": "empty-clear-filters-btn",
            children: "Clear filters"
          }
        )
      ]
    }
  );
}
export {
  Restaurants as default
};

import { u as useNavigate, r as reactExports, j as jsxRuntimeExports, c as cn, L as Link } from "./index-DnwehUM6.js";
import { L as Layout } from "./Layout-CMdgGqmX.js";
import { S as Search, a as SkeletonCard, R as RestaurantCard } from "./SkeletonCard-C6JmkKgL.js";
import { u as useListRestaurants, a as useSeedData } from "./useQueries-DDdWsSfr.js";
import { C as ChevronRight } from "./chevron-right-UDIpsfrJ.js";
import "./utensils-crossed-C5p56U27.js";
import "./Badge-CQf0QIRk.js";
import "./utensils-B8FbuBnQ.js";
import "./star-CMrYIhEF.js";
import "./clock-BmlPv7li.js";
import "./backend-C4anb5sy.js";
import "./useMutation-DGCRxlfq.js";
const CATEGORIES = [
  { label: "All", emoji: "🍽️" },
  { label: "Pizza", emoji: "🍕" },
  { label: "Burgers", emoji: "🍔" },
  { label: "Indian", emoji: "🍛" },
  { label: "Chinese", emoji: "🍜" },
  { label: "Desserts", emoji: "🍰" },
  { label: "Mexican", emoji: "🌮" },
  { label: "Salads", emoji: "🥗" }
];
const POPULAR_DISHES_STATIC = [
  {
    name: "Butter Chicken",
    restaurant: "The Spice Grill",
    price: "₹380",
    gradient: "from-orange-400 to-red-500"
  },
  {
    name: "Pepperoni Pizza",
    restaurant: "Pizza Palace",
    price: "₹450",
    gradient: "from-yellow-400 to-orange-500"
  },
  {
    name: "Veg Biryani",
    restaurant: "Biryani House",
    price: "₹290",
    gradient: "from-green-400 to-emerald-500"
  },
  {
    name: "Chicken Burger",
    restaurant: "Burger Barn",
    price: "₹220",
    gradient: "from-amber-400 to-yellow-500"
  },
  {
    name: "Choco Lava Cake",
    restaurant: "Sweet Spot",
    price: "₹180",
    gradient: "from-rose-400 to-pink-500"
  },
  {
    name: "Hakka Noodles",
    restaurant: "Dragon Wok",
    price: "₹260",
    gradient: "from-violet-400 to-purple-500"
  }
];
function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const hasSeeded = reactExports.useRef(false);
  const { data: restaurants, isLoading } = useListRestaurants();
  const seedMutation = useSeedData();
  reactExports.useEffect(() => {
    if (!hasSeeded.current && restaurants !== void 0 && restaurants.length === 0) {
      hasSeeded.current = true;
      seedMutation.mutate();
    }
  }, [restaurants, seedMutation]);
  const filteredRestaurants = (restaurants ?? []).filter((r) => {
    if (activeCategory === "All") return true;
    return r.category.toLowerCase().includes(activeCategory.toLowerCase());
  });
  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({
        to: "/restaurants",
        search: { q: searchQuery.trim() }
      });
    }
  }
  function handleCategoryClick(category) {
    setActiveCategory(category);
    if (category !== "All") {
      navigate({
        to: "/restaurants",
        search: { category }
      });
    }
  }
  const featuredRestaurants = filteredRestaurants.slice(0, 8);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden",
        style: { background: "var(--gradient-primary)" },
        "data-ocid": "hero-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-white/10 blur-3xl" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-14 md:py-20 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto text-center space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🚀" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Fast delivery · Great food · Happy you" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight", children: [
              "Discover the best",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80", children: "food around you" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-base md:text-lg max-w-md mx-auto", children: "Order from your favourite restaurants and get it delivered in minutes." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "form",
              {
                onSubmit: handleSearch,
                className: "relative max-w-xl mx-auto mt-2",
                "data-ocid": "hero-search",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center bg-card rounded-2xl shadow-2xl overflow-hidden border border-white/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 w-5 h-5 text-muted-foreground flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      value: searchQuery,
                      onChange: (e) => setSearchQuery(e.target.value),
                      placeholder: "Search restaurants or dishes...",
                      className: "flex-1 pl-12 pr-4 py-4 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm font-medium",
                      "aria-label": "Search restaurants or dishes"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "submit",
                      className: "btn-gradient m-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold",
                      "data-ocid": "hero-search-btn",
                      children: "Order Now"
                    }
                  )
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-6 pt-2", children: [
              { label: "Restaurants", value: "500+" },
              { label: "Dishes", value: "5000+" },
              { label: "Happy users", value: "50K+" }
            ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-bold text-lg leading-none", children: stat.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-xs mt-0.5", children: stat.label })
            ] }, stat.label)) })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border sticky top-16 z-30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-2 overflow-x-auto py-4 scrollbar-hide",
        "data-ocid": "category-tabs",
        children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => handleCategoryClick(cat.label),
            className: cn(
              "flex-shrink-0 flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold transition-smooth",
              activeCategory === cat.label ? "btn-gradient text-white shadow-md" : "bg-muted hover:bg-muted/80 text-foreground hover:shadow-sm"
            ),
            "data-ocid": `category-${cat.label.toLowerCase()}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl leading-none", children: cat.emoji }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat.label })
            ]
          },
          cat.label
        ))
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: activeCategory === "All" ? "Popular Restaurants Near You" : `${activeCategory} Restaurants` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: "Top-rated restaurants in your area" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/restaurants",
            className: "hidden md:flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-smooth",
            "data-ocid": "see-all-restaurants",
            children: [
              "See all ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            ]
          }
        )
      ] }),
      isLoading || seedMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5", children: ["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, `sk-${k}`)) }) : featuredRestaurants.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", "data-ocid": "empty-restaurants", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-5xl mb-4", children: "🍽️" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground", children: "No restaurants found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-2", children: "Try a different category" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 fade-in",
          "data-ocid": "restaurants-grid",
          children: featuredRestaurants.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(RestaurantCard, { restaurant: r }, r.id.toString()))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex md:hidden justify-center mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/restaurants",
          className: "btn-gradient px-6 py-3 rounded-xl text-sm font-semibold",
          "data-ocid": "see-all-restaurants-mobile",
          children: "View All Restaurants"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Must-Try Dishes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: "Crowd favourites you'll love" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PopularDishesSection, { restaurants: restaurants ?? [] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative overflow-hidden rounded-3xl p-8 md:p-12",
        style: { background: "var(--gradient-secondary)" },
        "data-ocid": "promo-banner",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl translate-x-1/3 -translate-y-1/3" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-lg space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full", children: "Limited time offer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl md:text-4xl font-extrabold text-white", children: [
              "Get 30% off your",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "first order 🎉"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/80 text-sm", children: [
              "Use code",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold bg-white/20 px-2 py-0.5 rounded-md", children: "FOODIE30" }),
              " ",
              "at checkout"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/restaurants",
                className: "inline-flex items-center gap-2 bg-white text-foreground font-semibold px-6 py-3 rounded-xl text-sm hover:shadow-lg transition-smooth",
                "data-ocid": "promo-cta",
                children: [
                  "Order Now ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                ]
              }
            )
          ] })
        ]
      }
    ) }) })
  ] });
}
function PopularDishesSection({ restaurants }) {
  if (restaurants.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4", children: POPULAR_DISHES_STATIC.map((dish) => /* @__PURE__ */ jsxRuntimeExports.jsx(StaticDishCard, { dish }, dish.name)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 fade-in", children: POPULAR_DISHES_STATIC.map((dish) => {
    const hashIdx = dish.name.length % restaurants.length;
    const restaurant = restaurants[hashIdx];
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/restaurants/$id",
        params: { id: (restaurant == null ? void 0 : restaurant.id.toString()) ?? "1" },
        "data-ocid": `popular-dish-${dish.name.toLowerCase().replace(/\s+/g, "-")}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(StaticDishCard, { dish })
      },
      dish.name
    );
  }) });
}
function StaticDishCard({ dish }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl overflow-hidden border border-border transition-smooth hover:shadow-lg hover:-translate-y-1 cursor-pointer", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "w-full h-28 bg-gradient-to-br flex items-center justify-center",
          dish.gradient
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: dish.name.includes("Pizza") ? "🍕" : dish.name.includes("Chicken") || dish.name.includes("Butter") ? "🍛" : dish.name.includes("Burger") ? "🍔" : dish.name.includes("Cake") || dish.name.includes("Choco") ? "🍰" : dish.name.includes("Noodles") ? "🍜" : dish.name.includes("Biryani") ? "🍚" : "🍽️" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-bold text-foreground text-xs line-clamp-1", children: dish.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-1", children: dish.restaurant }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground text-xs", children: dish.price }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-xs font-semibold", children: "Add+" })
      ] })
    ] })
  ] });
}
export {
  Home as default
};

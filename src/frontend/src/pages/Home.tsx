import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { MenuItem, Restaurant } from "../backend.d";
import { DishCard } from "../components/DishCard";
import { Layout } from "../components/Layout";
import { RestaurantCard } from "../components/RestaurantCard";
import { SkeletonCard } from "../components/SkeletonCard";
import { useListRestaurants, useSeedData } from "../hooks/useQueries";

const CATEGORIES = [
  { label: "All", emoji: "🍽️" },
  { label: "Pizza", emoji: "🍕" },
  { label: "Burgers", emoji: "🍔" },
  { label: "Indian", emoji: "🍛" },
  { label: "Chinese", emoji: "🍜" },
  { label: "Desserts", emoji: "🍰" },
  { label: "Mexican", emoji: "🌮" },
  { label: "Salads", emoji: "🥗" },
];

// Static popular dishes mapped from seeded data (shown on home for visual richness)
const POPULAR_DISHES_STATIC = [
  {
    name: "Butter Chicken",
    restaurant: "The Spice Grill",
    price: "₹380",
    gradient: "from-orange-400 to-red-500",
  },
  {
    name: "Pepperoni Pizza",
    restaurant: "Pizza Palace",
    price: "₹450",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    name: "Veg Biryani",
    restaurant: "Biryani House",
    price: "₹290",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    name: "Chicken Burger",
    restaurant: "Burger Barn",
    price: "₹220",
    gradient: "from-amber-400 to-yellow-500",
  },
  {
    name: "Choco Lava Cake",
    restaurant: "Sweet Spot",
    price: "₹180",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    name: "Hakka Noodles",
    restaurant: "Dragon Wok",
    price: "₹260",
    gradient: "from-violet-400 to-purple-500",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const hasSeeded = useRef(false);

  const { data: restaurants, isLoading } = useListRestaurants();
  const seedMutation = useSeedData();

  // Seed data on first load if backend is empty
  useEffect(() => {
    if (
      !hasSeeded.current &&
      restaurants !== undefined &&
      restaurants.length === 0
    ) {
      hasSeeded.current = true;
      seedMutation.mutate();
    }
  }, [restaurants, seedMutation]);

  const filteredRestaurants: Restaurant[] = (restaurants ?? []).filter((r) => {
    if (activeCategory === "All") return true;
    return r.category.toLowerCase().includes(activeCategory.toLowerCase());
  });

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({
        to: "/restaurants",
        search: { q: searchQuery.trim() } as Record<string, string>,
      });
    }
  }

  function handleCategoryClick(category: string) {
    setActiveCategory(category);
    if (category !== "All") {
      navigate({
        to: "/restaurants",
        search: { category } as Record<string, string>,
      });
    }
  }

  const featuredRestaurants = filteredRestaurants.slice(0, 8);

  return (
    <Layout>
      {/* ── Hero Section ─────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--gradient-primary)" }}
        data-ocid="hero-section"
      >
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-14 md:py-20 relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-5">
            {/* Tagline badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/30">
              <span>🚀</span>
              <span>Fast delivery · Great food · Happy you</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Discover the best
              <br />
              <span className="text-white/80">food around you</span>
            </h1>

            <p className="text-white/80 text-base md:text-lg max-w-md mx-auto">
              Order from your favourite restaurants and get it delivered in
              minutes.
            </p>

            {/* Search bar */}
            <form
              onSubmit={handleSearch}
              className="relative max-w-xl mx-auto mt-2"
              data-ocid="hero-search"
            >
              <div className="relative flex items-center bg-card rounded-2xl shadow-2xl overflow-hidden border border-white/20">
                <Search className="absolute left-4 w-5 h-5 text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search restaurants or dishes..."
                  className="flex-1 pl-12 pr-4 py-4 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm font-medium"
                  aria-label="Search restaurants or dishes"
                />
                <button
                  type="submit"
                  className="btn-gradient m-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold"
                  data-ocid="hero-search-btn"
                >
                  Order Now
                </button>
              </div>
            </form>

            {/* Quick stats */}
            <div className="flex items-center justify-center gap-6 pt-2">
              {[
                { label: "Restaurants", value: "500+" },
                { label: "Dishes", value: "5000+" },
                { label: "Happy users", value: "50K+" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-white font-bold text-lg leading-none">
                    {stat.value}
                  </p>
                  <p className="text-white/70 text-xs mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────── */}
      <section className="bg-card border-b border-border sticky top-16 z-30">
        <div className="container mx-auto px-4">
          <div
            className="flex gap-2 overflow-x-auto py-4 scrollbar-hide"
            data-ocid="category-tabs"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                type="button"
                onClick={() => handleCategoryClick(cat.label)}
                className={cn(
                  "flex-shrink-0 flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold transition-smooth",
                  activeCategory === cat.label
                    ? "btn-gradient text-white shadow-md"
                    : "bg-muted hover:bg-muted/80 text-foreground hover:shadow-sm",
                )}
                data-ocid={`category-${cat.label.toLowerCase()}`}
              >
                <span className="text-2xl leading-none">{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Restaurants ─────────────────────────── */}
      <section className="bg-background py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                {activeCategory === "All"
                  ? "Popular Restaurants Near You"
                  : `${activeCategory} Restaurants`}
              </h2>
              <p className="text-muted-foreground text-sm mt-0.5">
                Top-rated restaurants in your area
              </p>
            </div>
            <Link
              to="/restaurants"
              className="hidden md:flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-smooth"
              data-ocid="see-all-restaurants"
            >
              See all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {isLoading || seedMutation.isPending ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {(["a", "b", "c", "d", "e", "f", "g", "h"] as const).map((k) => (
                <SkeletonCard key={`sk-${k}`} />
              ))}
            </div>
          ) : featuredRestaurants.length === 0 ? (
            <div className="text-center py-16" data-ocid="empty-restaurants">
              <p className="text-5xl mb-4">🍽️</p>
              <h3 className="font-display text-xl font-bold text-foreground">
                No restaurants found
              </h3>
              <p className="text-muted-foreground text-sm mt-2">
                Try a different category
              </p>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 fade-in"
              data-ocid="restaurants-grid"
            >
              {featuredRestaurants.map((r) => (
                <RestaurantCard key={r.id.toString()} restaurant={r} />
              ))}
            </div>
          )}

          <div className="flex md:hidden justify-center mt-6">
            <Link
              to="/restaurants"
              className="btn-gradient px-6 py-3 rounded-xl text-sm font-semibold"
              data-ocid="see-all-restaurants-mobile"
            >
              View All Restaurants
            </Link>
          </div>
        </div>
      </section>

      {/* ── Popular Dishes ───────────────────────────────── */}
      <section className="bg-muted/30 py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Must-Try Dishes
              </h2>
              <p className="text-muted-foreground text-sm mt-0.5">
                Crowd favourites you'll love
              </p>
            </div>
          </div>

          <PopularDishesSection restaurants={restaurants ?? []} />
        </div>
      </section>

      {/* ── Promo banner ─────────────────────────────────── */}
      <section className="bg-background py-10">
        <div className="container mx-auto px-4">
          <div
            className="relative overflow-hidden rounded-3xl p-8 md:p-12"
            style={{ background: "var(--gradient-secondary)" }}
            data-ocid="promo-banner"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl translate-x-1/3 -translate-y-1/3" />
            </div>
            <div className="relative z-10 max-w-lg space-y-4">
              <div className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Limited time offer
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white">
                Get 30% off your
                <br />
                first order 🎉
              </h2>
              <p className="text-white/80 text-sm">
                Use code{" "}
                <span className="font-mono font-bold bg-white/20 px-2 py-0.5 rounded-md">
                  FOODIE30
                </span>{" "}
                at checkout
              </p>
              <Link
                to="/restaurants"
                className="inline-flex items-center gap-2 bg-white text-foreground font-semibold px-6 py-3 rounded-xl text-sm hover:shadow-lg transition-smooth"
                data-ocid="promo-cta"
              >
                Order Now <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// ── Helper sub-component ──────────────────────────────────

interface PopularDishesSectionProps {
  restaurants: Restaurant[];
}

function PopularDishesSection({ restaurants }: PopularDishesSectionProps) {
  // Build a flat list of menu items from all restaurants for popular dishes
  // Since we display static dish cards when there's no live menu item data,
  // we show a static grid for richness but link to real restaurant pages
  if (restaurants.length === 0) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {POPULAR_DISHES_STATIC.map((dish) => (
          <StaticDishCard key={dish.name} dish={dish} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 fade-in">
      {POPULAR_DISHES_STATIC.map((dish) => {
        const hashIdx = dish.name.length % restaurants.length;
        const restaurant = restaurants[hashIdx];
        return (
          <Link
            key={dish.name}
            to="/restaurants/$id"
            params={{ id: restaurant?.id.toString() ?? "1" }}
            data-ocid={`popular-dish-${dish.name.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <StaticDishCard dish={dish} />
          </Link>
        );
      })}
    </div>
  );
}

interface StaticDish {
  name: string;
  restaurant: string;
  price: string;
  gradient: string;
}

function StaticDishCard({ dish }: { dish: StaticDish }) {
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border transition-smooth hover:shadow-lg hover:-translate-y-1 cursor-pointer">
      <div
        className={cn(
          "w-full h-28 bg-gradient-to-br flex items-center justify-center",
          dish.gradient,
        )}
      >
        <span className="text-4xl">
          {dish.name.includes("Pizza")
            ? "🍕"
            : dish.name.includes("Chicken") || dish.name.includes("Butter")
              ? "🍛"
              : dish.name.includes("Burger")
                ? "🍔"
                : dish.name.includes("Cake") || dish.name.includes("Choco")
                  ? "🍰"
                  : dish.name.includes("Noodles")
                    ? "🍜"
                    : dish.name.includes("Biryani")
                      ? "🍚"
                      : "🍽️"}
        </span>
      </div>
      <div className="p-3 space-y-1">
        <h4 className="font-display font-bold text-foreground text-xs line-clamp-1">
          {dish.name}
        </h4>
        <p className="text-xs text-muted-foreground line-clamp-1">
          {dish.restaurant}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-foreground text-xs">
            {dish.price}
          </span>
          <span className="text-primary text-xs font-semibold">Add+</span>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useDeferredValue, useRef, useState } from "react";
import type { Restaurant } from "../backend.d";
import { Layout } from "../components/Layout";
import { RestaurantCard } from "../components/RestaurantCard";
import { SkeletonCardGrid } from "../components/SkeletonCard";
import { useListRestaurants, useSearchRestaurants } from "../hooks/useQueries";

type SortOption = "default" | "rating" | "delivery_time" | "newest";
type RatingFilter = "" | "3" | "4" | "4.5";
const CATEGORIES = [
  "All",
  "Pizza",
  "Burgers",
  "Biryani",
  "Indian",
  "Chinese",
  "Rolls",
  "Desserts",
  "Drinks",
];

function sortRestaurants(list: Restaurant[], sort: SortOption): Restaurant[] {
  const copy = [...list];
  if (sort === "rating") return copy.sort((a, b) => b.rating - a.rating);
  if (sort === "delivery_time")
    return copy.sort(
      (a, b) => Number(a.deliveryTimeMinutes) - Number(b.deliveryTimeMinutes),
    );
  if (sort === "newest")
    return copy.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
  return copy;
}

export default function Restaurants() {
  const [searchInput, setSearchInput] = useState("");
  const deferredSearch = useDeferredValue(searchInput);
  const [category, setCategory] = useState("All");
  const [minRating, setMinRating] = useState<RatingFilter>("");
  const [sort, setSort] = useState<SortOption>("default");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const hasActiveFilter =
    deferredSearch !== "" || category !== "All" || minRating !== "";

  const filter = {
    searchTerm: deferredSearch || undefined,
    category: category !== "All" ? category : undefined,
    minRating: minRating ? Number.parseFloat(minRating) : undefined,
  };

  const allQuery = useListRestaurants();
  const searchQuery = useSearchRestaurants(filter);

  const isFiltering = hasActiveFilter;
  const rawList = isFiltering
    ? (searchQuery.data ?? [])
    : (allQuery.data ?? []);
  const isLoading = isFiltering ? searchQuery.isLoading : allQuery.isLoading;
  const restaurants = sortRestaurants(rawList, sort);

  const clearFilters = useCallback(() => {
    setSearchInput("");
    setCategory("All");
    setMinRating("");
    setSort("default");
  }, []);

  return (
    <Layout>
      {/* Header band */}
      <div className="bg-card border-b border-border sticky top-[64px] z-20">
        <div className="container mx-auto px-4 py-3 flex gap-3 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              ref={searchRef}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search restaurants..."
              className="pl-9 pr-9 h-10 bg-background"
              data-ocid="search-input"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <Button
            variant={filtersOpen ? "default" : "outline"}
            size="sm"
            onClick={() => setFiltersOpen((o) => !o)}
            className="gap-1.5 flex-shrink-0 lg:hidden"
            data-ocid="filter-toggle-btn"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasActiveFilter && (
              <span className="w-2 h-2 rounded-full bg-primary-foreground" />
            )}
          </Button>
        </div>

        {/* Category chips */}
        <div className="container mx-auto px-4 pb-3 overflow-x-auto">
          <div className="flex gap-2 w-max">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                data-ocid={`category-${cat.toLowerCase()}`}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-smooth border",
                  category === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar filters — desktop */}
        <aside className="hidden lg:block w-56 flex-shrink-0 space-y-5">
          <div className="bg-card rounded-2xl border border-border p-4 sticky top-[160px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-sm text-foreground flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filters
              </h2>
              {hasActiveFilter && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs text-primary hover:underline"
                  data-ocid="clear-filters-btn"
                >
                  Clear all
                </button>
              )}
            </div>

            <FilterPanel
              minRating={minRating}
              sort={sort}
              onMinRating={setMinRating}
              onSort={setSort}
            />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Mobile filter panel */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden mb-4 bg-card rounded-2xl border border-border"
              >
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm text-foreground">
                      Filters
                    </span>
                    {hasActiveFilter && (
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="text-xs text-primary hover:underline"
                        data-ocid="clear-filters-mobile-btn"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                  <FilterPanel
                    minRating={minRating}
                    sort={sort}
                    onMinRating={setMinRating}
                    onSort={setSort}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results header */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {isLoading ? (
                "Loading..."
              ) : (
                <>
                  <span className="font-semibold text-foreground">
                    {restaurants.length}
                  </span>{" "}
                  restaurant{restaurants.length !== 1 ? "s" : ""} found
                </>
              )}
            </p>
          </div>

          {/* Grid */}
          {isLoading ? (
            <SkeletonCardGrid count={6} />
          ) : restaurants.length === 0 ? (
            <EmptyState onClear={clearFilters} hasFilters={hasActiveFilter} />
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
            >
              {restaurants.map((r, i) => (
                <motion.div
                  key={r.id.toString()}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                >
                  <RestaurantCard restaurant={r} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}

// Filter panel (shared between sidebar and mobile)
interface FilterPanelProps {
  minRating: RatingFilter;
  sort: SortOption;
  onMinRating: (v: RatingFilter) => void;
  onSort: (v: SortOption) => void;
}

function FilterPanel({
  minRating,
  sort,
  onMinRating,
  onSort,
}: FilterPanelProps) {
  return (
    <div className="space-y-5">
      {/* Rating */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Min Rating
        </p>
        <div className="space-y-1.5">
          {(["", "3", "4", "4.5"] as RatingFilter[]).map((val) => (
            <label
              key={val}
              className="flex items-center gap-2 cursor-pointer group"
              data-ocid={`rating-filter-${val || "all"}`}
            >
              <input
                type="radio"
                name="rating"
                value={val}
                checked={minRating === val}
                onChange={() => onMinRating(val)}
                className="accent-primary"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {val === "" ? "All ratings" : `${val}★ & above`}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Sort By
        </p>
        <div className="space-y-1.5">
          {(
            [
              ["default", "Recommended"],
              ["rating", "Rating: High to Low"],
              ["delivery_time", "Delivery Time"],
              ["newest", "Newest First"],
            ] as [SortOption, string][]
          ).map(([val, label]) => (
            <label
              key={val}
              className="flex items-center gap-2 cursor-pointer group"
              data-ocid={`sort-${val}`}
            >
              <input
                type="radio"
                name="sort"
                value={val}
                checked={sort === val}
                onChange={() => onSort(val)}
                className="accent-primary"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  onClear,
  hasFilters,
}: { onClear: () => void; hasFilters: boolean }) {
  return (
    <div
      data-ocid="empty-state"
      className="flex flex-col items-center justify-center py-24 gap-4 text-center"
    >
      <span className="text-6xl">🍽️</span>
      <h3 className="font-display font-bold text-xl text-foreground">
        No restaurants found
      </h3>
      <p className="text-muted-foreground text-sm max-w-xs">
        {hasFilters
          ? "No restaurants match your current filters. Try adjusting or clearing them."
          : "No restaurants available right now. Check back soon!"}
      </p>
      {hasFilters && (
        <Button
          variant="outline"
          onClick={onClear}
          data-ocid="empty-clear-filters-btn"
        >
          Clear filters
        </Button>
      )}
    </div>
  );
}

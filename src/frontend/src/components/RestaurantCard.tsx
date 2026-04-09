import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Star, Utensils } from "lucide-react";
import type { Restaurant } from "../backend.d";
import { Badge } from "./Badge";

interface RestaurantCardProps {
  restaurant: Restaurant;
  className?: string;
}

// Gradient palette for placeholder images
const PLACEHOLDER_GRADIENTS = [
  "from-orange-400 to-rose-500",
  "from-amber-400 to-orange-500",
  "from-red-400 to-pink-500",
  "from-yellow-400 to-amber-500",
  "from-emerald-400 to-teal-500",
  "from-violet-400 to-purple-500",
];

function getPlaceholderGradient(id: bigint): string {
  return PLACEHOLDER_GRADIENTS[Number(id) % PLACEHOLDER_GRADIENTS.length];
}

export function RestaurantCard({ restaurant, className }: RestaurantCardProps) {
  const imageUrl = restaurant.imageBlob?.getDirectURL();
  const gradient = getPlaceholderGradient(restaurant.id);
  const deliveryFeeDisplay =
    Number(restaurant.deliveryFee) === 0
      ? "Free delivery"
      : `₹${Number(restaurant.deliveryFee)} delivery`;

  return (
    <Link
      to="/restaurants/$id"
      params={{ id: restaurant.id.toString() }}
      className={cn(
        "group block bg-card rounded-2xl overflow-hidden border border-border",
        "card-elevated cursor-pointer",
        className,
      )}
      data-ocid="restaurant-card"
    >
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={cn(
              "w-full h-full bg-gradient-to-br flex items-center justify-center",
              gradient,
            )}
          >
            <Utensils className="w-14 h-14 text-white/60" />
          </div>
        )}
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          <Badge variant="primary" className="text-xs backdrop-blur-sm">
            {restaurant.category}
          </Badge>
        </div>
        {!restaurant.isActive && (
          <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
            <span className="text-white font-semibold text-sm bg-foreground/70 px-3 py-1.5 rounded-full">
              Closed
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Name + Rating row */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-bold text-foreground text-base leading-tight line-clamp-1 min-w-0">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-1 flex-shrink-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-lg">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-bold">
              {restaurant.rating.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">
              ({Number(restaurant.reviewCount).toLocaleString()})
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-xs line-clamp-1">
          {restaurant.description}
        </p>

        {/* Delivery info */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground pt-0.5">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {Number(restaurant.deliveryTimeMinutes)} mins
          </span>
          <span className="text-border">•</span>
          <span>{deliveryFeeDisplay}</span>
        </div>

        {/* Address */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="line-clamp-1">{restaurant.address}</span>
        </div>
      </div>
    </Link>
  );
}

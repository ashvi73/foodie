import { cn } from "@/lib/utils";
import { Plus, Utensils } from "lucide-react";
import type { MenuItem } from "../backend.d";
import { useCart } from "../hooks/useCart";

interface DishCardProps {
  item: MenuItem;
  restaurantName?: string;
  className?: string;
}

const DISH_GRADIENTS = [
  "from-amber-400 to-orange-500",
  "from-rose-400 to-red-500",
  "from-green-400 to-emerald-500",
  "from-purple-400 to-violet-500",
  "from-yellow-400 to-amber-500",
  "from-pink-400 to-rose-500",
];

function getDishGradient(id: bigint): string {
  return DISH_GRADIENTS[Number(id) % DISH_GRADIENTS.length];
}

export function DishCard({ item, restaurantName, className }: DishCardProps) {
  const { addItem, items } = useCart();
  const imageUrl = item.imageBlob?.getDirectURL();
  const gradient = getDishGradient(item.id);
  const priceDisplay = `₹${Number(item.price)}`;
  const inCart = items.some((i) => i.menuItemId === item.id.toString());

  function handleAdd() {
    addItem({
      id: `${item.restaurantId}-${item.id}`,
      menuItemId: item.id.toString(),
      restaurantId: item.restaurantId.toString(),
      name: item.name,
      price: Number(item.price),
      image: imageUrl ?? "",
      quantity: 1,
    });
  }

  return (
    <div
      className={cn(
        "group bg-card rounded-2xl overflow-hidden border border-border",
        "transition-smooth hover:shadow-lg hover:-translate-y-1",
        className,
      )}
      data-ocid="dish-card"
    >
      {/* Image */}
      <div className="relative w-full h-36 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={cn(
              "w-full h-full bg-gradient-to-br flex items-center justify-center",
              gradient,
            )}
          >
            <Utensils className="w-10 h-10 text-white/60" />
          </div>
        )}
        {/* Veg indicator dot */}
        <div className="absolute top-2 right-2 w-4 h-4 rounded-sm border-2 border-green-600 bg-card flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-green-600" />
        </div>
      </div>

      {/* Content */}
      <div className="p-3 space-y-1.5">
        <h4 className="font-display font-bold text-foreground text-sm line-clamp-1">
          {item.name}
        </h4>
        {restaurantName && (
          <p className="text-xs text-muted-foreground line-clamp-1">
            {restaurantName}
          </p>
        )}
        <p className="text-xs text-muted-foreground line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between pt-1">
          <span className="font-bold text-foreground text-sm">
            {priceDisplay}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            className={cn(
              "flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-smooth",
              inCart
                ? "bg-primary/15 text-primary border border-primary/30"
                : "btn-gradient text-white",
            )}
            aria-label={`Add ${item.name} to cart`}
            data-ocid="dish-add-to-cart"
          >
            <Plus className="w-3.5 h-3.5" />
            {inCart ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

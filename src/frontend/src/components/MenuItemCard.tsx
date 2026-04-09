import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import type { MenuItem } from "../backend.d";
import { useCart } from "../hooks/useCart";
import { Badge } from "./Badge";

interface MenuItemCardProps {
  item: MenuItem;
  restaurantId: bigint;
  restaurantName?: string;
}

export function MenuItemCard({
  item,
  restaurantId,
  restaurantName,
}: MenuItemCardProps) {
  const { items, addItem, updateQuantity } = useCart();
  const menuItemIdStr = item.id.toString();
  const cartItem = items.find((i) => i.menuItemId === menuItemIdStr);
  const quantity = cartItem?.quantity ?? 0;
  const price = Number(item.price);
  const imageUrl = item.imageBlob?.getDirectURL();

  const handleAdd = () => {
    addItem({
      id: `${restaurantId}-${item.id}`,
      menuItemId: menuItemIdStr,
      restaurantId: restaurantId.toString(),
      name: item.name,
      price,
      image: imageUrl ?? "",
      quantity: 1,
    });
  };

  const handleDecrease = () => {
    updateQuantity(menuItemIdStr, quantity - 1);
  };

  const handleIncrease = () => {
    updateQuantity(menuItemIdStr, quantity + 1);
  };

  return (
    <div
      data-ocid="menu-item-card"
      className={cn(
        "flex gap-4 bg-card rounded-2xl p-4 border border-border transition-smooth",
        "hover:border-primary/30 hover:shadow-md",
        !item.isAvailable && "opacity-60",
      )}
    >
      {/* Image */}
      <div className="relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-muted">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center">
            <span className="text-3xl opacity-50">🍴</span>
          </div>
        )}
        {item.category === "Veg" && (
          <div className="absolute top-1 left-1">
            <div className="w-4 h-4 border-2 border-emerald-600 rounded flex items-center justify-center bg-card">
              <div className="w-2 h-2 rounded-full bg-emerald-600" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
        <div className="space-y-1">
          <div className="flex items-start gap-2 justify-between">
            <h3 className="font-display font-semibold text-sm text-foreground leading-tight line-clamp-1">
              {item.name}
            </h3>
            {!item.isAvailable && (
              <Badge variant="destructive" className="flex-shrink-0 text-xs">
                Unavailable
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {item.description ||
              `Delicious ${item.name} from ${restaurantName ?? "our kitchen"}`}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="font-display font-bold text-base text-foreground">
            ₹{price.toLocaleString()}
          </span>

          {item.isAvailable ? (
            quantity > 0 ? (
              <div
                className="flex items-center gap-2 bg-primary rounded-xl overflow-hidden"
                data-ocid="qty-selector"
              >
                <button
                  type="button"
                  onClick={handleDecrease}
                  className="w-8 h-8 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-primary-foreground text-sm font-bold min-w-[1.5rem] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrease}
                  className="w-8 h-8 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Button
                size="sm"
                onClick={handleAdd}
                data-ocid="add-to-cart-btn"
                className="btn-gradient rounded-xl h-8 px-3 text-xs gap-1 flex-shrink-0"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Add
              </Button>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}

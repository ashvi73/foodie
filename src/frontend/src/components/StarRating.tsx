import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

const sizeClasses = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

const textClasses = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showValue = true,
  reviewCount,
  className,
}: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }, (_, i) => i).map((i) => (
          <Star
            key={`star-${i}`}
            className={cn(
              sizeClasses[size],
              i < Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-muted text-muted-foreground",
            )}
          />
        ))}
      </div>
      {showValue && (
        <span
          className={cn("font-semibold text-foreground", textClasses[size])}
        >
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className={cn("text-muted-foreground", textClasses[size])}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}

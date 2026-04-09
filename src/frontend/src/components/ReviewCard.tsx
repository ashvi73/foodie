import { User } from "lucide-react";
import type { Review } from "../backend.d";
import { StarRating } from "./StarRating";

interface ReviewCardProps {
  review: Review;
}

function formatDate(timestamp: bigint): string {
  try {
    // Backend stores nanoseconds; convert to ms
    const ms = Number(timestamp / BigInt(1_000_000));
    const date = new Date(ms);
    if (Number.isNaN(date.getTime())) return "Recently";
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Recently";
  }
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function ReviewCard({ review }: ReviewCardProps) {
  const initials = getInitials(review.userName || "Anonymous");
  const dateStr = formatDate(review.createdAt);
  const rating = Number(review.rating);

  return (
    <div
      data-ocid="review-card"
      className="bg-card rounded-2xl p-4 border border-border space-y-3 transition-smooth hover:border-primary/20"
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
          {initials ? (
            <span className="text-xs font-bold text-primary">{initials}</span>
          ) : (
            <User className="w-4 h-4 text-primary" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-sm text-foreground truncate">
              {review.userName || "Anonymous"}
            </span>
            <span className="text-xs text-muted-foreground flex-shrink-0">
              {dateStr}
            </span>
          </div>
          <StarRating
            rating={rating}
            size="sm"
            showValue={false}
            className="mt-0.5"
          />
        </div>
      </div>

      {/* Comment */}
      {review.comment && (
        <p className="text-sm text-muted-foreground leading-relaxed pl-12">
          {review.comment}
        </p>
      )}
    </div>
  );
}

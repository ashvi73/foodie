import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Clock,
  MapPin,
  MessageSquarePlus,
  Phone,
  Star,
  UtensilsCrossed,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "../components/Badge";
import { Layout } from "../components/Layout";
import { MenuItemCard } from "../components/MenuItemCard";
import { Modal } from "../components/Modal";
import { ReviewCard } from "../components/ReviewCard";
import { SkeletonMenuList } from "../components/SkeletonMenuItem";
import { StarRating } from "../components/StarRating";
import { useAuth } from "../hooks/useAuth";
import {
  useAddReview,
  useGetRestaurant,
  useGetRestaurantRatingSummary,
  useGetRestaurantReviews,
  useListMenuItems,
} from "../hooks/useQueries";

const MENU_CATEGORIES_ALL = "All";

export default function RestaurantDetail() {
  const { id } = useParams({ from: "/restaurants/$id" });
  const restaurantId = BigInt(id);

  const { data: restaurant, isLoading: rLoading } =
    useGetRestaurant(restaurantId);
  const { data: menuItems = [], isLoading: mLoading } =
    useListMenuItems(restaurantId);
  const { data: reviews = [], isLoading: revLoading } =
    useGetRestaurantReviews(restaurantId);
  const { data: ratingSummary } = useGetRestaurantRatingSummary(restaurantId);

  const [menuCategory, setMenuCategory] = useState(MENU_CATEGORIES_ALL);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const menuCategories = [
    MENU_CATEGORIES_ALL,
    ...Array.from(new Set(menuItems.map((i) => i.category).filter(Boolean))),
  ];

  const filteredMenu =
    menuCategory === MENU_CATEGORIES_ALL
      ? menuItems
      : menuItems.filter((i) => i.category === menuCategory);

  const imageUrl = restaurant?.imageBlob?.getDirectURL();

  if (!rLoading && !restaurant) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <span className="text-6xl mb-4 block">🍽️</span>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Restaurant not found
          </h1>
          <p className="text-muted-foreground mb-6">
            This restaurant may have been removed.
          </p>
          <Link to="/restaurants">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Browse Restaurants
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Banner */}
      <div className="relative h-52 sm:h-72 overflow-hidden bg-muted">
        {rLoading ? (
          <Skeleton className="w-full h-full rounded-none" />
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt={restaurant?.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/20 flex items-center justify-center">
            <UtensilsCrossed className="w-20 h-20 text-primary/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />

        {/* Back btn */}
        <Link
          to="/restaurants"
          className="absolute top-4 left-4 flex items-center gap-1.5 bg-card/90 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-medium text-foreground hover:bg-card transition-smooth shadow-md"
          data-ocid="back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Open/Closed status */}
        {restaurant && (
          <div className="absolute top-4 right-4">
            <span
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-semibold shadow",
                restaurant.isActive
                  ? "bg-emerald-500 text-white"
                  : "bg-foreground/80 text-background",
              )}
              data-ocid="open-status-badge"
            >
              {restaurant.isActive ? "Open Now" : "Closed"}
            </span>
          </div>
        )}
      </div>

      {/* Restaurant Info Card */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-5">
          {rLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          ) : restaurant ? (
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="space-y-2">
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  {restaurant.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="primary">{restaurant.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground max-w-xl">
                  {restaurant.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-1">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary" />
                    {Number(restaurant.deliveryTimeMinutes)} min delivery
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary" />
                    {restaurant.address}
                  </span>
                  {restaurant.phone && (
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-primary" />
                      {restaurant.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* Rating summary */}
              <div className="flex flex-col items-center bg-muted/40 rounded-2xl px-6 py-4 min-w-[120px] border border-border">
                <span className="font-display text-4xl font-black text-foreground">
                  {(ratingSummary?.averageRating ?? restaurant.rating).toFixed(
                    1,
                  )}
                </span>
                <StarRating
                  rating={ratingSummary?.averageRating ?? restaurant.rating}
                  size="sm"
                  showValue={false}
                />
                <span className="text-xs text-muted-foreground mt-1">
                  {Number(
                    ratingSummary?.reviewCount ?? restaurant.reviewCount,
                  ).toLocaleString()}{" "}
                  reviews
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-10">
        {/* Menu section */}
        <section aria-labelledby="menu-heading">
          <div className="flex items-center justify-between mb-4 gap-2">
            <h2
              id="menu-heading"
              className="font-display text-xl font-bold text-foreground"
            >
              Menu
            </h2>
          </div>

          {/* Category filter tabs */}
          {menuCategories.length > 1 && (
            <div className="overflow-x-auto -mx-4 px-4 mb-5">
              <div className="flex gap-2 w-max" data-ocid="menu-category-tabs">
                {menuCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setMenuCategory(cat)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-smooth border",
                      menuCategory === cat
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-muted-foreground border-border hover:border-primary/50",
                    )}
                    data-ocid={`menu-cat-${cat.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {mLoading ? (
            <SkeletonMenuList count={4} />
          ) : filteredMenu.length === 0 ? (
            <div
              data-ocid="menu-empty-state"
              className="text-center py-16 text-muted-foreground"
            >
              <span className="text-4xl mb-3 block">🍴</span>
              <p className="text-sm">No items in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {filteredMenu.map((item, i) => (
                <motion.div
                  key={item.id.toString()}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                >
                  <MenuItemCard
                    item={item}
                    restaurantId={restaurantId}
                    restaurantName={restaurant?.name}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Reviews section */}
        <section
          aria-labelledby="reviews-heading"
          className="border-t border-border pt-8"
        >
          <div className="flex items-center justify-between mb-5">
            <h2
              id="reviews-heading"
              className="font-display text-xl font-bold text-foreground"
            >
              Reviews
              {reviews.length > 0 && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({reviews.length})
                </span>
              )}
            </h2>
            {isAuthenticated && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setReviewModalOpen(true)}
                className="gap-2"
                data-ocid="add-review-btn"
              >
                <MessageSquarePlus className="w-4 h-4" />
                Write a Review
              </Button>
            )}
          </div>

          {revLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }, (_, i) => i).map((i) => (
                <Skeleton key={`rev-skel-${i}`} className="h-24 rounded-2xl" />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div
              data-ocid="reviews-empty-state"
              className="text-center py-12 text-muted-foreground"
            >
              <Star className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium text-sm">No reviews yet.</p>
              {isAuthenticated && (
                <p className="text-xs mt-1">Be the first to leave a review!</p>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {reviews.map((review) => (
                <ReviewCard key={review.id.toString()} review={review} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Add Review Modal */}
      <AddReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        restaurantId={restaurantId}
      />
    </Layout>
  );
}

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantId: bigint;
}

function AddReviewModal({
  isOpen,
  onClose,
  restaurantId,
}: AddReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");
  const addReview = useAddReview();

  const handleSubmit = async () => {
    if (!userName.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (rating < 1 || rating > 5) {
      toast.error("Please select a rating.");
      return;
    }
    try {
      await addReview.mutateAsync({
        restaurantId,
        rating: BigInt(rating),
        comment: comment.trim(),
        userName: userName.trim(),
      });
      toast.success("Review submitted! Thank you.");
      setComment("");
      setRating(5);
      setUserName("");
      onClose();
    } catch {
      toast.error("Failed to submit review. Please try again.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Write a Review" size="md">
      <div className="space-y-4" data-ocid="review-modal">
        {/* Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="reviewer-name"
            className="text-sm font-medium text-foreground"
          >
            Your Name
          </label>
          <input
            id="reviewer-name"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            data-ocid="reviewer-name-input"
          />
        </div>

        {/* Star selector */}
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-foreground">Rating</p>
          <div
            className="flex items-center gap-1"
            data-ocid="star-rating-selector"
          >
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setRating(s)}
                className="p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                aria-label={`Rate ${s} out of 5`}
              >
                <Star
                  className={cn(
                    "w-7 h-7 transition-colors",
                    s <= rating
                      ? "fill-amber-400 text-amber-400"
                      : "fill-muted text-muted-foreground",
                  )}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              {rating} / 5
            </span>
          </div>
        </div>

        {/* Comment */}
        <div className="space-y-1.5">
          <label
            htmlFor="review-comment"
            className="text-sm font-medium text-foreground"
          >
            Comment <span className="text-muted-foreground">(optional)</span>
          </label>
          <Textarea
            id="review-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            rows={3}
            data-ocid="review-comment-input"
            className="resize-none"
          />
        </div>

        <div className="flex gap-3 pt-1">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            type="button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 btn-gradient"
            disabled={addReview.isPending}
            type="button"
            data-ocid="submit-review-btn"
          >
            {addReview.isPending ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

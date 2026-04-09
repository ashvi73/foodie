import List "mo:core/List";
import Set "mo:core/Set";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import CommonTypes "../types/common";
import ReviewTypes "../types/review";

module {
  public type UserId = CommonTypes.UserId;
  public type RestaurantId = CommonTypes.RestaurantId;
  public type OrderId = CommonTypes.OrderId;
  public type ReviewId = CommonTypes.ReviewId;
  public type Review = ReviewTypes.Review;
  public type AddReviewInput = ReviewTypes.AddReviewInput;
  public type RestaurantRatingSummary = ReviewTypes.RestaurantRatingSummary;

  public func listReviews(
    reviews : List.List<Review>,
    restaurantId : RestaurantId,
  ) : [Review] {
    reviews.filter(func(r : Review) : Bool {
      r.restaurantId == restaurantId
    }).toArray();
  };

  public func addReview(
    reviews : List.List<Review>,
    nextId : Nat,
    userId : UserId,
    input : AddReviewInput,
    hasOrdered : Bool,
  ) : ReviewId {
    if (not hasOrdered) {
      Runtime.trap("You must have ordered from this restaurant before leaving a review");
    };
    if (input.rating < 1 or input.rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };
    let review : Review = {
      id = nextId;
      restaurantId = input.restaurantId;
      userId = userId;
      userName = input.userName;
      rating = input.rating;
      comment = input.comment;
      createdAt = Time.now();
    };
    reviews.add(review);
    nextId;
  };

  public func getRatingSummary(
    reviews : List.List<Review>,
    restaurantId : RestaurantId,
  ) : RestaurantRatingSummary {
    let restaurantReviews = reviews.filter(func(r : Review) : Bool {
      r.restaurantId == restaurantId
    });
    let count = restaurantReviews.size();
    let totalRating = restaurantReviews.foldLeft(0, func(acc, r) {
      acc + r.rating
    });
    let avgRating : Float = if (count == 0) {
      0.0
    } else {
      totalRating.toFloat() / count.toFloat()
    };
    {
      restaurantId = restaurantId;
      averageRating = avgRating;
      reviewCount = count;
    };
  };

  public func hasUserOrdered(
    userId : UserId,
    restaurantId : RestaurantId,
    orderedRestaurants : Map.Map<UserId, Set.Set<RestaurantId>>,
  ) : Bool {
    switch (orderedRestaurants.get(userId)) {
      case null { false };
      case (?restaurantSet) {
        restaurantSet.contains(restaurantId)
      };
    };
  };
};

import List "mo:core/List";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import ReviewTypes "../types/review";
import ReviewLib "../lib/review";

mixin (
  accessControlState : AccessControl.AccessControlState,
  reviews : List.List<ReviewTypes.Review>,
  nextReviewId : { var value : Nat },
  orderedRestaurants : Map.Map<CommonTypes.UserId, Set.Set<CommonTypes.RestaurantId>>,
) {
  public query func getRestaurantReviews(restaurantId : CommonTypes.RestaurantId) : async [ReviewTypes.Review] {
    ReviewLib.listReviews(reviews, restaurantId);
  };

  public shared ({ caller }) func addReview(input : ReviewTypes.AddReviewInput) : async CommonTypes.ReviewId {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    let hasOrdered = ReviewLib.hasUserOrdered(caller, input.restaurantId, orderedRestaurants);
    let id = nextReviewId.value;
    nextReviewId.value += 1;
    ReviewLib.addReview(reviews, id, caller, input, hasOrdered);
  };

  public query func getRestaurantRatingSummary(restaurantId : CommonTypes.RestaurantId) : async ReviewTypes.RestaurantRatingSummary {
    ReviewLib.getRatingSummary(reviews, restaurantId);
  };
};

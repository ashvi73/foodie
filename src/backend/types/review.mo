import Common "common";

module {
  public type Review = {
    id : Common.ReviewId;
    restaurantId : Common.RestaurantId;
    userId : Common.UserId;
    userName : Text;
    rating : Nat;
    comment : Text;
    createdAt : Common.Timestamp;
  };

  public type AddReviewInput = {
    restaurantId : Common.RestaurantId;
    userName : Text;
    rating : Nat;
    comment : Text;
  };

  public type RestaurantRatingSummary = {
    restaurantId : Common.RestaurantId;
    averageRating : Float;
    reviewCount : Nat;
  };
};

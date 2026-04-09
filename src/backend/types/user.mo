import Common "common";

module {
  public type Address = {
    tag : Text;
    street : Text;
    city : Text;
    state : Text;
    postalCode : Text;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
    savedAddresses : [Address];
    isAdmin : Bool;
    createdAt : Common.Timestamp;
  };

  public type UserProfileInput = {
    name : Text;
    email : Text;
    phone : Text;
  };
};

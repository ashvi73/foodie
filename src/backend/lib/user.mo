import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import CommonTypes "../types/common";
import UserTypes "../types/user";

module {
  public type UserId = CommonTypes.UserId;
  public type UserProfile = UserTypes.UserProfile;
  public type UserProfileInput = UserTypes.UserProfileInput;
  public type Address = UserTypes.Address;

  public func getProfile(
    profiles : Map.Map<UserId, UserProfile>,
    userId : UserId,
  ) : ?UserProfile {
    profiles.get(userId);
  };

  public func saveProfile(
    profiles : Map.Map<UserId, UserProfile>,
    userId : UserId,
    input : UserProfileInput,
    isAdmin : Bool,
  ) : () {
    let existing = profiles.get(userId);
    let savedAddresses : [Address] = switch (existing) {
      case (?p) { p.savedAddresses };
      case null { [] };
    };
    let createdAt : Int = switch (existing) {
      case (?p) { p.createdAt };
      case null { Time.now() };
    };
    let profile : UserProfile = {
      name = input.name;
      email = input.email;
      phone = input.phone;
      savedAddresses = savedAddresses;
      isAdmin = isAdmin;
      createdAt = createdAt;
    };
    profiles.add(userId, profile);
  };

  public func addAddress(
    profiles : Map.Map<UserId, UserProfile>,
    userId : UserId,
    address : Address,
  ) : () {
    switch (profiles.get(userId)) {
      case null { Runtime.trap("Profile not found") };
      case (?profile) {
        let updated : UserProfile = {
          profile with
          savedAddresses = profile.savedAddresses.concat([address]);
        };
        profiles.add(userId, updated);
      };
    };
  };

  public func removeAddress(
    profiles : Map.Map<UserId, UserProfile>,
    userId : UserId,
    index : Nat,
  ) : () {
    switch (profiles.get(userId)) {
      case null { Runtime.trap("Profile not found") };
      case (?profile) {
        let addresses = profile.savedAddresses;
        if (index >= addresses.size()) {
          Runtime.trap("Address index out of bounds");
        };
        // Build new array excluding the address at `index`
        var i = 0;
        let newAddresses = addresses.filter(func(_ : Address) : Bool {
          let keep = i != index;
          i += 1;
          keep;
        });
        let finalProfile : UserProfile = {
          profile with
          savedAddresses = newAddresses;
        };
        profiles.add(userId, finalProfile);
      };
    };
  };

  public func checkIsAdmin(
    profiles : Map.Map<UserId, UserProfile>,
    userId : UserId,
  ) : Bool {
    switch (profiles.get(userId)) {
      case null { false };
      case (?p) { p.isAdmin };
    };
  };
};

import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import UserTypes "../types/user";
import UserLib "../lib/user";

mixin (
  accessControlState : AccessControl.AccessControlState,
  userProfiles : Map.Map<CommonTypes.UserId, UserTypes.UserProfile>,
) {
  public query ({ caller }) func getCallerUserProfile() : async ?UserTypes.UserProfile {
    UserLib.getProfile(userProfiles, caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(input : UserTypes.UserProfileInput) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    UserLib.saveProfile(userProfiles, caller, input, isAdmin);
  };

  public query ({ caller }) func getUserProfile(userId : CommonTypes.UserId) : async ?UserTypes.UserProfile {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    UserLib.getProfile(userProfiles, userId);
  };

  public shared ({ caller }) func addDeliveryAddress(address : UserTypes.Address) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    UserLib.addAddress(userProfiles, caller, address);
  };

  public shared ({ caller }) func removeDeliveryAddress(index : Nat) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    UserLib.removeAddress(userProfiles, caller, index);
  };
};

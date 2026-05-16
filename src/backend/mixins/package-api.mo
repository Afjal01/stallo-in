import AccessControl "mo:caffeineai-authorization/access-control";
import Runtime "mo:core/Runtime";
import CommonTypes "../types/common";
import BookingTypes "../types/booking";
import PackageLib "../lib/package";
import VendorLib "../lib/vendor";

mixin (
  accessControlState : AccessControl.AccessControlState,
  packageState : PackageLib.State,
  vendorState : VendorLib.State,
) {
  public shared ({ caller }) func createPackage(
    vendorId : CommonTypes.VendorId,
    pkg : {
      name : Text;
      price : Nat;
      guestMin : Nat;
      guestMax : Nat;
      inclusions : [Text];
      setupCharge : Nat;
      travelCharge : Nat;
    },
  ) : async BookingTypes.StallPackage {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be authenticated");
    };
    PackageLib.createPackage(packageState, vendorState, vendorId, caller, pkg);
  };

  public shared ({ caller }) func updatePackage(
    packageId : CommonTypes.PackageId,
    pkg : {
      name : ?Text;
      price : ?Nat;
      guestMin : ?Nat;
      guestMax : ?Nat;
      inclusions : ?[Text];
      setupCharge : ?Nat;
      travelCharge : ?Nat;
      isActive : ?Bool;
    },
  ) : async BookingTypes.StallPackage {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be authenticated");
    };
    PackageLib.updatePackage(packageState, vendorState, packageId, caller, pkg);
  };

  public shared ({ caller }) func deletePackage(
    packageId : CommonTypes.PackageId
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be authenticated");
    };
    PackageLib.deletePackage(packageState, vendorState, packageId, caller);
  };

  public query func listPackagesByVendor(
    vendorId : CommonTypes.VendorId
  ) : async [BookingTypes.StallPackage] {
    PackageLib.listPackagesByVendor(packageState, vendorId);
  };

  public query func getPackage(
    packageId : CommonTypes.PackageId
  ) : async ?BookingTypes.StallPackage {
    PackageLib.getPackage(packageState, packageId);
  };
};

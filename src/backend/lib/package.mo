import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import CommonTypes "../types/common";
import BookingTypes "../types/booking";
import VendorLib "vendor";

module {
  public type State = {
    packages : Map.Map<CommonTypes.PackageId, BookingTypes.StallPackage>;
    counter : { var nextId : Nat };
  };

  public func initState() : State {
    {
      packages = Map.empty<CommonTypes.PackageId, BookingTypes.StallPackage>();
      counter = { var nextId = 0 };
    };
  };

  public func createPackage(
    state : State,
    vendorState : VendorLib.State,
    vendorId : CommonTypes.VendorId,
    callerId : CommonTypes.UserId,
    pkg : {
      name : Text;
      price : Nat;
      guestMin : Nat;
      guestMax : Nat;
      inclusions : [Text];
      setupCharge : Nat;
      travelCharge : Nat;
    },
  ) : BookingTypes.StallPackage {
    let vendor = switch (vendorState.vendors.get(vendorId)) {
      case (?v) { v };
      case null { Runtime.trap("Vendor not found") };
    };
    if (not Principal.equal(vendor.ownerId, callerId)) {
      Runtime.trap("Unauthorized: Not vendor owner");
    };
    let id = state.counter.nextId.toText();
    state.counter.nextId += 1;
    let newPkg : BookingTypes.StallPackage = {
      id;
      vendorId;
      name = pkg.name;
      price = pkg.price;
      guestMin = pkg.guestMin;
      guestMax = pkg.guestMax;
      inclusions = pkg.inclusions;
      setupCharge = pkg.setupCharge;
      travelCharge = pkg.travelCharge;
      isActive = true;
    };
    state.packages.add(id, newPkg);
    newPkg;
  };

  public func updatePackage(
    state : State,
    vendorState : VendorLib.State,
    packageId : CommonTypes.PackageId,
    callerId : CommonTypes.UserId,
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
  ) : BookingTypes.StallPackage {
    let existing = switch (state.packages.get(packageId)) {
      case (?p) { p };
      case null { Runtime.trap("Package not found") };
    };
    let vendor = switch (vendorState.vendors.get(existing.vendorId)) {
      case (?v) { v };
      case null { Runtime.trap("Vendor not found") };
    };
    if (not Principal.equal(vendor.ownerId, callerId)) {
      Runtime.trap("Unauthorized: Not vendor owner");
    };
    let updated : BookingTypes.StallPackage = {
      existing with
      name = switch (pkg.name) { case (?v) v; case null existing.name };
      price = switch (pkg.price) { case (?v) v; case null existing.price };
      guestMin = switch (pkg.guestMin) { case (?v) v; case null existing.guestMin };
      guestMax = switch (pkg.guestMax) { case (?v) v; case null existing.guestMax };
      inclusions = switch (pkg.inclusions) { case (?v) v; case null existing.inclusions };
      setupCharge = switch (pkg.setupCharge) { case (?v) v; case null existing.setupCharge };
      travelCharge = switch (pkg.travelCharge) { case (?v) v; case null existing.travelCharge };
      isActive = switch (pkg.isActive) { case (?v) v; case null existing.isActive };
    };
    state.packages.add(packageId, updated);
    updated;
  };

  public func deletePackage(
    state : State,
    vendorState : VendorLib.State,
    packageId : CommonTypes.PackageId,
    callerId : CommonTypes.UserId,
  ) : () {
    let existing = switch (state.packages.get(packageId)) {
      case (?p) { p };
      case null { Runtime.trap("Package not found") };
    };
    let vendor = switch (vendorState.vendors.get(existing.vendorId)) {
      case (?v) { v };
      case null { Runtime.trap("Vendor not found") };
    };
    if (not Principal.equal(vendor.ownerId, callerId)) {
      Runtime.trap("Unauthorized: Not vendor owner");
    };
    let updated : BookingTypes.StallPackage = { existing with isActive = false };
    state.packages.add(packageId, updated);
  };

  public func listPackagesByVendor(
    state : State,
    vendorId : CommonTypes.VendorId,
  ) : [BookingTypes.StallPackage] {
    state.packages.values()
      .filter(func(p : BookingTypes.StallPackage) : Bool {
        p.vendorId == vendorId and p.isActive;
      })
      .toArray();
  };

  public func getPackage(
    state : State,
    packageId : CommonTypes.PackageId,
  ) : ?BookingTypes.StallPackage {
    state.packages.get(packageId);
  };
};

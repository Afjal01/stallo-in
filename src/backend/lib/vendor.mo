import Map "mo:core/Map";
import Set "mo:core/Set";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Int "mo:core/Int";
import Float "mo:core/Float";
import Nat "mo:core/Nat";
import CommonTypes "../types/common";
import VendorTypes "../types/vendor";

module {
  public type State = {
    vendors : Map.Map<CommonTypes.VendorId, VendorTypes.Vendor>;
    unavailableDates : Map.Map<CommonTypes.VendorId, Set.Set<CommonTypes.Timestamp>>;
    counter : { var nextId : Nat };
  };

  public func initState() : State {
    {
      vendors = Map.empty<CommonTypes.VendorId, VendorTypes.Vendor>();
      unavailableDates = Map.empty<CommonTypes.VendorId, Set.Set<CommonTypes.Timestamp>>();
      counter = { var nextId = 0 };
    };
  };

  public func createVendorProfile(
    state : State,
    ownerId : CommonTypes.UserId,
    req : VendorTypes.CreateVendorRequest,
  ) : { #ok : VendorTypes.Vendor; #err : Text } {
    if (ownerId.isAnonymous()) {
      return #err("Unauthorized: Must be authenticated");
    };
    if (req.businessName == "") {
      return #err("VALIDATION: businessName: Business name cannot be empty");
    };
    if (req.serviceArea == "") {
      return #err("VALIDATION: serviceArea: At least one service area must be provided");
    };
    let id = state.counter.nextId.toText();
    state.counter.nextId += 1;
    let vendor : VendorTypes.Vendor = {
      id;
      ownerId;
      businessName = req.businessName;
      ownerName = req.ownerName;
      phone = req.phone;
      email = req.email;
      category = req.category;
      serviceArea = req.serviceArea;
      description = req.description;
      photos = req.photos;
      verificationStatus = #pending;
      rating = 0.0;
      reviewCount = 0;
      isFeatured = false;
      commissionRate = 10.0;
      createdAt = Time.now();
    };
    state.vendors.add(id, vendor);
    #ok(vendor);
  };

  public func updateVendorProfile(
    state : State,
    vendorId : CommonTypes.VendorId,
    callerId : CommonTypes.UserId,
    req : VendorTypes.UpdateVendorRequest,
  ) : VendorTypes.Vendor {
    let existing = switch (state.vendors.get(vendorId)) {
      case (?v) { v };
      case null { Runtime.trap("Vendor not found") };
    };
    if (not Principal.equal(existing.ownerId, callerId)) {
      Runtime.trap("Unauthorized: Not vendor owner");
    };
    let updated : VendorTypes.Vendor = {
      existing with
      businessName = switch (req.businessName) { case (?v) v; case null existing.businessName };
      ownerName = switch (req.ownerName) { case (?v) v; case null existing.ownerName };
      phone = switch (req.phone) { case (?v) v; case null existing.phone };
      email = switch (req.email) { case (?v) v; case null existing.email };
      category = switch (req.category) { case (?v) v; case null existing.category };
      serviceArea = switch (req.serviceArea) { case (?v) v; case null existing.serviceArea };
      description = switch (req.description) { case (?v) v; case null existing.description };
      photos = switch (req.photos) { case (?v) v; case null existing.photos };
    };
    state.vendors.add(vendorId, updated);
    updated;
  };

  public func getVendor(
    state : State,
    vendorId : CommonTypes.VendorId,
  ) : ?VendorTypes.Vendor {
    state.vendors.get(vendorId);
  };

  public func listVendors(
    state : State,
    filter : VendorTypes.VendorFilter,
    offset : Nat,
    limit : Nat,
  ) : VendorTypes.PagedVendors {
    let effectiveLimit = if (limit == 0) { 20 } else { limit };
    let all = state.vendors.values()
      .filter(func(v : VendorTypes.Vendor) : Bool {
        let matchCat = switch (filter.category) {
          case (?c) { v.category == c };
          case null { true };
        };
        let matchArea = switch (filter.serviceArea) {
          case (?a) { v.serviceArea == a };
          case null { true };
        };
        let matchStatus = switch (filter.status) {
          case (?s) { v.verificationStatus == s };
          case null { true };
        };
        let matchFeatured = switch (filter.featured) {
          case (?f) { v.isFeatured == f };
          case null { true };
        };
        matchCat and matchArea and matchStatus and matchFeatured;
      })
      .toArray();
    let total = all.size();
    let items = all.sliceToArray(offset.toInt(), (offset + effectiveLimit).toInt());
    { items; total; offset; limit = effectiveLimit };
  };

  public func approveVendor(
    state : State,
    vendorId : CommonTypes.VendorId,
    commissionRate : Float,
  ) : () {
    let existing = switch (state.vendors.get(vendorId)) {
      case (?v) { v };
      case null { Runtime.trap("Vendor not found") };
    };
    let updated : VendorTypes.Vendor = { existing with verificationStatus = #approved; commissionRate };
    state.vendors.add(vendorId, updated);
  };

  public func rejectVendor(
    state : State,
    vendorId : CommonTypes.VendorId,
  ) : () {
    let existing = switch (state.vendors.get(vendorId)) {
      case (?v) { v };
      case null { Runtime.trap("Vendor not found") };
    };
    let updated : VendorTypes.Vendor = { existing with verificationStatus = #rejected };
    state.vendors.add(vendorId, updated);
  };

  public func toggleFeatured(
    state : State,
    vendorId : CommonTypes.VendorId,
  ) : () {
    let existing = switch (state.vendors.get(vendorId)) {
      case (?v) { v };
      case null { Runtime.trap("Vendor not found") };
    };
    let updated : VendorTypes.Vendor = { existing with isFeatured = not existing.isFeatured };
    state.vendors.add(vendorId, updated);
  };

  public func markUnavailableDate(
    state : State,
    vendorId : CommonTypes.VendorId,
    callerId : CommonTypes.UserId,
    date : CommonTypes.Timestamp,
  ) : () {
    let existing = switch (state.vendors.get(vendorId)) {
      case (?v) { v };
      case null { Runtime.trap("Vendor not found") };
    };
    if (not Principal.equal(existing.ownerId, callerId)) {
      Runtime.trap("Unauthorized: Not vendor owner");
    };
    let dates = switch (state.unavailableDates.get(vendorId)) {
      case (?s) { s };
      case null {
        let s = Set.empty<CommonTypes.Timestamp>();
        state.unavailableDates.add(vendorId, s);
        s;
      };
    };
    dates.add(date);
  };

  public func getUnavailableDates(
    state : State,
    vendorId : CommonTypes.VendorId,
  ) : [CommonTypes.Timestamp] {
    switch (state.unavailableDates.get(vendorId)) {
      case (?s) { s.toArray() };
      case null { [] };
    };
  };

  public func updateRating(
    state : State,
    vendorId : CommonTypes.VendorId,
    newRating : Nat,
  ) : () {
    let existing = switch (state.vendors.get(vendorId)) {
      case (?v) { v };
      case null { Runtime.trap("Vendor not found") };
    };
    let count = existing.reviewCount + 1;
    let totalRating = existing.rating * existing.reviewCount.toInt().toFloat() + newRating.toInt().toFloat();
    let avgRating = totalRating / count.toInt().toFloat();
    let updated : VendorTypes.Vendor = { existing with rating = avgRating; reviewCount = count };
    state.vendors.add(vendorId, updated);
  };
};

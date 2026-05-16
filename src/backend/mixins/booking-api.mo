import AccessControl "mo:caffeineai-authorization/access-control";
import UserApproval "mo:caffeineai-user-approval/approval";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import CommonTypes "../types/common";
import BookingTypes "../types/booking";
import BookingLib "../lib/booking";
import PackageLib "../lib/package";
import VendorLib "../lib/vendor";

mixin (
  accessControlState : AccessControl.AccessControlState,
  approvalState : UserApproval.UserApprovalState,
  bookingState : BookingLib.State,
  packageState : PackageLib.State,
  vendorState : VendorLib.State,
) {
  public shared ({ caller }) func createBooking(
    req : BookingTypes.CreateBookingRequest
  ) : async BookingTypes.Booking {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be authenticated");
    };
    let pkg = switch (PackageLib.getPackage(packageState, req.packageId)) {
      case (?p) { p };
      case null { Runtime.trap("Package not found") };
    };
    if (not pkg.isActive) {
      Runtime.trap("Package is not active");
    };
    switch (BookingLib.createBooking(bookingState, vendorState, caller, req, pkg.price)) {
      case (#ok(b)) { b };
      case (#err(e)) { Runtime.trap(e) };
    };
  };

  public shared ({ caller }) func updateBookingStatus(
    bookingId : CommonTypes.BookingId,
    status : CommonTypes.BookingStatus,
  ) : async BookingTypes.Booking {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be authenticated");
    };
    switch (BookingLib.updateBookingStatus(bookingState, accessControlState, vendorState, bookingId, caller, status)) {
      case (#ok(b)) { b };
      case (#err(e)) { Runtime.trap(e) };
    };
  };

  public shared ({ caller }) func cancelBooking(
    bookingId : CommonTypes.BookingId
  ) : async BookingTypes.Booking {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be authenticated");
    };
    switch (BookingLib.cancelBooking(bookingState, accessControlState, vendorState, bookingId, caller)) {
      case (#ok(b)) { b };
      case (#err(e)) { Runtime.trap(e) };
    };
  };

  public query ({ caller }) func getBooking(
    bookingId : CommonTypes.BookingId
  ) : async ?BookingTypes.Booking {
    BookingLib.getBooking(bookingState, accessControlState, vendorState, bookingId, caller);
  };

  public query ({ caller }) func listBookings(
    filter : BookingTypes.BookingFilter,
    offset : Nat,
    limit : Nat,
  ) : async BookingTypes.PagedBookings {
    BookingLib.listBookings(bookingState, filter, offset, limit);
  };

  public query func calculateCancellationFee(
    bookingId : CommonTypes.BookingId
  ) : async Nat {
    BookingLib.calculateCancellationFee(bookingState, bookingId, Time.now());
  };

  public shared ({ caller }) func confirmPayment(
    bookingId : CommonTypes.BookingId,
    paymentIntentId : Text,
  ) : async BookingTypes.Booking {
    BookingLib.confirmPayment(bookingState, bookingId, paymentIntentId);
  };

  public shared ({ caller }) func createReview(
    bookingId : CommonTypes.BookingId,
    rating : Nat,
    comment : Text,
  ) : async BookingTypes.Review {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be authenticated");
    };
    BookingLib.createReview(bookingState, vendorState, caller, bookingId, rating, comment);
  };

  public query func getReviewsByVendor(
    vendorId : CommonTypes.VendorId
  ) : async [BookingTypes.Review] {
    BookingLib.getReviewsByVendor(bookingState, vendorId);
  };

  public query func getPlatformConfig() : async CommonTypes.PlatformConfig {
    BookingLib.getPlatformConfig(bookingState);
  };

  public shared ({ caller }) func updatePlatformConfig(
    config : CommonTypes.PlatformConfig
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update platform config");
    };
    BookingLib.updatePlatformConfig(bookingState, config);
  };

  public query ({ caller }) func getAnalyticsSummary() : async BookingTypes.AnalyticsSummary {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view analytics");
    };
    let totalVendors = vendorState.vendors.size();
    BookingLib.getAnalyticsSummary(bookingState, vendorState, totalVendors, 0);
  };

  public query func getBookingsByDateRange(
    from : CommonTypes.Timestamp,
    to : CommonTypes.Timestamp,
    groupBy : ?Text,
  ) : async [BookingTypes.DateRangeResult] {
    BookingLib.getBookingsByDateRange(bookingState, from, to, groupBy);
  };

  public query func getRevenueByDateRange(
    from : CommonTypes.Timestamp,
    to : CommonTypes.Timestamp,
    groupBy : ?Text,
  ) : async [BookingTypes.DateRangeResult] {
    BookingLib.getRevenueByDateRange(bookingState, from, to, groupBy);
  };

  public query ({ caller }) func getCategoryBreakdown() : async [BookingTypes.CategoryBreakdown] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view category breakdown");
    };
    BookingLib.getCategoryBreakdown(bookingState, vendorState);
  };
};

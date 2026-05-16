import AccessControl "mo:caffeineai-authorization/access-control";
import UserApproval "mo:caffeineai-user-approval/approval";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import CommonTypes "../types/common";
import BookingLib "../lib/booking";

mixin (
  accessControlState : AccessControl.AccessControlState,
  approvalState : UserApproval.UserApprovalState,
  bookingState : BookingLib.State,
) {
  public shared ({ caller }) func processRefund(
    bookingId : CommonTypes.BookingId
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can process refunds");
    };
    let booking = switch (bookingState.bookings.get(bookingId)) {
      case (?b) { b };
      case null { Runtime.trap("Booking not found") };
    };
    let updated = { booking with paymentStatus = #refunded; updatedAt = Time.now() };
    bookingState.bookings.add(bookingId, updated);
  };
};

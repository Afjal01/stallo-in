import AccessControl "mo:caffeineai-authorization/access-control";
import EmailClient "mo:caffeineai-email/emailClient";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
) {
  public shared ({ caller }) func sendBookingConfirmationEmail(
    bookingId : CommonTypes.BookingId,
    recipientEmail : Text,
    customerName : Text,
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let result = await EmailClient.sendServiceEmail(
      "no-reply",
      [recipientEmail],
      "Booking Confirmed — Stallo.in",
      "<p>Dear " # customerName # ",</p>" #
      "<p>Your booking <strong>" # bookingId # "</strong> has been confirmed on Stallo.in.</p>" #
      "<p>Thank you for choosing Stallo!</p>",
    );
    switch (result) {
      case (#ok) {};
      case (#err(e)) { Runtime.trap("Email failed: " # e) };
    };
  };

  public shared ({ caller }) func sendPaymentConfirmationEmail(
    bookingId : CommonTypes.BookingId,
    recipientEmail : Text,
    customerName : Text,
    amount : Nat,
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let result = await EmailClient.sendServiceEmail(
      "no-reply",
      [recipientEmail],
      "Payment Received — Stallo.in",
      "<p>Dear " # customerName # ",</p>" #
      "<p>We have received your payment of &#8377;" # amount.toText() # " for booking <strong>" # bookingId # "</strong>.</p>" #
      "<p>Thank you for choosing Stallo!</p>",
    );
    switch (result) {
      case (#ok) {};
      case (#err(e)) { Runtime.trap("Email failed: " # e) };
    };
  };

  public shared ({ caller }) func sendCancellationEmail(
    bookingId : CommonTypes.BookingId,
    recipientEmail : Text,
    customerName : Text,
    refundAmount : Nat,
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let refundText = if (refundAmount > 0) {
      "<p>A refund of &#8377;" # refundAmount.toText() # " will be processed to your account.</p>";
    } else {
      "<p>No refund is applicable as per the cancellation policy.</p>";
    };
    let result = await EmailClient.sendServiceEmail(
      "no-reply",
      [recipientEmail],
      "Booking Cancelled — Stallo.in",
      "<p>Dear " # customerName # ",</p>" #
      "<p>Your booking <strong>" # bookingId # "</strong> has been cancelled.</p>" #
      refundText #
      "<p>For support, contact us at support@stallo.in</p>",
    );
    switch (result) {
      case (#ok) {};
      case (#err(e)) { Runtime.trap("Email failed: " # e) };
    };
  };

  public shared ({ caller }) func sendVendorApprovalEmail(
    vendorEmail : Text,
    vendorName : Text,
    approved : Bool,
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can send approval emails");
    };
    let (subject, body) = if (approved) {
      (
        "Your Stallo Vendor Account is Approved!",
        "<p>Dear " # vendorName # ",</p>" #
        "<p>Congratulations! Your vendor account has been approved on Stallo.in. You can now start receiving bookings.</p>" #
        "<p>Log in to your vendor dashboard to get started.</p>",
      );
    } else {
      (
        "Stallo Vendor Application Update",
        "<p>Dear " # vendorName # ",</p>" #
        "<p>We regret to inform you that your vendor application could not be approved at this time.</p>" #
        "<p>Please contact support@stallo.in for more information.</p>",
      );
    };
    let result = await EmailClient.sendServiceEmail("no-reply", [vendorEmail], subject, body);
    switch (result) {
      case (#ok) {};
      case (#err(e)) { Runtime.trap("Email failed: " # e) };
    };
  };

  public shared ({ caller }) func sendNewBookingNotificationToVendor(
    vendorEmail : Text,
    vendorName : Text,
    bookingId : CommonTypes.BookingId,
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let result = await EmailClient.sendServiceEmail(
      "no-reply",
      [vendorEmail],
      "New Booking Received — Stallo.in",
      "<p>Dear " # vendorName # ",</p>" #
      "<p>You have received a new booking <strong>" # bookingId # "</strong> on Stallo.in.</p>" #
      "<p>Please log in to your vendor dashboard to accept or review the booking.</p>",
    );
    switch (result) {
      case (#ok) {};
      case (#err(e)) { Runtime.trap("Email failed: " # e) };
    };
  };
};

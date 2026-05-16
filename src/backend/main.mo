import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import UserApproval "mo:caffeineai-user-approval/approval";
import Stripe "mo:caffeineai-stripe/stripe";
import VendorLib "lib/vendor";
import PackageLib "lib/package";
import BookingLib "lib/booking";
import VendorApiMixin "mixins/vendor-api";
import PackageApiMixin "mixins/package-api";
import BookingApiMixin "mixins/booking-api";
import PaymentApiMixin "mixins/payment-api";
import NotificationApiMixin "mixins/notification-api";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Runtime "mo:core/Runtime";

actor {
  // ── Authorization + object storage ──────────────────────────────────────
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinObjectStorage();

  // ── User approval (vendor self-registration with admin approval) ─────────
  let approvalState = UserApproval.initState(accessControlState);

  public query ({ caller }) func isCallerApproved() : async Bool {
    AccessControl.hasPermission(accessControlState, caller, #admin)
    or UserApproval.isApproved(approvalState, caller);
  };

  public shared ({ caller }) func requestApproval() : async () {
    UserApproval.requestApproval(approvalState, caller);
  };

  public shared ({ caller }) func setApproval(
    user : Principal,
    status : UserApproval.ApprovalStatus,
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.setApproval(approvalState, user, status);
  };

  public query ({ caller }) func listApprovals() : async [UserApproval.UserApprovalInfo] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.listApprovals(approvalState);
  };

  // ── Domain state ─────────────────────────────────────────────────────────
  let vendorState = VendorLib.initState();
  let packageState = PackageLib.initState();
  let bookingState = BookingLib.initState();
  var stripeConfiguration : ?Stripe.StripeConfiguration = null;

  // ── Stripe functions (must be in actor, not mixin) ────────────────────────
  public query func isStripeConfigured() : async Bool {
    stripeConfiguration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(
    config : Stripe.StripeConfiguration
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfiguration := ?config;
  };

  func requireStripeConfig() : Stripe.StripeConfiguration {
    switch (stripeConfiguration) {
      case (null) { Runtime.trap("Stripe is not configured") };
      case (?cfg) { cfg };
    };
  };

  public shared ({ caller }) func createCheckoutSession(
    items : [Stripe.ShoppingItem],
    successUrl : Text,
    cancelUrl : Text,
  ) : async Text {
    await Stripe.createCheckoutSession(requireStripeConfig(), caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(
    sessionId : Text
  ) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(requireStripeConfig(), sessionId, transform);
  };

  public query func transform(
    input : OutCall.TransformationInput
  ) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // ── Mixin includes ────────────────────────────────────────────────────────
  include VendorApiMixin(accessControlState, approvalState, vendorState);
  include PackageApiMixin(accessControlState, packageState, vendorState);
  include BookingApiMixin(accessControlState, approvalState, bookingState, packageState, vendorState);
  include PaymentApiMixin(accessControlState, approvalState, bookingState);
  include NotificationApiMixin(accessControlState);
};


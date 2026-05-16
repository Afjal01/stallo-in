import AccessControl "mo:caffeineai-authorization/access-control";
import UserApproval "mo:caffeineai-user-approval/approval";
import Runtime "mo:core/Runtime";
import CommonTypes "../types/common";
import VendorTypes "../types/vendor";
import VendorLib "../lib/vendor";

mixin (
  accessControlState : AccessControl.AccessControlState,
  approvalState : UserApproval.UserApprovalState,
  vendorState : VendorLib.State,
) {
  public shared ({ caller }) func createVendorProfile(
    req : VendorTypes.CreateVendorRequest
  ) : async VendorTypes.Vendor {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be authenticated");
    };
    VendorLib.createVendorProfile(vendorState, caller, req);
  };

  public shared ({ caller }) func updateVendorProfile(
    vendorId : CommonTypes.VendorId,
    req : VendorTypes.UpdateVendorRequest,
  ) : async VendorTypes.Vendor {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be authenticated");
    };
    VendorLib.updateVendorProfile(vendorState, vendorId, caller, req);
  };

  public query func getVendor(
    vendorId : CommonTypes.VendorId
  ) : async ?VendorTypes.Vendor {
    VendorLib.getVendor(vendorState, vendorId);
  };

  public query func listVendors(
    filter : VendorTypes.VendorFilter
  ) : async [VendorTypes.Vendor] {
    VendorLib.listVendors(vendorState, filter);
  };

  public shared ({ caller }) func approveVendor(
    vendorId : CommonTypes.VendorId,
    commissionRate : Float,
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can approve vendors");
    };
    VendorLib.approveVendor(vendorState, vendorId, commissionRate);
  };

  public shared ({ caller }) func rejectVendor(
    vendorId : CommonTypes.VendorId
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can reject vendors");
    };
    VendorLib.rejectVendor(vendorState, vendorId);
  };

  public shared ({ caller }) func toggleFeatured(
    vendorId : CommonTypes.VendorId
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can feature vendors");
    };
    VendorLib.toggleFeatured(vendorState, vendorId);
  };

  public shared ({ caller }) func markUnavailableDate(
    vendorId : CommonTypes.VendorId,
    date : CommonTypes.Timestamp,
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be authenticated");
    };
    VendorLib.markUnavailableDate(vendorState, vendorId, caller, date);
  };

  public query func getUnavailableDates(
    vendorId : CommonTypes.VendorId
  ) : async [CommonTypes.Timestamp] {
    VendorLib.getUnavailableDates(vendorState, vendorId);
  };
};

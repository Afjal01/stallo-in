import Storage "mo:caffeineai-object-storage/Storage";
import CommonTypes "common";

module {
  public type Vendor = {
    id : CommonTypes.VendorId;
    ownerId : CommonTypes.UserId;
    businessName : Text;
    ownerName : Text;
    phone : Text;
    email : Text;
    category : Text;
    serviceArea : Text;
    description : Text;
    photos : [Storage.ExternalBlob];
    verificationStatus : CommonTypes.VendorStatus;
    rating : Float;
    reviewCount : Nat;
    isFeatured : Bool;
    commissionRate : Float;
    createdAt : CommonTypes.Timestamp;
  };

  public type VendorFilter = {
    category : ?Text;
    serviceArea : ?Text;
    status : ?CommonTypes.VendorStatus;
    featured : ?Bool;
  };

  public type CreateVendorRequest = {
    businessName : Text;
    ownerName : Text;
    phone : Text;
    email : Text;
    category : Text;
    serviceArea : Text;
    description : Text;
    photos : [Storage.ExternalBlob];
  };

  public type UpdateVendorRequest = {
    businessName : ?Text;
    ownerName : ?Text;
    phone : ?Text;
    email : ?Text;
    category : ?Text;
    serviceArea : ?Text;
    description : ?Text;
    photos : ?[Storage.ExternalBlob];
  };
};

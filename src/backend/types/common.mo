module {
  public type UserId = Principal;
  public type VendorId = Text;
  public type BookingId = Text;
  public type PackageId = Text;
  public type ReviewId = Text;
  public type Timestamp = Int;

  public type UserRole = {
    #admin;
    #vendor;
    #customer;
  };

  public type VendorStatus = {
    #pending;
    #approved;
    #rejected;
    #suspended;
  };

  public type BookingStatus = {
    #pending;
    #confirmed;
    #preparing;
    #dispatched;
    #completed;
    #cancelled;
  };

  public type PaymentStatus = {
    #pending;
    #paid;
    #failed;
    #refunded;
    #partiallyPaid;
  };

  public type CancellationPolicy = {
    tier1Days : Nat;
    tier1FeePercent : Nat;
    tier2Days : Nat;
    tier2FeePercent : Nat;
    tier3FeePercent : Nat;
  };

  public type PlatformConfig = {
    globalCommissionPercent : Float;
    advancePaymentPercent : Nat;
    cancellationPolicy : CancellationPolicy;
  };
};

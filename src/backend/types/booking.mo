import CommonTypes "common";

module {
  public type StallPackage = {
    id : CommonTypes.PackageId;
    vendorId : CommonTypes.VendorId;
    name : Text;
    price : Nat;
    guestMin : Nat;
    guestMax : Nat;
    inclusions : [Text];
    setupCharge : Nat;
    travelCharge : Nat;
    isActive : Bool;
  };

  public type Booking = {
    id : CommonTypes.BookingId;
    customerId : CommonTypes.UserId;
    vendorId : CommonTypes.VendorId;
    packageId : CommonTypes.PackageId;
    eventDate : CommonTypes.Timestamp;
    eventVenue : Text;
    guestCount : Nat;
    totalPrice : Nat;
    advanceAmount : Nat;
    commissionAmount : Nat;
    vendorPayout : Nat;
    cancellationFeePercent : Nat;
    bookingStatus : CommonTypes.BookingStatus;
    paymentStatus : CommonTypes.PaymentStatus;
    stripePaymentIntentId : ?Text;
    notes : ?Text;
    createdAt : CommonTypes.Timestamp;
    updatedAt : CommonTypes.Timestamp;
  };

  public type Review = {
    id : CommonTypes.ReviewId;
    bookingId : CommonTypes.BookingId;
    customerId : CommonTypes.UserId;
    vendorId : CommonTypes.VendorId;
    rating : Nat;
    comment : Text;
    createdAt : CommonTypes.Timestamp;
  };

  public type CreateBookingRequest = {
    vendorId : CommonTypes.VendorId;
    packageId : CommonTypes.PackageId;
    eventDate : CommonTypes.Timestamp;
    eventVenue : Text;
    guestCount : Nat;
    notes : ?Text;
  };

  public type BookingFilter = {
    customerId : ?CommonTypes.UserId;
    vendorId : ?CommonTypes.VendorId;
    status : ?CommonTypes.BookingStatus;
    fromDate : ?CommonTypes.Timestamp;
    toDate : ?CommonTypes.Timestamp;
  };

  public type AnalyticsSummary = {
    totalCustomers : Nat;
    totalVendors : Nat;
    activeVendors : Nat;
    totalBookings : Nat;
    completedBookings : Nat;
    cancelledBookings : Nat;
    totalRevenue : Nat;
    commissionRevenue : Nat;
    vendorPayouts : Nat;
    topVendors : [VendorBookingStat];
  };

  public type VendorBookingStat = {
    vendorId : CommonTypes.VendorId;
    vendorName : Text;
    bookingCount : Nat;
    revenue : Nat;
  };

  public type CategoryBreakdown = {
    categoryId : Text;
    categoryName : Text;
    bookingCount : Nat;
    revenue : Nat;
  };

  public type DateRangeResult = {
    date : CommonTypes.Timestamp;
    count : Nat;
    revenue : Nat;
  };

  public type PagedVendors = {
    items : [VendorBookingStat]; // reused for generic paged results when needed
    total : Nat;
    offset : Nat;
    limit : Nat;
  };

  public type PagedBookings = {
    items : [Booking];
    total : Nat;
    offset : Nat;
    limit : Nat;
  };
};

import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import BookingTypes "../types/booking";
import VendorLib "vendor";

module {
  public type State = {
    bookings : Map.Map<CommonTypes.BookingId, BookingTypes.Booking>;
    reviews : Map.Map<CommonTypes.ReviewId, BookingTypes.Review>;
    counter : { var nextId : Nat };
    config : { var platformConfig : CommonTypes.PlatformConfig };
  };

  public func initState() : State {
    {
      bookings = Map.empty<CommonTypes.BookingId, BookingTypes.Booking>();
      reviews = Map.empty<CommonTypes.ReviewId, BookingTypes.Review>();
      counter = { var nextId = 0 };
      config = {
        var platformConfig = {
          globalCommissionPercent = 10.0;
          advancePaymentPercent = 50;
          cancellationPolicy = {
            tier1Days = 7;
            tier1FeePercent = 10;
            tier2Days = 3;
            tier2FeePercent = 25;
            tier3FeePercent = 50;
          };
        };
      };
    };
  };

  public func createBooking(
    state : State,
    vendorState : VendorLib.State,
    customerId : CommonTypes.UserId,
    req : BookingTypes.CreateBookingRequest,
    packagePrice : Nat,
  ) : BookingTypes.Booking {
    // Validate vendor is approved
    let vendor = switch (vendorState.vendors.get(req.vendorId)) {
      case (?v) { v };
      case null { Runtime.trap("Vendor not found") };
    };
    if (vendor.verificationStatus != #approved) {
      Runtime.trap("Vendor is not approved");
    };
    // Check eventDate not in unavailable dates
    switch (vendorState.unavailableDates.get(req.vendorId)) {
      case (?dates) {
        if (dates.contains(req.eventDate)) {
          Runtime.trap("Vendor is not available on the requested date");
        };
      };
      case null {};
    };
    let totalPrice = packagePrice * req.guestCount;
    let advanceAmount = totalPrice * state.config.platformConfig.advancePaymentPercent / 100;
    let id = state.counter.nextId.toText();
    state.counter.nextId += 1;
    let now = Time.now();
    let booking : BookingTypes.Booking = {
      id;
      customerId;
      vendorId = req.vendorId;
      packageId = req.packageId;
      eventDate = req.eventDate;
      eventVenue = req.eventVenue;
      guestCount = req.guestCount;
      totalPrice;
      advanceAmount;
      cancellationFeePercent = 0;
      bookingStatus = #pending;
      paymentStatus = #pending;
      stripePaymentIntentId = null;
      notes = req.notes;
      createdAt = now;
      updatedAt = now;
    };
    state.bookings.add(id, booking);
    booking;
  };

  public func updateBookingStatus(
    state : State,
    accessControlState : AccessControl.AccessControlState,
    vendorState : VendorLib.State,
    bookingId : CommonTypes.BookingId,
    callerId : CommonTypes.UserId,
    status : CommonTypes.BookingStatus,
  ) : BookingTypes.Booking {
    let booking = switch (state.bookings.get(bookingId)) {
      case (?b) { b };
      case null { Runtime.trap("Booking not found") };
    };
    let isAdmin = AccessControl.hasPermission(accessControlState, callerId, #admin);
    // Vendor ownership check for non-admin
    if (not isAdmin) {
      let vendor = switch (vendorState.vendors.get(booking.vendorId)) {
        case (?v) { v };
        case null { Runtime.trap("Vendor not found") };
      };
      if (not Principal.equal(vendor.ownerId, callerId)) {
        Runtime.trap("Unauthorized: Not vendor owner or admin");
      };
    };
    let updated : BookingTypes.Booking = { booking with bookingStatus = status; updatedAt = Time.now() };
    state.bookings.add(bookingId, updated);
    updated;
  };

  public func cancelBooking(
    state : State,
    accessControlState : AccessControl.AccessControlState,
    vendorState : VendorLib.State,
    bookingId : CommonTypes.BookingId,
    callerId : CommonTypes.UserId,
  ) : BookingTypes.Booking {
    let booking = switch (state.bookings.get(bookingId)) {
      case (?b) { b };
      case null { Runtime.trap("Booking not found") };
    };
    let isAdmin = AccessControl.hasPermission(accessControlState, callerId, #admin);
    let isCustomer = Principal.equal(booking.customerId, callerId);
    let isVendorOwner = switch (vendorState.vendors.get(booking.vendorId)) {
      case (?v) { Principal.equal(v.ownerId, callerId) };
      case null { false };
    };
    if (not isAdmin and not isCustomer and not isVendorOwner) {
      Runtime.trap("Unauthorized: Cannot cancel this booking");
    };
    let feePercent = calculateCancellationFeeInternal(state, booking.eventDate, Time.now());
    let updated : BookingTypes.Booking = {
      booking with
      bookingStatus = #cancelled;
      cancellationFeePercent = feePercent;
      updatedAt = Time.now();
    };
    state.bookings.add(bookingId, updated);
    updated;
  };

  public func getBooking(
    state : State,
    accessControlState : AccessControl.AccessControlState,
    vendorState : VendorLib.State,
    bookingId : CommonTypes.BookingId,
    callerId : CommonTypes.UserId,
  ) : ?BookingTypes.Booking {
    switch (state.bookings.get(bookingId)) {
      case (?booking) {
        let isAdmin = AccessControl.hasPermission(accessControlState, callerId, #admin);
        let isCustomer = Principal.equal(booking.customerId, callerId);
        let isVendorOwner = switch (vendorState.vendors.get(booking.vendorId)) {
          case (?v) { Principal.equal(v.ownerId, callerId) };
          case null { false };
        };
        if (isAdmin or isCustomer or isVendorOwner) { ?booking } else { null };
      };
      case null { null };
    };
  };

  public func listBookings(
    state : State,
    filter : BookingTypes.BookingFilter,
  ) : [BookingTypes.Booking] {
    state.bookings.values()
      .filter(func(b : BookingTypes.Booking) : Bool {
        let matchCustomer = switch (filter.customerId) {
          case (?id) { Principal.equal(b.customerId, id) };
          case null { true };
        };
        let matchVendor = switch (filter.vendorId) {
          case (?id) { b.vendorId == id };
          case null { true };
        };
        let matchStatus = switch (filter.status) {
          case (?s) { b.bookingStatus == s };
          case null { true };
        };
        let matchFrom = switch (filter.fromDate) {
          case (?d) { b.eventDate >= d };
          case null { true };
        };
        let matchTo = switch (filter.toDate) {
          case (?d) { b.eventDate <= d };
          case null { true };
        };
        matchCustomer and matchVendor and matchStatus and matchFrom and matchTo;
      })
      .toArray();
  };

  func calculateCancellationFeeInternal(
    state : State,
    eventDate : CommonTypes.Timestamp,
    now : CommonTypes.Timestamp,
  ) : Nat {
    let diffNs : Int = eventDate - now;
    let daysUntilEvent : Int = diffNs / (86_400_000_000_000);
    let policy = state.config.platformConfig.cancellationPolicy;
    if (daysUntilEvent >= policy.tier1Days.toInt()) {
      policy.tier1FeePercent;
    } else if (daysUntilEvent >= policy.tier2Days.toInt()) {
      policy.tier2FeePercent;
    } else {
      policy.tier3FeePercent;
    };
  };

  public func calculateCancellationFee(
    state : State,
    bookingId : CommonTypes.BookingId,
    now : CommonTypes.Timestamp,
  ) : Nat {
    let booking = switch (state.bookings.get(bookingId)) {
      case (?b) { b };
      case null { Runtime.trap("Booking not found") };
    };
    calculateCancellationFeeInternal(state, booking.eventDate, now);
  };

  public func confirmPayment(
    state : State,
    bookingId : CommonTypes.BookingId,
    paymentIntentId : Text,
  ) : BookingTypes.Booking {
    let booking = switch (state.bookings.get(bookingId)) {
      case (?b) { b };
      case null { Runtime.trap("Booking not found") };
    };
    let updated : BookingTypes.Booking = {
      booking with
      paymentStatus = #paid;
      stripePaymentIntentId = ?paymentIntentId;
      updatedAt = Time.now();
    };
    state.bookings.add(bookingId, updated);
    updated;
  };

  public func createReview(
    state : State,
    vendorState : VendorLib.State,
    customerId : CommonTypes.UserId,
    bookingId : CommonTypes.BookingId,
    rating : Nat,
    comment : Text,
  ) : BookingTypes.Review {
    let booking = switch (state.bookings.get(bookingId)) {
      case (?b) { b };
      case null { Runtime.trap("Booking not found") };
    };
    if (booking.bookingStatus != #completed) {
      Runtime.trap("Can only review completed bookings");
    };
    if (not Principal.equal(booking.customerId, customerId)) {
      Runtime.trap("Unauthorized: Not the customer of this booking");
    };
    let id = "r" # state.counter.nextId.toText();
    state.counter.nextId += 1;
    let review : BookingTypes.Review = {
      id;
      bookingId;
      customerId;
      vendorId = booking.vendorId;
      rating;
      comment;
      createdAt = Time.now();
    };
    state.reviews.add(id, review);
    VendorLib.updateRating(vendorState, booking.vendorId, rating);
    review;
  };

  public func getReviewsByVendor(
    state : State,
    vendorId : CommonTypes.VendorId,
  ) : [BookingTypes.Review] {
    state.reviews.values()
      .filter(func(r : BookingTypes.Review) : Bool { r.vendorId == vendorId })
      .toArray();
  };

  public func getPlatformConfig(state : State) : CommonTypes.PlatformConfig {
    state.config.platformConfig;
  };

  public func updatePlatformConfig(
    state : State,
    config : CommonTypes.PlatformConfig,
  ) : () {
    state.config.platformConfig := config;
  };

  public func getAnalyticsSummary(
    state : State,
    totalVendors : Nat,
    totalCustomers : Nat,
  ) : BookingTypes.AnalyticsSummary {
    var totalBookings = 0;
    var completedBookings = 0;
    var cancelledBookings = 0;
    var totalRevenue = 0;
    state.bookings.values().forEach(func(b : BookingTypes.Booking) {
      totalBookings += 1;
      if (b.bookingStatus == #completed) { completedBookings += 1 };
      if (b.bookingStatus == #cancelled) { cancelledBookings += 1 };
      if (b.paymentStatus == #paid) { totalRevenue += b.totalPrice };
    });
    // Approximate commission using integer math: floor(revenue * commissionPercent / 100)
    // globalCommissionPercent is a Float; convert to Nat by truncation for integer math
    let commPctNat : Nat = Int.abs(state.config.platformConfig.globalCommissionPercent.toInt());
    let commissionRevenue : Nat = totalRevenue * commPctNat / 100;
    {
      totalCustomers;
      totalVendors;
      activeVendors = totalVendors;
      totalBookings;
      completedBookings;
      cancelledBookings;
      totalRevenue;
      commissionRevenue;
    };
  };

  public func getBookingsByDateRange(
    state : State,
    from : CommonTypes.Timestamp,
    to : CommonTypes.Timestamp,
  ) : [BookingTypes.DateRangeResult] {
    let dayNs : Int = 86_400_000_000_000;
    let dateMap = Map.empty<Int, Nat>();
    state.bookings.values()
      .filter(func(b : BookingTypes.Booking) : Bool {
        b.eventDate >= from and b.eventDate <= to;
      })
      .forEach(func(b : BookingTypes.Booking) {
        let dayBucket = (b.eventDate / dayNs) * dayNs;
        let prev = switch (dateMap.get(dayBucket)) { case (?c) c; case null 0 };
        dateMap.add(dayBucket, prev + 1);
      });
    dateMap.entries()
      .map<(Int, Nat), BookingTypes.DateRangeResult>(func((date, count)) {
        { date; count; revenue = 0 };
      })
      .toArray();
  };

  public func getRevenueByDateRange(
    state : State,
    from : CommonTypes.Timestamp,
    to : CommonTypes.Timestamp,
  ) : [BookingTypes.DateRangeResult] {
    let dayNs : Int = 86_400_000_000_000;
    let dateMap = Map.empty<Int, Nat>();
    state.bookings.values()
      .filter(func(b : BookingTypes.Booking) : Bool {
        b.eventDate >= from and b.eventDate <= to and b.paymentStatus == #paid;
      })
      .forEach(func(b : BookingTypes.Booking) {
        let dayBucket = (b.eventDate / dayNs) * dayNs;
        let prev = switch (dateMap.get(dayBucket)) { case (?r) r; case null 0 };
        dateMap.add(dayBucket, prev + b.totalPrice);
      });
    dateMap.entries()
      .map<(Int, Nat), BookingTypes.DateRangeResult>(func((date, revenue)) {
        { date; count = 0; revenue };
      })
      .toArray();
  };
};

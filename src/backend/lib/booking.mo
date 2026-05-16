import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Float "mo:core/Float";
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
  ) : { #ok : BookingTypes.Booking; #err : Text } {
    // Validate eventDate is in the future
    let now = Time.now();
    if (req.eventDate <= now) {
      return #err("VALIDATION: eventDate: Event date must be in the future");
    };
    // Validate guestCount
    if (req.guestCount < 1) {
      return #err("VALIDATION: guestCount: Guest count must be at least 1");
    };
    // Validate vendor is approved
    let vendor = switch (vendorState.vendors.get(req.vendorId)) {
      case (?v) { v };
      case null { return #err("Vendor not found") };
    };
    if (vendor.verificationStatus != #approved) {
      return #err("Vendor is not approved");
    };
    // Check eventDate not in unavailable dates
    switch (vendorState.unavailableDates.get(req.vendorId)) {
      case (?dates) {
        if (dates.contains(req.eventDate)) {
          return #err("Vendor is not available on the requested date");
        };
      };
      case null {};
    };
    // Availability conflict check: vendor must not have active booking on same date
    let dayNs : Int = 86_400_000_000_000;
    let reqDay = req.eventDate / dayNs;
    let hasConflict = state.bookings.values().find(func(b : BookingTypes.Booking) : Bool {
      if (b.vendorId != req.vendorId) { return false };
      let activeStatus = b.bookingStatus == #pending or b.bookingStatus == #confirmed
        or b.bookingStatus == #preparing or b.bookingStatus == #dispatched;
      if (not activeStatus) { return false };
      b.eventDate / dayNs == reqDay;
    });
    if (hasConflict != null) {
      return #err("Vendor already has an active booking on this date");
    };
    // Calculate pricing
    let totalPrice = packagePrice * req.guestCount;
    let advanceAmount = totalPrice * state.config.platformConfig.advancePaymentPercent / 100;
    // Commission: use vendor's individual rate
    let commPctFloat = vendor.commissionRate;
    let commPctNat : Nat = Int.abs(commPctFloat.toInt());
    let commissionAmount = totalPrice * commPctNat / 100;
    let _platformFee = state.config.platformConfig.advancePaymentPercent; // reuse as basis; no separate platformFee field
    let vendorPayout : Nat = if (totalPrice >= commissionAmount) { totalPrice - commissionAmount : Nat } else { 0 : Nat };
    let id = state.counter.nextId.toText();
    state.counter.nextId += 1;
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
      commissionAmount;
      vendorPayout;
      cancellationFeePercent = 0;
      bookingStatus = #pending;
      paymentStatus = #pending;
      stripePaymentIntentId = null;
      notes = req.notes;
      createdAt = now;
      updatedAt = now;
    };
    state.bookings.add(id, booking);
    #ok(booking);
  };

  public func updateBookingStatus(
    state : State,
    accessControlState : AccessControl.AccessControlState,
    vendorState : VendorLib.State,
    bookingId : CommonTypes.BookingId,
    callerId : CommonTypes.UserId,
    status : CommonTypes.BookingStatus,
  ) : { #ok : BookingTypes.Booking; #err : Text } {
    let booking = switch (state.bookings.get(bookingId)) {
      case (?b) { b };
      case null { return #err("Booking not found") };
    };
    let isAdmin = AccessControl.hasPermission(accessControlState, callerId, #admin);
    // Vendor ownership check for non-admin
    if (not isAdmin) {
      let vendor = switch (vendorState.vendors.get(booking.vendorId)) {
        case (?v) { v };
        case null { return #err("Vendor not found") };
      };
      if (not Principal.equal(vendor.ownerId, callerId)) {
        return #err("Unauthorized: Not vendor owner or admin");
      };
    };
    // Validate status transition
    let validTransition = switch (booking.bookingStatus, status) {
      case (#pending, #confirmed) { true };
      case (#pending, #cancelled) { true };
      case (#confirmed, #preparing) { true };
      case (#confirmed, #cancelled) { true };
      case (#preparing, #dispatched) { true };
      case (#dispatched, #completed) { true };
      case _ { false };
    };
    if (not validTransition) {
      let from = switch (booking.bookingStatus) {
        case (#pending) "pending";
        case (#confirmed) "confirmed";
        case (#preparing) "preparing";
        case (#dispatched) "dispatched";
        case (#completed) "completed";
        case (#cancelled) "cancelled";
      };
      let to = switch (status) {
        case (#pending) "pending";
        case (#confirmed) "confirmed";
        case (#preparing) "preparing";
        case (#dispatched) "dispatched";
        case (#completed) "completed";
        case (#cancelled) "cancelled";
      };
      return #err("Invalid status transition: " # from # " -> " # to);
    };
    let updated : BookingTypes.Booking = { booking with bookingStatus = status; updatedAt = Time.now() };
    state.bookings.add(bookingId, updated);
    #ok(updated);
  };

  public func cancelBooking(
    state : State,
    accessControlState : AccessControl.AccessControlState,
    vendorState : VendorLib.State,
    bookingId : CommonTypes.BookingId,
    callerId : CommonTypes.UserId,
  ) : { #ok : BookingTypes.Booking; #err : Text } {
    let booking = switch (state.bookings.get(bookingId)) {
      case (?b) { b };
      case null { return #err("Booking not found") };
    };
    if (booking.bookingStatus == #cancelled) {
      return #err("Booking is already cancelled");
    };
    if (booking.bookingStatus == #completed) {
      return #err("Cannot cancel a completed booking");
    };
    let isAdmin = AccessControl.hasPermission(accessControlState, callerId, #admin);
    let isCustomer = Principal.equal(booking.customerId, callerId);
    let isVendorOwner = switch (vendorState.vendors.get(booking.vendorId)) {
      case (?v) { Principal.equal(v.ownerId, callerId) };
      case null { false };
    };
    if (not isAdmin and not isCustomer and not isVendorOwner) {
      return #err("Unauthorized: Cannot cancel this booking");
    };
    let now = Time.now();
    let feePercent = calculateCancellationFeePercent(booking.eventDate, now);
    let updated : BookingTypes.Booking = {
      booking with
      bookingStatus = #cancelled;
      cancellationFeePercent = feePercent;
      updatedAt = now;
    };
    state.bookings.add(bookingId, updated);
    #ok(updated);
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
    offset : Nat,
    limit : Nat,
  ) : BookingTypes.PagedBookings {
    let effectiveLimit = if (limit == 0) { 20 } else { limit };
    let all = state.bookings.values()
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
    let total = all.size();
    let items = all.sliceToArray(offset.toInt(), (offset + effectiveLimit).toInt());
    { items; total; offset; limit = effectiveLimit };
  };

  // Fixed tiered cancellation fee: 7+ days = 0%, 3-7 days = 50%, <72h = 100%
  func calculateCancellationFeePercent(
    eventDate : CommonTypes.Timestamp,
    now : CommonTypes.Timestamp,
  ) : Nat {
    let diffNs : Int = eventDate - now;
    let daysUntilEvent : Int = diffNs / 86_400_000_000_000;
    if (daysUntilEvent >= 7) {
      0;  // 100% refund
    } else if (daysUntilEvent >= 3) {
      50; // 50% fee, 50% refund
    } else {
      100; // no refund within 72h
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
    calculateCancellationFeePercent(booking.eventDate, now);
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

  public func getCategoryBreakdown(
    state : State,
    vendorState : VendorLib.State,
  ) : [BookingTypes.CategoryBreakdown] {
    let catMap = Map.empty<Text, { var count : Nat; var revenue : Nat }>();
    state.bookings.values().forEach(func(b : BookingTypes.Booking) {
      let category = switch (vendorState.vendors.get(b.vendorId)) {
        case (?v) { v.category };
        case null { "unknown" };
      };
      let existing = switch (catMap.get(category)) {
        case (?s) { s };
        case null {
          let s = { var count = 0; var revenue = 0 };
          catMap.add(category, s);
          s;
        };
      };
      existing.count += 1;
      if (b.paymentStatus == #paid) { existing.revenue += b.totalPrice };
    });
    catMap.entries()
      .map<(Text, { var count : Nat; var revenue : Nat }), BookingTypes.CategoryBreakdown>(
        func((cat, s)) {
          { categoryId = cat; categoryName = cat; bookingCount = s.count; revenue = s.revenue };
        }
      )
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
    vendorState : VendorLib.State,
    totalVendors : Nat,
    totalCustomers : Nat,
  ) : BookingTypes.AnalyticsSummary {
    var totalBookings = 0;
    var completedBookings = 0;
    var cancelledBookings = 0;
    var totalRevenue = 0;
    var commissionRevenue = 0;
    var vendorPayouts = 0;
    // Accumulate per-vendor stats into a Map
    let vendorStats = Map.empty<CommonTypes.VendorId, { var count : Nat; var revenue : Nat }>();
    state.bookings.values().forEach(func(b : BookingTypes.Booking) {
      totalBookings += 1;
      if (b.bookingStatus == #completed) { completedBookings += 1 };
      if (b.bookingStatus == #cancelled) { cancelledBookings += 1 };
      if (b.paymentStatus == #paid) {
        totalRevenue += b.totalPrice;
        commissionRevenue += b.commissionAmount;
        vendorPayouts += b.vendorPayout;
      };
      // Accumulate vendor stats
      let existing = switch (vendorStats.get(b.vendorId)) {
        case (?s) { s };
        case null {
          let s = { var count = 0; var revenue = 0 };
          vendorStats.add(b.vendorId, s);
          s;
        };
      };
      existing.count += 1;
      if (b.paymentStatus == #paid) { existing.revenue += b.totalPrice };
    });
    // Build top vendors list sorted by bookingCount desc, take top 5
    let allStats = vendorStats.entries().map(
      func((vid, s)) {
        let name = switch (vendorState.vendors.get(vid)) {
          case (?v) { v.businessName };
          case null { vid };
        };
        { vendorId = vid; vendorName = name; bookingCount = s.count; revenue = s.revenue };
      }
    ).toArray();
    let sorted = allStats.sort(func(a : BookingTypes.VendorBookingStat, b : BookingTypes.VendorBookingStat) : { #less; #equal; #greater } {
      if (a.bookingCount > b.bookingCount) { #less }
      else if (a.bookingCount < b.bookingCount) { #greater }
      else { #equal };
    });
    let topVendors = sorted.sliceToArray(0, 5);
    {
      totalCustomers;
      totalVendors;
      activeVendors = totalVendors;
      totalBookings;
      completedBookings;
      cancelledBookings;
      totalRevenue;
      commissionRevenue;
      vendorPayouts;
      topVendors;
    };
  };

  public func getBookingsByDateRange(
    state : State,
    from : CommonTypes.Timestamp,
    to : CommonTypes.Timestamp,
    groupBy : ?Text,
  ) : [BookingTypes.DateRangeResult] {
    let dayNs : Int = 86_400_000_000_000;
    let weekNs : Int = dayNs * 7;
    let monthDays : Int = 30;
    let _bucketNs : Int = switch (groupBy) {
      case (?">weekly") { weekNs }; // guard; real logic below
      case _ { dayNs }; // default to daily
    };
    // Determine actual bucket size
    let bucketSize : Int = switch (groupBy) {
      case (?g) {
        if (g == "weekly") { weekNs }
        else if (g == "monthly") { dayNs * monthDays }
        else { dayNs }; // daily or unknown
      };
      case null { dayNs };
    };
    let dateMap = Map.empty<Int, Nat>();
    state.bookings.values()
      .filter(func(b : BookingTypes.Booking) : Bool {
        b.eventDate >= from and b.eventDate <= to;
      })
      .forEach(func(b : BookingTypes.Booking) {
        let bucket = (b.eventDate / bucketSize) * bucketSize;
        let prev = switch (dateMap.get(bucket)) { case (?c) c; case null 0 };
        dateMap.add(bucket, prev + 1);
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
    groupBy : ?Text,
  ) : [BookingTypes.DateRangeResult] {
    let dayNs : Int = 86_400_000_000_000;
    let weekNs : Int = dayNs * 7;
    let monthDays : Int = 30;
    let bucketSize : Int = switch (groupBy) {
      case (?g) {
        if (g == "weekly") { weekNs }
        else if (g == "monthly") { dayNs * monthDays }
        else { dayNs };
      };
      case null { dayNs };
    };
    let dateMap = Map.empty<Int, Nat>();
    state.bookings.values()
      .filter(func(b : BookingTypes.Booking) : Bool {
        b.eventDate >= from and b.eventDate <= to and b.paymentStatus == #paid;
      })
      .forEach(func(b : BookingTypes.Booking) {
        let bucket = (b.eventDate / bucketSize) * bucketSize;
        let prev = switch (dateMap.get(bucket)) { case (?r) r; case null 0 };
        dateMap.add(bucket, prev + b.totalPrice);
      });
    dateMap.entries()
      .map<(Int, Nat), BookingTypes.DateRangeResult>(func((date, revenue)) {
        { date; count = 0; revenue };
      })
      .toArray();
  };
};

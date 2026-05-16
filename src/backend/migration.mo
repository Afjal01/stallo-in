import Map "mo:core/Map";
import NewBookingTypes "types/booking";
import CommonTypes "types/common";

module {
  // ── Old types (copied from .old/src/backend/types/booking.mo) ────────────
  type OldBooking = {
    id : CommonTypes.BookingId;
    customerId : CommonTypes.UserId;
    vendorId : CommonTypes.VendorId;
    packageId : CommonTypes.PackageId;
    eventDate : CommonTypes.Timestamp;
    eventVenue : Text;
    guestCount : Nat;
    totalPrice : Nat;
    advanceAmount : Nat;
    cancellationFeePercent : Nat;
    bookingStatus : CommonTypes.BookingStatus;
    paymentStatus : CommonTypes.PaymentStatus;
    stripePaymentIntentId : ?Text;
    notes : ?Text;
    createdAt : CommonTypes.Timestamp;
    updatedAt : CommonTypes.Timestamp;
  };

  type OldReview = {
    id : CommonTypes.ReviewId;
    bookingId : CommonTypes.BookingId;
    customerId : CommonTypes.UserId;
    vendorId : CommonTypes.VendorId;
    rating : Nat;
    comment : Text;
    createdAt : CommonTypes.Timestamp;
  };

  type OldBookingState = {
    bookings : Map.Map<CommonTypes.BookingId, OldBooking>;
    reviews : Map.Map<CommonTypes.ReviewId, OldReview>;
    counter : { var nextId : Nat };
    config : { var platformConfig : CommonTypes.PlatformConfig };
  };

  // ── New booking state shape ───────────────────────────────────────────────
  type NewBookingState = {
    bookings : Map.Map<CommonTypes.BookingId, NewBookingTypes.Booking>;
    reviews : Map.Map<CommonTypes.ReviewId, NewBookingTypes.Review>;
    counter : { var nextId : Nat };
    config : { var platformConfig : CommonTypes.PlatformConfig };
  };

  // ── Actor state shapes (must mirror stable fields in main.mo exactly) ────
  public type OldActor = {
    bookingState : OldBookingState;
  };

  public type NewActor = {
    bookingState : NewBookingState;
  };

  // ── Migration function ────────────────────────────────────────────────────
  public func run(old : OldActor) : NewActor {
    let newBookings = old.bookingState.bookings.map<
      CommonTypes.BookingId,
      OldBooking,
      NewBookingTypes.Booking
    >(
      func(_id, b) {
        {
          b with
          commissionAmount = 0;
          vendorPayout = b.totalPrice;
        }
      }
    );
    {
      bookingState = {
        bookings = newBookings;
        reviews = old.bookingState.reviews;
        counter = old.bookingState.counter;
        config = old.bookingState.config;
      };
    };
  };
};

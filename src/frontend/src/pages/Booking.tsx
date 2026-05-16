import { PackageCard } from "@/components/common/PackageCard";
import { RootLayout } from "@/components/layout/RootLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateBooking,
  useCreateCheckoutSession,
  useVendor,
  useVendorPackages,
} from "@/hooks/useBackend";
import {
  calculateCancellationFee,
  dateToTimestamp,
  formatDate,
  formatPrice,
} from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useBookingStore } from "@/stores/bookingStore";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { toast } from "sonner";

const STEPS = [
  { id: 1, label: "Package" },
  { id: 2, label: "Date & Venue" },
  { id: 3, label: "Guests" },
  { id: 4, label: "Review" },
  { id: 5, label: "Payment" },
];

function StepProgress({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center gap-0 mb-8" data-ocid="booking.stepper">
      {STEPS.map((s, i) => (
        <div key={s.id} className="flex items-center flex-1">
          <div
            className={cn(
              "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-colors",
              currentStep === s.id
                ? "bg-primary text-primary-foreground shadow-gold"
                : currentStep > s.id
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-card text-muted-foreground border border-border/50",
            )}
          >
            {currentStep > s.id ? (
              <Check className="size-3 text-primary" />
            ) : (
              <span>{s.id}</span>
            )}
            <span className="hidden sm:inline">{s.label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={cn(
                "flex-1 h-px mx-1 transition-colors",
                currentStep > s.id ? "bg-primary/50" : "bg-border/40",
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function BookingPage() {
  const { vendorId } = useParams({ from: "/book/$vendorId" });
  const sessionId =
    new URLSearchParams(window.location.search).get("session_id") ?? undefined;

  const { data: vendor } = useVendor(vendorId);
  const { data: packages = [], isLoading } = useVendorPackages(vendorId);

  const store = useBookingStore();
  const createBooking = useCreateBooking();
  const createCheckout = useCreateCheckoutSession();

  const activePackages = packages.filter((p) => p.isActive);

  // Reset store on mount only
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional reset on mount only
  useEffect(() => {
    store.reset();
  }, []);

  const canProceed = (): boolean => {
    if (store.step === 1) return !!store.selectedPackage;
    if (store.step === 2)
      return !!store.eventDate && store.eventVenue.trim().length > 0;
    if (store.step === 3) return store.guestCount > 0;
    if (store.step === 4) return true;
    return false;
  };

  const totalPrice = store.selectedPackage
    ? Number(store.selectedPackage.price) +
      Number(store.selectedPackage.setupCharge) +
      Number(store.selectedPackage.travelCharge)
    : 0;

  const advanceAmount =
    store.paymentMethod === "advance"
      ? Math.round(totalPrice * 0.3)
      : totalPrice;

  const handleSubmitBooking = async () => {
    if (!store.selectedPackage || !store.eventDate || !vendor) return;
    try {
      const booking = await createBooking.mutateAsync({
        vendorId: vendor.id,
        packageId: store.selectedPackage.id,
        eventDate: dateToTimestamp(store.eventDate),
        eventVenue: store.eventVenue,
        guestCount: BigInt(store.guestCount),
        notes: store.notes || undefined,
      });
      store.setBookingId(booking.id);

      const payLabel =
        store.paymentMethod === "advance" ? "30% Advance" : "Full Payment";

      const url = await createCheckout.mutateAsync({
        items: [
          {
            productName: `${vendor.businessName} — ${store.selectedPackage.name}`,
            productDescription: `Wedding food stall booking (${payLabel}) for ${store.eventDate.toLocaleDateString("en-IN")}`,
            quantity: BigInt(1),
            priceInCents: BigInt(advanceAmount),
            currency: "inr",
          },
        ],
        successUrl: `${window.location.origin}/dashboard/bookings`,
        cancelUrl: `${window.location.origin}/book/${vendorId}`,
      });
      store.setCheckoutUrl(url);
      store.nextStep();
    } catch {
      toast.error("Failed to create booking. Please try again.");
    }
  };

  // Payment success return from Stripe
  if (sessionId) {
    return (
      <RootLayout>
        <div className="container py-20 max-w-lg text-center">
          <motion.div
            className="flex size-24 items-center justify-center rounded-full bg-primary/15 border border-primary/30 mx-auto mb-6 shadow-gold"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Check className="size-12 text-primary" />
          </motion.div>
          <h1 className="font-display font-bold text-3xl mb-3 gold-gradient">
            Booking Confirmed! 🎉
          </h1>
          <p className="text-muted-foreground mb-6">
            Your payment was successful. The vendor will confirm your booking
            within 24 hours.
          </p>
          <div className="glass-card rounded-xl p-5 text-left space-y-2 mb-8 text-sm">
            <p className="font-semibold text-base mb-3 text-primary">
              What's next?
            </p>
            <p className="text-muted-foreground">
              📧 Booking confirmation sent to your email
            </p>
            <p className="text-muted-foreground">
              📞 Vendor will call to confirm details
            </p>
            <p className="text-muted-foreground">
              🎊 Enjoy your wedding celebration!
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground shadow-gold"
            data-ocid="booking.go_to_dashboard.button"
          >
            <Link to="/dashboard/bookings">View My Bookings</Link>
          </Button>
        </div>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <div className="container py-8 max-w-3xl">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="mb-4 -ml-1 text-muted-foreground hover:text-primary"
        >
          <Link to="/stall/$vendorId" params={{ vendorId }}>
            <ArrowLeft className="size-4 mr-1" />
            Back to Stall
          </Link>
        </Button>

        <StepProgress currentStep={store.step} />

        <div className="glass-card rounded-xl p-6 shadow-gold">
          {/* ─── Step 1: Package ─── */}
          {store.step === 1 && (
            <div>
              <div className="mb-5">
                <h2 className="font-display font-semibold text-2xl gold-gradient">
                  Choose a Package
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  {vendor
                    ? `Packages offered by ${vendor.businessName}`
                    : "Select the package that fits your needs"}
                </p>
              </div>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2].map((i) => (
                    <Skeleton key={i} className="h-48 rounded-xl bg-card/60" />
                  ))}
                </div>
              ) : activePackages.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No packages available for this vendor yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activePackages.map((pkg, i) => (
                    <PackageCard
                      key={pkg.id}
                      pkg={pkg}
                      index={i}
                      isSelected={store.selectedPackage?.id === pkg.id}
                      onSelect={(p) => store.setPackage(p)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ─── Step 2: Date & Venue ─── */}
          {store.step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-display font-semibold text-2xl gold-gradient">
                  Date & Venue
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  When and where is your event?
                </p>
              </div>
              <div>
                <Label htmlFor="event-date" className="text-foreground/80">
                  Event Date *
                </Label>
                <Input
                  id="event-date"
                  type="date"
                  value={
                    store.eventDate
                      ? store.eventDate.toISOString().slice(0, 10)
                      : ""
                  }
                  onChange={(e) =>
                    store.setEventDate(
                      e.target.value ? new Date(e.target.value) : null,
                    )
                  }
                  min={new Date().toISOString().slice(0, 10)}
                  className="mt-1 bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60"
                  data-ocid="booking.event_date.input"
                />
              </div>
              <div>
                <Label htmlFor="venue" className="text-foreground/80">
                  Venue Address *
                </Label>
                <Textarea
                  id="venue"
                  placeholder="Enter your wedding venue address..."
                  value={store.eventVenue}
                  onChange={(e) => store.setEventVenue(e.target.value)}
                  className="mt-1 resize-none bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60"
                  rows={3}
                  data-ocid="booking.venue.textarea"
                />
              </div>
              <div>
                <Label htmlFor="notes" className="text-foreground/80">
                  Additional Notes (optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requests or instructions for the vendor..."
                  value={store.notes}
                  onChange={(e) => store.setNotes(e.target.value)}
                  className="mt-1 resize-none bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60"
                  rows={2}
                  data-ocid="booking.notes.textarea"
                />
              </div>
            </div>
          )}

          {/* ─── Step 3: Guest Count ─── */}
          {store.step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-display font-semibold text-2xl gold-gradient">
                  Guest Count
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  How many guests are expected?
                </p>
              </div>
              <div>
                <Label htmlFor="guest-count" className="text-foreground/80">
                  Number of Guests *
                </Label>
                <Input
                  id="guest-count"
                  type="number"
                  min={
                    store.selectedPackage
                      ? Number(store.selectedPackage.guestMin)
                      : 1
                  }
                  max={
                    store.selectedPackage
                      ? Number(store.selectedPackage.guestMax)
                      : 9999
                  }
                  value={store.guestCount}
                  onChange={(e) =>
                    store.setGuestCount(
                      Number.parseInt(e.target.value, 10) || 0,
                    )
                  }
                  className="mt-1 text-lg h-12 bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60"
                  data-ocid="booking.guest_count.input"
                />
              </div>
              {store.selectedPackage && (
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-sm">
                  <p className="text-muted-foreground">
                    Package capacity: {Number(store.selectedPackage.guestMin)}–
                    {Number(store.selectedPackage.guestMax)} guests
                  </p>
                  {store.guestCount >
                    Number(store.selectedPackage.guestMax) && (
                    <p className="text-destructive text-xs mt-1">
                      ⚠ Guest count exceeds package maximum
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ─── Step 4: Review ─── */}
          {store.step === 4 && store.selectedPackage && (
            <div className="space-y-5">
              <div>
                <h2 className="font-display font-semibold text-2xl gold-gradient">
                  Review & Confirm
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Verify your booking details before payment
                </p>
              </div>

              {/* Booking summary */}
              <div className="rounded-lg bg-card border border-border/60 p-4 space-y-3 text-sm">
                <p className="font-semibold text-xs text-primary/80 uppercase tracking-wide">
                  Booking Summary
                </p>
                {[
                  ["Vendor", vendor?.businessName ?? "—"],
                  ["Package", store.selectedPackage.name],
                  [
                    "Event Date",
                    store.eventDate
                      ? formatDate(store.eventDate.getTime())
                      : "—",
                  ],
                  ["Venue", store.eventVenue],
                  ["Guests", `${store.guestCount} guests`],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium text-right max-w-xs truncate">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price breakdown */}
              <div className="rounded-lg bg-card border border-primary/20 p-4 space-y-2 text-sm">
                <p className="font-semibold text-xs text-primary/80 uppercase tracking-wide">
                  Price Breakdown
                </p>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base price</span>
                  <span>{formatPrice(store.selectedPackage.price)}</span>
                </div>
                {Number(store.selectedPackage.setupCharge) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Setup charge</span>
                    <span>
                      {formatPrice(store.selectedPackage.setupCharge)}
                    </span>
                  </div>
                )}
                {Number(store.selectedPackage.travelCharge) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Travel charge</span>
                    <span>
                      {formatPrice(store.selectedPackage.travelCharge)}
                    </span>
                  </div>
                )}
                <Separator className="bg-border/40" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="font-display text-2xl gold-gradient">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Payment method */}
              <div>
                <p className="text-sm font-semibold mb-3">Payment Method</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(
                    [
                      {
                        method: "advance" as const,
                        label: "50% Advance",
                        sub: `Pay ${formatPrice(Math.round(totalPrice * 0.3))} now`,
                        icon: Wallet,
                      },
                      {
                        method: "full" as const,
                        label: "Pay in Full",
                        sub: `Pay ${formatPrice(totalPrice)} now`,
                        icon: CreditCard,
                      },
                    ] as {
                      method: "advance" | "full";
                      label: string;
                      sub: string;
                      icon: typeof Wallet;
                    }[]
                  ).map(({ method, label, sub, icon: Icon }) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => store.setPaymentMethod(method)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-smooth",
                        store.paymentMethod === method
                          ? "border-primary bg-primary/8 shadow-gold"
                          : "border-border/50 hover:border-primary/40 hover:bg-primary/5",
                      )}
                      data-ocid={`booking.payment_method.${method}`}
                    >
                      <Icon
                        className={cn(
                          "size-5 shrink-0",
                          store.paymentMethod === method
                            ? "text-primary"
                            : "text-muted-foreground",
                        )}
                      />
                      <div>
                        <p className="text-sm font-semibold">{label}</p>
                        <p className="text-xs text-muted-foreground">{sub}</p>
                      </div>
                      {store.paymentMethod === method && (
                        <Check className="size-4 text-primary ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cancellation policy — tiered cards */}
              {store.eventDate &&
                (() => {
                  const fee = calculateCancellationFee(
                    store.eventDate.getTime(),
                    totalPrice,
                  );
                  return (
                    <div className="rounded-lg border border-primary/20 bg-card p-4">
                      <div className="flex items-start gap-2 mb-3">
                        <AlertTriangle className="size-4 text-primary shrink-0 mt-0.5" />
                        <p className="font-semibold text-sm text-primary">
                          Cancellation Policy
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                        <div className="rounded-lg bg-secondary/10 border border-secondary/20 p-2.5 text-center">
                          <p className="font-bold text-secondary">0%</p>
                          <p className="text-muted-foreground mt-0.5">
                            7+ days before
                          </p>
                        </div>
                        <div className="rounded-lg bg-primary/10 border border-primary/20 p-2.5 text-center">
                          <p className="font-bold text-primary">25%</p>
                          <p className="text-muted-foreground mt-0.5">
                            3–7 days
                          </p>
                        </div>
                        <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-2.5 text-center">
                          <p className="font-bold text-destructive">50%</p>
                          <p className="text-muted-foreground mt-0.5">
                            Within 72h
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Your event is{" "}
                        <span className="text-primary font-semibold">
                          {fee.daysToEvent} day
                          {fee.daysToEvent !== 1 ? "s" : ""}
                        </span>{" "}
                        away — current cancellation fee:{" "}
                        <span className="text-primary font-semibold">
                          {fee.feePercent}%
                        </span>
                      </p>
                    </div>
                  );
                })()}

              <div className="rounded-lg bg-muted/20 border border-border/30 p-3">
                <p className="text-xs text-muted-foreground">
                  🔒 You will be redirected to Stripe to complete the payment
                  securely.
                </p>
              </div>
            </div>
          )}

          {/* ─── Step 5: Payment ─── */}
          {store.step === 5 && (
            <div className="space-y-6">
              <div className="text-center py-4">
                <div className="flex size-16 items-center justify-center rounded-full bg-primary/15 border border-primary/30 mx-auto mb-4 shadow-gold">
                  <CreditCard className="size-7 text-primary" />
                </div>
                <h2 className="font-display font-semibold text-2xl gold-gradient">
                  Complete Payment
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Your booking is reserved. Complete payment to confirm.
                </p>
              </div>

              {store.selectedPackage && (
                <div className="rounded-xl border border-primary/20 bg-card p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Badge
                        variant="secondary"
                        className="mb-2 text-xs bg-primary/10 text-primary border-primary/20"
                      >
                        {store.selectedPackage.name}
                      </Badge>
                      <p className="font-display font-semibold text-lg">
                        {vendor?.businessName}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {store.eventDate
                          ? formatDate(store.eventDate.getTime())
                          : ""}
                        {store.eventVenue &&
                          ` · ${store.eventVenue.slice(0, 40)}${store.eventVenue.length > 40 ? "..." : ""}`}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-muted-foreground">
                        {store.paymentMethod === "advance"
                          ? "Advance (30%)"
                          : "Full amount"}
                      </p>
                      <p className="font-display font-bold text-2xl gold-gradient">
                        {formatPrice(advanceAmount)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {store.checkoutUrl ? (
                <div className="space-y-3">
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-primary text-primary-foreground shadow-gold hover:bg-primary/90"
                    data-ocid="booking.pay_button"
                  >
                    <a href={store.checkoutUrl}>
                      <CreditCard className="size-4 mr-2" />
                      Pay Now via Stripe
                    </a>
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    🔒 Secured by Stripe — your payment details are never stored
                  </p>
                </div>
              ) : (
                <div
                  className="text-center py-4"
                  data-ocid="booking.payment.loading_state"
                >
                  <Skeleton className="h-12 rounded-lg bg-card/60" />
                </div>
              )}

              <div className="pt-2">
                <Button
                  variant="link"
                  size="sm"
                  asChild
                  className="text-muted-foreground hover:text-primary"
                >
                  <Link to="/dashboard/bookings">View my bookings instead</Link>
                </Button>
              </div>
            </div>
          )}

          {/* Navigation buttons (steps 1–4) */}
          {store.step < 5 && (
            <div className="flex justify-between mt-6 pt-4 border-t border-border/40">
              <Button
                type="button"
                variant="outline"
                onClick={() => (store.step > 1 ? store.prevStep() : undefined)}
                disabled={store.step === 1}
                asChild={store.step === 1}
                className="border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary"
                data-ocid="booking.prev_button"
              >
                {store.step === 1 ? (
                  <Link to="/stall/$vendorId" params={{ vendorId }}>
                    <ArrowLeft className="size-4 mr-1" />
                    Back
                  </Link>
                ) : (
                  <span>
                    <ArrowLeft className="size-4 mr-1 inline" />
                    Back
                  </span>
                )}
              </Button>

              {store.step < 4 ? (
                <Button
                  type="button"
                  onClick={store.nextStep}
                  disabled={!canProceed()}
                  className="bg-primary text-primary-foreground shadow-gold hover:bg-primary/90"
                  data-ocid="booking.next_button"
                >
                  Next <ArrowRight className="size-4 ml-1" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmitBooking}
                  disabled={createBooking.isPending || createCheckout.isPending}
                  className="bg-primary text-primary-foreground shadow-gold hover:bg-primary/90"
                  data-ocid="booking.submit_button"
                >
                  {createBooking.isPending || createCheckout.isPending
                    ? "Processing..."
                    : "Proceed to Payment"}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </RootLayout>
  );
}

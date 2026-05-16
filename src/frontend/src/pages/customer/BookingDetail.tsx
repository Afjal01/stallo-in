import { StarRating } from "@/components/common/StarRating";
import { StatusBadge } from "@/components/common/StatusBadge";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useBooking,
  useCancelBooking,
  useCreateReview,
} from "@/hooks/useBackend";
import { calculateCancellationFee, formatDate, formatPrice } from "@/lib/utils";
import { BookingStatus } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, CheckCircle2, Printer } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_TIMELINE = [
  { status: BookingStatus.pending, label: "Booking Placed" },
  { status: BookingStatus.confirmed, label: "Vendor Confirmed" },
  { status: BookingStatus.preparing, label: "Preparing" },
  { status: BookingStatus.dispatched, label: "On the Way" },
  { status: BookingStatus.completed, label: "Completed" },
];

export default function CustomerBookingDetailPage() {
  const { bookingId } = useParams({ from: "/dashboard/bookings/$bookingId" });
  const { data: booking, isLoading } = useBooking(bookingId);
  const cancelBooking = useCancelBooking();
  const createReview = useCreateReview();

  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (isLoading) {
    return (
      <DashboardLayout title="Booking Details">
        <Skeleton className="h-8 w-32 mb-4" />
        <Skeleton className="h-64 rounded-xl" />
      </DashboardLayout>
    );
  }

  if (!booking) {
    return (
      <DashboardLayout title="Booking Details">
        <p className="text-muted-foreground">Booking not found.</p>
      </DashboardLayout>
    );
  }

  const cancFee = calculateCancellationFee(
    booking.eventDate,
    booking.totalPrice,
  );
  const canCancel =
    booking.bookingStatus !== BookingStatus.cancelled &&
    booking.bookingStatus !== BookingStatus.completed;
  const canReview =
    booking.bookingStatus === BookingStatus.completed && !reviewSubmitted;

  const currentStepIndex = STATUS_TIMELINE.findIndex(
    (s) => s.status === booking.bookingStatus,
  );

  const handleCancel = async () => {
    try {
      await cancelBooking.mutateAsync(bookingId);
      setShowCancelDialog(false);
      toast.success("Booking cancelled. Refund will be processed shortly.");
    } catch {
      toast.error("Cancellation failed. Please try again.");
    }
  };

  const handleReview = async () => {
    if (reviewRating < 1) {
      toast.error("Please select a rating.");
      return;
    }
    try {
      await createReview.mutateAsync({
        bookingId,
        rating: BigInt(reviewRating),
        comment: reviewComment,
      });
      setReviewSubmitted(true);
      toast.success("Review submitted! Thank you.");
    } catch {
      toast.error("Failed to submit review.");
    }
  };

  return (
    <DashboardLayout title="Booking Details">
      {/* Back */}
      <Button variant="ghost" size="sm" asChild className="mb-5 -ml-1">
        <Link to="/dashboard/bookings">
          <ArrowLeft className="size-4 mr-1" />
          Back to Bookings
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-4xl">
        {/* Main detail card */}
        <div className="lg:col-span-2 space-y-5">
          {/* Header */}
          <div className="rounded-xl border border-border/60 bg-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div>
                <h2 className="font-display font-bold text-xl">
                  Booking #{booking.id.slice(0, 8)}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Created {formatDate(booking.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={booking.bookingStatus} />
                <StatusBadge status={booking.paymentStatus} paymentMode />
              </div>
            </div>

            <Separator className="mb-4" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {[
                ["Event Date", formatDate(booking.eventDate)],
                ["Venue", booking.eventVenue],
                ["Guest Count", `${Number(booking.guestCount)} guests`],
                ["Package", `${booking.packageId.slice(0, 12)}...`],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-muted-foreground mb-0.5">
                    {label}
                  </p>
                  <p className="font-medium break-words">{value}</p>
                </div>
              ))}
            </div>

            {booking.notes && (
              <div className="mt-4 rounded-lg bg-muted/40 p-3">
                <p className="text-xs text-muted-foreground mb-1">Notes</p>
                <p className="text-sm">{booking.notes}</p>
              </div>
            )}
          </div>

          {/* Price breakdown */}
          <div className="rounded-xl border border-border/60 bg-card p-6">
            <h3 className="font-display font-semibold text-base mb-4">
              Price Breakdown
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Package Base Price
                </span>
                <span>{formatPrice(booking.totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Guest Count</span>
                <span>{Number(booking.guestCount)} guests</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total Amount</span>
                <span className="text-primary text-base">
                  {formatPrice(booking.totalPrice)}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Advance Paid</span>
                <span>{formatPrice(booking.advanceAmount)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Balance Due</span>
                <span>
                  {formatPrice(
                    Number(booking.totalPrice) - Number(booking.advanceAmount),
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Review form */}
          {canReview && (
            <div
              className="rounded-xl border border-primary/20 bg-primary/5 p-6"
              data-ocid="booking_detail.review_section"
            >
              <h3 className="font-display font-semibold text-base mb-1">
                Leave a Review
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                How was your experience with this vendor?
              </p>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm mb-2 block">Your Rating</Label>
                  <StarRating
                    value={reviewRating}
                    interactive
                    onChange={setReviewRating}
                    size="lg"
                    data-ocid="booking_detail.review_rating"
                  />
                </div>
                <div>
                  <Label htmlFor="review-comment">Comment (optional)</Label>
                  <Textarea
                    id="review-comment"
                    placeholder="Tell others about your experience..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    rows={3}
                    className="mt-1 resize-none"
                    data-ocid="booking_detail.review_textarea"
                  />
                </div>
                <Button
                  onClick={handleReview}
                  disabled={createReview.isPending}
                  data-ocid="booking_detail.review_submit_button"
                >
                  {createReview.isPending ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </div>
          )}

          {reviewSubmitted && (
            <div className="rounded-xl border border-secondary/30 bg-secondary/10 p-5 flex items-center gap-3">
              <CheckCircle2 className="size-5 text-secondary" />
              <p className="text-sm font-medium">
                Review submitted successfully!
              </p>
            </div>
          )}
        </div>

        {/* Sidebar: status timeline + actions */}
        <div className="space-y-5">
          {/* Status timeline */}
          {booking.bookingStatus !== BookingStatus.cancelled && (
            <div className="rounded-xl border border-border/60 bg-card p-5">
              <h3 className="font-display font-semibold text-sm mb-4">
                Booking Progress
              </h3>
              <div className="space-y-3">
                {STATUS_TIMELINE.map((s, i) => {
                  const done = i <= currentStepIndex;
                  const active = i === currentStepIndex;
                  return (
                    <div key={s.status} className="flex items-center gap-3">
                      <div
                        className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold border-2 transition-colors ${
                          active
                            ? "bg-primary text-primary-foreground border-primary"
                            : done
                              ? "bg-secondary/20 text-secondary border-secondary/40"
                              : "bg-muted text-muted-foreground border-border"
                        }`}
                      >
                        {done && !active ? (
                          <CheckCircle2 className="size-3" />
                        ) : (
                          i + 1
                        )}
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          active
                            ? "text-foreground"
                            : done
                              ? "text-secondary"
                              : "text-muted-foreground"
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="rounded-xl border border-border/60 bg-card p-5 space-y-3">
            <h3 className="font-display font-semibold text-sm">Actions</h3>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => window.print()}
              data-ocid="booking_detail.download_receipt.button"
            >
              <Printer className="size-4 mr-2" />
              Download Receipt
            </Button>

            {canCancel && (
              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={() => setShowCancelDialog(true)}
                data-ocid="booking_detail.cancel_button"
              >
                Cancel Booking
              </Button>
            )}
          </div>

          {/* Cancellation fee warning */}
          {canCancel && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800/30 p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
                    Cancellation Policy
                  </p>
                  <p className="text-amber-700 dark:text-amber-400">
                    {cancFee.daysToEvent} day
                    {cancFee.daysToEvent !== 1 ? "s" : ""} until event
                  </p>
                  <p className="text-amber-700 dark:text-amber-400 mt-1">
                    Fee: {cancFee.feePercent}% ({formatPrice(cancFee.feeAmount)}
                    )
                  </p>
                  <p className="text-amber-700 dark:text-amber-400">
                    Refund: {formatPrice(cancFee.refundAmount)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cancel dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent data-ocid="booking_detail.cancel_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3">
                <p>
                  Are you sure you want to cancel this booking? This action
                  cannot be undone.
                </p>
                {cancFee.feePercent > 0 && (
                  <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm">
                    <p className="font-semibold text-destructive mb-1">
                      Cancellation Fee Applies
                    </p>
                    <p className="text-muted-foreground">
                      A {cancFee.feePercent}% fee (
                      {formatPrice(cancFee.feeAmount)}) will be charged.
                    </p>
                    <p className="text-muted-foreground">
                      You will receive a refund of{" "}
                      {formatPrice(cancFee.refundAmount)}.
                    </p>
                  </div>
                )}
                {cancFee.feePercent === 0 && (
                  <div className="rounded-lg bg-secondary/10 border border-secondary/20 p-3 text-sm">
                    <p className="font-medium text-secondary">
                      Full refund — no cancellation fee
                    </p>
                  </div>
                )}
                <div>
                  <Label htmlFor="cancel-reason" className="text-sm">
                    Reason for cancellation (optional)
                  </Label>
                  <Textarea
                    id="cancel-reason"
                    placeholder="Let the vendor know why you're cancelling..."
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    rows={3}
                    className="mt-1 resize-none"
                    data-ocid="booking_detail.cancel_reason.textarea"
                  />
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="booking_detail.cancel_dialog.cancel_button">
              Keep Booking
            </AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={cancelBooking.isPending}
              data-ocid="booking_detail.cancel_dialog.confirm_button"
            >
              {cancelBooking.isPending ? "Cancelling..." : "Yes, Cancel"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}

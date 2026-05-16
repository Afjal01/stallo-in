import { b as useParams, r as reactExports, j as jsxRuntimeExports, S as Skeleton, e as calculateCancellationFee, L as Link, f as formatDate, c as formatPrice, h as ue } from "./index-BKL2lxtv.js";
import { S as StarRating } from "./StarRating-ClJRJp0s.js";
import { S as StatusBadge } from "./StatusBadge-BlMQRdya.js";
import { D as DashboardLayout } from "./DashboardLayout-BbZ-GuY6.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel } from "./alert-dialog-BRsBs6pr.js";
import { c as createLucideIcon, d as BookingStatus, B as Button } from "./useAuth-IAGlSf5h.js";
import { L as Label } from "./label-DYAxIx3c.js";
import { S as Separator } from "./separator-DcZXF9iz.js";
import { T as Textarea } from "./textarea-D-AlXnVk.js";
import { h as useBooking, i as useCancelBooking, j as useCreateReview } from "./useBackend-B1f4NLLV.js";
import { A as ArrowLeft } from "./arrow-left-DDDeDp3R.js";
import { C as CircleCheck } from "./circle-check-B67wFSiq.js";
import { T as TriangleAlert } from "./triangle-alert-BWTDYKvR.js";
import "./star-7jLtUNX7.js";
import "./sheet-DdO1tWzN.js";
import "./index-BEBufsG6.js";
import "./index-IXOTxK3N.js";
import "./users-CPmCI05L.js";
import "./calendar-BcXsBU70.js";
import "./trending-up-OZEtAFop.js";
import "./heart-BBjtls9Z.js";
import "./index-Dsok7sFO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
const Printer = createLucideIcon("printer", __iconNode);
const STATUS_TIMELINE = [
  { status: BookingStatus.pending, label: "Booking Placed" },
  { status: BookingStatus.confirmed, label: "Vendor Confirmed" },
  { status: BookingStatus.preparing, label: "Preparing" },
  { status: BookingStatus.dispatched, label: "On the Way" },
  { status: BookingStatus.completed, label: "Completed" }
];
function CustomerBookingDetailPage() {
  const { bookingId } = useParams({ from: "/dashboard/bookings/$bookingId" });
  const { data: booking, isLoading } = useBooking(bookingId);
  const cancelBooking = useCancelBooking();
  const createReview = useCreateReview();
  const [showCancelDialog, setShowCancelDialog] = reactExports.useState(false);
  const [cancelReason, setCancelReason] = reactExports.useState("");
  const [reviewRating, setReviewRating] = reactExports.useState(5);
  const [reviewComment, setReviewComment] = reactExports.useState("");
  const [reviewSubmitted, setReviewSubmitted] = reactExports.useState(false);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { title: "Booking Details", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32 mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-xl" })
    ] });
  }
  if (!booking) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { title: "Booking Details", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Booking not found." }) });
  }
  const cancFee = calculateCancellationFee(
    booking.eventDate,
    booking.totalPrice
  );
  const canCancel = booking.bookingStatus !== BookingStatus.cancelled && booking.bookingStatus !== BookingStatus.completed;
  const canReview = booking.bookingStatus === BookingStatus.completed && !reviewSubmitted;
  const currentStepIndex = STATUS_TIMELINE.findIndex(
    (s) => s.status === booking.bookingStatus
  );
  const handleCancel = async () => {
    try {
      await cancelBooking.mutateAsync(bookingId);
      setShowCancelDialog(false);
      ue.success("Booking cancelled. Refund will be processed shortly.");
    } catch {
      ue.error("Cancellation failed. Please try again.");
    }
  };
  const handleReview = async () => {
    if (reviewRating < 1) {
      ue.error("Please select a rating.");
      return;
    }
    try {
      await createReview.mutateAsync({
        bookingId,
        rating: BigInt(reviewRating),
        comment: reviewComment
      });
      setReviewSubmitted(true);
      ue.success("Review submitted! Thank you.");
    } catch {
      ue.error("Failed to submit review.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { title: "Booking Details", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", asChild: true, className: "mb-5 -ml-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard/bookings", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4 mr-1" }),
      "Back to Bookings"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-xl border border-border/60 bg-card p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-xl", children: [
                "Booking #",
                booking.id.slice(0, 8)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                "Created ",
                formatDate(booking.createdAt)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: booking.bookingStatus }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: booking.paymentStatus, paymentMode: true })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm", children: [
            ["Event Date", formatDate(booking.eventDate)],
            ["Venue", booking.eventVenue],
            ["Guest Count", `${Number(booking.guestCount)} guests`],
            ["Package", `${booking.packageId.slice(0, 12)}...`]
          ].map(([label, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium break-words", children: value })
          ] }, label)) }),
          booking.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-lg bg-muted/40 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Notes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: booking.notes })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-xl border border-border/60 bg-card p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-base mb-4", children: "Price Breakdown" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Package Base Price" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(booking.totalPrice) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Guest Count" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                Number(booking.guestCount),
                " guests"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-lg font-bold", children: formatPrice(booking.totalPrice) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Advance Paid" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(booking.advanceAmount) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Balance Due" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(
                Number(booking.totalPrice) - Number(booking.advanceAmount)
              ) })
            ] })
          ] })
        ] }),
        canReview && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl border border-primary/20 bg-primary/5 p-6",
            "data-ocid": "booking_detail.review_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-base mb-1", children: "Leave a Review" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "How was your experience with this vendor?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm mb-2 block", children: "Your Rating" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StarRating,
                    {
                      value: reviewRating,
                      interactive: true,
                      onChange: setReviewRating,
                      size: "lg",
                      "data-ocid": "booking_detail.review_rating"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "review-comment", children: "Comment (optional)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "review-comment",
                      placeholder: "Tell others about your experience...",
                      value: reviewComment,
                      onChange: (e) => setReviewComment(e.target.value),
                      rows: 3,
                      className: "mt-1 resize-none focus:ring-primary/50 focus:border-primary/50",
                      "data-ocid": "booking_detail.review_textarea"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: handleReview,
                    disabled: createReview.isPending,
                    "data-ocid": "booking_detail.review_submit_button",
                    children: createReview.isPending ? "Submitting..." : "Submit Review"
                  }
                )
              ] })
            ]
          }
        ),
        reviewSubmitted && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-secondary/30 bg-secondary/10 p-5 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-5 text-secondary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Review submitted successfully!" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        booking.bookingStatus !== BookingStatus.cancelled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-xl border border-border/60 bg-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm mb-4", children: "Booking Progress" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: STATUS_TIMELINE.map((s, i) => {
            const done = i <= currentStepIndex;
            const active = i === currentStepIndex;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold border-2 transition-colors ${active ? "bg-primary text-primary-foreground border-primary" : done ? "bg-secondary/20 text-secondary border-secondary/40" : "bg-muted text-muted-foreground border-border"}`,
                  children: done && !active ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-3" }) : i + 1
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs font-medium ${active ? "text-foreground" : done ? "text-secondary" : "text-muted-foreground"}`,
                  children: s.label
                }
              )
            ] }, s.status);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-xl border border-border/60 bg-card p-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm", children: "Actions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "w-full",
              onClick: () => window.print(),
              "data-ocid": "booking_detail.download_receipt.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "size-4 mr-2" }),
                "Download Receipt"
              ]
            }
          ),
          canCancel && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "destructive",
              size: "sm",
              className: "w-full",
              onClick: () => setShowCancelDialog(true),
              "data-ocid": "booking_detail.cancel_button",
              children: "Cancel Booking"
            }
          )
        ] }),
        canCancel && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border-l-4 border-amber-500/60 border border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800/30 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-amber-800 dark:text-amber-300 mb-1", children: "Cancellation Policy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-amber-700 dark:text-amber-400", children: [
              cancFee.daysToEvent,
              " day",
              cancFee.daysToEvent !== 1 ? "s" : "",
              " until event"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-amber-700 dark:text-amber-400 mt-1", children: [
              "Fee: ",
              cancFee.feePercent,
              "% (",
              formatPrice(cancFee.feeAmount),
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-amber-700 dark:text-amber-400", children: [
              "Refund: ",
              formatPrice(cancFee.refundAmount)
            ] })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: showCancelDialog, onOpenChange: setShowCancelDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "booking_detail.cancel_dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Cancel Booking?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Are you sure you want to cancel this booking? This action cannot be undone." }),
          cancFee.feePercent > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-destructive mb-1", children: "Cancellation Fee Applies" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
              "A ",
              cancFee.feePercent,
              "% fee (",
              formatPrice(cancFee.feeAmount),
              ") will be charged."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
              "You will receive a refund of",
              " ",
              formatPrice(cancFee.refundAmount),
              "."
            ] })
          ] }),
          cancFee.feePercent === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-secondary/10 border border-secondary/20 p-3 text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-secondary", children: "Full refund — no cancellation fee" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cancel-reason", className: "text-sm", children: "Reason for cancellation (optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "cancel-reason",
                placeholder: "Let the vendor know why you're cancelling...",
                value: cancelReason,
                onChange: (e) => setCancelReason(e.target.value),
                rows: 3,
                className: "mt-1 resize-none",
                "data-ocid": "booking_detail.cancel_reason.textarea"
              }
            )
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "booking_detail.cancel_dialog.cancel_button", children: "Keep Booking" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "destructive",
            onClick: handleCancel,
            disabled: cancelBooking.isPending,
            "data-ocid": "booking_detail.cancel_dialog.confirm_button",
            children: cancelBooking.isPending ? "Cancelling..." : "Yes, Cancel"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  CustomerBookingDetailPage as default
};

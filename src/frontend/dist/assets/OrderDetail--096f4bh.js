import { b as useParams, r as reactExports, j as jsxRuntimeExports, S as Skeleton, L as Link, d as cn, f as formatDate, c as formatPrice, h as ue } from "./index-DIzWvAoP.js";
import { S as StatusBadge } from "./StatusBadge-CyM3jQxo.js";
import { D as DashboardLayout } from "./DashboardLayout-bdWF5nU2.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-6qk2QkpM.js";
import { B as Button, d as BookingStatus, C as ChefHat } from "./useAuth-Bhs8pioH.js";
import { C as Card, a as CardContent } from "./card-BK5KlsOo.js";
import { L as Label } from "./label-DRvcCxqI.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_KY13Mh.js";
import { S as Separator } from "./separator-DrDgD32O.js";
import { T as Textarea } from "./textarea-BMWen7_k.js";
import { h as useBooking, k as useUpdateBookingStatus } from "./useBackend-CUhkj_B6.js";
import { A as ArrowLeft } from "./arrow-left-CKYr6rae.js";
import { C as CircleAlert } from "./circle-alert-B66ftpNK.js";
import { C as Clock } from "./clock-BmE9tPrM.js";
import { C as CircleCheck } from "./circle-check-DYr8r4nJ.js";
import { T as Truck } from "./truck-CBbR9TLV.js";
import { C as Calendar } from "./calendar-DPjbiL9q.js";
import { U as Users } from "./users-pxzxJLV8.js";
import { M as MapPin } from "./map-pin-Clah7rAK.js";
import { F as FileText } from "./file-text-CHNmvMDC.js";
import "./sheet-BeMLdLfo.js";
import "./index-BWMPnhEC.js";
import "./index-IXOTxK3N.js";
import "./trending-up-BEWPTL-N.js";
import "./heart-7w2sMjVh.js";
import "./index-C8VI1ok0.js";
import "./index-CKDgaQ-I.js";
import "./index-CRX4YPgd.js";
import "./chevron-down-BCW7NqnS.js";
import "./check-BMuas-wb.js";
const TIMELINE_STEPS = [
  { status: BookingStatus.pending, label: "Received", icon: Clock },
  { status: BookingStatus.confirmed, label: "Confirmed", icon: CircleCheck },
  { status: BookingStatus.preparing, label: "Preparing", icon: ChefHat },
  { status: BookingStatus.dispatched, label: "Dispatched", icon: Truck },
  { status: BookingStatus.completed, label: "Completed", icon: CircleCheck }
];
const STATUS_ORDER = [
  BookingStatus.pending,
  BookingStatus.confirmed,
  BookingStatus.preparing,
  BookingStatus.dispatched,
  BookingStatus.completed
];
const NEXT_STATUS_OPTIONS = {
  [BookingStatus.confirmed]: [
    { value: BookingStatus.preparing, label: "Mark as Preparing" }
  ],
  [BookingStatus.preparing]: [
    { value: BookingStatus.dispatched, label: "Mark as Dispatched" }
  ],
  [BookingStatus.dispatched]: [
    { value: BookingStatus.completed, label: "Mark as Completed" }
  ]
};
function VendorOrderDetailPage() {
  const { orderId } = useParams({ from: "/vendor/orders/$orderId" });
  const { data: booking, isLoading } = useBooking(orderId);
  const updateStatus = useUpdateBookingStatus();
  const [rejectOpen, setRejectOpen] = reactExports.useState(false);
  const [rejectReason, setRejectReason] = reactExports.useState("");
  const handleStatusChange = async (status) => {
    try {
      await updateStatus.mutateAsync({
        bookingId: orderId,
        status
      });
      ue.success("Order status updated!");
    } catch {
      ue.error("Failed to update status.");
    }
  };
  const handleRejectConfirm = async () => {
    try {
      await updateStatus.mutateAsync({
        bookingId: orderId,
        status: BookingStatus.cancelled
      });
      ue.success("Order rejected.");
    } catch {
      ue.error("Failed to reject order.");
    } finally {
      setRejectOpen(false);
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { title: "Order Details", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" })
    ] }) });
  }
  if (!booking) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { title: "Order Details", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", asChild: true, className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/vendor", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4 mr-1" }),
        "Back to Orders"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-card p-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "size-10 text-muted-foreground mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-lg", children: "Order not found" })
      ] })
    ] });
  }
  const currentStatusIndex = STATUS_ORDER.indexOf(
    booking.bookingStatus
  );
  const isCancelled = booking.bookingStatus === BookingStatus.cancelled;
  const nextOptions = NEXT_STATUS_OPTIONS[booking.bookingStatus] ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DashboardLayout,
    {
      title: "Order Details",
      subtitle: `Order #${booking.id.slice(0, 8).toUpperCase()}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              asChild: true,
              "data-ocid": "vendor_order_detail.back_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/vendor", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4 mr-1" }),
                "Back to Orders"
              ] })
            }
          ),
          !isCancelled && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4", children: "Order Progress" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start", children: TIMELINE_STEPS.map((step, idx) => {
              const isCompleted = currentStatusIndex > idx;
              const isCurrent = currentStatusIndex === idx;
              const Icon = step.icon;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-1 flex-col items-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center w-full", children: [
                      idx > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: cn(
                            "flex-1 h-0.5 -ml-1",
                            isCompleted || isCurrent ? "bg-primary" : "bg-border"
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: cn(
                            "flex size-8 items-center justify-center rounded-full shrink-0 border-2 transition-colors",
                            isCompleted ? "bg-primary border-primary text-primary-foreground" : isCurrent ? "bg-primary/10 border-primary text-primary" : "bg-card border-border text-muted-foreground"
                          ),
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-3.5" })
                        }
                      ),
                      idx < TIMELINE_STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: cn(
                            "flex-1 h-0.5 -mr-1",
                            isCompleted ? "bg-primary" : "bg-border"
                          )
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: cn(
                          "text-[10px] mt-1.5 font-medium text-center leading-tight",
                          isCurrent ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
                        ),
                        children: step.label
                      }
                    )
                  ]
                },
                step.status
              );
            }) })
          ] }) }),
          isCancelled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-destructive/30 bg-destructive/5 p-4 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "size-5 text-destructive shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive font-medium", children: "This order has been cancelled." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg", children: "Booking Details" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: booking.bookingStatus })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "size-4 text-muted-foreground mt-0.5 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Event Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: formatDate(booking.eventDate) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-4 text-muted-foreground mt-0.5 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Guests" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
                    Number(booking.guestCount),
                    " guests"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 col-span-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4 text-muted-foreground mt-0.5 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Venue" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: booking.eventVenue })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Total Amount" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display font-bold text-primary", children: formatPrice(booking.totalPrice) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Advance Received" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display font-bold", children: formatPrice(booking.advanceAmount) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Payment Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: booking.paymentStatus, paymentMode: true })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Received On" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: formatDate(booking.createdAt) })
              ] })
            ] })
          ] }) }),
          booking.notes && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Customer Notes" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: booking.notes })
          ] }) }),
          !isCancelled && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Update Order" }),
            nextOptions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                onValueChange: handleStatusChange,
                disabled: updateStatus.isPending,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "vendor_order_detail.status.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Change status..." }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: nextOptions.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt.value, children: opt.label }, opt.value)) })
                ]
              }
            ),
            booking.bookingStatus === BookingStatus.pending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: () => handleStatusChange(BookingStatus.confirmed),
                  disabled: updateStatus.isPending,
                  className: "flex-1",
                  "data-ocid": "vendor_order_detail.accept_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4 mr-1.5" }),
                    " Accept Order"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => setRejectOpen(true),
                  disabled: updateStatus.isPending,
                  className: "flex-1 text-destructive border-destructive/30 hover:bg-destructive/5",
                  "data-ocid": "vendor_order_detail.reject_button",
                  children: "Reject Order"
                }
              )
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: rejectOpen, onOpenChange: setRejectOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "vendor_order_detail.reject.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Reject this order?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "The customer will be notified. This action cannot be undone." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "detail-reject-reason", children: "Reason (optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "detail-reject-reason",
                placeholder: "Explain why you are rejecting this order...",
                value: rejectReason,
                onChange: (e) => setRejectReason(e.target.value),
                rows: 3,
                className: "resize-none",
                "data-ocid": "vendor_order_detail.reject.reason.textarea"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "vendor_order_detail.reject.cancel_button", children: "Go Back" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: handleRejectConfirm,
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                "data-ocid": "vendor_order_detail.reject.confirm_button",
                children: "Reject Order"
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
export {
  VendorOrderDetailPage as default
};

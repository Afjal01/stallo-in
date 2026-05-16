import { r as reactExports, j as jsxRuntimeExports, h as ue, S as Skeleton, u as useNavigate, f as formatDate, c as formatPrice } from "./index-DIzWvAoP.js";
import { S as StatusBadge } from "./StatusBadge-CyM3jQxo.js";
import { D as DashboardLayout, S as ShoppingBag } from "./DashboardLayout-bdWF5nU2.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-6qk2QkpM.js";
import { B as Badge } from "./sheet-BeMLdLfo.js";
import { u as useAuth, d as BookingStatus, B as Button } from "./useAuth-Bhs8pioH.js";
import { L as Label } from "./label-DRvcCxqI.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_KY13Mh.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-ChGkEdjP.js";
import { T as Textarea } from "./textarea-BMWen7_k.js";
import { u as useVendors, g as useBookings, k as useUpdateBookingStatus } from "./useBackend-CUhkj_B6.js";
import { C as CircleAlert } from "./circle-alert-B66ftpNK.js";
import { C as CircleX } from "./circle-x-Cor7AUW7.js";
import { C as CircleCheck } from "./circle-check-DYr8r4nJ.js";
import { C as ChevronRight } from "./chevron-right-x2KILwBZ.js";
import "./index-BWMPnhEC.js";
import "./index-IXOTxK3N.js";
import "./users-pxzxJLV8.js";
import "./calendar-DPjbiL9q.js";
import "./trending-up-BEWPTL-N.js";
import "./heart-7w2sMjVh.js";
import "./index-C8VI1ok0.js";
import "./index-CKDgaQ-I.js";
import "./index-CRX4YPgd.js";
import "./chevron-down-BCW7NqnS.js";
import "./check-BMuas-wb.js";
const ACTIVE_STATUSES = [
  BookingStatus.confirmed,
  BookingStatus.preparing,
  BookingStatus.dispatched
];
const NEXT_STATUS = {
  [BookingStatus.confirmed]: [
    { value: BookingStatus.preparing, label: "Mark Preparing" },
    { value: BookingStatus.cancelled, label: "Cancel Order" }
  ],
  [BookingStatus.preparing]: [
    { value: BookingStatus.dispatched, label: "Mark Dispatched" },
    { value: BookingStatus.cancelled, label: "Cancel Order" }
  ],
  [BookingStatus.dispatched]: [
    { value: BookingStatus.completed, label: "Mark Completed" }
  ]
};
function EmptyTab({ message }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border border-border/60 bg-card p-12 text-center",
      "data-ocid": "vendor_orders.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "size-10 text-muted-foreground mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-lg mb-1", children: message }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Orders will appear here when customers book your stall" })
      ]
    }
  );
}
function OrderRow({
  booking,
  index,
  onAccept,
  onReject,
  onStatusChange,
  isPending
}) {
  const navigate = useNavigate();
  const nextOptions = NEXT_STATUS[booking.bookingStatus] ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-wrap items-center gap-3 rounded-xl border border-border/60 bg-card p-4 hover:shadow-sm transition-smooth cursor-pointer",
      "data-ocid": `vendor_orders.item.${index}`,
      onClick: () => navigate({
        to: "/vendor/orders/$orderId",
        params: { orderId: booking.id }
      }),
      onKeyDown: (e) => e.key === "Enter" && navigate({
        to: "/vendor/orders/$orderId",
        params: { orderId: booking.id }
      }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-sm", children: [
              "Order #",
              booking.id.slice(0, 8).toUpperCase()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: booking.bookingStatus })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
            formatDate(booking.eventDate),
            " · ",
            Number(booking.guestCount),
            " guests · ",
            formatPrice(booking.totalPrice)
          ] }),
          booking.eventVenue && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate max-w-xs", children: booking.eventVenue })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 shrink-0",
            onClick: (e) => e.stopPropagation(),
            onKeyDown: (e) => e.stopPropagation(),
            children: [
              booking.bookingStatus === BookingStatus.pending && onAccept && onReject && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "text-destructive border-destructive/30 hover:bg-destructive/5",
                    onClick: () => onReject(booking.id),
                    disabled: isPending,
                    "data-ocid": `vendor_orders.reject_button.${index}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "size-3.5 mr-1" }),
                      " Reject"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    onClick: () => onAccept(booking.id),
                    disabled: isPending,
                    "data-ocid": `vendor_orders.accept_button.${index}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-3.5 mr-1" }),
                      " Accept"
                    ]
                  }
                )
              ] }),
              ACTIVE_STATUSES.includes(booking.bookingStatus) && onStatusChange && nextOptions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  onValueChange: (val) => onStatusChange(booking.id, val),
                  disabled: isPending,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "h-8 text-xs w-40",
                        "data-ocid": `vendor_orders.status_select.${index}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Update status" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: nextOptions.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt.value, children: opt.label }, opt.value)) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-4 text-muted-foreground" })
            ]
          }
        )
      ]
    }
  );
}
function VendorOrdersPage() {
  const { principal } = useAuth();
  const { data: vendors = [] } = useVendors({});
  const myVendor = vendors.find(
    (v) => v.ownerId.toString() === (principal == null ? void 0 : principal.toString())
  );
  const { data: bookings = [], isLoading } = useBookings(
    myVendor ? { vendorId: myVendor.id } : {}
  );
  const updateStatus = useUpdateBookingStatus();
  const [rejectDialogOpen, setRejectDialogOpen] = reactExports.useState(false);
  const [rejectBookingId, setRejectBookingId] = reactExports.useState(null);
  const [rejectReason, setRejectReason] = reactExports.useState("");
  const newOrders = bookings.filter(
    (b) => b.bookingStatus === BookingStatus.pending
  );
  const activeOrders = bookings.filter(
    (b) => ACTIVE_STATUSES.includes(b.bookingStatus)
  );
  const completedOrders = bookings.filter(
    (b) => b.bookingStatus === BookingStatus.completed
  );
  const cancelledOrders = bookings.filter(
    (b) => b.bookingStatus === BookingStatus.cancelled
  );
  const handleAccept = async (bookingId) => {
    try {
      await updateStatus.mutateAsync({
        bookingId,
        status: BookingStatus.confirmed
      });
      ue.success("Order accepted successfully!");
    } catch {
      ue.error("Failed to accept order.");
    }
  };
  const handleRejectOpen = (bookingId) => {
    setRejectBookingId(bookingId);
    setRejectReason("");
    setRejectDialogOpen(true);
  };
  const handleRejectConfirm = async () => {
    if (!rejectBookingId) return;
    try {
      await updateStatus.mutateAsync({
        bookingId: rejectBookingId,
        status: BookingStatus.cancelled
      });
      ue.success("Order rejected.");
    } catch {
      ue.error("Failed to reject order.");
    } finally {
      setRejectDialogOpen(false);
      setRejectBookingId(null);
    }
  };
  const handleStatusChange = async (bookingId, status) => {
    try {
      await updateStatus.mutateAsync({ bookingId, status });
      ue.success("Order status updated!");
    } catch {
      ue.error("Failed to update status.");
    }
  };
  const SkeletonRows = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, i)) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { title: "Orders", subtitle: "Manage incoming booking requests", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "new", className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-muted/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "new",
            "data-ocid": "vendor_orders.tab.new",
            className: "gap-1.5",
            children: [
              "New",
              newOrders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary text-primary-foreground h-4.5 px-1.5 text-[10px]", children: newOrders.length })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "active",
            "data-ocid": "vendor_orders.tab.active",
            className: "gap-1.5",
            children: [
              "Active",
              activeOrders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-500 text-white h-4.5 px-1.5 text-[10px]", children: activeOrders.length })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsTrigger,
          {
            value: "completed",
            "data-ocid": "vendor_orders.tab.completed",
            children: "Completed"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsTrigger,
          {
            value: "cancelled",
            "data-ocid": "vendor_orders.tab.cancelled",
            children: "Cancelled"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "new", className: "space-y-3", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonRows, {}) : newOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyTab, { message: "No new orders" }) : newOrders.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        OrderRow,
        {
          booking: b,
          index: i + 1,
          onAccept: handleAccept,
          onReject: handleRejectOpen,
          isPending: updateStatus.isPending
        },
        b.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "active", className: "space-y-3", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonRows, {}) : activeOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyTab, { message: "No active orders" }) : activeOrders.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        OrderRow,
        {
          booking: b,
          index: i + 1,
          onStatusChange: handleStatusChange,
          isPending: updateStatus.isPending
        },
        b.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "completed", className: "space-y-3", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonRows, {}) : completedOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyTab, { message: "No completed orders yet" }) : completedOrders.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderRow, { booking: b, index: i + 1 }, b.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "cancelled", className: "space-y-3", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonRows, {}) : cancelledOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyTab, { message: "No cancelled orders" }) : cancelledOrders.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderRow, { booking: b, index: i + 1 }, b.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: rejectDialogOpen, onOpenChange: setRejectDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "vendor_orders.reject.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "size-5 text-destructive" }),
          " Reject this order?"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "The customer will be notified and the booking will be cancelled." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reject-reason", children: "Reason for rejection (optional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "reject-reason",
            placeholder: "e.g. Date not available, outside service area...",
            value: rejectReason,
            onChange: (e) => setRejectReason(e.target.value),
            rows: 3,
            className: "resize-none",
            "data-ocid": "vendor_orders.reject.reason.textarea"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "vendor_orders.reject.cancel_button", children: "Keep Order" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            onClick: handleRejectConfirm,
            className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            "data-ocid": "vendor_orders.reject.confirm_button",
            children: "Reject Order"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  VendorOrdersPage as default
};

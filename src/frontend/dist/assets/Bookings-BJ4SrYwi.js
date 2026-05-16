import { r as reactExports, j as jsxRuntimeExports, S as Skeleton, L as Link, f as formatDate, c as formatPrice } from "./index-BKL2lxtv.js";
import { S as StatusBadge } from "./StatusBadge-BlMQRdya.js";
import { D as DashboardLayout, S as ShoppingBag } from "./DashboardLayout-BbZ-GuY6.js";
import { c as createLucideIcon, d as BookingStatus, B as Button } from "./useAuth-IAGlSf5h.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-JmZdT47h.js";
import { g as useBookings } from "./useBackend-B1f4NLLV.js";
import { C as CalendarDays } from "./calendar-days-CW9yt5dP.js";
import { U as Users } from "./users-CPmCI05L.js";
import { E as Eye } from "./eye-6wevUMta.js";
import { C as CircleX } from "./circle-x-Ccgn6w3P.js";
import { S as Star } from "./star-7jLtUNX7.js";
import "./sheet-DdO1tWzN.js";
import "./index-BEBufsG6.js";
import "./index-IXOTxK3N.js";
import "./calendar-BcXsBU70.js";
import "./trending-up-OZEtAFop.js";
import "./heart-BBjtls9Z.js";
import "./index-BjDY_mxd.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 17.5v-11", key: "1jc1ny" }]
];
const Receipt = createLucideIcon("receipt", __iconNode);
function EmptyTab({ message }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border border-border/60 bg-card p-10 text-center",
      "data-ocid": "bookings.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "size-10 text-primary mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: message }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Book a verified food stall for your event" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/browse", search: { category: void 0, search: void 0 }, children: "Browse Stalls" }) })
      ]
    }
  );
}
function BookingRow({
  booking,
  index,
  showCancel,
  showReview,
  showFee
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border/60 bg-card p-4 hover:shadow-sm transition-smooth hover-lift",
      "data-ocid": `bookings.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-sm truncate", children: [
              "Booking #",
              booking.id.slice(0, 8)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: booking.bookingStatus }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: booking.paymentStatus, paymentMode: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "size-3" }),
              formatDate(booking.eventDate)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-3" }),
              Number(booking.guestCount),
              " guests"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "size-3" }),
              formatPrice(booking.totalPrice)
            ] })
          ] }),
          showFee && Number(booking.cancellationFeePercent) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive mt-1", children: [
            "Cancellation fee applied: ",
            Number(booking.cancellationFeePercent),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              asChild: true,
              "data-ocid": `bookings.view_button.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/dashboard/bookings/$bookingId",
                  params: { bookingId: booking.id },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-3.5 mr-1" }),
                    "Details"
                  ]
                }
              )
            }
          ),
          showCancel && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "text-destructive hover:text-destructive hover:bg-destructive/10",
              asChild: true,
              "data-ocid": `bookings.cancel_button.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/dashboard/bookings/$bookingId",
                  params: { bookingId: booking.id },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "size-3.5 mr-1" }),
                    "Cancel"
                  ]
                }
              )
            }
          ),
          showReview && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "border-primary/40 text-primary hover:bg-primary/5",
              asChild: true,
              "data-ocid": `bookings.review_button.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/dashboard/bookings/$bookingId",
                  params: { bookingId: booking.id },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "size-3.5 mr-1" }),
                    "Review"
                  ]
                }
              )
            }
          )
        ] })
      ]
    }
  );
}
function CustomerBookingsPage() {
  const { data: bookings = [], isLoading } = useBookings({});
  const [tab, setTab] = reactExports.useState("upcoming");
  const upcoming = bookings.filter(
    (b) => b.bookingStatus !== BookingStatus.cancelled && b.bookingStatus !== BookingStatus.completed
  );
  const past = bookings.filter(
    (b) => b.bookingStatus === BookingStatus.completed
  );
  const cancelled = bookings.filter(
    (b) => b.bookingStatus === BookingStatus.cancelled
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DashboardLayout,
    {
      title: "My Bookings",
      subtitle: "All your booking history and upcoming events",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: tab, onValueChange: (v) => setTab(v), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-6", "data-ocid": "bookings.tabs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "upcoming", "data-ocid": "bookings.upcoming.tab", children: [
            "Upcoming",
            upcoming.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 rounded-full bg-primary text-primary-foreground text-[10px] px-1.5 py-0 font-bold", children: upcoming.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "past", "data-ocid": "bookings.past.tab", children: "Past" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "cancelled", "data-ocid": "bookings.cancelled.tab", children: "Cancelled" })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "upcoming", children: upcoming.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyTab, { message: "No upcoming bookings" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: upcoming.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(BookingRow, { booking: b, index: i, showCancel: true }, b.id)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "past", children: past.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyTab, { message: "No completed bookings yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: past.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(BookingRow, { booking: b, index: i, showReview: true }, b.id)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "cancelled", children: cancelled.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyTab, { message: "No cancelled bookings" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: cancelled.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(BookingRow, { booking: b, index: i, showFee: true }, b.id)) }) })
        ] })
      ] })
    }
  );
}
export {
  CustomerBookingsPage as default
};

import { r as reactExports, j as jsxRuntimeExports, S as Skeleton, f as formatDate, c as formatPrice, i as formatDateTime, h as ue } from "./index-BKL2lxtv.js";
import { S as StatusBadge } from "./StatusBadge-BlMQRdya.js";
import { D as DashboardLayout } from "./DashboardLayout-BbZ-GuY6.js";
import { X, B as Badge } from "./sheet-DdO1tWzN.js";
import { c as createLucideIcon, d as BookingStatus, B as Button } from "./useAuth-IAGlSf5h.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-C3LvU69M.js";
import { I as Input } from "./input-wyOQctPS.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-6JdgOsio.js";
import { S as Separator } from "./separator-DcZXF9iz.js";
import { g as useBookings, k as useUpdateBookingStatus } from "./useBackend-B1f4NLLV.js";
import { E as Eye } from "./eye-6wevUMta.js";
import "./index-BEBufsG6.js";
import "./index-IXOTxK3N.js";
import "./users-CPmCI05L.js";
import "./calendar-BcXsBU70.js";
import "./trending-up-OZEtAFop.js";
import "./heart-BBjtls9Z.js";
import "./index-BjDY_mxd.js";
import "./index-hE9AgaEV.js";
import "./chevron-down-Ds0owe7i.js";
import "./check-hrLNaFSe.js";
import "./index-Dsok7sFO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode);
const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: BookingStatus.pending, label: "Pending" },
  { value: BookingStatus.confirmed, label: "Confirmed" },
  { value: BookingStatus.preparing, label: "Preparing" },
  { value: BookingStatus.dispatched, label: "Dispatched" },
  { value: BookingStatus.completed, label: "Completed" },
  { value: BookingStatus.cancelled, label: "Cancelled" }
];
const ALL_STATUSES = [
  BookingStatus.pending,
  BookingStatus.confirmed,
  BookingStatus.preparing,
  BookingStatus.dispatched,
  BookingStatus.completed,
  BookingStatus.cancelled
];
function BookingDetailModal({
  booking,
  open,
  onClose
}) {
  const updateStatus = useUpdateBookingStatus();
  const handleStatusChange = async (status) => {
    if (!booking) return;
    try {
      await updateStatus.mutateAsync({
        bookingId: booking.id,
        status
      });
      ue.success("Booking status updated.");
    } catch {
      ue.error("Failed to update status.");
    }
  };
  if (!booking) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Dialog,
    {
      open,
      onOpenChange: (v) => {
        if (!v) onClose();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        DialogContent,
        {
          className: "max-w-lg",
          "data-ocid": "admin.booking_detail.dialog",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-primary", children: "Booking Details" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "font-mono text-xs", children: booking.id })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Booking Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: booking.bookingStatus })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Payment Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: booking.paymentStatus, paymentMode: true })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Event Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: formatDate(booking.eventDate) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Guests" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: Number(booking.guestCount) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Venue" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium truncate", children: booking.eventVenue })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Price" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: formatPrice(booking.totalPrice) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Advance Paid" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: formatPrice(booking.advanceAmount) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Cancellation Fee" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
                    Number(booking.cancellationFeePercent),
                    "%"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Vendor ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs", children: booking.vendorId })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Customer ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs", children: booking.customerId.toString() })
              ] }),
              booking.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Notes" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: booking.notes })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Created" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: formatDateTime(booking.createdAt) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-2", children: "Force Status Update (Admin)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    defaultValue: booking.bookingStatus,
                    onValueChange: handleStatusChange,
                    disabled: updateStatus.isPending,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "w-full",
                          "data-ocid": "admin.booking_detail.status.select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ALL_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s.charAt(0).toUpperCase() + s.slice(1) }, s)) })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: onClose,
                "data-ocid": "admin.booking_detail.close.button",
                children: "Close"
              }
            ) })
          ]
        }
      )
    }
  );
}
function exportToCSV(bookings) {
  const headers = [
    "ID",
    "Vendor ID",
    "Customer ID",
    "Event Date",
    "Venue",
    "Guests",
    "Total Price",
    "Advance",
    "Status",
    "Payment Status",
    "Created At"
  ];
  const rows = bookings.map((b) => [
    b.id,
    b.vendorId,
    b.customerId.toString(),
    formatDate(b.eventDate),
    b.eventVenue,
    Number(b.guestCount),
    Number(b.totalPrice) / 100,
    Number(b.advanceAmount) / 100,
    b.bookingStatus,
    b.paymentStatus,
    formatDateTime(b.createdAt)
  ]);
  const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `stallo-bookings-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
function AdminBookings() {
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [vendorSearch, setVendorSearch] = reactExports.useState("");
  const [selectedBooking, setSelectedBooking] = reactExports.useState(null);
  const filter = statusFilter !== "all" ? { status: statusFilter } : {};
  const { data: bookings = [], isLoading } = useBookings(filter);
  const sorted = reactExports.useMemo(() => {
    const q = vendorSearch.toLowerCase();
    return [...bookings].filter(
      (b) => !q || b.vendorId.toLowerCase().includes(q) || b.id.toLowerCase().includes(q)
    ).sort((a, b) => Number(b.createdAt - a.createdAt));
  }, [bookings, vendorSearch]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DashboardLayout,
    {
      title: "Booking Management",
      subtitle: "All platform bookings — filter, inspect and manage",
      actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "gap-1.5",
          onClick: () => exportToCSV(sorted),
          "data-ocid": "admin.bookings.export.button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-3.5" }),
            " Export CSV"
          ]
        }
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "w-44",
                  "data-ocid": "admin.bookings.status_filter.select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUS_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: o.value, children: o.label }, o.value)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Search booking ID or vendor…",
                  value: vendorSearch,
                  onChange: (e) => setVendorSearch(e.target.value),
                  "data-ocid": "admin.bookings.search.input"
                }
              ),
              vendorSearch && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setVendorSearch(""),
                  className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                  "aria-label": "Clear search",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "shrink-0 text-xs", children: [
              sorted.length,
              " results"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border bg-card overflow-hidden glass-card", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, i)) }) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "py-12 text-center text-sm text-muted-foreground",
              "data-ocid": "admin.bookings.empty_state",
              children: "No bookings match your filters."
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-bold text-primary/60 uppercase tracking-widest text-[11px]", children: "ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground hidden sm:table-cell", children: "Vendor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground hidden md:table-cell", children: "Event Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground hidden md:table-cell", children: "Venue" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-xs font-semibold text-muted-foreground hidden lg:table-cell", children: "Guests" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-xs font-bold text-primary/60 uppercase tracking-widest text-[11px]", children: "Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-bold text-primary/60 uppercase tracking-widest text-[11px]", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground hidden lg:table-cell", children: "Payment" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-bold text-primary/60 uppercase tracking-widest text-[11px]", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: sorted.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "hover:bg-muted/30 transition-colors odd:bg-muted/5",
                "data-ocid": `admin.bookings.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: [
                    b.id.slice(0, 8),
                    "…"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-medium text-xs hidden sm:table-cell", children: [
                    b.vendorId.slice(0, 8),
                    "…"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden md:table-cell", children: formatDate(b.eventDate) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground truncate max-w-[100px] hidden md:table-cell", children: b.eventVenue }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-muted-foreground hidden lg:table-cell", children: Number(b.guestCount) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-semibold text-primary", children: formatPrice(b.totalPrice) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: b.bookingStatus }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: b.paymentStatus, paymentMode: true }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      className: "size-7",
                      onClick: () => setSelectedBooking(b),
                      "aria-label": "View booking",
                      "data-ocid": `admin.bookings.view.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-3.5" })
                    }
                  ) })
                ]
              },
              b.id
            )) })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BookingDetailModal,
          {
            booking: selectedBooking,
            open: !!selectedBooking,
            onClose: () => setSelectedBooking(null)
          }
        )
      ]
    }
  );
}
export {
  AdminBookings as default
};

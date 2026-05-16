import { r as reactExports, t as timestampToDate, j as jsxRuntimeExports, S as Skeleton, d as cn, g as dateToTimestamp, h as ue, f as formatDate } from "./index-DIzWvAoP.js";
import { D as DashboardLayout } from "./DashboardLayout-bdWF5nU2.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-6qk2QkpM.js";
import { c as createLucideIcon, u as useAuth, d as BookingStatus, B as Button } from "./useAuth-Bhs8pioH.js";
import { C as Card, a as CardContent } from "./card-BK5KlsOo.js";
import { u as useVendors, p as useUnavailableDates, g as useBookings, q as useMarkUnavailableDate } from "./useBackend-CUhkj_B6.js";
import { C as ChevronRight } from "./chevron-right-x2KILwBZ.js";
import { C as CircleAlert } from "./circle-alert-B66ftpNK.js";
import "./sheet-BeMLdLfo.js";
import "./index-BWMPnhEC.js";
import "./index-IXOTxK3N.js";
import "./users-pxzxJLV8.js";
import "./calendar-DPjbiL9q.js";
import "./trending-up-BEWPTL-N.js";
import "./heart-7w2sMjVh.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode);
const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function VendorCalendarPage() {
  const { principal } = useAuth();
  const { data: vendors = [], isLoading: vendorsLoading } = useVendors({});
  const myVendor = vendors.find(
    (v) => v.ownerId.toString() === (principal == null ? void 0 : principal.toString())
  );
  const { data: unavailableTimestamps = [], isLoading: datesLoading } = useUnavailableDates(myVendor == null ? void 0 : myVendor.id);
  const { data: bookings = [], isLoading: bookingsLoading } = useBookings(
    myVendor ? { vendorId: myVendor.id } : {}
  );
  const markUnavailable = useMarkUnavailableDate();
  const today = /* @__PURE__ */ new Date();
  const [viewYear, setViewYear] = reactExports.useState(today.getFullYear());
  const [viewMonth, setViewMonth] = reactExports.useState(today.getMonth());
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [selectedDate, setSelectedDate] = reactExports.useState(null);
  const [selectedIsBlocked, setSelectedIsBlocked] = reactExports.useState(false);
  const unavailableDates = reactExports.useMemo(
    () => unavailableTimestamps.map((ts) => timestampToDate(ts)),
    [unavailableTimestamps]
  );
  const bookingDateMap = reactExports.useMemo(() => {
    const map = {};
    for (const b of bookings.filter(
      (b2) => b2.bookingStatus !== BookingStatus.cancelled
    )) {
      const d = timestampToDate(b.eventDate);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      map[key] = (map[key] ?? 0) + 1;
    }
    return map;
  }, [bookings]);
  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };
  const calendarDays = reactExports.useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells = [
      ...Array(firstDay).fill(null),
      ...Array.from(
        { length: daysInMonth },
        (_, i) => new Date(viewYear, viewMonth, i + 1)
      )
    ];
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [viewYear, viewMonth]);
  const handleDayClick = (date) => {
    const isBlocked = unavailableDates.some((d) => isSameDay(d, date));
    setSelectedDate(date);
    setSelectedIsBlocked(isBlocked);
    setDialogOpen(true);
  };
  const handleConfirm = async () => {
    if (!selectedDate || !myVendor) return;
    try {
      if (!selectedIsBlocked) {
        await markUnavailable.mutateAsync({
          vendorId: myVendor.id,
          date: dateToTimestamp(selectedDate)
        });
        ue.success(
          `${formatDate(dateToTimestamp(selectedDate))} marked as unavailable.`
        );
      } else {
        ue.info(
          "To unblock a date, please contact support or resubmit your availability."
        );
      }
    } catch {
      ue.error("Failed to update availability.");
    } finally {
      setDialogOpen(false);
      setSelectedDate(null);
    }
  };
  const isLoading = vendorsLoading || datesLoading || bookingsLoading;
  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString(
    "en-IN",
    {
      month: "long",
      year: "numeric"
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DashboardLayout,
    {
      title: "Availability Calendar",
      subtitle: "Block dates to prevent new bookings",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-3 rounded-sm bg-destructive/20 border border-destructive/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Blocked" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-3 rounded-sm bg-blue-100 border border-blue-300" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Has bookings" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-3 rounded-sm bg-primary/15 border border-primary/30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Today" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 sm:p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "icon",
                  className: "size-8",
                  onClick: prevMonth,
                  "data-ocid": "calendar.prev_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-base", children: monthLabel }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "icon",
                  className: "size-8",
                  onClick: nextMonth,
                  "data-ocid": "calendar.next_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 mb-1", children: DAY_HEADERS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-center text-[11px] font-semibold text-muted-foreground py-1.5",
                children: d
              },
              d
            )) }),
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1", children: Array.from({ length: 35 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Skeleton,
              {
                className: "h-10 rounded-lg"
              },
              `cal-skel-pos-${i + 1}`
            )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1", children: calendarDays.map((date, gridPos) => {
              if (!date) {
                const padKey = `pad-col-pos-${gridPos + 1}`;
                return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10" }, padKey);
              }
              const isToday = isSameDay(date, today);
              const isBlocked = unavailableDates.some(
                (d) => isSameDay(d, date)
              );
              const bookingKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
              const bookingCount = bookingDateMap[bookingKey] ?? 0;
              const isPast = date < new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate()
              );
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  disabled: isPast,
                  onClick: () => !isPast && handleDayClick(date),
                  "data-ocid": `calendar.day.${date.getDate()}`,
                  className: cn(
                    "h-10 rounded-lg text-sm font-medium flex flex-col items-center justify-center gap-0.5 transition-colors",
                    isPast ? "text-muted-foreground/40 cursor-not-allowed" : "cursor-pointer hover:bg-muted",
                    isBlocked && !isPast ? "bg-destructive/15 text-destructive border border-destructive/30 hover:bg-destructive/20" : "",
                    bookingCount > 0 && !isBlocked && !isPast ? "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/30" : "",
                    isToday && !isBlocked && bookingCount === 0 ? "bg-primary/10 text-primary border border-primary/30 font-bold" : ""
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: date.getDate() }),
                    isBlocked && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] leading-none opacity-80", children: "blocked" }),
                    bookingCount > 0 && !isBlocked && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[8px] leading-none opacity-80", children: [
                      bookingCount,
                      " bkg"
                    ] })
                  ]
                },
                date.toISOString()
              );
            }) })
          ] }) }),
          unavailableDates.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold mb-2", children: "Blocked Dates" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: unavailableDates.filter(
              (d) => d >= new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate()
              )
            ).slice(0, 12).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "inline-flex items-center rounded-full bg-destructive/10 border border-destructive/20 text-destructive px-2.5 py-0.5 text-xs font-medium",
                children: d.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short"
                })
              },
              d.toISOString()
            )) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "calendar.block.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "size-5 text-primary" }),
              selectedIsBlocked ? "Unblock this date?" : "Block this date?"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              selectedDate && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: selectedDate.toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
              }) }),
              selectedIsBlocked ? " is currently blocked. Unblocking allows customers to book on this date." : " will be blocked and customers will not be able to book this date."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "calendar.block.cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: handleConfirm,
                disabled: markUnavailable.isPending,
                "data-ocid": "calendar.block.confirm_button",
                className: selectedIsBlocked ? "" : "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                children: markUnavailable.isPending ? "Updating..." : selectedIsBlocked ? "Unblock Date" : "Block Date"
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
export {
  VendorCalendarPage as default
};

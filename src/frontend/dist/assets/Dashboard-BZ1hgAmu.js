import { j as jsxRuntimeExports, S as Skeleton, L as Link, f as formatDate, c as formatPrice } from "./index-DIzWvAoP.js";
import { S as StatusBadge } from "./StatusBadge-CyM3jQxo.js";
import { S as ShoppingBag, D as DashboardLayout } from "./DashboardLayout-bdWF5nU2.js";
import { B as Badge } from "./sheet-BeMLdLfo.js";
import { u as useAuth, d as BookingStatus, B as Button } from "./useAuth-Bhs8pioH.js";
import { C as Card, a as CardContent } from "./card-BK5KlsOo.js";
import { g as useBookings } from "./useBackend-CUhkj_B6.js";
import { C as CalendarDays } from "./calendar-days-B5Conj0D.js";
import { C as CircleCheck } from "./circle-check-DYr8r4nJ.js";
import { A as ArrowRight } from "./arrow-right-BOHxw3XF.js";
import { S as Sparkles } from "./sparkles-Bvor011p.js";
import "./index-BWMPnhEC.js";
import "./index-IXOTxK3N.js";
import "./users-pxzxJLV8.js";
import "./calendar-DPjbiL9q.js";
import "./trending-up-BEWPTL-N.js";
import "./heart-7w2sMjVh.js";
function CustomerDashboardPage() {
  const { principal } = useAuth();
  const { data: bookings = [], isLoading } = useBookings({});
  const upcoming = bookings.filter(
    (b) => b.bookingStatus !== BookingStatus.cancelled && b.bookingStatus !== BookingStatus.completed
  );
  const completed = bookings.filter(
    (b) => b.bookingStatus === BookingStatus.completed
  );
  const upcomingPreview = upcoming.slice(0, 3);
  const shortPrincipal = principal ? `${principal.toString().slice(0, 8)}...` : "Guest";
  const stats = [
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: ShoppingBag,
      color: "bg-primary/10 text-primary"
    },
    {
      label: "Upcoming Events",
      value: upcoming.length,
      icon: CalendarDays,
      color: "bg-accent text-accent-foreground"
    },
    {
      label: "Completed",
      value: completed.length,
      icon: CircleCheck,
      color: "bg-secondary/15 text-secondary"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DashboardLayout,
    {
      title: "My Dashboard",
      subtitle: "Overview of your bookings and activity",
      actions: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", "data-ocid": "dashboard.browse_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/browse",
          search: { category: void 0, search: void 0 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3.5 mr-1.5" }),
            "Browse Stalls"
          ]
        }
      ) }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-primary/20 bg-primary/5 px-5 py-4 mb-6 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "👋" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "Welcome back!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono truncate", children: shortPrincipal })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "ml-auto border-primary/30 text-primary text-xs shrink-0",
              children: "Customer"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8", children: stats.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "border-border/60",
            "data-ocid": `dashboard.stat.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `flex size-10 items-center justify-center rounded-lg ${stat.color}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: "size-5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-10" }) : stat.value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: stat.label })
              ] })
            ] })
          },
          stat.label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-xl", children: "Upcoming Bookings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              asChild: true,
              "data-ocid": "dashboard.view_all_bookings.button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard/bookings", children: [
                "View All ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-3.5 ml-1" })
              ] })
            }
          )
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, i)) }) : upcomingPreview.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl border border-border/60 bg-card p-10 text-center",
            "data-ocid": "dashboard.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-14 items-center justify-center rounded-full bg-muted mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "size-7 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-lg mb-1", children: "No upcoming bookings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "Browse verified food stalls and book for your next wedding event" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "dashboard.browse_cta.button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/browse",
                  search: { category: void 0, search: void 0 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4 mr-2" }),
                    "Browse Stalls"
                  ]
                }
              ) })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: upcomingPreview.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/dashboard/bookings/$bookingId",
            params: { bookingId: b.id },
            className: "flex items-center justify-between rounded-xl border border-border/60 bg-card p-4 hover:shadow-sm hover:border-primary/30 transition-smooth group",
            "data-ocid": `dashboard.booking.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-sm truncate", children: [
                  "Booking #",
                  b.id.slice(0, 8)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "size-3 inline mr-1" }),
                  formatDate(b.eventDate)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-primary", children: formatPrice(b.totalPrice) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: b.bookingStatus }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4 text-muted-foreground group-hover:text-foreground transition-colors" })
              ] })
            ]
          },
          b.id
        )) }),
        !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-xl border border-border/60 bg-muted/30 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-lg", children: "Discover more stalls" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Explore 50+ verified food counters for your wedding" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              className: "shrink-0",
              "data-ocid": "dashboard.discover_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/browse",
                  search: { category: void 0, search: void 0 },
                  children: "Browse Stalls"
                }
              )
            }
          )
        ] })
      ]
    }
  );
}
export {
  CustomerDashboardPage as default
};

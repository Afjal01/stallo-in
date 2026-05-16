import { u as useNavigate, j as jsxRuntimeExports, c as formatPrice, S as Skeleton, f as formatDate } from "./index-BKL2lxtv.js";
import { S as StatusBadge } from "./StatusBadge-BlMQRdya.js";
import { D as DashboardLayout, S as ShoppingBag } from "./DashboardLayout-BbZ-GuY6.js";
import { B as Badge } from "./sheet-DdO1tWzN.js";
import { B as Button } from "./useAuth-IAGlSf5h.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-BTgr7EEz.js";
import { r as useAnalyticsSummary, g as useBookings } from "./useBackend-B1f4NLLV.js";
import { T as TrendingUp } from "./trending-up-OZEtAFop.js";
import { U as Users } from "./users-CPmCI05L.js";
import { C as CircleAlert } from "./circle-alert-BTzInkaM.js";
import { A as ArrowRight } from "./arrow-right-5VUV0FB7.js";
import { R as ResponsiveContainer, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, B as Bar } from "./generateCategoricalChart-B9nQjxuo.js";
import { L as LineChart, a as Line } from "./LineChart-BHGCXfLZ.js";
import { B as BarChart } from "./BarChart-C_lahGzC.js";
import { R as RefreshCw } from "./refresh-cw-C3VaCpCb.js";
import "./index-BEBufsG6.js";
import "./index-IXOTxK3N.js";
import "./calendar-BcXsBU70.js";
import "./heart-BBjtls9Z.js";
function KpiCard({
  title,
  value,
  icon: Icon,
  loading,
  badge,
  colorClass = "text-primary"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "relative overflow-hidden",
      "data-ocid": `admin.kpi.${title.toLowerCase().replace(/\s+/g, "-")}.card`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: title }),
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-28 mt-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground", children: value }),
          badge && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-1", children: badge })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-lg p-2.5 bg-primary/10 ${colorClass}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5" }) })
      ] }) })
    }
  );
}
function buildTrendData(bookings) {
  const days = {};
  const now = Date.now();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now - i * 864e5);
    const key = d.toISOString().slice(0, 10);
    days[key] = { date: key.slice(5), bookings: 0, revenue: 0 };
  }
  for (const b of bookings) {
    const ms = Number(b.createdAt / BigInt(1e6));
    const key = new Date(ms).toISOString().slice(0, 10);
    if (days[key]) {
      days[key].bookings += 1;
      days[key].revenue += Number(b.totalPrice) / 100;
    }
  }
  return Object.values(days);
}
function AdminDashboard() {
  const navigate = useNavigate();
  const { data: summary, isLoading: sumLoading } = useAnalyticsSummary();
  const { data: bookings = [], isLoading: bookingsLoading } = useBookings();
  const recentBookings = [...bookings].sort((a, b) => Number(b.createdAt - a.createdAt)).slice(0, 5);
  const trendData = buildTrendData(bookings);
  const pendingCount = ((summary == null ? void 0 : summary.totalVendors) ?? BigInt(0)) - ((summary == null ? void 0 : summary.activeVendors) ?? BigInt(0));
  const pendingNum = Number(
    pendingCount < BigInt(0) ? BigInt(0) : pendingCount
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DashboardLayout,
    {
      title: "Admin Overview",
      subtitle: "Platform health and recent activity",
      actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "gap-1.5",
          onClick: () => window.location.reload(),
          "data-ocid": "admin.refresh.button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-3.5" }),
            "Refresh"
          ]
        }
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              title: "Total Bookings",
              value: sumLoading ? "—" : Number((summary == null ? void 0 : summary.totalBookings) ?? 0).toLocaleString("en-IN"),
              icon: ShoppingBag,
              loading: sumLoading
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              title: "Total Revenue",
              value: sumLoading ? "—" : formatPrice((summary == null ? void 0 : summary.totalRevenue) ?? BigInt(0)),
              icon: TrendingUp,
              loading: sumLoading
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              title: "Active Vendors",
              value: sumLoading ? "—" : Number((summary == null ? void 0 : summary.activeVendors) ?? 0).toString(),
              icon: Users,
              loading: sumLoading
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              title: "Pending Approvals",
              value: sumLoading ? "—" : pendingNum.toString(),
              icon: CircleAlert,
              loading: sumLoading,
              colorClass: pendingNum > 0 ? "text-destructive" : "text-primary",
              badge: pendingNum > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "destructive",
                  className: "text-[10px] px-1.5 py-0 h-4",
                  children: "Action Required"
                }
              ) : void 0
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => navigate({ to: "/admin/vendors" }),
              className: "gap-2",
              "data-ocid": "admin.quick_action.review_vendors.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-4" }),
                "Review Pending Vendors",
                pendingNum > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-1 bg-primary-foreground/20 text-primary-foreground text-[10px] px-1.5 h-4", children: pendingNum })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => navigate({ to: "/admin/bookings" }),
              className: "gap-2",
              "data-ocid": "admin.quick_action.view_bookings.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "size-4" }),
                "View All Bookings",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-3.5" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold", children: "Bookings — Last 30 Days" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: bookingsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              LineChart,
              {
                data: trendData,
                margin: { top: 4, right: 8, bottom: 4, left: -20 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CartesianGrid,
                    {
                      strokeDasharray: "3 3",
                      className: "stroke-border"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date", tick: { fontSize: 10 } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 10 } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Tooltip,
                    {
                      contentStyle: {
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8,
                        fontSize: 12
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Line,
                    {
                      type: "monotone",
                      dataKey: "bookings",
                      stroke: "hsl(var(--primary))",
                      strokeWidth: 2,
                      dot: false,
                      name: "Bookings"
                    }
                  )
                ]
              }
            ) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold", children: "Revenue Trend (₹)" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: bookingsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              BarChart,
              {
                data: trendData,
                margin: { top: 4, right: 8, bottom: 4, left: -20 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CartesianGrid,
                    {
                      strokeDasharray: "3 3",
                      className: "stroke-border"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date", tick: { fontSize: 10 } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 10 } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Tooltip,
                    {
                      contentStyle: {
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8,
                        fontSize: 12
                      },
                      formatter: (v) => [
                        `₹${v.toLocaleString()}`,
                        "Revenue"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Bar,
                    {
                      dataKey: "revenue",
                      fill: "hsl(var(--primary))",
                      radius: [4, 4, 0, 0],
                      name: "Revenue"
                    }
                  )
                ]
              }
            ) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3 flex flex-row items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold", children: "Recent Bookings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "text-xs gap-1",
                onClick: () => navigate({ to: "/admin/bookings" }),
                "data-ocid": "admin.recent_bookings.view_all.button",
                children: [
                  "View all ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-3" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: bookingsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, i)) }) : recentBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "p-6 text-center text-sm text-muted-foreground",
              "data-ocid": "admin.recent_bookings.empty_state",
              children: "No bookings yet."
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground", children: "Booking ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground", children: "Vendor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground hidden md:table-cell", children: "Event Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground", children: "Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground", children: "Status" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: recentBookings.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "hover:bg-muted/30 odd:bg-muted/5 transition-colors",
                "data-ocid": `admin.recent_bookings.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: [
                    b.id.slice(0, 8),
                    "…"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-medium truncate max-w-[120px]", children: [
                    b.vendorId.slice(0, 8),
                    "…"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden md:table-cell", children: formatDate(b.eventDate) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-medium text-emerald-400", children: formatPrice(b.totalPrice) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: b.bookingStatus }) })
                ]
              },
              b.id
            )) })
          ] }) }) })
        ] })
      ] })
    }
  );
}
export {
  AdminDashboard as default
};

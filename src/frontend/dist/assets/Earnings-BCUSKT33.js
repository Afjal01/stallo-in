import { r as reactExports, j as jsxRuntimeExports, c as formatPrice, S as Skeleton, f as formatDate, t as timestampToDate } from "./index-DIzWvAoP.js";
import { D as DashboardLayout } from "./DashboardLayout-bdWF5nU2.js";
import { C as Card, b as CardHeader, a as CardContent } from "./card-BK5KlsOo.js";
import { c as createLucideIcon, u as useAuth, d as BookingStatus } from "./useAuth-Bhs8pioH.js";
import { u as useVendors, g as useBookings } from "./useBackend-CUhkj_B6.js";
import { T as TrendingUp } from "./trending-up-BEWPTL-N.js";
import { I as IndianRupee } from "./indian-rupee-CddmOCNr.js";
import { C as CircleCheck } from "./circle-check-DYr8r4nJ.js";
import { R as ResponsiveContainer, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, B as Bar } from "./generateCategoricalChart-ATKgeE5R.js";
import { B as BarChart } from "./BarChart-DnHb6CNb.js";
import "./sheet-BeMLdLfo.js";
import "./index-BWMPnhEC.js";
import "./index-IXOTxK3N.js";
import "./users-pxzxJLV8.js";
import "./calendar-DPjbiL9q.js";
import "./heart-7w2sMjVh.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "19", x2: "5", y1: "5", y2: "19", key: "1x9vlm" }],
  ["circle", { cx: "6.5", cy: "6.5", r: "2.5", key: "4mh3h7" }],
  ["circle", { cx: "17.5", cy: "17.5", r: "2.5", key: "1mdrzq" }]
];
const Percent = createLucideIcon("percent", __iconNode);
const COMMISSION_RATE = 0.1;
function KpiCard({
  icon: Icon,
  label,
  value,
  subValue,
  ocid,
  isLoading,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border/60", "data-ocid": ocid, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `flex size-11 items-center justify-center rounded-xl ${accent ? "bg-primary/10" : "bg-secondary/10"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Icon,
          {
            className: `size-5 ${accent ? "text-primary" : "text-secondary"}`
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-24 mb-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold leading-tight", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
      subValue && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: subValue })
    ] })
  ] }) });
}
function getMonthKey(ts) {
  const d = timestampToDate(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
function getMonthLabel(key) {
  const [year, month] = key.split("-");
  return new Date(
    Number.parseInt(year),
    Number.parseInt(month) - 1,
    1
  ).toLocaleDateString("en-IN", {
    month: "short",
    year: "2-digit"
  });
}
function VendorEarningsPage() {
  const { principal } = useAuth();
  const { data: vendors = [] } = useVendors({});
  const myVendor = vendors.find(
    (v) => v.ownerId.toString() === (principal == null ? void 0 : principal.toString())
  );
  const { data: bookings = [], isLoading } = useBookings(
    myVendor ? { vendorId: myVendor.id } : {}
  );
  const completed = reactExports.useMemo(
    () => bookings.filter((b) => b.bookingStatus === BookingStatus.completed),
    [bookings]
  );
  const totalEarnings = reactExports.useMemo(
    () => completed.reduce((sum, b) => sum + Number(b.totalPrice), 0),
    [completed]
  );
  const commissionTotal = Math.round(totalEarnings * COMMISSION_RATE);
  const netEarnings = totalEarnings - commissionTotal;
  const thisMonthEarnings = reactExports.useMemo(() => {
    const currentNow = /* @__PURE__ */ new Date();
    const key = `${currentNow.getFullYear()}-${String(currentNow.getMonth() + 1).padStart(2, "0")}`;
    return completed.filter((b) => getMonthKey(b.eventDate) === key).reduce((sum, b) => sum + Number(b.totalPrice), 0);
  }, [completed]);
  const chartData = reactExports.useMemo(() => {
    const currentNow = /* @__PURE__ */ new Date();
    const months = {};
    for (let i = 5; i >= 0; i--) {
      const d = new Date(
        currentNow.getFullYear(),
        currentNow.getMonth() - i,
        1
      );
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      months[key] = { month: getMonthLabel(key), earnings: 0, count: 0 };
    }
    for (const b of completed) {
      const key = getMonthKey(b.eventDate);
      if (months[key]) {
        months[key].earnings += Number(b.totalPrice) / 100;
        months[key].count += 1;
      }
    }
    return Object.values(months);
  }, [completed]);
  const CustomTooltip = ({
    active,
    payload,
    label
  }) => {
    if (active && payload && payload.length) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-3 shadow-sm text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mb-1", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-primary font-display font-bold", children: [
          "₹",
          payload[0].value.toLocaleString("en-IN")
        ] })
      ] });
    }
    return null;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DashboardLayout,
    {
      title: "Earnings",
      subtitle: "Your revenue summary and booking history",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              icon: TrendingUp,
              label: "Total Earnings",
              value: isLoading ? "—" : formatPrice(totalEarnings),
              ocid: "earnings.total.card",
              isLoading,
              accent: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              icon: IndianRupee,
              label: "This Month",
              value: isLoading ? "—" : formatPrice(thisMonthEarnings),
              ocid: "earnings.month.card",
              isLoading
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              icon: CircleCheck,
              label: "Completed Bookings",
              value: isLoading ? "—" : completed.length.toString(),
              ocid: "earnings.completed.card",
              isLoading
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              icon: Percent,
              label: "Net Earnings (after 10% fee)",
              value: isLoading ? "—" : formatPrice(netEarnings),
              ocid: "earnings.net.card",
              isLoading
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border/60 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-base", children: "Monthly Earnings (last 6 months)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Gross earnings per month in ₹" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 rounded-lg" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 210, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            BarChart,
            {
              data: chartData,
              margin: { top: 4, right: 8, left: 0, bottom: 0 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CartesianGrid,
                  {
                    strokeDasharray: "3 3",
                    stroke: "hsl(var(--border))",
                    vertical: false
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  XAxis,
                  {
                    dataKey: "month",
                    tick: { fontSize: 11, fill: "hsl(var(--muted-foreground))" },
                    axisLine: false,
                    tickLine: false
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  YAxis,
                  {
                    tick: { fontSize: 11, fill: "hsl(var(--muted-foreground))" },
                    axisLine: false,
                    tickLine: false,
                    tickFormatter: (v) => `₹${(v / 1e3).toFixed(0)}k`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Tooltip,
                  {
                    content: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTooltip, {}),
                    cursor: { fill: "hsl(var(--muted)/0.4)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Bar,
                  {
                    dataKey: "earnings",
                    fill: "hsl(var(--primary))",
                    radius: [4, 4, 0, 0],
                    maxBarSize: 48
                  }
                )
              ]
            }
          ) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-base", children: "Completed Bookings" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12" }, i)) }) : completed.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-10 text-center", "data-ocid": "earnings.empty_state", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-8 text-muted-foreground mx-auto mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No completed bookings yet" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto -mx-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Event Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Guests" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Commission (10%)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Net Earnings" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/40", children: completed.map((b, i) => {
              const total = Number(b.totalPrice);
              const commission = Math.round(total * COMMISSION_RATE);
              const net = total - commission;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  "data-ocid": `earnings.row.${i + 1}`,
                  className: "hover:bg-muted/30 transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3 font-medium", children: formatDate(b.eventDate) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right tabular-nums", children: Number(b.guestCount) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-medium tabular-nums", children: formatPrice(total) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-muted-foreground tabular-nums", children: formatPrice(commission) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3 text-right font-display font-semibold text-primary tabular-nums", children: formatPrice(net) })
                  ]
                },
                b.id
              );
            }) })
          ] }) }) })
        ] })
      ]
    }
  );
}
export {
  VendorEarningsPage as default
};

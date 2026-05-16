import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAnalyticsSummary,
  useBookingsByDateRange,
  useRevenueByDateRange,
  useVendors,
} from "@/hooks/useBackend";
import { dateToTimestamp, formatDate, formatPrice } from "@/lib/utils";
import { VendorStatus } from "@/types";
import { ShoppingBag, TrendingUp, Users, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Range = "7d" | "30d" | "90d";
const RANGE_LABELS: Record<Range, string> = {
  "7d": "7 Days",
  "30d": "30 Days",
  "90d": "90 Days",
};
const RANGE_DAYS: Record<Range, number> = { "7d": 7, "30d": 30, "90d": 90 };
const PIE_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

function KpiCard({
  title,
  value,
  icon: Icon,
  loading,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  loading: boolean;
}) {
  return (
    <Card className="glass-card">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {title}
            </p>
            {loading ? (
              <Skeleton className="h-7 w-24 mt-1" />
            ) : (
              <p className="text-2xl font-display font-bold text-primary">
                {value}
              </p>
            )}
          </div>
          <div className="rounded-lg p-2.5 bg-primary/10 text-primary">
            <Icon className="size-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminAnalytics() {
  const [range, setRange] = useState<Range>("30d");
  const days = RANGE_DAYS[range];
  const from = useMemo(
    () => dateToTimestamp(new Date(Date.now() - days * 86400000)),
    [days],
  );
  const to = useMemo(() => dateToTimestamp(new Date()), []);

  const { data: summary, isLoading: sumLoading } = useAnalyticsSummary();
  const { data: bookingsByDate = [], isLoading: bookingsLoading } =
    useBookingsByDateRange(from, to);
  const { data: revenueByDate = [], isLoading: revenueLoading } =
    useRevenueByDateRange(from, to);
  const { data: vendors = [] } = useVendors({ status: VendorStatus.approved });

  const bookingChartData = [...bookingsByDate]
    .map((d) => ({
      date: formatDate(d.date, { month: "short", day: "numeric" }),
      bookings: Number(d.count),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const revenueChartData = [...revenueByDate]
    .map((d) => ({
      date: formatDate(d.date, { month: "short", day: "numeric" }),
      revenue: Number(d.revenue) / 100,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const categoryMap: Record<string, number> = {};
  for (const v of vendors)
    categoryMap[v.category] = (categoryMap[v.category] ?? 0) + 1;
  const categoryData = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  const topVendors = [...vendors]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <DashboardLayout
      title="Analytics"
      subtitle="Platform performance and growth metrics"
      actions={
        <div
          className="flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-1"
          data-ocid="admin.analytics.range_selector"
        >
          {(Object.keys(RANGE_LABELS) as Range[]).map((r) => (
            <Button
              key={r}
              variant={range === r ? "default" : "ghost"}
              size="sm"
              className="h-7 text-xs px-3"
              onClick={() => setRange(r)}
              data-ocid={`admin.analytics.range.${r}.button`}
            >
              {RANGE_LABELS[r]}
            </Button>
          ))}
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Total Bookings"
            value={
              sumLoading
                ? "—"
                : Number(summary?.totalBookings ?? 0).toLocaleString("en-IN")
            }
            icon={ShoppingBag}
            loading={sumLoading}
          />
          <KpiCard
            title="Total Revenue"
            value={
              sumLoading ? "—" : formatPrice(summary?.totalRevenue ?? BigInt(0))
            }
            icon={TrendingUp}
            loading={sumLoading}
          />
          <KpiCard
            title="Active Vendors"
            value={
              sumLoading ? "—" : Number(summary?.activeVendors ?? 0).toString()
            }
            icon={Users}
            loading={sumLoading}
          />
          <KpiCard
            title="Cancellations"
            value={
              sumLoading
                ? "—"
                : Number(summary?.cancelledBookings ?? 0).toString()
            }
            icon={XCircle}
            loading={sumLoading}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold font-display">
                Bookings Over Time
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {bookingsLoading ? (
                <Skeleton className="h-48 w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart
                    data={bookingChartData}
                    margin={{ top: 4, right: 8, bottom: 4, left: -20 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-border"
                    />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="bookings"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      dot={false}
                      name="Bookings"
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold font-display">
                Revenue Over Time (₹)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {revenueLoading ? (
                <Skeleton className="h-48 w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart
                    data={revenueChartData}
                    margin={{ top: 4, right: 8, bottom: 4, left: -20 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-border"
                    />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                      formatter={(v: number) => [
                        `₹${v.toLocaleString()}`,
                        "Revenue",
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      dot={false}
                      name="Revenue"
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold font-display">
                Vendors by Category
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {categoryData.length === 0 ? (
                <div className="h-48 flex items-center justify-center text-sm text-muted-foreground">
                  No data yet.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      label={({
                        name,
                        percent,
                      }: { name: string; percent: number }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      labelLine={false}
                    >
                      {categoryData.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={
                            PIE_COLORS[
                              categoryData.indexOf(entry) % PIE_COLORS.length
                            ]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold font-display">
                Top Vendors by Rating
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {topVendors.length === 0 ? (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  No vendor data yet.
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      <th className="px-4 py-2.5 text-left text-xs font-bold text-primary/60 uppercase tracking-widest text-[11px]">
                        Vendor
                      </th>
                      <th className="px-4 py-2.5 text-left text-xs font-bold text-primary/60 uppercase tracking-widest text-[11px] hidden sm:table-cell">
                        Category
                      </th>
                      <th className="px-4 py-2.5 text-right text-xs font-bold text-primary/60 uppercase tracking-widest text-[11px]">
                        Rating
                      </th>
                      <th className="px-4 py-2.5 text-right text-xs font-bold text-primary/60 uppercase tracking-widest text-[11px] hidden md:table-cell">
                        Reviews
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {topVendors.map((v, i) => (
                      <tr
                        key={v.id}
                        className="hover:bg-muted/30 transition-colors odd:bg-muted/5"
                        data-ocid={`admin.analytics.top_vendor.item.${i + 1}`}
                      >
                        <td className="px-4 py-3">
                          <p className="font-medium">{v.businessName}</p>
                          <p className="text-xs text-muted-foreground">
                            {v.serviceArea}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                          {v.category}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-amber-600">
                          {v.rating.toFixed(1)} ★
                        </td>
                        <td className="px-4 py-3 text-right text-muted-foreground hidden md:table-cell">
                          {Number(v.reviewCount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

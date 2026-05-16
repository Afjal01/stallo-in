import { StatusBadge } from "@/components/common/StatusBadge";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnalyticsSummary, useBookings } from "@/hooks/useBackend";
import { dateToTimestamp, formatDate, formatPrice } from "@/lib/utils";
import type { Booking } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  RefreshCw,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function KpiCard({
  title,
  value,
  icon: Icon,
  loading,
  badge,
  colorClass = "text-primary",
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  loading: boolean;
  badge?: React.ReactNode;
  colorClass?: string;
}) {
  return (
    <Card
      className="relative overflow-hidden"
      data-ocid={`admin.kpi.${title.toLowerCase().replace(/\s+/g, "-")}.card`}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {title}
            </p>
            {loading ? (
              <Skeleton className="h-8 w-28 mt-1" />
            ) : (
              <p className="text-2xl font-display font-bold text-foreground">
                {value}
              </p>
            )}
            {badge && <div className="pt-1">{badge}</div>}
          </div>
          <div className={`rounded-lg p-2.5 bg-primary/10 ${colorClass}`}>
            <Icon className="size-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function buildTrendData(bookings: Booking[]) {
  const days: Record<
    string,
    { date: string; bookings: number; revenue: number }
  > = {};
  const now = Date.now();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now - i * 86400000);
    const key = d.toISOString().slice(0, 10);
    days[key] = { date: key.slice(5), bookings: 0, revenue: 0 };
  }
  for (const b of bookings) {
    const ms = Number(b.createdAt / BigInt(1_000_000));
    const key = new Date(ms).toISOString().slice(0, 10);
    if (days[key]) {
      days[key].bookings += 1;
      days[key].revenue += Number(b.totalPrice) / 100;
    }
  }
  return Object.values(days);
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { data: summary, isLoading: sumLoading } = useAnalyticsSummary();
  const { data: bookings = [], isLoading: bookingsLoading } = useBookings();

  const recentBookings = [...bookings]
    .sort((a, b) => Number(b.createdAt - a.createdAt))
    .slice(0, 5);

  const trendData = buildTrendData(bookings);

  const pendingCount =
    (summary?.totalVendors ?? BigInt(0)) -
    (summary?.activeVendors ?? BigInt(0));
  const pendingNum = Number(
    pendingCount < BigInt(0) ? BigInt(0) : pendingCount,
  );

  return (
    <DashboardLayout
      title="Admin Overview"
      subtitle="Platform health and recent activity"
      actions={
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => window.location.reload()}
          data-ocid="admin.refresh.button"
        >
          <RefreshCw className="size-3.5" />
          Refresh
        </Button>
      }
    >
      <div className="space-y-6">
        {/* KPI Cards */}
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
            title="Pending Approvals"
            value={sumLoading ? "—" : pendingNum.toString()}
            icon={AlertCircle}
            loading={sumLoading}
            colorClass={pendingNum > 0 ? "text-destructive" : "text-primary"}
            badge={
              pendingNum > 0 ? (
                <Badge
                  variant="destructive"
                  className="text-[10px] px-1.5 py-0 h-4"
                >
                  Action Required
                </Badge>
              ) : undefined
            }
          />
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => navigate({ to: "/admin/vendors" })}
            className="gap-2"
            data-ocid="admin.quick_action.review_vendors.button"
          >
            <Users className="size-4" />
            Review Pending Vendors
            {pendingNum > 0 && (
              <Badge className="ml-1 bg-primary-foreground/20 text-primary-foreground text-[10px] px-1.5 h-4">
                {pendingNum}
              </Badge>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/admin/bookings" })}
            className="gap-2"
            data-ocid="admin.quick_action.view_bookings.button"
          >
            <ShoppingBag className="size-4" />
            View All Bookings
            <ArrowRight className="size-3.5" />
          </Button>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">
                Bookings — Last 30 Days
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {bookingsLoading ? (
                <Skeleton className="h-48 w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart
                    data={trendData}
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
                      stroke="hsl(var(--primary))"
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
              <CardTitle className="text-sm font-semibold">
                Revenue Trend (₹)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {bookingsLoading ? (
                <Skeleton className="h-48 w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={trendData}
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
                    <Bar
                      dataKey="revenue"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                      name="Revenue"
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Bookings */}
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold">
              Recent Bookings
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs gap-1"
              onClick={() => navigate({ to: "/admin/bookings" })}
              data-ocid="admin.recent_bookings.view_all.button"
            >
              View all <ArrowRight className="size-3" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {bookingsLoading ? (
              <div className="p-4 space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : recentBookings.length === 0 ? (
              <div
                className="p-6 text-center text-sm text-muted-foreground"
                data-ocid="admin.recent_bookings.empty_state"
              >
                No bookings yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">
                        Booking ID
                      </th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">
                        Vendor
                      </th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground hidden md:table-cell">
                        Event Date
                      </th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground">
                        Amount
                      </th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {recentBookings.map((b, i) => (
                      <tr
                        key={b.id}
                        className="hover:bg-muted/30 odd:bg-muted/5 transition-colors"
                        data-ocid={`admin.recent_bookings.item.${i + 1}`}
                      >
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                          {b.id.slice(0, 8)}…
                        </td>
                        <td className="px-4 py-3 font-medium truncate max-w-[120px]">
                          {b.vendorId.slice(0, 8)}…
                        </td>
                        <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                          {formatDate(b.eventDate)}
                        </td>
                        <td className="px-4 py-3 text-right font-medium text-emerald-400">
                          {formatPrice(b.totalPrice)}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={b.bookingStatus} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

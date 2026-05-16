import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useBookings, useVendors } from "@/hooks/useBackend";
import { formatDate, formatPrice, timestampToDate } from "@/lib/utils";
import { BookingStatus } from "@/types";
import { CheckCircle2, IndianRupee, Percent, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COMMISSION_RATE = 0.1;

function KpiCard({
  icon: Icon,
  label,
  value,
  subValue,
  ocid,
  isLoading,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  subValue?: string;
  ocid: string;
  isLoading?: boolean;
  accent?: boolean;
}) {
  return (
    <Card className="border-border/60" data-ocid={ocid}>
      <CardContent className="p-5 flex items-center gap-4">
        <div
          className={`flex size-11 items-center justify-center rounded-xl ${accent ? "bg-primary/10" : "bg-secondary/10"}`}
        >
          <Icon
            className={`size-5 ${accent ? "text-primary" : "text-secondary"}`}
          />
        </div>
        <div className="min-w-0">
          {isLoading ? (
            <Skeleton className="h-7 w-24 mb-1" />
          ) : (
            <p className="text-2xl font-display font-bold leading-tight">
              {value}
            </p>
          )}
          <p className="text-xs text-muted-foreground">{label}</p>
          {subValue && !isLoading && (
            <p className="text-xs text-muted-foreground mt-0.5">{subValue}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function getMonthKey(ts: bigint): string {
  const d = timestampToDate(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function getMonthLabel(key: string): string {
  const [year, month] = key.split("-");
  return new Date(
    Number.parseInt(year),
    Number.parseInt(month) - 1,
    1,
  ).toLocaleDateString("en-IN", {
    month: "short",
    year: "2-digit",
  });
}

export default function VendorEarningsPage() {
  const { principal } = useAuth();
  const { data: vendors = [] } = useVendors({});
  const myVendor = vendors.find(
    (v) => v.ownerId.toString() === principal?.toString(),
  );

  const { data: bookings = [], isLoading } = useBookings(
    myVendor ? { vendorId: myVendor.id } : {},
  );

  const completed = useMemo(
    () => bookings.filter((b) => b.bookingStatus === BookingStatus.completed),
    [bookings],
  );

  const totalEarnings = useMemo(
    () => completed.reduce((sum, b) => sum + Number(b.totalPrice), 0),
    [completed],
  );

  const commissionTotal = Math.round(totalEarnings * COMMISSION_RATE);
  const netEarnings = totalEarnings - commissionTotal;

  // This month
  const thisMonthEarnings = useMemo(() => {
    const currentNow = new Date();
    const key = `${currentNow.getFullYear()}-${String(currentNow.getMonth() + 1).padStart(2, "0")}`;
    return completed
      .filter((b) => getMonthKey(b.eventDate) === key)
      .reduce((sum, b) => sum + Number(b.totalPrice), 0);
  }, [completed]);

  // Monthly chart data — last 6 months
  const chartData = useMemo(() => {
    const currentNow = new Date();
    const months: Record<
      string,
      { month: string; earnings: number; count: number }
    > = {};
    for (let i = 5; i >= 0; i--) {
      const d = new Date(
        currentNow.getFullYear(),
        currentNow.getMonth() - i,
        1,
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
    label,
  }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-border bg-card p-3 shadow-sm text-sm">
          <p className="font-semibold mb-1">{label}</p>
          <p className="text-primary font-display font-bold">
            ₹{payload[0].value.toLocaleString("en-IN")}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout
      title="Earnings"
      subtitle="Your revenue summary and booking history"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard
          icon={TrendingUp}
          label="Total Earnings"
          value={isLoading ? "—" : formatPrice(totalEarnings)}
          ocid="earnings.total.card"
          isLoading={isLoading}
          accent
        />
        <KpiCard
          icon={IndianRupee}
          label="This Month"
          value={isLoading ? "—" : formatPrice(thisMonthEarnings)}
          ocid="earnings.month.card"
          isLoading={isLoading}
        />
        <KpiCard
          icon={CheckCircle2}
          label="Completed Bookings"
          value={isLoading ? "—" : completed.length.toString()}
          ocid="earnings.completed.card"
          isLoading={isLoading}
        />
        <KpiCard
          icon={Percent}
          label="Net Earnings (after 10% fee)"
          value={isLoading ? "—" : formatPrice(netEarnings)}
          ocid="earnings.net.card"
          isLoading={isLoading}
        />
      </div>

      {/* Bar chart */}
      <Card className="border-border/60 mb-6">
        <CardHeader className="pb-2">
          <p className="font-display font-semibold text-base">
            Monthly Earnings (last 6 months)
          </p>
          <p className="text-xs text-muted-foreground">
            Gross earnings per month in ₹
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          {isLoading ? (
            <Skeleton className="h-52 rounded-lg" />
          ) : (
            <ResponsiveContainer width="100%" height={210}>
              <BarChart
                data={chartData}
                margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "hsl(var(--muted)/0.4)" }}
                />
                <Bar
                  dataKey="earnings"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={48}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Completed bookings table */}
      <Card className="border-border/60">
        <CardHeader className="pb-2">
          <p className="font-display font-semibold text-base">
            Completed Bookings
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12" />
              ))}
            </div>
          ) : completed.length === 0 ? (
            <div className="py-10 text-center" data-ocid="earnings.empty_state">
              <CheckCircle2 className="size-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                No completed bookings yet
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60">
                    <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[11px] text-primary/60">
                      Event Date
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[11px] text-primary/60">
                      Guests
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[11px] text-primary/60">
                      Total
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[11px] text-primary/60">
                      Commission (10%)
                    </th>
                    <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[11px] text-primary/60">
                      Net Earnings
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {completed.map((b, i) => {
                    const total = Number(b.totalPrice);
                    const commission = Math.round(total * COMMISSION_RATE);
                    const net = total - commission;
                    return (
                      <tr
                        key={b.id}
                        data-ocid={`earnings.row.${i + 1}`}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-6 py-3 font-medium">
                          {formatDate(b.eventDate)}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums">
                          {Number(b.guestCount)}
                        </td>
                        <td className="px-4 py-3 text-right font-medium tabular-nums">
                          {formatPrice(total)}
                        </td>
                        <td className="px-4 py-3 text-right text-muted-foreground tabular-nums">
                          {formatPrice(commission)}
                        </td>
                        <td className="px-6 py-3 text-right font-display font-semibold text-primary tabular-nums">
                          {formatPrice(net)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

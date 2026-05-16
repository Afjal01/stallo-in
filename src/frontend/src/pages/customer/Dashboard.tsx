import { StatusBadge } from "@/components/common/StatusBadge";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useBookings } from "@/hooks/useBackend";
import { formatDate, formatPrice } from "@/lib/utils";
import { BookingStatus } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

export default function CustomerDashboardPage() {
  const { principal } = useAuth();
  const { data: bookings = [], isLoading } = useBookings({});

  const upcoming = bookings.filter(
    (b) =>
      b.bookingStatus !== BookingStatus.cancelled &&
      b.bookingStatus !== BookingStatus.completed,
  );
  const completed = bookings.filter(
    (b) => b.bookingStatus === BookingStatus.completed,
  );
  const upcomingPreview = upcoming.slice(0, 3);

  const shortPrincipal = principal
    ? `${principal.toString().slice(0, 8)}...`
    : "Guest";

  const stats = [
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: ShoppingBag,
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Upcoming Events",
      value: upcoming.length,
      icon: CalendarDays,
      color: "bg-accent text-accent-foreground",
    },
    {
      label: "Completed",
      value: completed.length,
      icon: CheckCircle2,
      color: "bg-secondary/15 text-secondary",
    },
  ];

  return (
    <DashboardLayout
      title="My Dashboard"
      subtitle="Overview of your bookings and activity"
      actions={
        <Button asChild size="sm" data-ocid="dashboard.browse_button">
          <Link
            to="/browse"
            search={{ category: undefined, search: undefined }}
          >
            <Sparkles className="size-3.5 mr-1.5" />
            Browse Stalls
          </Link>
        </Button>
      }
    >
      {/* Welcome banner */}
      <div className="glass-card rounded-xl border border-primary/20 bg-primary/5 px-5 py-4 mb-6 flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15">
          <span className="text-base">👋</span>
        </div>
        <div className="min-w-0">
          <p className="font-display font-semibold gold-gradient">
            Welcome back!
          </p>
          <p className="text-xs text-muted-foreground font-mono truncate">
            {shortPrincipal}
          </p>
        </div>
        <Badge
          variant="outline"
          className="ml-auto border-primary/30 text-primary text-xs shrink-0"
        >
          Customer
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, i) => (
          <Card
            key={stat.label}
            className="border-border/60 hover-lift"
            data-ocid={`dashboard.stat.${i + 1}`}
          >
            <CardContent className="p-5 flex items-center gap-4">
              <div
                className={`flex size-10 items-center justify-center rounded-lg ${stat.color}`}
              >
                <stat.icon className="size-5" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-primary">
                  {isLoading ? <Skeleton className="h-7 w-10" /> : stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming bookings */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-xl text-primary">
          Upcoming Bookings
        </h2>
        <Button
          variant="outline"
          size="sm"
          asChild
          data-ocid="dashboard.view_all_bookings.button"
        >
          <Link to="/dashboard/bookings">
            View All <ArrowRight className="size-3.5 ml-1" />
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      ) : upcomingPreview.length === 0 ? (
        <div
          className="rounded-xl border border-border/60 bg-card p-10 text-center"
          data-ocid="dashboard.empty_state"
        >
          <div className="flex size-14 items-center justify-center rounded-full bg-muted mx-auto mb-3">
            <ShoppingBag className="size-7 text-muted-foreground" />
          </div>
          <p className="font-display font-semibold text-lg mb-1">
            No upcoming bookings
          </p>
          <p className="text-sm text-muted-foreground mb-5">
            Browse verified food stalls and book for your next wedding event
          </p>
          <Button asChild data-ocid="dashboard.browse_cta.button">
            <Link
              to="/browse"
              search={{ category: undefined, search: undefined }}
            >
              <Sparkles className="size-4 mr-2" />
              Browse Stalls
            </Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {upcomingPreview.map((b, i) => (
            <Link
              key={b.id}
              to="/dashboard/bookings/$bookingId"
              params={{ bookingId: b.id }}
              className="flex items-center justify-between rounded-xl border border-border/60 bg-card p-4 hover:shadow-sm hover:border-primary/30 transition-smooth group hover-lift"
              data-ocid={`dashboard.booking.item.${i + 1}`}
            >
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">
                  Booking #{b.id.slice(0, 8)}
                </p>
                <p className="text-xs text-primary mt-0.5">
                  <CalendarDays className="size-3 inline mr-1" />
                  {formatDate(b.eventDate)}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-semibold text-primary">
                  {formatPrice(b.totalPrice)}
                </span>
                <StatusBadge status={b.bookingStatus} />
                <ArrowRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Browse CTA card */}
      {!isLoading && (
        <div className="mt-8 rounded-xl border border-border/60 bg-muted/30 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-display font-semibold text-lg">
              Discover more stalls
            </p>
            <p className="text-sm text-muted-foreground">
              Explore 50+ verified food counters for your wedding
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="shrink-0"
            data-ocid="dashboard.discover_button"
          >
            <Link
              to="/browse"
              search={{ category: undefined, search: undefined }}
            >
              Browse Stalls
            </Link>
          </Button>
        </div>
      )}
    </DashboardLayout>
  );
}

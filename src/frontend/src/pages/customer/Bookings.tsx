import { StatusBadge } from "@/components/common/StatusBadge";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBookings } from "@/hooks/useBackend";
import { formatDate, formatPrice } from "@/lib/utils";
import { BookingStatus } from "@/types";
import type { Booking } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  CalendarDays,
  Eye,
  Receipt,
  ShoppingBag,
  Star,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";

function EmptyTab({ message }: { message: string }) {
  return (
    <div
      className="rounded-xl border border-border/60 bg-card p-10 text-center"
      data-ocid="bookings.empty_state"
    >
      <ShoppingBag className="size-10 text-primary mx-auto mb-3" />
      <p className="font-semibold text-foreground mb-1">{message}</p>
      <p className="text-sm text-muted-foreground mb-4">
        Book a verified food stall for your event
      </p>
      <Button asChild size="sm">
        <Link to="/browse" search={{ category: undefined, search: undefined }}>
          Browse Stalls
        </Link>
      </Button>
    </div>
  );
}

function BookingRow({
  booking,
  index,
  showCancel,
  showReview,
  showFee,
}: {
  booking: Booking;
  index: number;
  showCancel?: boolean;
  showReview?: boolean;
  showFee?: boolean;
}) {
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border/60 bg-card p-4 hover:shadow-sm transition-smooth hover-lift"
      data-ocid={`bookings.item.${index + 1}`}
    >
      {/* Left: info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-medium text-sm truncate">
            Booking #{booking.id.slice(0, 8)}
          </p>
          <StatusBadge status={booking.bookingStatus} />
          <StatusBadge status={booking.paymentStatus} paymentMode />
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1 text-primary">
            <CalendarDays className="size-3" />
            {formatDate(booking.eventDate)}
          </span>
          <span className="flex items-center gap-1">
            <Users className="size-3" />
            {Number(booking.guestCount)} guests
          </span>
          <span className="flex items-center gap-1">
            <Receipt className="size-3" />
            {formatPrice(booking.totalPrice)}
          </span>
        </div>
        {showFee && Number(booking.cancellationFeePercent) > 0 && (
          <p className="text-xs text-destructive mt-1">
            Cancellation fee applied: {Number(booking.cancellationFeePercent)}%
          </p>
        )}
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="outline"
          size="sm"
          asChild
          data-ocid={`bookings.view_button.${index + 1}`}
        >
          <Link
            to="/dashboard/bookings/$bookingId"
            params={{ bookingId: booking.id }}
          >
            <Eye className="size-3.5 mr-1" />
            Details
          </Link>
        </Button>
        {showCancel && (
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            asChild
            data-ocid={`bookings.cancel_button.${index + 1}`}
          >
            <Link
              to="/dashboard/bookings/$bookingId"
              params={{ bookingId: booking.id }}
            >
              <XCircle className="size-3.5 mr-1" />
              Cancel
            </Link>
          </Button>
        )}
        {showReview && (
          <Button
            variant="outline"
            size="sm"
            className="border-primary/40 text-primary hover:bg-primary/5"
            asChild
            data-ocid={`bookings.review_button.${index + 1}`}
          >
            <Link
              to="/dashboard/bookings/$bookingId"
              params={{ bookingId: booking.id }}
            >
              <Star className="size-3.5 mr-1" />
              Review
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export default function CustomerBookingsPage() {
  const { data: bookings = [], isLoading } = useBookings({});
  const [tab, setTab] = useState<"upcoming" | "past" | "cancelled">("upcoming");

  const upcoming = bookings.filter(
    (b) =>
      b.bookingStatus !== BookingStatus.cancelled &&
      b.bookingStatus !== BookingStatus.completed,
  );
  const past = bookings.filter(
    (b) => b.bookingStatus === BookingStatus.completed,
  );
  const cancelled = bookings.filter(
    (b) => b.bookingStatus === BookingStatus.cancelled,
  );

  return (
    <DashboardLayout
      title="My Bookings"
      subtitle="All your booking history and upcoming events"
    >
      <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
        <TabsList className="mb-6" data-ocid="bookings.tabs">
          <TabsTrigger value="upcoming" data-ocid="bookings.upcoming.tab">
            Upcoming
            {upcoming.length > 0 && (
              <span className="ml-1.5 rounded-full bg-primary text-primary-foreground text-[10px] px-1.5 py-0 font-bold">
                {upcoming.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="past" data-ocid="bookings.past.tab">
            Past
          </TabsTrigger>
          <TabsTrigger value="cancelled" data-ocid="bookings.cancelled.tab">
            Cancelled
          </TabsTrigger>
        </TabsList>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        ) : (
          <>
            <TabsContent value="upcoming">
              {upcoming.length === 0 ? (
                <EmptyTab message="No upcoming bookings" />
              ) : (
                <div className="space-y-3">
                  {upcoming.map((b, i) => (
                    <BookingRow key={b.id} booking={b} index={i} showCancel />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="past">
              {past.length === 0 ? (
                <EmptyTab message="No completed bookings yet" />
              ) : (
                <div className="space-y-3">
                  {past.map((b, i) => (
                    <BookingRow key={b.id} booking={b} index={i} showReview />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="cancelled">
              {cancelled.length === 0 ? (
                <EmptyTab message="No cancelled bookings" />
              ) : (
                <div className="space-y-3">
                  {cancelled.map((b, i) => (
                    <BookingRow key={b.id} booking={b} index={i} showFee />
                  ))}
                </div>
              )}
            </TabsContent>
          </>
        )}
      </Tabs>
    </DashboardLayout>
  );
}

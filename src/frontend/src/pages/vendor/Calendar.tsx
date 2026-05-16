import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import {
  useBookings,
  useMarkUnavailableDate,
  useUnavailableDates,
  useVendors,
} from "@/hooks/useBackend";
import { dateToTimestamp, formatDate, timestampToDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { BookingStatus } from "@/types";
import type { Timestamp } from "@/types";
import {
  AlertCircle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function VendorCalendarPage() {
  const { principal } = useAuth();
  const { data: vendors = [], isLoading: vendorsLoading } = useVendors({});
  const myVendor = vendors.find(
    (v) => v.ownerId.toString() === principal?.toString(),
  );

  const { data: unavailableTimestamps = [], isLoading: datesLoading } =
    useUnavailableDates(myVendor?.id);
  const { data: bookings = [], isLoading: bookingsLoading } = useBookings(
    myVendor ? { vendorId: myVendor.id } : {},
  );
  const markUnavailable = useMarkUnavailableDate();

  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth()); // 0-indexed

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedIsBlocked, setSelectedIsBlocked] = useState(false);

  // Parse unavailable dates to Date objects
  const unavailableDates = useMemo(
    () => unavailableTimestamps.map((ts: Timestamp) => timestampToDate(ts)),
    [unavailableTimestamps],
  );

  // Get upcoming booking event dates grouped by day
  const bookingDateMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const b of bookings.filter(
      (b) => b.bookingStatus !== BookingStatus.cancelled,
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

  // Build calendar grid
  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (Date | null)[] = [
      ...Array(firstDay).fill(null),
      ...Array.from(
        { length: daysInMonth },
        (_, i) => new Date(viewYear, viewMonth, i + 1),
      ),
    ];
    // Pad to complete last week
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [viewYear, viewMonth]);

  const handleDayClick = (date: Date) => {
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
          date: dateToTimestamp(selectedDate),
        });
        toast.success(
          `${formatDate(dateToTimestamp(selectedDate))} marked as unavailable.`,
        );
      } else {
        // Unblock: for now notify user (backend unblock method not in contract)
        toast.info(
          "To unblock a date, please contact support or resubmit your availability.",
        );
      }
    } catch {
      toast.error("Failed to update availability.");
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
      year: "numeric",
    },
  );

  return (
    <DashboardLayout
      title="Availability Calendar"
      subtitle="Block dates to prevent new bookings"
    >
      <div className="max-w-2xl space-y-4">
        {/* Legend */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded-sm bg-destructive/20 border border-destructive/40" />
            <span className="text-xs text-muted-foreground">Blocked</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded-sm bg-blue-100 border border-blue-300" />
            <span className="text-xs text-muted-foreground">Has bookings</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded-sm bg-primary/15 border border-primary/30" />
            <span className="text-xs text-muted-foreground">Today</span>
          </div>
        </div>

        <Card className="border-border/60">
          <CardContent className="p-4 sm:p-6">
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-5">
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={prevMonth}
                data-ocid="calendar.prev_button"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <p className="font-display font-semibold text-base">
                {monthLabel}
              </p>
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={nextMonth}
                data-ocid="calendar.next_button"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-1">
              {DAY_HEADERS.map((d) => (
                <div
                  key={d}
                  className="text-center text-[11px] font-semibold text-muted-foreground py-1.5"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar cells */}
            {isLoading ? (
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }, (_, i) => (
                  <Skeleton
                    key={`cal-skel-pos-${i + 1}`}
                    className="h-10 rounded-lg"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((date, gridPos) => {
                  if (!date) {
                    const padKey = `pad-col-pos-${gridPos + 1}`;
                    return <div key={padKey} className="h-10" />;
                  }
                  const isToday = isSameDay(date, today);
                  const isBlocked = unavailableDates.some((d) =>
                    isSameDay(d, date),
                  );
                  const bookingKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
                  const bookingCount = bookingDateMap[bookingKey] ?? 0;
                  const isPast =
                    date <
                    new Date(
                      today.getFullYear(),
                      today.getMonth(),
                      today.getDate(),
                    );

                  return (
                    <button
                      key={date.toISOString()}
                      type="button"
                      disabled={isPast}
                      onClick={() => !isPast && handleDayClick(date)}
                      data-ocid={`calendar.day.${date.getDate()}`}
                      className={cn(
                        "h-10 rounded-lg text-sm font-medium flex flex-col items-center justify-center gap-0.5 transition-colors",
                        isPast
                          ? "text-muted-foreground/40 cursor-not-allowed"
                          : "cursor-pointer hover:bg-muted",
                        isBlocked && !isPast
                          ? "bg-destructive/15 text-destructive border border-destructive/30 hover:bg-destructive/20"
                          : "",
                        bookingCount > 0 && !isBlocked && !isPast
                          ? "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/30"
                          : "",
                        isToday && !isBlocked && bookingCount === 0
                          ? "bg-primary/10 text-primary border border-primary/30 font-bold"
                          : "",
                      )}
                    >
                      <span>{date.getDate()}</span>
                      {isBlocked && (
                        <span className="text-[8px] leading-none opacity-80">
                          blocked
                        </span>
                      )}
                      {bookingCount > 0 && !isBlocked && (
                        <span className="text-[8px] leading-none opacity-80">
                          {bookingCount} bkg
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming blocked dates summary */}
        {unavailableDates.length > 0 && (
          <Card className="border-border/60">
            <CardContent className="p-4">
              <p className="text-sm font-semibold mb-2">Blocked Dates</p>
              <div className="flex flex-wrap gap-2">
                {unavailableDates
                  .filter(
                    (d) =>
                      d >=
                      new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate(),
                      ),
                  )
                  .slice(0, 12)
                  .map((d) => (
                    <span
                      key={d.toISOString()}
                      className="inline-flex items-center rounded-full bg-destructive/10 border border-destructive/20 text-destructive px-2.5 py-0.5 text-xs font-medium"
                    >
                      {d.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Block / Unblock dialog */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent data-ocid="calendar.block.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="size-5 text-primary" />
              {selectedIsBlocked ? "Unblock this date?" : "Block this date?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedDate && (
                <span className="font-semibold text-foreground">
                  {selectedDate.toLocaleDateString("en-IN", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
              {selectedIsBlocked
                ? " is currently blocked. Unblocking allows customers to book on this date."
                : " will be blocked and customers will not be able to book this date."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="calendar.block.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              disabled={markUnavailable.isPending}
              data-ocid="calendar.block.confirm_button"
              className={
                selectedIsBlocked
                  ? ""
                  : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
              }
            >
              {markUnavailable.isPending
                ? "Updating..."
                : selectedIsBlocked
                  ? "Unblock Date"
                  : "Block Date"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}

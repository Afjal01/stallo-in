import { StatusBadge } from "@/components/common/StatusBadge";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useBookings, useUpdateBookingStatus } from "@/hooks/useBackend";
import { formatDate, formatDateTime, formatPrice } from "@/lib/utils";
import { BookingStatus } from "@/types";
import type { Booking } from "@/types";
import { Download, Eye, X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: BookingStatus.pending, label: "Pending" },
  { value: BookingStatus.confirmed, label: "Confirmed" },
  { value: BookingStatus.preparing, label: "Preparing" },
  { value: BookingStatus.dispatched, label: "Dispatched" },
  { value: BookingStatus.completed, label: "Completed" },
  { value: BookingStatus.cancelled, label: "Cancelled" },
];

const ALL_STATUSES: BookingStatus[] = [
  BookingStatus.pending,
  BookingStatus.confirmed,
  BookingStatus.preparing,
  BookingStatus.dispatched,
  BookingStatus.completed,
  BookingStatus.cancelled,
];

function BookingDetailModal({
  booking,
  open,
  onClose,
}: { booking: Booking | null; open: boolean; onClose: () => void }) {
  const updateStatus = useUpdateBookingStatus();

  const handleStatusChange = async (status: string) => {
    if (!booking) return;
    try {
      await updateStatus.mutateAsync({
        bookingId: booking.id,
        status: status as BookingStatus,
      });
      toast.success("Booking status updated.");
    } catch {
      toast.error("Failed to update status.");
    }
  };

  if (!booking) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent
        className="max-w-lg"
        data-ocid="admin.booking_detail.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display">Booking Details</DialogTitle>
          <DialogDescription className="font-mono text-xs">
            {booking.id}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">
                Booking Status
              </p>
              <StatusBadge status={booking.bookingStatus} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">
                Payment Status
              </p>
              <StatusBadge status={booking.paymentStatus} paymentMode />
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Event Date</p>
              <p className="font-medium">{formatDate(booking.eventDate)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Guests</p>
              <p className="font-medium">{Number(booking.guestCount)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Venue</p>
              <p className="font-medium truncate">{booking.eventVenue}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Price</p>
              <p className="font-medium">{formatPrice(booking.totalPrice)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Advance Paid</p>
              <p className="font-medium">
                {formatPrice(booking.advanceAmount)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Cancellation Fee</p>
              <p className="font-medium">
                {Number(booking.cancellationFeePercent)}%
              </p>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-xs text-muted-foreground">Vendor ID</p>
            <p className="font-mono text-xs">{booking.vendorId}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Customer ID</p>
            <p className="font-mono text-xs">{booking.customerId.toString()}</p>
          </div>
          {booking.notes && (
            <div>
              <p className="text-xs text-muted-foreground">Notes</p>
              <p>{booking.notes}</p>
            </div>
          )}
          <div>
            <p className="text-xs text-muted-foreground">Created</p>
            <p>{formatDateTime(booking.createdAt)}</p>
          </div>
          <Separator />
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Force Status Update (Admin)
            </p>
            <Select
              defaultValue={booking.bookingStatus}
              onValueChange={handleStatusChange}
              disabled={updateStatus.isPending}
            >
              <SelectTrigger
                className="w-full"
                data-ocid="admin.booking_detail.status.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ALL_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            data-ocid="admin.booking_detail.close.button"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function exportToCSV(bookings: Booking[]) {
  const headers = [
    "ID",
    "Vendor ID",
    "Customer ID",
    "Event Date",
    "Venue",
    "Guests",
    "Total Price",
    "Advance",
    "Status",
    "Payment Status",
    "Created At",
  ];
  const rows = bookings.map((b) => [
    b.id,
    b.vendorId,
    b.customerId.toString(),
    formatDate(b.eventDate),
    b.eventVenue,
    Number(b.guestCount),
    Number(b.totalPrice) / 100,
    Number(b.advanceAmount) / 100,
    b.bookingStatus,
    b.paymentStatus,
    formatDateTime(b.createdAt),
  ]);
  const csv = [headers, ...rows]
    .map((r) => r.map((c) => `"${c}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `stallo-bookings-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminBookings() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [vendorSearch, setVendorSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const filter =
    statusFilter !== "all" ? { status: statusFilter as BookingStatus } : {};
  const { data: bookings = [], isLoading } = useBookings(filter);

  const sorted = useMemo(() => {
    const q = vendorSearch.toLowerCase();
    return [...bookings]
      .filter(
        (b) =>
          !q ||
          b.vendorId.toLowerCase().includes(q) ||
          b.id.toLowerCase().includes(q),
      )
      .sort((a, b) => Number(b.createdAt - a.createdAt));
  }, [bookings, vendorSearch]);

  return (
    <DashboardLayout
      title="Booking Management"
      subtitle="All platform bookings — filter, inspect and manage"
      actions={
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => exportToCSV(sorted)}
          data-ocid="admin.bookings.export.button"
        >
          <Download className="size-3.5" /> Export CSV
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3 items-center">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger
              className="w-44"
              data-ocid="admin.bookings.status_filter.select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative flex-1 max-w-xs">
            <Input
              placeholder="Search booking ID or vendor…"
              value={vendorSearch}
              onChange={(e) => setVendorSearch(e.target.value)}
              data-ocid="admin.bookings.search.input"
            />
            {vendorSearch && (
              <button
                type="button"
                onClick={() => setVendorSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          <Badge variant="outline" className="shrink-0 text-xs">
            {sorted.length} results
          </Badge>
        </div>

        <div className="rounded-lg border border-border bg-card overflow-hidden">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : sorted.length === 0 ? (
            <div
              className="py-12 text-center text-sm text-muted-foreground"
              data-ocid="admin.bookings.empty_state"
            >
              No bookings match your filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground hidden sm:table-cell">
                      Vendor
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground hidden md:table-cell">
                      Event Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground hidden md:table-cell">
                      Venue
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground hidden lg:table-cell">
                      Guests
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground hidden lg:table-cell">
                      Payment
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sorted.map((b, i) => (
                    <tr
                      key={b.id}
                      className="hover:bg-muted/30 transition-colors"
                      data-ocid={`admin.bookings.item.${i + 1}`}
                    >
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                        {b.id.slice(0, 8)}…
                      </td>
                      <td className="px-4 py-3 font-medium text-xs hidden sm:table-cell">
                        {b.vendorId.slice(0, 8)}…
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                        {formatDate(b.eventDate)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground truncate max-w-[100px] hidden md:table-cell">
                        {b.eventVenue}
                      </td>
                      <td className="px-4 py-3 text-right text-muted-foreground hidden lg:table-cell">
                        {Number(b.guestCount)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold">
                        {formatPrice(b.totalPrice)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={b.bookingStatus} />
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <StatusBadge status={b.paymentStatus} paymentMode />
                      </td>
                      <td className="px-4 py-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7"
                          onClick={() => setSelectedBooking(b)}
                          aria-label="View booking"
                          data-ocid={`admin.bookings.view.${i + 1}`}
                        >
                          <Eye className="size-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <BookingDetailModal
        booking={selectedBooking}
        open={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </DashboardLayout>
  );
}

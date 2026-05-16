import { StatusBadge } from "@/components/common/StatusBadge";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import {
  useBookings,
  useUpdateBookingStatus,
  useVendors,
} from "@/hooks/useBackend";
import { formatDate, formatPrice } from "@/lib/utils";
import { BookingStatus } from "@/types";
import type { Booking } from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Clock,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ACTIVE_STATUSES = [
  BookingStatus.confirmed,
  BookingStatus.preparing,
  BookingStatus.dispatched,
];
const NEXT_STATUS: Partial<
  Record<BookingStatus, { value: BookingStatus; label: string }[]>
> = {
  [BookingStatus.confirmed]: [
    { value: BookingStatus.preparing, label: "Mark Preparing" },
    { value: BookingStatus.cancelled, label: "Cancel Order" },
  ],
  [BookingStatus.preparing]: [
    { value: BookingStatus.dispatched, label: "Mark Dispatched" },
    { value: BookingStatus.cancelled, label: "Cancel Order" },
  ],
  [BookingStatus.dispatched]: [
    { value: BookingStatus.completed, label: "Mark Completed" },
  ],
};

function EmptyTab({ message }: { message: string }) {
  return (
    <div
      className="rounded-xl border border-border/60 bg-card p-12 text-center"
      data-ocid="vendor_orders.empty_state"
    >
      <ShoppingBag className="size-10 text-muted-foreground mx-auto mb-3" />
      <p className="font-display font-semibold text-lg mb-1">{message}</p>
      <p className="text-sm text-muted-foreground">
        Orders will appear here when customers book your stall
      </p>
    </div>
  );
}

function OrderRow({
  booking,
  index,
  onAccept,
  onReject,
  onStatusChange,
  isPending,
}: {
  booking: Booking;
  index: number;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onStatusChange?: (id: string, status: BookingStatus) => void;
  isPending?: boolean;
}) {
  const navigate = useNavigate();
  const nextOptions = NEXT_STATUS[booking.bookingStatus as BookingStatus] ?? [];

  return (
    <div
      className="flex flex-wrap items-center gap-3 rounded-xl border border-border/60 bg-card p-4 hover:shadow-sm transition-smooth cursor-pointer"
      data-ocid={`vendor_orders.item.${index}`}
      onClick={() =>
        navigate({
          to: "/vendor/orders/$orderId",
          params: { orderId: booking.id },
        })
      }
      onKeyDown={(e) =>
        e.key === "Enter" &&
        navigate({
          to: "/vendor/orders/$orderId",
          params: { orderId: booking.id },
        })
      }
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-sm">
            Order #{booking.id.slice(0, 8).toUpperCase()}
          </p>
          <StatusBadge status={booking.bookingStatus} />
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          {formatDate(booking.eventDate)} · {Number(booking.guestCount)} guests
          · {formatPrice(booking.totalPrice)}
        </p>
        {booking.eventVenue && (
          <p className="text-xs text-muted-foreground truncate max-w-xs">
            {booking.eventVenue}
          </p>
        )}
      </div>

      <div
        className="flex items-center gap-2 shrink-0"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {booking.bookingStatus === BookingStatus.pending &&
          onAccept &&
          onReject && (
            <>
              <Button
                size="sm"
                variant="outline"
                className="text-destructive border-destructive/30 hover:bg-destructive/5"
                onClick={() => onReject(booking.id)}
                disabled={isPending}
                data-ocid={`vendor_orders.reject_button.${index}`}
              >
                <XCircle className="size-3.5 mr-1" /> Reject
              </Button>
              <Button
                size="sm"
                onClick={() => onAccept(booking.id)}
                disabled={isPending}
                data-ocid={`vendor_orders.accept_button.${index}`}
              >
                <CheckCircle2 className="size-3.5 mr-1" /> Accept
              </Button>
            </>
          )}
        {ACTIVE_STATUSES.includes(booking.bookingStatus as BookingStatus) &&
          onStatusChange &&
          nextOptions.length > 0 && (
            <Select
              onValueChange={(val) =>
                onStatusChange(booking.id, val as BookingStatus)
              }
              disabled={isPending}
            >
              <SelectTrigger
                className="h-8 text-xs w-40"
                data-ocid={`vendor_orders.status_select.${index}`}
              >
                <SelectValue placeholder="Update status" />
              </SelectTrigger>
              <SelectContent>
                {nextOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        <ChevronRight className="size-4 text-muted-foreground" />
      </div>
    </div>
  );
}

export default function VendorOrdersPage() {
  const { principal } = useAuth();
  const { data: vendors = [] } = useVendors({});
  const myVendor = vendors.find(
    (v) => v.ownerId.toString() === principal?.toString(),
  );

  const { data: bookings = [], isLoading } = useBookings(
    myVendor ? { vendorId: myVendor.id } : {},
  );
  const updateStatus = useUpdateBookingStatus();

  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectBookingId, setRejectBookingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const newOrders = bookings.filter(
    (b) => b.bookingStatus === BookingStatus.pending,
  );
  const activeOrders = bookings.filter((b) =>
    ACTIVE_STATUSES.includes(b.bookingStatus as BookingStatus),
  );
  const completedOrders = bookings.filter(
    (b) => b.bookingStatus === BookingStatus.completed,
  );
  const cancelledOrders = bookings.filter(
    (b) => b.bookingStatus === BookingStatus.cancelled,
  );

  const handleAccept = async (bookingId: string) => {
    try {
      await updateStatus.mutateAsync({
        bookingId,
        status: BookingStatus.confirmed,
      });
      toast.success("Order accepted successfully!");
    } catch {
      toast.error("Failed to accept order.");
    }
  };

  const handleRejectOpen = (bookingId: string) => {
    setRejectBookingId(bookingId);
    setRejectReason("");
    setRejectDialogOpen(true);
  };

  const handleRejectConfirm = async () => {
    if (!rejectBookingId) return;
    try {
      await updateStatus.mutateAsync({
        bookingId: rejectBookingId,
        status: BookingStatus.cancelled,
      });
      toast.success("Order rejected.");
    } catch {
      toast.error("Failed to reject order.");
    } finally {
      setRejectDialogOpen(false);
      setRejectBookingId(null);
    }
  };

  const handleStatusChange = async (
    bookingId: string,
    status: BookingStatus,
  ) => {
    try {
      await updateStatus.mutateAsync({ bookingId, status });
      toast.success("Order status updated!");
    } catch {
      toast.error("Failed to update status.");
    }
  };

  const SkeletonRows = () => (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-20 rounded-xl" />
      ))}
    </div>
  );

  return (
    <DashboardLayout title="Orders" subtitle="Manage incoming booking requests">
      <Tabs defaultValue="new" className="space-y-4">
        <TabsList className="bg-muted/60">
          <TabsTrigger
            value="new"
            data-ocid="vendor_orders.tab.new"
            className="gap-1.5"
          >
            New
            {newOrders.length > 0 && (
              <Badge className="bg-primary text-primary-foreground h-4.5 px-1.5 text-[10px]">
                {newOrders.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="active"
            data-ocid="vendor_orders.tab.active"
            className="gap-1.5"
          >
            Active
            {activeOrders.length > 0 && (
              <Badge className="bg-blue-500 text-white h-4.5 px-1.5 text-[10px]">
                {activeOrders.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            data-ocid="vendor_orders.tab.completed"
          >
            Completed
          </TabsTrigger>
          <TabsTrigger
            value="cancelled"
            data-ocid="vendor_orders.tab.cancelled"
          >
            Cancelled
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-3">
          {isLoading ? (
            <SkeletonRows />
          ) : newOrders.length === 0 ? (
            <EmptyTab message="No new orders" />
          ) : (
            newOrders.map((b, i) => (
              <OrderRow
                key={b.id}
                booking={b}
                index={i + 1}
                onAccept={handleAccept}
                onReject={handleRejectOpen}
                isPending={updateStatus.isPending}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-3">
          {isLoading ? (
            <SkeletonRows />
          ) : activeOrders.length === 0 ? (
            <EmptyTab message="No active orders" />
          ) : (
            activeOrders.map((b, i) => (
              <OrderRow
                key={b.id}
                booking={b}
                index={i + 1}
                onStatusChange={handleStatusChange}
                isPending={updateStatus.isPending}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-3">
          {isLoading ? (
            <SkeletonRows />
          ) : completedOrders.length === 0 ? (
            <EmptyTab message="No completed orders yet" />
          ) : (
            completedOrders.map((b, i) => (
              <OrderRow key={b.id} booking={b} index={i + 1} />
            ))
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-3">
          {isLoading ? (
            <SkeletonRows />
          ) : cancelledOrders.length === 0 ? (
            <EmptyTab message="No cancelled orders" />
          ) : (
            cancelledOrders.map((b, i) => (
              <OrderRow key={b.id} booking={b} index={i + 1} />
            ))
          )}
        </TabsContent>
      </Tabs>

      <AlertDialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <AlertDialogContent data-ocid="vendor_orders.reject.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="size-5 text-destructive" /> Reject this
              order?
            </AlertDialogTitle>
            <AlertDialogDescription>
              The customer will be notified and the booking will be cancelled.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2 py-2">
            <Label htmlFor="reject-reason">
              Reason for rejection (optional)
            </Label>
            <Textarea
              id="reject-reason"
              placeholder="e.g. Date not available, outside service area..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
              className="resize-none"
              data-ocid="vendor_orders.reject.reason.textarea"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="vendor_orders.reject.cancel_button">
              Keep Order
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRejectConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="vendor_orders.reject.confirm_button"
            >
              Reject Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}

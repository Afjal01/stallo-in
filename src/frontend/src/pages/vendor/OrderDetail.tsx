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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useBooking, useUpdateBookingStatus } from "@/hooks/useBackend";
import { formatDate, formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { BookingStatus } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChefHat,
  Circle,
  Clock,
  CreditCard,
  FileText,
  MapPin,
  Truck,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const TIMELINE_STEPS: {
  status: BookingStatus;
  label: string;
  icon: React.ElementType;
}[] = [
  { status: BookingStatus.pending, label: "Received", icon: Clock },
  { status: BookingStatus.confirmed, label: "Confirmed", icon: CheckCircle2 },
  { status: BookingStatus.preparing, label: "Preparing", icon: ChefHat },
  { status: BookingStatus.dispatched, label: "Dispatched", icon: Truck },
  { status: BookingStatus.completed, label: "Completed", icon: CheckCircle2 },
];

const STATUS_ORDER = [
  BookingStatus.pending,
  BookingStatus.confirmed,
  BookingStatus.preparing,
  BookingStatus.dispatched,
  BookingStatus.completed,
];

const NEXT_STATUS_OPTIONS: Partial<
  Record<BookingStatus, { value: BookingStatus; label: string }[]>
> = {
  [BookingStatus.confirmed]: [
    { value: BookingStatus.preparing, label: "Mark as Preparing" },
  ],
  [BookingStatus.preparing]: [
    { value: BookingStatus.dispatched, label: "Mark as Dispatched" },
  ],
  [BookingStatus.dispatched]: [
    { value: BookingStatus.completed, label: "Mark as Completed" },
  ],
};

export default function VendorOrderDetailPage() {
  const { orderId } = useParams({ from: "/vendor/orders/$orderId" });
  const { data: booking, isLoading } = useBooking(orderId);
  const updateStatus = useUpdateBookingStatus();
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const handleStatusChange = async (status: string) => {
    try {
      await updateStatus.mutateAsync({
        bookingId: orderId,
        status: status as BookingStatus,
      });
      toast.success("Order status updated!");
    } catch {
      toast.error("Failed to update status.");
    }
  };

  const handleRejectConfirm = async () => {
    try {
      await updateStatus.mutateAsync({
        bookingId: orderId,
        status: BookingStatus.cancelled,
      });
      toast.success("Order rejected.");
    } catch {
      toast.error("Failed to reject order.");
    } finally {
      setRejectOpen(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout title="Order Details">
        <div className="space-y-4 max-w-2xl">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </div>
      </DashboardLayout>
    );
  }

  if (!booking) {
    return (
      <DashboardLayout title="Order Details">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/vendor">
            <ArrowLeft className="size-4 mr-1" />
            Back to Orders
          </Link>
        </Button>
        <div className="rounded-xl border border-border/60 bg-card p-12 text-center">
          <AlertCircle className="size-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-display font-semibold text-lg">Order not found</p>
        </div>
      </DashboardLayout>
    );
  }

  const currentStatusIndex = STATUS_ORDER.indexOf(
    booking.bookingStatus as BookingStatus,
  );
  const isCancelled = booking.bookingStatus === BookingStatus.cancelled;
  const nextOptions =
    NEXT_STATUS_OPTIONS[booking.bookingStatus as BookingStatus] ?? [];

  return (
    <DashboardLayout
      title="Order Details"
      subtitle={`Order #${booking.id.slice(0, 8).toUpperCase()}`}
    >
      <div className="max-w-2xl space-y-4">
        <Button
          variant="ghost"
          size="sm"
          asChild
          data-ocid="vendor_order_detail.back_button"
        >
          <Link to="/vendor">
            <ArrowLeft className="size-4 mr-1" />
            Back to Orders
          </Link>
        </Button>

        {/* Status timeline */}
        {!isCancelled && (
          <Card className="border-border/60">
            <CardContent className="p-5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Order Progress
              </p>
              <div className="flex items-start">
                {TIMELINE_STEPS.map((step, idx) => {
                  const isCompleted = currentStatusIndex > idx;
                  const isCurrent = currentStatusIndex === idx;
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.status}
                      className="flex flex-1 flex-col items-center"
                    >
                      <div className="flex items-center w-full">
                        {idx > 0 && (
                          <div
                            className={cn(
                              "flex-1 h-0.5 -ml-1",
                              isCompleted || isCurrent
                                ? "bg-primary"
                                : "bg-border",
                            )}
                          />
                        )}
                        <div
                          className={cn(
                            "flex size-8 items-center justify-center rounded-full shrink-0 border-2 transition-colors",
                            isCompleted
                              ? "bg-primary border-primary text-primary-foreground"
                              : isCurrent
                                ? "bg-primary/10 border-primary text-primary"
                                : "bg-card border-border text-muted-foreground",
                          )}
                        >
                          <Icon className="size-3.5" />
                        </div>
                        {idx < TIMELINE_STEPS.length - 1 && (
                          <div
                            className={cn(
                              "flex-1 h-0.5 -mr-1",
                              isCompleted ? "bg-primary" : "bg-border",
                            )}
                          />
                        )}
                      </div>
                      <p
                        className={cn(
                          "text-[10px] mt-1.5 font-medium text-center leading-tight",
                          isCurrent
                            ? "text-primary"
                            : isCompleted
                              ? "text-foreground"
                              : "text-muted-foreground",
                        )}
                      >
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {isCancelled && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 flex items-center gap-3">
            <AlertCircle className="size-5 text-destructive shrink-0" />
            <p className="text-sm text-destructive font-medium">
              This order has been cancelled.
            </p>
          </div>
        )}

        {/* Booking details card */}
        <Card className="border-border/60">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-semibold text-lg">
                Booking Details
              </h2>
              <StatusBadge status={booking.bookingStatus} />
            </div>
            <Separator />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-2.5">
                <Calendar className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Event Date</p>
                  <p className="text-sm font-medium">
                    {formatDate(booking.eventDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Users className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Guests</p>
                  <p className="text-sm font-medium">
                    {Number(booking.guestCount)} guests
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 col-span-full">
                <MapPin className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Venue</p>
                  <p className="text-sm font-medium">{booking.eventVenue}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">
                  Total Amount
                </p>
                <p className="text-lg font-display font-bold text-primary">
                  {formatPrice(booking.totalPrice)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">
                  Advance Received
                </p>
                <p className="text-lg font-display font-bold">
                  {formatPrice(booking.advanceAmount)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">
                  Payment Status
                </p>
                <StatusBadge status={booking.paymentStatus} paymentMode />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">
                  Received On
                </p>
                <p className="text-sm font-medium">
                  {formatDate(booking.createdAt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        {booking.notes && (
          <Card className="border-border/60">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="size-4 text-muted-foreground" />
                <p className="text-sm font-semibold">Customer Notes</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {booking.notes}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        {!isCancelled && (
          <Card className="border-border/60">
            <CardContent className="p-5 space-y-3">
              <p className="text-sm font-semibold">Update Order</p>
              {nextOptions.length > 0 && (
                <Select
                  onValueChange={handleStatusChange}
                  disabled={updateStatus.isPending}
                >
                  <SelectTrigger data-ocid="vendor_order_detail.status.select">
                    <SelectValue placeholder="Change status..." />
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
              {booking.bookingStatus === BookingStatus.pending && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleStatusChange(BookingStatus.confirmed)}
                    disabled={updateStatus.isPending}
                    className="flex-1"
                    data-ocid="vendor_order_detail.accept_button"
                  >
                    <CheckCircle2 className="size-4 mr-1.5" /> Accept Order
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setRejectOpen(true)}
                    disabled={updateStatus.isPending}
                    className="flex-1 text-destructive border-destructive/30 hover:bg-destructive/5"
                    data-ocid="vendor_order_detail.reject_button"
                  >
                    Reject Order
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <AlertDialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <AlertDialogContent data-ocid="vendor_order_detail.reject.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Reject this order?</AlertDialogTitle>
            <AlertDialogDescription>
              The customer will be notified. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2 py-2">
            <Label htmlFor="detail-reject-reason">Reason (optional)</Label>
            <Textarea
              id="detail-reject-reason"
              placeholder="Explain why you are rejecting this order..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
              className="resize-none"
              data-ocid="vendor_order_detail.reject.reason.textarea"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="vendor_order_detail.reject.cancel_button">
              Go Back
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRejectConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="vendor_order_detail.reject.confirm_button"
            >
              Reject Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}

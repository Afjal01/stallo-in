import { cn } from "@/lib/utils";
import { BookingStatus, PaymentStatus } from "@/types";

type StatusValue = BookingStatus | PaymentStatus | string;

interface StatusBadgeProps {
  status: StatusValue;
  className?: string;
}

const STATUS_CONFIG: Record<string, { label: string; classes: string }> = {
  // Booking statuses
  [BookingStatus.pending]: {
    label: "Pending",
    classes:
      "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/40",
  },
  [BookingStatus.confirmed]: {
    label: "Confirmed",
    classes:
      "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/40",
  },
  [BookingStatus.preparing]: {
    label: "Preparing",
    classes:
      "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800/40",
  },
  [BookingStatus.dispatched]: {
    label: "Dispatched",
    classes:
      "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800/40",
  },
  [BookingStatus.completed]: {
    label: "Completed",
    classes:
      "bg-secondary/15 text-secondary border-secondary/30 dark:bg-secondary/20 dark:text-secondary dark:border-secondary/40",
  },
  [BookingStatus.cancelled]: {
    label: "Cancelled",
    classes:
      "bg-destructive/10 text-destructive border-destructive/20 dark:bg-destructive/20 dark:border-destructive/40",
  },
  // Payment statuses
  [`payment_${PaymentStatus.pending}`]: {
    label: "Payment Pending",
    classes:
      "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300",
  },
  [PaymentStatus.paid]: {
    label: "Paid",
    classes:
      "bg-secondary/15 text-secondary border-secondary/30 dark:bg-secondary/20 dark:text-secondary",
  },
  [PaymentStatus.partiallyPaid]: {
    label: "Partially Paid",
    classes:
      "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300",
  },
  [PaymentStatus.failed]: {
    label: "Payment Failed",
    classes: "bg-destructive/10 text-destructive border-destructive/20",
  },
  [PaymentStatus.refunded]: {
    label: "Refunded",
    classes: "bg-muted text-muted-foreground border-border",
  },
};

export function StatusBadge({
  status,
  className,
  paymentMode,
}: StatusBadgeProps & { paymentMode?: boolean }) {
  const key = paymentMode ? `payment_${status}` : status;
  const config = STATUS_CONFIG[key] ?? {
    label: status,
    classes: "bg-muted text-muted-foreground border-border",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.classes,
        className,
      )}
    >
      {config.label}
    </span>
  );
}

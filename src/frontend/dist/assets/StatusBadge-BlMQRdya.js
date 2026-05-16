import { j as jsxRuntimeExports, d as cn } from "./index-BKL2lxtv.js";
import { P as PaymentStatus, d as BookingStatus } from "./useAuth-IAGlSf5h.js";
const STATUS_CONFIG = {
  // Booking statuses
  [BookingStatus.pending]: {
    label: "Pending",
    classes: "bg-amber-500/15 text-amber-300 border-amber-400/30"
  },
  [BookingStatus.confirmed]: {
    label: "Confirmed",
    classes: "bg-blue-500/15 text-blue-300 border-blue-400/30"
  },
  [BookingStatus.preparing]: {
    label: "Preparing",
    classes: "bg-purple-500/15 text-purple-300 border-purple-400/30"
  },
  [BookingStatus.dispatched]: {
    label: "Dispatched",
    classes: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30"
  },
  [BookingStatus.completed]: {
    label: "Completed",
    classes: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30"
  },
  [BookingStatus.cancelled]: {
    label: "Cancelled",
    classes: "bg-rose-500/15 text-rose-300 border-rose-400/30"
  },
  // Payment statuses
  [`payment_${PaymentStatus.pending}`]: {
    label: "Payment Pending",
    classes: "bg-amber-500/15 text-amber-300 border-amber-400/30"
  },
  [PaymentStatus.paid]: {
    label: "Paid",
    classes: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30"
  },
  [PaymentStatus.partiallyPaid]: {
    label: "Partially Paid",
    classes: "bg-blue-500/15 text-blue-300 border-blue-400/30"
  },
  [PaymentStatus.failed]: {
    label: "Payment Failed",
    classes: "bg-rose-500/15 text-rose-300 border-rose-400/30"
  },
  [PaymentStatus.refunded]: {
    label: "Refunded",
    classes: "bg-muted/60 text-muted-foreground border-border/60"
  }
};
function StatusBadge({
  status,
  className,
  paymentMode
}) {
  const key = paymentMode ? `payment_${status}` : status;
  const config = STATUS_CONFIG[key] ?? {
    label: status,
    classes: "bg-muted text-muted-foreground border-border"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.classes,
        className
      ),
      children: config.label
    }
  );
}
export {
  StatusBadge as S
};

import { cn } from "@/lib/utils";
import { VendorStatus } from "@/types";
import { Clock, ShieldCheck, ShieldX } from "lucide-react";

interface VerifiedBadgeProps {
  status: VendorStatus;
  className?: string;
  size?: "sm" | "md";
}

export function VerifiedBadge({
  status,
  className,
  size = "sm",
}: VerifiedBadgeProps) {
  const iconSize = size === "sm" ? "size-3" : "size-4";
  const baseClasses = cn(
    "inline-flex items-center gap-1 rounded-full font-semibold",
    size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
  );

  if (status === VendorStatus.approved) {
    return (
      <span
        className={cn(
          baseClasses,
          "bg-primary/15 text-primary border border-primary/30 shadow-[0_0_8px_oklch(var(--primary)/0.2)]",
          className,
        )}
      >
        <ShieldCheck className={cn(iconSize, "shrink-0")} />
        Verified
      </span>
    );
  }

  if (status === VendorStatus.pending) {
    return (
      <span
        className={cn(
          baseClasses,
          "bg-amber-500/10 text-amber-400 border border-amber-500/25",
          className,
        )}
      >
        <Clock className={cn(iconSize, "shrink-0")} />
        Pending Review
      </span>
    );
  }

  return (
    <span
      className={cn(
        baseClasses,
        "bg-rose-500/10 text-rose-400 border border-rose-500/25",
        className,
      )}
    >
      <ShieldX className={cn(iconSize, "shrink-0")} />
      Not Verified
    </span>
  );
}

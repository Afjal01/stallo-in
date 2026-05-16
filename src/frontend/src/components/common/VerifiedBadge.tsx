import { cn } from "@/lib/utils";
import { VendorStatus } from "@/types";
import { ShieldCheck, ShieldX } from "lucide-react";

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
  if (status !== VendorStatus.approved) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full font-medium",
          size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
          "bg-muted text-muted-foreground",
          className,
        )}
      >
        <ShieldX className={size === "sm" ? "size-3" : "size-4"} />
        Unverified
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        "bg-primary/10 text-primary border border-primary/20",
        className,
      )}
    >
      <ShieldCheck className={size === "sm" ? "size-3" : "size-4"} />
      Verified
    </span>
  );
}

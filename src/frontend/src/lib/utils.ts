import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format paise (1/100 of INR) to a readable ₹ string
 * Backend stores prices in paise (bigint)
 */
export function formatPrice(paise: bigint | number): string {
  const amount = typeof paise === "bigint" ? Number(paise) : paise;
  const rupees = amount / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(rupees);
}

/**
 * Format a nanosecond timestamp (IC Timestamp = bigint ns) or millisecond epoch to a human date
 */
export function formatDate(
  timestamp: bigint | number,
  opts?: Intl.DateTimeFormatOptions,
): string {
  const ms =
    typeof timestamp === "bigint"
      ? Number(timestamp / BigInt(1_000_000))
      : timestamp;
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...opts,
  }).format(new Date(ms));
}

/**
 * Format a timestamp as a short date+time
 */
export function formatDateTime(timestamp: bigint | number): string {
  return formatDate(timestamp, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Get days remaining until the event date
 * eventDate is a nanosecond IC Timestamp (bigint)
 */
export function getDaysToEvent(eventDate: bigint | number): number {
  const ms =
    typeof eventDate === "bigint"
      ? Number(eventDate / BigInt(1_000_000))
      : eventDate;
  const now = Date.now();
  const diff = ms - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Calculate cancellation fee based on days to event
 * Tiers (default policy):
 *   7+ days:  10% fee
 *   3–7 days: 25% fee
 *   <3 days:  50% fee
 */
export function calculateCancellationFee(
  eventDate: bigint | number,
  totalPrice: bigint | number,
  tier1Days = 7,
  tier1FeePercent = 10,
  tier2Days = 3,
  tier2FeePercent = 25,
  tier3FeePercent = 50,
): {
  feePercent: number;
  feeAmount: number;
  refundAmount: number;
  daysToEvent: number;
} {
  const days = getDaysToEvent(eventDate);
  const total =
    typeof totalPrice === "bigint" ? Number(totalPrice) : totalPrice;

  let feePercent: number;
  if (days >= tier1Days) {
    feePercent = tier1FeePercent;
  } else if (days >= tier2Days) {
    feePercent = tier2FeePercent;
  } else {
    feePercent = tier3FeePercent;
  }

  const feeAmount = Math.round((total * feePercent) / 100);
  const refundAmount = total - feeAmount;

  return { feePercent, feeAmount, refundAmount, daysToEvent: days };
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}

/**
 * Get initials from a name for avatar fallback
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Convert JS Date to nanosecond IC Timestamp
 */
export function dateToTimestamp(date: Date): bigint {
  return BigInt(date.getTime()) * BigInt(1_000_000);
}

/**
 * Convert nanosecond IC Timestamp to JS Date
 */
export function timestampToDate(timestamp: bigint): Date {
  return new Date(Number(timestamp / BigInt(1_000_000)));
}

import type { Principal } from "@icp-sdk/core/principal";

// Re-export backend enums and types for use throughout the frontend
export {
  UserRole,
  VendorStatus,
  BookingStatus,
  PaymentStatus,
  ApprovalStatus,
} from "@/backend";

export type {
  Vendor,
  StallPackage,
  Booking,
  Review,
  PlatformConfig,
  AnalyticsSummary,
  CancellationPolicy,
  CreateBookingRequest,
  CreateVendorRequest,
  UpdateVendorRequest,
  VendorFilter,
  BookingFilter,
  DateRangeResult,
  UserApprovalInfo,
  ShoppingItem,
  StripeSessionStatus,
  StripeConfiguration,
  VendorId,
  BookingId,
  PackageId,
  UserId,
  ReviewId,
  Timestamp,
  ExternalBlob,
} from "@/backend";

// Frontend-only types
export type NavItem = {
  label: string;
  href: string;
  icon?: string;
};

export type BookingStep = 1 | 2 | 3 | 4 | 5;

export type ToastType = "success" | "error" | "info" | "warning";

export interface ApiError {
  message: string;
  code?: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CancellationFeeResult {
  feePercent: number;
  feeAmount: number;
  refundAmount: number;
  daysToEvent: number;
}

export type PaymentMethod = "advance" | "full";

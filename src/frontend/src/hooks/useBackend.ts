import { createActor } from "@/backend";
import type {
  AnalyticsSummary,
  Booking,
  BookingFilter,
  BookingId,
  BookingStatus,
  CreateBookingRequest,
  CreateVendorRequest,
  DateRangeResult,
  PackageId,
  PlatformConfig,
  Review,
  StallPackage,
  Timestamp,
  UpdateVendorRequest,
  Vendor,
  VendorFilter,
  VendorId,
} from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useBackendActor() {
  return useActor(createActor);
}

// ─── Vendor Queries ────────────────────────────────────────────────────────────

export function useVendors(filter: VendorFilter = {}) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Vendor[]>({
    queryKey: ["vendors", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listVendors(filter);
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1000,
  });
}

export function useVendor(vendorId: VendorId | undefined) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Vendor | null>({
    queryKey: ["vendor", vendorId],
    queryFn: async () => {
      if (!actor || !vendorId) return null;
      return actor.getVendor(vendorId);
    },
    enabled: !!actor && !isFetching && !!vendorId,
  });
}

export function useVendorPackages(vendorId: VendorId | undefined) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<StallPackage[]>({
    queryKey: ["packages", vendorId],
    queryFn: async () => {
      if (!actor || !vendorId) return [];
      return actor.listPackagesByVendor(vendorId);
    },
    enabled: !!actor && !isFetching && !!vendorId,
  });
}

export function useVendorReviews(vendorId: VendorId | undefined) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Review[]>({
    queryKey: ["reviews", vendorId],
    queryFn: async () => {
      if (!actor || !vendorId) return [];
      return actor.getReviewsByVendor(vendorId);
    },
    enabled: !!actor && !isFetching && !!vendorId,
  });
}

export function useUnavailableDates(vendorId: VendorId | undefined) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Timestamp[]>({
    queryKey: ["unavailableDates", vendorId],
    queryFn: async () => {
      if (!actor || !vendorId) return [];
      return actor.getUnavailableDates(vendorId);
    },
    enabled: !!actor && !isFetching && !!vendorId,
  });
}

// ─── Booking Queries ───────────────────────────────────────────────────────────

export function useBookings(filter: BookingFilter = {}) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Booking[]>({
    queryKey: ["bookings", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listBookings(filter);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBooking(bookingId: BookingId | undefined) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Booking | null>({
    queryKey: ["booking", bookingId],
    queryFn: async () => {
      if (!actor || !bookingId) return null;
      return actor.getBooking(bookingId);
    },
    enabled: !!actor && !isFetching && !!bookingId,
  });
}

export function useBookingsByDateRange(from: Timestamp, to: Timestamp) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<DateRangeResult[]>({
    queryKey: ["bookingsByDateRange", from, to],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBookingsByDateRange(from, to);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRevenueByDateRange(from: Timestamp, to: Timestamp) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<DateRangeResult[]>({
    queryKey: ["revenueByDateRange", from, to],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRevenueByDateRange(from, to);
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Analytics & Config ────────────────────────────────────────────────────────

export function useAnalyticsSummary() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<AnalyticsSummary | null>({
    queryKey: ["analyticsSummary"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAnalyticsSummary();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60 * 1000,
  });
}

export function usePlatformConfig() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<PlatformConfig | null>({
    queryKey: ["platformConfig"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPlatformConfig();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

// ─── Booking Mutations ─────────────────────────────────────────────────────────

export function useCreateBooking() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();

  return useMutation<Booking, Error, CreateBookingRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createBooking(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

export function useUpdateBookingStatus() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();

  return useMutation<
    Booking,
    Error,
    { bookingId: BookingId; status: BookingStatus }
  >({
    mutationFn: async ({ bookingId, status }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateBookingStatus(bookingId, status);
    },
    onSuccess: (_, { bookingId }) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
    },
  });
}

export function useCancelBooking() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();

  return useMutation<Booking, Error, BookingId>({
    mutationFn: async (bookingId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.cancelBooking(bookingId);
    },
    onSuccess: (_, bookingId) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
    },
  });
}

export function useConfirmPayment() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();

  return useMutation<
    Booking,
    Error,
    { bookingId: BookingId; paymentIntentId: string }
  >({
    mutationFn: async ({ bookingId, paymentIntentId }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.confirmPayment(bookingId, paymentIntentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

// ─── Vendor Mutations ──────────────────────────────────────────────────────────

export function useCreateVendorProfile() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();

  return useMutation<Vendor, Error, CreateVendorRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createVendorProfile(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    },
  });
}

export function useUpdateVendorProfile() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();

  return useMutation<
    Vendor,
    Error,
    { vendorId: VendorId; req: UpdateVendorRequest }
  >({
    mutationFn: async ({ vendorId, req }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateVendorProfile(vendorId, req);
    },
    onSuccess: (_, { vendorId }) => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      queryClient.invalidateQueries({ queryKey: ["vendor", vendorId] });
    },
  });
}

export function useApproveVendor() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    { vendorId: VendorId; commissionRate: number }
  >({
    mutationFn: async ({ vendorId, commissionRate }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.approveVendor(vendorId, commissionRate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    },
  });
}

export function useRejectVendor() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, VendorId>({
    mutationFn: async (vendorId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.rejectVendor(vendorId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    },
  });
}

export function useToggleFeatured() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, VendorId>({
    mutationFn: async (vendorId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.toggleFeatured(vendorId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    },
  });
}

// ─── Package Mutations ─────────────────────────────────────────────────────────

export function useCreatePackage() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();

  type CreatePkgArgs = {
    vendorId: VendorId;
    pkg: {
      name: string;
      travelCharge: bigint;
      inclusions: string[];
      setupCharge: bigint;
      price: bigint;
      guestMax: bigint;
      guestMin: bigint;
    };
  };

  return useMutation<StallPackage, Error, CreatePkgArgs>({
    mutationFn: async ({ vendorId, pkg }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createPackage(vendorId, pkg);
    },
    onSuccess: (_, { vendorId }) => {
      queryClient.invalidateQueries({ queryKey: ["packages", vendorId] });
    },
  });
}

export function useDeletePackage() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, PackageId>({
    mutationFn: async (packageId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deletePackage(packageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });
}
export function useUpdatePackage() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();

  type UpdatePkgArgs = {
    packageId: PackageId;
    vendorId: VendorId;
    pkg: {
      name?: string;
      travelCharge?: bigint;
      inclusions?: string[];
      setupCharge?: bigint;
      price?: bigint;
      guestMax?: bigint;
      guestMin?: bigint;
      isActive?: boolean;
    };
  };

  return useMutation<import("@/types").StallPackage, Error, UpdatePkgArgs>({
    mutationFn: async ({ packageId, pkg }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updatePackage(packageId, pkg);
    },
    onSuccess: (_, { vendorId }) => {
      queryClient.invalidateQueries({ queryKey: ["packages", vendorId] });
    },
  });
}

export function useMarkUnavailableDate() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, { vendorId: VendorId; date: Timestamp }>({
    mutationFn: async ({ vendorId, date }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.markUnavailableDate(vendorId, date);
    },
    onSuccess: (_, { vendorId }) => {
      queryClient.invalidateQueries({
        queryKey: ["unavailableDates", vendorId],
      });
    },
  });
}

// ─── Review Mutations ──────────────────────────────────────────────────────────

export function useCreateReview() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();

  return useMutation<
    Review,
    Error,
    { bookingId: BookingId; rating: bigint; comment: string }
  >({
    mutationFn: async ({ bookingId, rating, comment }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createReview(bookingId, rating, comment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}

// ─── Platform Config Mutations ─────────────────────────────────────────────────

export function useUpdatePlatformConfig() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, PlatformConfig>({
    mutationFn: async (config) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updatePlatformConfig(config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platformConfig"] });
    },
  });
}

// ─── Stripe ────────────────────────────────────────────────────────────────────

export function useCreateCheckoutSession() {
  const { actor } = useBackendActor();

  return useMutation<
    string,
    Error,
    {
      items: import("@/types").ShoppingItem[];
      successUrl: string;
      cancelUrl: string;
    }
  >({
    mutationFn: async ({ items, successUrl, cancelUrl }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createCheckoutSession(items, successUrl, cancelUrl);
    },
  });
}

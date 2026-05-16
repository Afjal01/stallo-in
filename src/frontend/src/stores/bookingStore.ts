import type { PackageId, PaymentMethod, VendorId } from "@/types";
import type { StallPackage, Vendor } from "@/types";
import { create } from "zustand";

export type BookingStep = 1 | 2 | 3 | 4 | 5;

interface BookingState {
  step: BookingStep;
  selectedVendor: Vendor | null;
  selectedPackage: StallPackage | null;
  eventDate: Date | null;
  eventVenue: string;
  guestCount: number;
  notes: string;
  paymentMethod: PaymentMethod;
  // Stripe
  checkoutUrl: string | null;
  bookingId: string | null;
}

interface BookingActions {
  setStep: (step: BookingStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  setVendor: (vendor: Vendor | null) => void;
  setPackage: (pkg: StallPackage | null) => void;
  setEventDate: (date: Date | null) => void;
  setEventVenue: (venue: string) => void;
  setGuestCount: (count: number) => void;
  setNotes: (notes: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setCheckoutUrl: (url: string | null) => void;
  setBookingId: (id: string | null) => void;
  reset: () => void;
  // Convenience: initialize from vendor/package IDs (for URL-based nav)
  initFromVendorId: (vendorId: VendorId) => void;
  initFromPackageId: (packageId: PackageId) => void;
}

const initialState: BookingState = {
  step: 1,
  selectedVendor: null,
  selectedPackage: null,
  eventDate: null,
  eventVenue: "",
  guestCount: 100,
  notes: "",
  paymentMethod: "advance",
  checkoutUrl: null,
  bookingId: null,
};

export const useBookingStore = create<BookingState & BookingActions>(
  (set, get) => ({
    ...initialState,

    setStep: (step) => set({ step }),

    nextStep: () => {
      const current = get().step;
      if (current < 5) set({ step: (current + 1) as BookingStep });
    },

    prevStep: () => {
      const current = get().step;
      if (current > 1) set({ step: (current - 1) as BookingStep });
    },

    setVendor: (vendor) => set({ selectedVendor: vendor }),
    setPackage: (pkg) => set({ selectedPackage: pkg }),
    setEventDate: (date) => set({ eventDate: date }),
    setEventVenue: (venue) => set({ eventVenue: venue }),
    setGuestCount: (count) => set({ guestCount: count }),
    setNotes: (notes) => set({ notes }),
    setPaymentMethod: (method) => set({ paymentMethod: method }),
    setCheckoutUrl: (url) => set({ checkoutUrl: url }),
    setBookingId: (id) => set({ bookingId: id }),

    reset: () => set(initialState),

    // These are stubs — actual data loading happens in the page components
    initFromVendorId: (_vendorId) => {
      // Page components will call setVendor after fetching
    },
    initFromPackageId: (_packageId) => {
      // Page components will call setPackage after fetching
    },
  }),
);

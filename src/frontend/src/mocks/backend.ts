import type { backendInterface } from "../backend.d";
import {
  ApprovalStatus,
  BookingStatus,
  PaymentStatus,
  UserRole,
  VendorStatus,
} from "../backend";

// Mock ExternalBlob-like object that satisfies the photos array type
const mockPhoto = {
  getDirectURL: () => "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
  getBytes: async () => new Uint8Array(),
  withUploadProgress: function () { return this; },
} as any;

const mockPhoto2 = {
  getDirectURL: () => "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
  getBytes: async () => new Uint8Array(),
  withUploadProgress: function () { return this; },
} as any;

const NOW = BigInt(Date.now()) * BigInt(1_000_000);
const FUTURE = BigInt(Date.now() + 30 * 24 * 60 * 60 * 1000) * BigInt(1_000_000);

const mockVendors = [
  {
    id: "vendor-1",
    businessName: "Sharma Chaat Corner",
    ownerName: "Ramesh Sharma",
    ownerId: { toText: () => "aaaaa-aa" } as any,
    createdAt: NOW,
    serviceArea: "Nawada, Bihar",
    description: "Premium chaat stall with 15 years of experience serving weddings across Bihar. Specialising in golgappa, aloo tikki, and dahi bhalla.",
    email: "sharma.chaat@example.com",
    isFeatured: true,
    category: "Chaat",
    commissionRate: 10,
    rating: 4.8,
    phone: "+91 98765 43210",
    reviewCount: BigInt(127),
    verificationStatus: VendorStatus.approved,
    photos: [mockPhoto, mockPhoto2],
  },
  {
    id: "vendor-2",
    businessName: "Punjab Da Dhaba",
    ownerName: "Gurpreet Singh",
    ownerId: { toText: () => "bbbbb-bb" } as any,
    createdAt: NOW,
    serviceArea: "Patna, Bihar",
    description: "Authentic Punjabi food stall bringing the taste of Punjab to your wedding. Chowmein, momos, and live counter service.",
    email: "punjab.dhaba@example.com",
    isFeatured: true,
    category: "Chinese",
    commissionRate: 10,
    rating: 4.6,
    phone: "+91 87654 32109",
    reviewCount: BigInt(89),
    verificationStatus: VendorStatus.approved,
    photos: [mockPhoto],
  },
  {
    id: "vendor-3",
    businessName: "Sweet Creamery Co.",
    ownerName: "Priya Verma",
    ownerId: { toText: () => "ccccc-cc" } as any,
    createdAt: NOW,
    serviceArea: "Gaya, Bihar",
    description: "Premium ice cream and dessert stall for weddings. Artisanal flavours, live preparation, and customised presentations.",
    email: "sweet.creamery@example.com",
    isFeatured: false,
    category: "Ice Cream",
    commissionRate: 8,
    rating: 4.9,
    phone: "+91 76543 21098",
    reviewCount: BigInt(203),
    verificationStatus: VendorStatus.approved,
    photos: [mockPhoto, mockPhoto2],
  },
  {
    id: "vendor-4",
    businessName: "South Indian Delight",
    ownerName: "Venkatesh Iyer",
    ownerId: { toText: () => "ddddd-dd" } as any,
    createdAt: NOW,
    serviceArea: "Nawada, Bihar",
    description: "Live dosa counter with authentic South Indian recipes. Masala dosa, uttapam, idli, and more.",
    email: "si.delight@example.com",
    isFeatured: false,
    category: "South Indian",
    commissionRate: 10,
    rating: 4.5,
    phone: "+91 65432 10987",
    reviewCount: BigInt(56),
    verificationStatus: VendorStatus.pending,
    photos: [mockPhoto],
  },
];

const mockBookings = [
  {
    id: "booking-1",
    paymentStatus: PaymentStatus.paid,
    guestCount: BigInt(250),
    createdAt: NOW,
    updatedAt: NOW,
    bookingStatus: BookingStatus.confirmed,
    cancellationFeePercent: BigInt(0),
    advanceAmount: BigInt(500000),
    vendorId: "vendor-1",
    notes: "Wedding reception. Please arrange for 250 guests. Extra spicy chutneys requested.",
    eventVenue: "Royal Palace Banquet, Nawada",
    customerId: { toText: () => "eeeee-ee" } as any,
    stripePaymentIntentId: "pi_mock_123",
    totalPrice: BigInt(2500000),
    packageId: "pkg-1",
    eventDate: FUTURE,
  },
  {
    id: "booking-2",
    paymentStatus: PaymentStatus.pending,
    guestCount: BigInt(150),
    createdAt: NOW,
    updatedAt: NOW,
    bookingStatus: BookingStatus.pending,
    cancellationFeePercent: BigInt(0),
    advanceAmount: BigInt(300000),
    vendorId: "vendor-2",
    notes: undefined,
    eventVenue: "Garden View Marriage Hall, Patna",
    customerId: { toText: () => "eeeee-ee" } as any,
    stripePaymentIntentId: undefined,
    totalPrice: BigInt(1500000),
    packageId: "pkg-2",
    eventDate: BigInt(Date.now() + 60 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
  },
];

const mockPackages = [
  {
    id: "pkg-1",
    name: "Standard Wedding Package",
    vendorId: "vendor-1",
    price: BigInt(2500000),
    guestMin: BigInt(100),
    guestMax: BigInt(300),
    inclusions: ["Golgappa counter", "Aloo tikki", "Dahi bhalla", "Serving staff", "Setup & cleanup"],
    setupCharge: BigInt(500000),
    travelCharge: BigInt(100000),
    isActive: true,
  },
  {
    id: "pkg-2",
    name: "Premium Deluxe Package",
    vendorId: "vendor-1",
    price: BigInt(4500000),
    guestMin: BigInt(200),
    guestMax: BigInt(600),
    inclusions: ["Full chaat menu", "Live counter", "Mocktails station", "Decorative setup", "Senior staff", "Setup & cleanup", "1 hour extended service"],
    setupCharge: BigInt(800000),
    travelCharge: BigInt(150000),
    isActive: true,
  },
];

export const mockBackend: backendInterface = {
  // Vendor operations
  listVendors: async (_filter) => mockVendors,
  getVendor: async (vendorId) => mockVendors.find(v => v.id === vendorId) ?? null,
  createVendorProfile: async (req) => ({
    ...req,
    id: "vendor-new",
    ownerId: { toText: () => "fffff-ff" } as any,
    createdAt: NOW,
    isFeatured: false,
    commissionRate: 10,
    rating: 0,
    reviewCount: BigInt(0),
    verificationStatus: VendorStatus.pending,
    photos: [],
  }),
  updateVendorProfile: async (vendorId, req) => ({
    ...mockVendors[0],
    ...req,
    id: vendorId,
    photos: req.photos ?? mockVendors[0].photos,
  }),
  approveVendor: async () => undefined,
  rejectVendor: async () => undefined,
  toggleFeatured: async () => undefined,

  // Package operations
  listPackagesByVendor: async (_vendorId) => mockPackages,
  getPackage: async (packageId) => mockPackages.find(p => p.id === packageId) ?? null,
  createPackage: async (_vendorId, pkg) => ({ ...pkg, id: "pkg-new", vendorId: _vendorId, isActive: true }),
  updatePackage: async (packageId, pkg) => ({ ...mockPackages[0], ...pkg, id: packageId }),
  deletePackage: async () => undefined,

  // Booking operations
  listBookings: async (_filter) => mockBookings,
  getBooking: async (bookingId) => mockBookings.find(b => b.id === bookingId) ?? null,
  createBooking: async (req) => ({
    id: "booking-new",
    ...req,
    paymentStatus: PaymentStatus.pending,
    createdAt: NOW,
    updatedAt: NOW,
    bookingStatus: BookingStatus.pending,
    cancellationFeePercent: BigInt(0),
    advanceAmount: BigInt(500000),
    totalPrice: BigInt(2500000),
    customerId: { toText: () => "eeeee-ee" } as any,
  }),
  cancelBooking: async () => mockBookings[0],
  updateBookingStatus: async (bookingId, status) => ({ ...mockBookings[0], id: bookingId, bookingStatus: status }),
  calculateCancellationFee: async () => BigInt(250000),

  // Payment
  confirmPayment: async (bookingId) => ({ ...mockBookings[0], id: bookingId, paymentStatus: PaymentStatus.paid }),
  createCheckoutSession: async () => "https://checkout.stripe.com/mock_session",
  getStripeSessionStatus: async () => ({ __kind__: "completed", completed: { response: "paid", userPrincipal: undefined } }),
  isStripeConfigured: async () => true,
  setStripeConfiguration: async () => undefined,

  // Reviews
  getReviewsByVendor: async () => [
    {
      id: "review-1",
      bookingId: "booking-1",
      createdAt: NOW,
      comment: "Excellent service! The chaat was absolutely delicious and the stall was beautifully presented. Our guests loved it.",
      vendorId: "vendor-1",
      customerId: { toText: () => "eeeee-ee" } as any,
      rating: BigInt(5),
    },
    {
      id: "review-2",
      bookingId: "booking-2",
      createdAt: NOW,
      comment: "Very professional team. Arrived on time, setup was great, and the food quality was top-notch.",
      vendorId: "vendor-1",
      customerId: { toText: () => "fffff-ff" } as any,
      rating: BigInt(5),
    },
  ],
  createReview: async (bookingId, rating, comment) => ({
    id: "review-new",
    bookingId,
    createdAt: NOW,
    comment,
    vendorId: "vendor-1",
    customerId: { toText: () => "eeeee-ee" } as any,
    rating,
  }),

  // Analytics
  getAnalyticsSummary: async () => ({
    commissionRevenue: BigInt(150000),
    cancelledBookings: BigInt(5),
    totalBookings: BigInt(87),
    completedBookings: BigInt(62),
    totalRevenue: BigInt(15000000),
    totalCustomers: BigInt(74),
    totalVendors: BigInt(18),
    activeVendors: BigInt(14),
  }),
  getBookingsByDateRange: async () => [
    { date: NOW, count: BigInt(12), revenue: BigInt(3000000) },
    { date: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000) * BigInt(1_000_000), count: BigInt(8), revenue: BigInt(2000000) },
  ],
  getRevenueByDateRange: async () => [
    { date: NOW, count: BigInt(12), revenue: BigInt(3000000) },
    { date: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000) * BigInt(1_000_000), count: BigInt(8), revenue: BigInt(2000000) },
  ],

  // Platform config
  getPlatformConfig: async () => ({
    advancePaymentPercent: BigInt(20),
    globalCommissionPercent: 10,
    cancellationPolicy: {
      tier1Days: BigInt(7),
      tier1FeePercent: BigInt(10),
      tier2Days: BigInt(3),
      tier2FeePercent: BigInt(25),
      tier3FeePercent: BigInt(50),
    },
  }),
  updatePlatformConfig: async () => undefined,

  // User role / auth
  getCallerUserRole: async () => UserRole.user,
  isCallerAdmin: async () => false,
  isCallerApproved: async () => true,
  assignCallerUserRole: async () => undefined,

  // Approval
  requestApproval: async () => undefined,
  setApproval: async () => undefined,
  listApprovals: async () => [
    {
      principal: { toText: () => "ggggg-gg" } as any,
      status: ApprovalStatus.pending,
    },
  ],

  // Availability
  getUnavailableDates: async () => [],
  markUnavailableDate: async () => undefined,

  // Notifications / emails
  sendBookingConfirmationEmail: async () => undefined,
  sendCancellationEmail: async () => undefined,
  sendNewBookingNotificationToVendor: async () => undefined,
  sendPaymentConfirmationEmail: async () => undefined,
  sendVendorApprovalEmail: async () => undefined,

  // Refund
  processRefund: async () => undefined,

  // Transform (HTTP outcall passthrough)
  transform: async (input) => ({ status: BigInt(200), body: input.response.body, headers: [] }),
};

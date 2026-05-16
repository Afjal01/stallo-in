import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface AnalyticsSummary {
    commissionRevenue: bigint;
    vendorPayouts: bigint;
    cancelledBookings: bigint;
    totalBookings: bigint;
    topVendors: Array<VendorBookingStat>;
    completedBookings: bigint;
    totalRevenue: bigint;
    totalCustomers: bigint;
    totalVendors: bigint;
    activeVendors: bigint;
}
export interface VendorFilter {
    serviceArea?: string;
    status?: VendorStatus;
    featured?: boolean;
    category?: string;
}
export interface PagedVendors {
    total: bigint;
    offset: bigint;
    limit: bigint;
    items: Array<Vendor>;
}
export interface PlatformConfig {
    advancePaymentPercent: bigint;
    cancellationPolicy: CancellationPolicy;
    globalCommissionPercent: number;
}
export interface CancellationPolicy {
    tier1Days: bigint;
    tier1FeePercent: bigint;
    tier3FeePercent: bigint;
    tier2FeePercent: bigint;
    tier2Days: bigint;
}
export interface DateRangeResult {
    revenue: bigint;
    date: Timestamp;
    count: bigint;
}
export interface VendorBookingStat {
    revenue: bigint;
    vendorId: VendorId;
    vendorName: string;
    bookingCount: bigint;
}
export interface CategoryBreakdown {
    categoryId: string;
    revenue: bigint;
    categoryName: string;
    bookingCount: bigint;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type PackageId = string;
export interface StallPackage {
    id: PackageId;
    name: string;
    travelCharge: bigint;
    isActive: boolean;
    inclusions: Array<string>;
    setupCharge: bigint;
    vendorId: VendorId;
    price: bigint;
    guestMax: bigint;
    guestMin: bigint;
}
export interface BookingFilter {
    status?: BookingStatus;
    toDate?: Timestamp;
    vendorId?: VendorId;
    fromDate?: Timestamp;
    customerId?: UserId;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface Vendor {
    id: VendorId;
    serviceArea: string;
    ownerName: string;
    ownerId: UserId;
    createdAt: Timestamp;
    businessName: string;
    description: string;
    email: string;
    isFeatured: boolean;
    category: string;
    commissionRate: number;
    rating: number;
    phone: string;
    reviewCount: bigint;
    verificationStatus: VendorStatus;
    photos: Array<ExternalBlob>;
}
export type ReviewId = string;
export interface Review {
    id: ReviewId;
    bookingId: BookingId;
    createdAt: Timestamp;
    comment: string;
    vendorId: VendorId;
    customerId: UserId;
    rating: bigint;
}
export interface Booking {
    id: BookingId;
    paymentStatus: PaymentStatus;
    guestCount: bigint;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    bookingStatus: BookingStatus;
    cancellationFeePercent: bigint;
    advanceAmount: bigint;
    vendorId: VendorId;
    notes?: string;
    vendorPayout: bigint;
    commissionAmount: bigint;
    eventVenue: string;
    customerId: UserId;
    stripePaymentIntentId?: string;
    totalPrice: bigint;
    packageId: PackageId;
    eventDate: Timestamp;
}
export interface UpdateVendorRequest {
    serviceArea?: string;
    ownerName?: string;
    businessName?: string;
    description?: string;
    email?: string;
    category?: string;
    phone?: string;
    photos?: Array<ExternalBlob>;
}
export type BookingId = string;
export interface CreateBookingRequest {
    guestCount: bigint;
    vendorId: VendorId;
    notes?: string;
    eventVenue: string;
    packageId: PackageId;
    eventDate: Timestamp;
}
export interface CreateVendorRequest {
    serviceArea: string;
    ownerName: string;
    businessName: string;
    description: string;
    email: string;
    category: string;
    phone: string;
    photos: Array<ExternalBlob>;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type UserId = Principal;
export interface UserApprovalInfo {
    status: ApprovalStatus;
    principal: Principal;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export type VendorId = string;
export interface PagedBookings {
    total: bigint;
    offset: bigint;
    limit: bigint;
    items: Array<Booking>;
}
export enum ApprovalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum BookingStatus {
    preparing = "preparing",
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed",
    dispatched = "dispatched",
    confirmed = "confirmed"
}
export enum PaymentStatus {
    pending = "pending",
    paid = "paid",
    refunded = "refunded",
    partiallyPaid = "partiallyPaid",
    failed = "failed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum VendorStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected",
    suspended = "suspended"
}
export interface backendInterface {
    approveVendor(vendorId: VendorId, commissionRate: number): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    calculateCancellationFee(bookingId: BookingId): Promise<bigint>;
    cancelBooking(bookingId: BookingId): Promise<Booking>;
    confirmPayment(bookingId: BookingId, paymentIntentId: string): Promise<Booking>;
    createBooking(req: CreateBookingRequest): Promise<Booking>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createPackage(vendorId: VendorId, pkg: {
        name: string;
        travelCharge: bigint;
        inclusions: Array<string>;
        setupCharge: bigint;
        price: bigint;
        guestMax: bigint;
        guestMin: bigint;
    }): Promise<StallPackage>;
    createReview(bookingId: BookingId, rating: bigint, comment: string): Promise<Review>;
    createVendorProfile(req: CreateVendorRequest): Promise<Vendor>;
    deletePackage(packageId: PackageId): Promise<void>;
    getAnalyticsSummary(): Promise<AnalyticsSummary>;
    getBooking(bookingId: BookingId): Promise<Booking | null>;
    getBookingsByDateRange(from: Timestamp, to: Timestamp, groupBy: string | null): Promise<Array<DateRangeResult>>;
    getCallerUserRole(): Promise<UserRole>;
    getCategoryBreakdown(): Promise<Array<CategoryBreakdown>>;
    getPackage(packageId: PackageId): Promise<StallPackage | null>;
    getPlatformConfig(): Promise<PlatformConfig>;
    getRevenueByDateRange(from: Timestamp, to: Timestamp, groupBy: string | null): Promise<Array<DateRangeResult>>;
    getReviewsByVendor(vendorId: VendorId): Promise<Array<Review>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUnavailableDates(vendorId: VendorId): Promise<Array<Timestamp>>;
    getVendor(vendorId: VendorId): Promise<Vendor | null>;
    isCallerAdmin(): Promise<boolean>;
    isCallerApproved(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    listApprovals(): Promise<Array<UserApprovalInfo>>;
    listBookings(filter: BookingFilter, offset: bigint, limit: bigint): Promise<PagedBookings>;
    listPackagesByVendor(vendorId: VendorId): Promise<Array<StallPackage>>;
    listVendors(filter: VendorFilter, offset: bigint, limit: bigint): Promise<PagedVendors>;
    markUnavailableDate(vendorId: VendorId, date: Timestamp): Promise<void>;
    processRefund(bookingId: BookingId): Promise<void>;
    rejectVendor(vendorId: VendorId): Promise<void>;
    requestApproval(): Promise<void>;
    sendBookingConfirmationEmail(bookingId: BookingId, recipientEmail: string, customerName: string): Promise<void>;
    sendCancellationEmail(bookingId: BookingId, recipientEmail: string, customerName: string, refundAmount: bigint): Promise<void>;
    sendNewBookingNotificationToVendor(vendorEmail: string, vendorName: string, bookingId: BookingId): Promise<void>;
    sendPaymentConfirmationEmail(bookingId: BookingId, recipientEmail: string, customerName: string, amount: bigint): Promise<void>;
    sendVendorApprovalEmail(vendorEmail: string, vendorName: string, approved: boolean): Promise<void>;
    setApproval(user: Principal, status: ApprovalStatus): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    toggleFeatured(vendorId: VendorId): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateBookingStatus(bookingId: BookingId, status: BookingStatus): Promise<Booking>;
    updatePackage(packageId: PackageId, pkg: {
        name?: string;
        travelCharge?: bigint;
        isActive?: boolean;
        inclusions?: Array<string>;
        setupCharge?: bigint;
        price?: bigint;
        guestMax?: bigint;
        guestMin?: bigint;
    }): Promise<StallPackage>;
    updatePlatformConfig(config: PlatformConfig): Promise<void>;
    updateVendorProfile(vendorId: VendorId, req: UpdateVendorRequest): Promise<Vendor>;
}

import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-load pages for code splitting
const HomePage = lazy(() => import("@/pages/Home"));
const LoginPage = lazy(() => import("@/pages/Login"));
const BrowsePage = lazy(() => import("@/pages/Browse"));
const StallDetailPage = lazy(() => import("@/pages/StallDetail"));
const BookingPage = lazy(() => import("@/pages/Booking"));
const VendorRegisterPage = lazy(() => import("@/pages/VendorRegister"));
const AboutPage = lazy(() => import("@/pages/About"));
const HowItWorksPage = lazy(() => import("@/pages/HowItWorks"));
const ContactPage = lazy(() => import("@/pages/Contact"));
const TermsPage = lazy(() => import("@/pages/Terms"));
const PrivacyPage = lazy(() => import("@/pages/Privacy"));
const CancellationPolicyPage = lazy(() => import("@/pages/CancellationPolicy"));

// Customer dashboard pages
const CustomerDashboardPage = lazy(() => import("@/pages/customer/Dashboard"));
const CustomerBookingsPage = lazy(() => import("@/pages/customer/Bookings"));
const CustomerBookingDetailPage = lazy(
  () => import("@/pages/customer/BookingDetail"),
);
const CustomerSavedPage = lazy(() => import("@/pages/customer/Saved"));
const CustomerProfilePage = lazy(() => import("@/pages/customer/Profile"));

// Vendor dashboard pages
const VendorOrdersPage = lazy(() => import("@/pages/vendor/Orders"));
const VendorOrderDetailPage = lazy(() => import("@/pages/vendor/OrderDetail"));
const VendorPackagesPage = lazy(() => import("@/pages/vendor/Packages"));
const VendorEarningsPage = lazy(() => import("@/pages/vendor/Earnings"));
const VendorProfilePage = lazy(() => import("@/pages/vendor/Profile"));
const VendorCalendarPage = lazy(() => import("@/pages/vendor/Calendar"));

// Admin dashboard pages
const AdminDashboardPage = lazy(() => import("@/pages/admin/Dashboard"));
const AdminVendorsPage = lazy(() => import("@/pages/admin/Vendors"));
const AdminBookingsPage = lazy(() => import("@/pages/admin/Bookings"));
const AdminAnalyticsPage = lazy(() => import("@/pages/admin/Analytics"));
const AdminSettingsPage = lazy(() => import("@/pages/admin/Settings"));

function PageFallback() {
  return (
    <div className="p-8 space-y-3">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

// Root route
const rootRoute = createRootRoute();

// Public routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <HomePage />
    </Suspense>
  ),
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <LoginPage />
    </Suspense>
  ),
});
const browseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/browse",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <BrowsePage />
    </Suspense>
  ),
  validateSearch: (s: Record<string, unknown>) => ({
    category: s.category as string | undefined,
    search: s.search as string | undefined,
  }),
});
const stallDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/stall/$vendorId",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <StallDetailPage />
    </Suspense>
  ),
});
const bookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/book/$vendorId",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <BookingPage />
    </Suspense>
  ),
});
const vendorRegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vendor/register",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <VendorRegisterPage />
    </Suspense>
  ),
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <AboutPage />
    </Suspense>
  ),
});
const howItWorksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/how-it-works",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <HowItWorksPage />
    </Suspense>
  ),
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ContactPage />
    </Suspense>
  ),
});
const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <TermsPage />
    </Suspense>
  ),
});
const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <PrivacyPage />
    </Suspense>
  ),
});
const cancellationPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cancellation-policy",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <CancellationPolicyPage />
    </Suspense>
  ),
});

function requireAuth() {
  const role = window.localStorage.getItem("stallo_caller_role");
  if (!role || role === "guest") {
    throw redirect({ to: "/login" });
  }
}

function requireAdmin() {
  requireAuth();
  const role = window.localStorage.getItem("stallo_caller_role");
  if (role !== "admin") {
    throw redirect({ to: "/login" });
  }
}

// Customer dashboard routes
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  beforeLoad: requireAuth,
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <CustomerDashboardPage />
    </Suspense>
  ),
});
const dashboardBookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/bookings",
  beforeLoad: requireAuth,
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <CustomerBookingsPage />
    </Suspense>
  ),
});
const dashboardBookingDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/bookings/$bookingId",
  beforeLoad: requireAuth,
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <CustomerBookingDetailPage />
    </Suspense>
  ),
});
const dashboardSavedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/saved",
  beforeLoad: requireAuth,
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <CustomerSavedPage />
    </Suspense>
  ),
});
const dashboardProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/profile",
  beforeLoad: requireAuth,
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <CustomerProfilePage />
    </Suspense>
  ),
});

// Vendor dashboard routes
const vendorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vendor",
  beforeLoad: requireAuth,
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <VendorOrdersPage />
    </Suspense>
  ),
});
const vendorOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vendor/orders",
  beforeLoad: requireAuth,
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <VendorOrdersPage />
    </Suspense>
  ),
});
const vendorOrderDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vendor/orders/$orderId",
  beforeLoad: requireAuth,
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <VendorOrderDetailPage />
    </Suspense>
  ),
});
const vendorPackagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vendor/packages",
  beforeLoad: requireAuth,
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <VendorPackagesPage />
    </Suspense>
  ),
});
const vendorEarningsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vendor/earnings",
  beforeLoad: requireAuth,
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <VendorEarningsPage />
    </Suspense>
  ),
});
const vendorProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vendor/profile",
  beforeLoad: requireAuth,
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <VendorProfilePage />
    </Suspense>
  ),
});
const vendorCalendarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vendor/calendar",
  beforeLoad: requireAuth,
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <VendorCalendarPage />
    </Suspense>
  ),
});

// Admin dashboard routes
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  beforeLoad: requireAdmin,
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <AdminDashboardPage />
    </Suspense>
  ),
});
const adminVendorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/vendors",
  beforeLoad: requireAdmin,
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <AdminVendorsPage />
    </Suspense>
  ),
});
const adminBookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/bookings",
  beforeLoad: requireAdmin,
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <AdminBookingsPage />
    </Suspense>
  ),
});
const adminAnalyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/analytics",
  beforeLoad: requireAdmin,
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <AdminAnalyticsPage />
    </Suspense>
  ),
});
const adminSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/settings",
  beforeLoad: requireAdmin,
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <AdminSettingsPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  browseRoute,
  stallDetailRoute,
  bookingRoute,
  vendorRegisterRoute,
  aboutRoute,
  howItWorksRoute,
  contactRoute,
  termsRoute,
  privacyRoute,
  cancellationPolicyRoute,
  // Customer
  dashboardRoute,
  dashboardBookingsRoute,
  dashboardBookingDetailRoute,
  dashboardSavedRoute,
  dashboardProfileRoute,
  // Vendor
  vendorRoute,
  vendorOrdersRoute,
  vendorOrderDetailRoute,
  vendorPackagesRoute,
  vendorEarningsRoute,
  vendorProfileRoute,
  vendorCalendarRoute,
  // Admin
  adminRoute,
  adminVendorsRoute,
  adminBookingsRoute,
  adminAnalyticsRoute,
  adminSettingsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </>
  );
}

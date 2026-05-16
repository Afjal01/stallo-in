import { PackageCard } from "@/components/common/PackageCard";
import { StarRating } from "@/components/common/StarRating";
import { VerifiedBadge } from "@/components/common/VerifiedBadge";
import { RootLayout } from "@/components/layout/RootLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useVendor,
  useVendorPackages,
  useVendorReviews,
} from "@/hooks/useBackend";
import { formatDate, formatPrice } from "@/lib/utils";
import type { StallPackage, VendorStatus } from "@/types";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function StallDetailPage() {
  const { vendorId } = useParams({ from: "/stall/$vendorId" });
  const navigate = useNavigate();
  const { data: vendor, isLoading: vendorLoading } = useVendor(vendorId);
  const { data: packages = [], isLoading: pkgsLoading } =
    useVendorPackages(vendorId);
  const { data: reviews = [] } = useVendorReviews(vendorId);
  const [selectedPkg, setSelectedPkg] = useState<StallPackage | null>(null);

  if (vendorLoading) {
    return (
      <RootLayout>
        <div className="container py-8 space-y-5">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-72 w-full rounded-2xl" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-10 w-72" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
            <Skeleton className="h-48 rounded-xl" />
          </div>
        </div>
      </RootLayout>
    );
  }

  if (!vendor) {
    return (
      <RootLayout>
        <div className="container py-24 text-center">
          <span className="text-6xl mb-4 block">🤷</span>
          <h2 className="font-display font-semibold text-2xl mb-3">
            Vendor not found
          </h2>
          <p className="text-muted-foreground mb-6">
            This vendor may no longer be active on Stallo.
          </p>
          <Button asChild variant="outline">
            <Link
              to="/browse"
              search={{ category: undefined, search: undefined }}
            >
              <ArrowLeft className="size-4 mr-1" /> Back to Browse
            </Link>
          </Button>
        </div>
      </RootLayout>
    );
  }

  const activePackages = packages.filter((p) => p.isActive);
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length
      : vendor.rating;

  return (
    <RootLayout>
      <div className="bg-background">
        <div className="container py-6">
          {/* Breadcrumb */}
          <Button variant="ghost" size="sm" asChild className="mb-5 -ml-2">
            <Link
              to="/browse"
              search={{ category: undefined, search: undefined }}
            >
              <ArrowLeft className="size-4 mr-1" /> Back to Browse
            </Link>
          </Button>

          {/* Hero photo */}
          {vendor.photos?.[0] && (
            <motion.div
              className="rounded-2xl overflow-hidden h-64 md:h-80 bg-muted mb-8 shadow-sm"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={vendor.photos[0].getDirectURL()}
                alt={vendor.businessName}
                className="h-full w-full object-cover"
              />
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: main content */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Vendor header */}
              <div>
                <div className="flex flex-wrap items-start gap-3 justify-between mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="font-medium">
                      {vendor.category}
                    </Badge>
                    <VerifiedBadge
                      status={vendor.verificationStatus as VendorStatus}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRating value={avgRating} size="md" />
                    <span className="text-sm text-muted-foreground">
                      ({Number(vendor.reviewCount)} reviews)
                    </span>
                  </div>
                </div>
                <h1 className="font-display font-bold text-4xl mb-2">
                  {vendor.businessName}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="size-4" />
                    <span>{vendor.serviceArea}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="size-4" />
                    <span>Available for weddings &amp; events</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-4" />
                    <span>Available for events</span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed text-base">
                {vendor.description}
              </p>

              {/* Tabs: Packages / Reviews */}
              <Tabs defaultValue="packages">
                <TabsList className="mb-6" data-ocid="stall.tabs">
                  <TabsTrigger value="packages" data-ocid="stall.packages.tab">
                    Packages ({activePackages.length})
                  </TabsTrigger>
                  <TabsTrigger value="reviews" data-ocid="stall.reviews.tab">
                    Reviews ({reviews.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="packages" className="mt-0">
                  {pkgsLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2].map((i) => (
                        <Skeleton key={i} className="h-52" />
                      ))}
                    </div>
                  ) : activePackages.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <span className="text-4xl block mb-2">📦</span>
                      <p>No packages available yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activePackages.map((pkg, i) => (
                        <PackageCard
                          key={pkg.id}
                          pkg={pkg}
                          index={i}
                          isSelected={selectedPkg?.id === pkg.id}
                          onSelect={setSelectedPkg}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="reviews" className="mt-0">
                  {reviews.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Star className="size-10 mx-auto mb-2 opacity-20" />
                      <p>
                        No reviews yet. Book this vendor and be the first to
                        review!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {reviews.slice(0, 8).map((review) => (
                        <Card key={review.id} className="border-border/60">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <StarRating
                                value={Number(review.rating)}
                                size="sm"
                              />
                              <span className="text-xs text-muted-foreground">
                                {formatDate(review.createdAt)}
                              </span>
                            </div>
                            <p className="text-sm text-foreground/80 leading-relaxed">
                              {review.comment}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Right: sticky booking card */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-md sticky top-20 space-y-4">
                <div>
                  <h3 className="font-display font-bold text-xl mb-1">
                    Book this Stall
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedPkg ? (
                      <span className="text-foreground font-medium">
                        {selectedPkg.name} selected
                      </span>
                    ) : (
                      "Select a package below, then book"
                    )}
                  </p>
                </div>

                {selectedPkg && (
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">
                        Starting price
                      </span>
                      <span className="font-semibold text-primary">
                        {formatPrice(selectedPkg.price)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Min. guests</span>
                      <span className="font-medium">
                        {Number(selectedPkg.guestMin)}
                      </span>
                    </div>
                  </div>
                )}

                <Button
                  className="w-full"
                  size="lg"
                  disabled={!selectedPkg}
                  onClick={() =>
                    navigate({
                      to: "/book/$vendorId",
                      params: { vendorId: vendor.id },
                    })
                  }
                  data-ocid="stall.book_button"
                >
                  <Calendar className="size-4 mr-2" />
                  {selectedPkg ? "Book Now" : "Select a Package"}
                  {selectedPkg && <ChevronRight className="size-4 ml-2" />}
                </Button>

                {!selectedPkg && (
                  <p className="text-xs text-center text-muted-foreground">
                    Choose a package from the Packages tab
                  </p>
                )}

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="size-4 shrink-0" />
                    <span>{vendor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="size-4 shrink-0" />
                    <span className="truncate">{vendor.email}</span>
                  </div>
                </div>

                <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Free cancellation
                  </span>{" "}
                  available 7+ days before your event.
                  <Link
                    to="/cancellation-policy"
                    className="text-primary ml-1 hover:underline"
                  >
                    View policy
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}

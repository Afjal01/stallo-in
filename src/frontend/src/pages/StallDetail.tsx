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
          <Skeleton className="h-8 w-40 bg-card/60" />
          <Skeleton className="h-72 w-full rounded-2xl bg-card/60" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-10 w-72 bg-card/60" />
              <Skeleton className="h-5 w-full bg-card/60" />
              <Skeleton className="h-5 w-3/4 bg-card/60" />
            </div>
            <Skeleton className="h-48 rounded-xl bg-card/60" />
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
          <Button
            asChild
            variant="outline"
            className="border-primary/40 text-primary hover:bg-primary/10"
          >
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
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-5 -ml-2 text-muted-foreground hover:text-primary"
          >
            <Link
              to="/browse"
              search={{ category: undefined, search: undefined }}
            >
              <ArrowLeft className="size-4 mr-1" /> Back to Browse
            </Link>
          </Button>

          {/* Hero banner with dark overlay */}
          {vendor.photos?.[0] ? (
            <motion.div
              className="rounded-2xl overflow-hidden h-64 md:h-96 bg-card mb-8 relative shadow-gold"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={vendor.photos[0].getDirectURL()}
                alt={vendor.businessName}
                className="h-full w-full object-cover"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
              {/* Vendor name overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h1 className="font-display font-bold text-4xl md:text-5xl gold-gradient drop-shadow-lg">
                  {vendor.businessName}
                </h1>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="rounded-2xl overflow-hidden h-40 bg-card mb-8 flex items-center justify-center border border-primary/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-5xl">🍽️</span>
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
                    <Badge
                      variant="secondary"
                      className="font-medium bg-primary/10 text-primary border-primary/20"
                    >
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
                {/* Stats row */}
                <div className="flex flex-wrap gap-6 mb-4">
                  <div className="text-center">
                    <p className="font-display font-bold text-2xl text-primary">
                      {Number(vendor.reviewCount)}
                    </p>
                    <p className="text-xs text-muted-foreground">Reviews</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display font-bold text-2xl text-primary">
                      {vendor.rating.toFixed(1)}★
                    </p>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display font-bold text-2xl text-primary">
                      {activePackages.length}
                    </p>
                    <p className="text-xs text-muted-foreground">Packages</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="size-4 text-primary/70" />
                    <span>{vendor.serviceArea}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="size-4 text-primary/70" />
                    <span>Available for weddings &amp; events</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-4 text-primary/70" />
                    <span>Available for events</span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed text-base">
                {vendor.description}
              </p>

              {/* Tabs: Packages / Reviews */}
              <Tabs defaultValue="packages">
                <TabsList
                  className="mb-6 bg-card border border-border/40"
                  data-ocid="stall.tabs"
                >
                  <TabsTrigger
                    value="packages"
                    data-ocid="stall.packages.tab"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Packages ({activePackages.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    data-ocid="stall.reviews.tab"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Reviews ({reviews.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="packages" className="mt-0">
                  {pkgsLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2].map((i) => (
                        <Skeleton key={i} className="h-52 bg-card/60" />
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
                      <Star className="size-10 mx-auto mb-2 opacity-20 text-primary" />
                      <p>
                        No reviews yet. Book this vendor and be the first to
                        review!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {reviews.slice(0, 8).map((review) => (
                        <Card
                          key={review.id}
                          className="glass-card border-border/40"
                        >
                          <CardContent className="p-5">
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
              <div className="glass-card rounded-2xl p-6 shadow-gold sticky top-20 space-y-4">
                <div>
                  <h3 className="font-display font-bold text-xl mb-1">
                    Book this Stall
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedPkg ? (
                      <span className="text-primary font-medium">
                        {selectedPkg.name} selected
                      </span>
                    ) : (
                      "Select a package below, then book"
                    )}
                  </p>
                </div>

                {selectedPkg && (
                  <div className="rounded-lg bg-primary/5 border border-primary/30 p-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">
                        Starting price
                      </span>
                      <span className="font-bold text-primary">
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
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-gold"
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

                <Separator className="bg-border/40" />

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="size-4 shrink-0 text-primary/70" />
                    <span>{vendor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="size-4 shrink-0 text-primary/70" />
                    <span className="truncate">{vendor.email}</span>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href={`https://wa.me/${vendor.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 transition-smooth py-2.5 text-sm font-medium"
                  data-ocid="stall.whatsapp_button"
                >
                  <svg
                    className="size-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>

                <div className="rounded-lg bg-muted/30 p-3 text-xs text-muted-foreground">
                  <span className="font-medium text-primary">
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

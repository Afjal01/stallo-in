import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { StallPackage, Vendor } from "@/types";
import type { VendorStatus } from "@/types";
import { Link } from "@tanstack/react-router";
import { MapPin, Users } from "lucide-react";
import { StarRating } from "./StarRating";
import { VerifiedBadge } from "./VerifiedBadge";

interface VendorCardProps {
  vendor: Vendor;
  startingPackage?: StallPackage;
  className?: string;
  index?: number;
}

export function VendorCard({
  vendor,
  startingPackage,
  className,
  index = 0,
}: VendorCardProps) {
  const photoUrl = vendor.photos?.[0]?.getDirectURL?.();

  return (
    <Card
      className={cn(
        "group overflow-hidden border-border/60 shadow-xs hover:shadow-md transition-smooth",
        className,
      )}
      data-ocid={`vendor.item.${index + 1}`}
    >
      {/* Photo */}
      <div className="relative h-48 overflow-hidden bg-muted">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={vendor.businessName}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-4xl">🍽️</span>
          </div>
        )}
        <div className="absolute left-2 top-2">
          <VerifiedBadge
            status={vendor.verificationStatus as VendorStatus}
            size="sm"
          />
        </div>
        {vendor.isFeatured && (
          <div className="absolute right-2 top-2">
            <Badge className="bg-primary text-primary-foreground text-xs">
              Featured
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Category */}
        <Badge variant="secondary" className="mb-2 text-xs">
          {vendor.category}
        </Badge>

        {/* Name */}
        <h3 className="font-display text-lg font-semibold text-foreground leading-tight mb-1 truncate">
          {vendor.businessName}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-muted-foreground text-xs mb-2">
          <MapPin className="size-3 shrink-0" />
          <span className="truncate">{vendor.serviceArea}</span>
        </div>

        {/* Rating & guest capacity */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <StarRating value={vendor.rating} size="sm" />
            <span className="text-xs text-muted-foreground">
              ({Number(vendor.reviewCount)})
            </span>
          </div>
          {startingPackage && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="size-3" />
              <span>
                {Number(startingPackage.guestMin)}–
                {Number(startingPackage.guestMax)}
              </span>
            </div>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            {startingPackage ? (
              <>
                <span className="text-xs text-muted-foreground">
                  Starting from
                </span>
                <p className="font-display font-bold text-primary text-lg leading-tight">
                  {formatPrice(startingPackage.price)}
                </p>
              </>
            ) : (
              <span className="text-xs text-muted-foreground">
                Contact for pricing
              </span>
            )}
          </div>
          <Button
            asChild
            size="sm"
            data-ocid={`vendor.view_button.${index + 1}`}
          >
            <Link to="/stall/$vendorId" params={{ vendorId: vendor.id }}>
              View Stall
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

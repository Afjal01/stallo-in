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
        "group overflow-hidden bg-card border border-border/50 hover-lift",
        "hover:border-primary/40 hover:shadow-[0_0_24px_oklch(var(--primary)/0.15),0_8px_32px_oklch(0_0_0/0.35)]",
        "transition-all duration-300",
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
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
            <span className="text-5xl opacity-60">🍽️</span>
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute left-2 top-2">
          <VerifiedBadge
            status={vendor.verificationStatus as VendorStatus}
            size="sm"
          />
        </div>
        {vendor.isFeatured && (
          <div className="absolute right-0 top-0">
            <div className="bg-gradient-to-l from-primary to-primary/80 text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg tracking-wider uppercase shadow-[0_0_12px_oklch(var(--primary)/0.4)]">
              ⭐ Featured
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Category */}
        <Badge
          variant="secondary"
          className="mb-2 text-xs bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
        >
          {vendor.category}
        </Badge>

        {/* Name */}
        <h3 className="font-display text-lg font-semibold text-foreground leading-tight mb-1 truncate group-hover:text-primary transition-colors duration-200">
          {vendor.businessName}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-muted-foreground text-xs mb-2">
          <MapPin className="size-3 shrink-0 text-primary/60" />
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
        <div className="flex items-center justify-between pt-2 border-t border-border/40">
          <div>
            {startingPackage ? (
              <>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  Starting from
                </span>
                <p className="font-display font-bold text-primary text-lg leading-tight gold-gradient">
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
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_8px_oklch(var(--primary)/0.25)] hover:shadow-[0_0_16px_oklch(var(--primary)/0.4)] transition-shadow duration-200"
            data-ocid={`vendor.view_button.${index + 1}`}
          >
            <Link to="/stall/$vendorId" params={{ vendorId: vendor.id }}>
              Book Now
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

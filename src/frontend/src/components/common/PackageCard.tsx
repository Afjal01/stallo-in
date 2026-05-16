import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { StallPackage } from "@/types";
import { Check, Truck, Users, Wrench } from "lucide-react";

interface PackageCardProps {
  pkg: StallPackage;
  onSelect?: (pkg: StallPackage) => void;
  isSelected?: boolean;
  className?: string;
  index?: number;
}

export function PackageCard({
  pkg,
  onSelect,
  isSelected = false,
  className,
  index = 0,
}: PackageCardProps) {
  const totalPrice =
    Number(pkg.price) + Number(pkg.setupCharge) + Number(pkg.travelCharge);
  const isFeatured = index === 1; // Middle/second card is featured

  return (
    <Card
      className={cn(
        "relative transition-all duration-300 cursor-pointer group overflow-hidden",
        isFeatured || isSelected
          ? "border-primary/60 ring-1 ring-primary/30 shadow-[0_0_24px_oklch(var(--primary)/0.15),0_4px_24px_oklch(0_0_0/0.3)] bg-card"
          : "border-border/40 hover:border-primary/30 bg-card/80 backdrop-blur-sm",
        !pkg.isActive && "opacity-60 cursor-not-allowed",
        className,
      )}
      onClick={() => pkg.isActive && onSelect?.(pkg)}
      data-ocid={`package.item.${index + 1}`}
    >
      {/* Featured glow bar */}
      {(isFeatured || isSelected) && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
      )}

      {/* Popular badge */}
      {isFeatured && !isSelected && (
        <div className="absolute -top-0 right-4">
          <div className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-0.5 rounded-b-md tracking-widest uppercase shadow-[0_4px_12px_oklch(var(--primary)/0.4)]">
            Popular
          </div>
        </div>
      )}

      {isSelected && (
        <div className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_10px_oklch(var(--primary)/0.5)]">
          <Check className="size-3.5" />
        </div>
      )}

      {!pkg.isActive && (
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="text-xs">
            Unavailable
          </Badge>
        </div>
      )}

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display font-semibold text-foreground text-lg leading-tight">
              {pkg.name}
            </h3>
            <div className="flex items-center gap-1 mt-1 text-muted-foreground text-sm">
              <Users className="size-3.5" />
              <span>
                {Number(pkg.guestMin)} – {Number(pkg.guestMax)} guests
              </span>
            </div>
          </div>
          <div className="text-right">
            <p
              className={cn(
                "font-display font-bold text-2xl leading-tight",
                isFeatured || isSelected ? "gold-gradient" : "text-primary",
              )}
            >
              {formatPrice(pkg.price)}
            </p>
            <p className="text-xs text-muted-foreground">base price</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Inclusions */}
        {pkg.inclusions.length > 0 && (
          <ul className="mb-3 space-y-1.5">
            {pkg.inclusions.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-foreground/80"
              >
                <Check
                  className={cn(
                    "size-3.5 mt-0.5 shrink-0",
                    isFeatured || isSelected
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Extra charges */}
        {(Number(pkg.setupCharge) > 0 || Number(pkg.travelCharge) > 0) && (
          <div className="mb-3 rounded-md bg-muted/40 border border-border/40 p-2 space-y-1">
            {Number(pkg.setupCharge) > 0 && (
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Wrench className="size-3" /> Setup charge
                </span>
                <span>{formatPrice(pkg.setupCharge)}</span>
              </div>
            )}
            {Number(pkg.travelCharge) > 0 && (
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Truck className="size-3" /> Travel charge
                </span>
                <span>{formatPrice(pkg.travelCharge)}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-xs font-semibold text-foreground border-t border-border/40 pt-1 mt-1">
              <span>Total</span>
              <span className="text-primary">{formatPrice(totalPrice)}</span>
            </div>
          </div>
        )}

        {onSelect && (
          <Button
            className={cn(
              "w-full transition-all duration-200",
              isFeatured || isSelected
                ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_12px_oklch(var(--primary)/0.3)] hover:shadow-[0_0_20px_oklch(var(--primary)/0.45)]"
                : "border-border/60 hover:border-primary/40 hover:text-primary",
            )}
            variant={isFeatured || isSelected ? "default" : "outline"}
            size="sm"
            disabled={!pkg.isActive}
            onClick={(e) => {
              e.stopPropagation();
              pkg.isActive && onSelect(pkg);
            }}
            data-ocid={`package.select_button.${index + 1}`}
          >
            {isSelected ? "✓ Selected" : "Select Package"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

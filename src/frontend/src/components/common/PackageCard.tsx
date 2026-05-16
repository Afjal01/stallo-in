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

  return (
    <Card
      className={cn(
        "relative transition-smooth cursor-pointer group",
        isSelected
          ? "border-primary ring-2 ring-primary/20 shadow-md"
          : "border-border/60 hover:border-primary/40 hover:shadow-sm",
        !pkg.isActive && "opacity-60 cursor-not-allowed",
        className,
      )}
      onClick={() => pkg.isActive && onSelect?.(pkg)}
      data-ocid={`package.item.${index + 1}`}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
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
            <p className="font-display font-bold text-primary text-xl">
              {formatPrice(pkg.price)}
            </p>
            <p className="text-xs text-muted-foreground">base price</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Inclusions */}
        {pkg.inclusions.length > 0 && (
          <ul className="mb-3 space-y-1">
            {pkg.inclusions.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-foreground/80"
              >
                <Check className="size-3.5 text-secondary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Extra charges */}
        {(Number(pkg.setupCharge) > 0 || Number(pkg.travelCharge) > 0) && (
          <div className="mb-3 rounded-md bg-muted/60 p-2 space-y-1">
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
            <div className="flex items-center justify-between text-xs font-medium text-foreground border-t border-border pt-1 mt-1">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>
        )}

        {onSelect && (
          <Button
            className="w-full"
            variant={isSelected ? "default" : "outline"}
            size="sm"
            disabled={!pkg.isActive}
            onClick={(e) => {
              e.stopPropagation();
              pkg.isActive && onSelect(pkg);
            }}
            data-ocid={`package.select_button.${index + 1}`}
          >
            {isSelected ? "Selected" : "Select Package"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

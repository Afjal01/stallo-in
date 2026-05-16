import { VendorCard } from "@/components/common/VendorCard";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useVendor, useVendorPackages } from "@/hooks/useBackend";
import type { StallPackage, VendorId } from "@/types";
import { Link } from "@tanstack/react-router";
import { Heart, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const SAVED_KEY = "stallo_saved_vendors";

function getSavedIds(): VendorId[] {
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY) ?? "[]") as VendorId[];
  } catch {
    return [];
  }
}

function SavedVendorRow({
  vendorId,
  index,
  onRemove,
}: {
  vendorId: VendorId;
  index: number;
  onRemove: (id: VendorId) => void;
}) {
  const { data: vendor, isLoading } = useVendor(vendorId);
  const { data: packages = [] } = useVendorPackages(vendorId);

  const startingPackage: StallPackage | undefined = packages
    .filter((p) => p.isActive)
    .sort((a, b) => Number(a.price) - Number(b.price))[0];

  if (isLoading) {
    return <Skeleton className="h-64 rounded-xl" />;
  }

  if (!vendor) return null;

  return (
    <div className="relative" data-ocid={`saved.item.${index + 1}`}>
      <VendorCard
        vendor={vendor}
        startingPackage={startingPackage}
        index={index}
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 size-8 bg-card/80 backdrop-blur-sm hover:bg-destructive/10 hover:text-destructive rounded-full shadow-sm"
        onClick={() => onRemove(vendorId)}
        aria-label="Remove from saved"
        data-ocid={`saved.remove_button.${index + 1}`}
      >
        <Heart className="size-4 fill-primary text-primary" />
      </Button>
    </div>
  );
}

export default function CustomerSavedPage() {
  const [savedIds, setSavedIds] = useState<VendorId[]>([]);

  useEffect(() => {
    setSavedIds(getSavedIds());
  }, []);

  const handleRemove = (id: VendorId) => {
    const updated = savedIds.filter((s) => s !== id);
    setSavedIds(updated);
    localStorage.setItem(SAVED_KEY, JSON.stringify(updated));
  };

  return (
    <DashboardLayout
      title="Saved Stalls"
      subtitle="Your wishlist of favorite food vendors"
      actions={
        <Button
          variant="outline"
          size="sm"
          asChild
          data-ocid="saved.browse_button"
        >
          <Link
            to="/browse"
            search={{ category: undefined, search: undefined }}
          >
            <Sparkles className="size-3.5 mr-1.5" />
            Browse More
          </Link>
        </Button>
      }
    >
      {savedIds.length === 0 ? (
        <div
          className="rounded-xl border border-border/60 bg-card p-12 text-center"
          data-ocid="saved.empty_state"
        >
          <div className="flex size-14 items-center justify-center rounded-full bg-muted mx-auto mb-4">
            <Heart className="size-7 text-muted-foreground" />
          </div>
          <p className="font-display font-semibold text-xl mb-2">
            No saved stalls yet
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Tap the heart icon on any vendor card to save them here for quick
            access
          </p>
          <Button asChild data-ocid="saved.browse_cta.button">
            <Link
              to="/browse"
              search={{ category: undefined, search: undefined }}
            >
              <Sparkles className="size-4 mr-2" />
              Discover Stalls
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-5">
            {savedIds.length} saved stall{savedIds.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {savedIds.map((id, i) => (
              <SavedVendorRow
                key={id}
                vendorId={id}
                index={i}
                onRemove={handleRemove}
              />
            ))}
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

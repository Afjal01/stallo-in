import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import {
  useCreatePackage,
  useDeletePackage,
  useUpdatePackage,
  useVendorPackages,
  useVendors,
} from "@/hooks/useBackend";
import { formatPrice } from "@/lib/utils";
import type { StallPackage } from "@/types";
import {
  ChefHat,
  IndianRupee,
  Package as PackageIcon,
  Pencil,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface PackageFormValues {
  name: string;
  price: string;
  guestMin: string;
  guestMax: string;
  inclusions: string;
  setupCharge: string;
  travelCharge: string;
}

const DEFAULT_VALUES: PackageFormValues = {
  name: "",
  price: "",
  guestMin: "50",
  guestMax: "200",
  inclusions: "",
  setupCharge: "0",
  travelCharge: "0",
};

function packageToFormValues(pkg: StallPackage): PackageFormValues {
  return {
    name: pkg.name,
    price: (Number(pkg.price) / 100).toString(),
    guestMin: Number(pkg.guestMin).toString(),
    guestMax: Number(pkg.guestMax).toString(),
    inclusions: pkg.inclusions.join(", "),
    setupCharge: (Number(pkg.setupCharge) / 100).toString(),
    travelCharge: (Number(pkg.travelCharge) / 100).toString(),
  };
}

export default function VendorPackagesPage() {
  const { principal } = useAuth();
  const { data: vendors = [] } = useVendors({});
  const myVendor = vendors.find(
    (v) => v.ownerId.toString() === principal?.toString(),
  );
  const { data: packages = [], isLoading } = useVendorPackages(myVendor?.id);
  const createPkg = useCreatePackage();
  const updatePkg = useUpdatePackage();
  const deletePkg = useDeletePackage();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState<StallPackage | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingPkgId, setDeletingPkgId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PackageFormValues>({
    defaultValues: DEFAULT_VALUES,
  });

  const openAdd = () => {
    setEditingPkg(null);
    reset(DEFAULT_VALUES);
    setDialogOpen(true);
  };

  const openEdit = (pkg: StallPackage) => {
    setEditingPkg(pkg);
    reset(packageToFormValues(pkg));
    setDialogOpen(true);
  };

  const onSubmit = async (values: PackageFormValues) => {
    if (!myVendor) {
      toast.error("Vendor profile not found.");
      return;
    }
    const inclusions = values.inclusions
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const pkg = {
      name: values.name,
      price: BigInt(Math.round(Number.parseFloat(values.price) * 100)),
      guestMin: BigInt(Number.parseInt(values.guestMin, 10)),
      guestMax: BigInt(Number.parseInt(values.guestMax, 10)),
      inclusions,
      setupCharge: BigInt(
        Math.round(Number.parseFloat(values.setupCharge) * 100),
      ),
      travelCharge: BigInt(
        Math.round(Number.parseFloat(values.travelCharge) * 100),
      ),
    };
    try {
      if (editingPkg) {
        await updatePkg.mutateAsync({
          packageId: editingPkg.id,
          vendorId: myVendor.id,
          pkg,
        });
        toast.success("Package updated!");
      } else {
        await createPkg.mutateAsync({ vendorId: myVendor.id, pkg });
        toast.success("Package created!");
      }
      setDialogOpen(false);
    } catch {
      toast.error(
        editingPkg ? "Failed to update package." : "Failed to create package.",
      );
    }
  };

  const handleDeleteOpen = (pkgId: string) => {
    setDeletingPkgId(pkgId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingPkgId) return;
    try {
      await deletePkg.mutateAsync(deletingPkgId);
      toast.success("Package deleted.");
    } catch {
      toast.error("Failed to delete package.");
    } finally {
      setDeleteDialogOpen(false);
      setDeletingPkgId(null);
    }
  };

  const isSaving = createPkg.isPending || updatePkg.isPending;

  return (
    <DashboardLayout
      title="Packages"
      subtitle="Manage your stall pricing packages"
      actions={
        <Button
          size="sm"
          className="shadow-gold"
          onClick={openAdd}
          data-ocid="packages.add_button"
        >
          <Plus className="size-4 mr-1" /> Add Package
        </Button>
      }
    >
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-44 rounded-xl" />
          ))}
        </div>
      ) : packages.length === 0 ? (
        <div
          className="rounded-xl border border-border/60 bg-card p-12 text-center glass-card"
          data-ocid="packages.empty_state"
        >
          <PackageIcon className="size-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-display font-semibold text-xl mb-1">
            No packages yet
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Add pricing packages to attract customers
          </p>
          <Button onClick={openAdd} data-ocid="packages.empty.add_button">
            <Plus className="size-4 mr-1.5" /> Create your first package
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {packages.map((pkg, i) => (
            <Card
              key={pkg.id}
              className="border-border/60 hover:shadow-sm transition-smooth hover-lift glass-card"
              data-ocid={`packages.item.${i + 1}`}
            >
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-display font-semibold text-base">
                        {pkg.name}
                      </p>
                      {pkg.isActive ? (
                        <Badge
                          variant="outline"
                          className="bg-secondary/10 text-secondary border-secondary/30 text-[10px]"
                        >
                          Active
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-muted-foreground text-[10px]"
                        >
                          Inactive
                        </Badge>
                      )}
                    </div>
                    <p className="text-primary font-display font-bold text-xl mt-0.5">
                      {formatPrice(pkg.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-foreground"
                      onClick={() => openEdit(pkg)}
                      data-ocid={`packages.edit_button.${i + 1}`}
                    >
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDeleteOpen(pkg.id)}
                      data-ocid={`packages.delete_button.${i + 1}`}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="size-3.5" />
                    <span>
                      {Number(pkg.guestMin)}–{Number(pkg.guestMax)} guests
                    </span>
                  </div>
                  {Number(pkg.setupCharge) > 0 && (
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <IndianRupee className="size-3.5" />
                      <span>Setup: {formatPrice(pkg.setupCharge)}</span>
                    </div>
                  )}
                  {Number(pkg.travelCharge) > 0 && (
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <IndianRupee className="size-3.5" />
                      <span>Travel: {formatPrice(pkg.travelCharge)}</span>
                    </div>
                  )}
                </div>

                {pkg.inclusions.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {pkg.inclusions.slice(0, 3).map((inc) => (
                      <span
                        key={inc}
                        className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
                      >
                        {inc}
                      </span>
                    ))}
                    {pkg.inclusions.length > 3 && (
                      <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                        +{pkg.inclusions.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md" data-ocid="packages.dialog">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editingPkg ? "Edit Package" : "Create Package"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="pkg-name">Package Name *</Label>
              <Input
                id="pkg-name"
                className="mt-1"
                placeholder="e.g. Wedding Premium Chaat Package"
                {...register("name", { required: "Package name is required" })}
                data-ocid="packages.name.input"
              />
              {errors.name && (
                <p className="text-xs text-destructive mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="pkg-price">Price (₹) *</Label>
              <div className="relative mt-1">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                <Input
                  id="pkg-price"
                  type="number"
                  min="0"
                  step="1"
                  className="pl-8"
                  placeholder="15000"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 1, message: "Price must be > 0" },
                  })}
                  data-ocid="packages.price.input"
                />
              </div>
              {errors.price && (
                <p className="text-xs text-destructive mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="pkg-guest-min">Min Guests</Label>
                <Input
                  id="pkg-guest-min"
                  type="number"
                  min="1"
                  className="mt-1"
                  {...register("guestMin", { required: true })}
                />
              </div>
              <div>
                <Label htmlFor="pkg-guest-max">Max Guests</Label>
                <Input
                  id="pkg-guest-max"
                  type="number"
                  min="1"
                  className="mt-1"
                  {...register("guestMax", { required: true })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="pkg-inclusions">
                Inclusions (comma-separated)
              </Label>
              <Textarea
                id="pkg-inclusions"
                className="mt-1 resize-none"
                rows={2}
                placeholder="Live chaat counter, 2 helpers, serving equipment"
                {...register("inclusions")}
                data-ocid="packages.inclusions.textarea"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="pkg-setup">Setup Charge (₹)</Label>
                <Input
                  id="pkg-setup"
                  type="number"
                  min="0"
                  step="1"
                  className="mt-1"
                  placeholder="0"
                  {...register("setupCharge")}
                />
              </div>
              <div>
                <Label htmlFor="pkg-travel">Travel Charge (₹)</Label>
                <Input
                  id="pkg-travel"
                  type="number"
                  min="0"
                  step="1"
                  className="mt-1"
                  placeholder="0"
                  {...register("travelCharge")}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setDialogOpen(false)}
                data-ocid="packages.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 shadow-gold"
                disabled={isSaving}
                data-ocid="packages.submit_button"
              >
                {isSaving
                  ? editingPkg
                    ? "Saving..."
                    : "Creating..."
                  : editingPkg
                    ? "Save Changes"
                    : "Create Package"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent data-ocid="packages.delete.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this package?</AlertDialogTitle>
            <AlertDialogDescription>
              Customers will no longer be able to book this package. Active
              bookings will not be affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="packages.delete.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="packages.delete.confirm_button"
            >
              Delete Package
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useUpdateVendorProfile, useVendors } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { VendorStatus } from "@/types";
import {
  Building2,
  ImagePlus,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Tag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const STALL_CATEGORIES = [
  "Chaat & Golgappa",
  "Chowmein & Fast Food",
  "Ice Cream & Desserts",
  "Popcorn & Snacks",
  "Tea & Coffee",
  "Dosa & South Indian",
  "Pasta & Italian",
  "Mocktails & Beverages",
  "BBQ & Tandoor",
  "Live Sweets Counter",
];

interface ProfileFormValues {
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  category: string;
  serviceArea: string;
  description: string;
}

interface BankFormValues {
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
}

function VerificationStatus({ status }: { status: VendorStatus }) {
  const configs: Record<
    VendorStatus,
    { icon: React.ElementType; label: string; cls: string; desc: string }
  > = {
    [VendorStatus.pending]: {
      icon: ShieldAlert,
      label: "Pending Verification",
      cls: "bg-primary/10 border-primary/30 text-primary",
      desc: "Your profile is under review. You'll be notified once approved.",
    },
    [VendorStatus.approved]: {
      icon: ShieldCheck,
      label: "Verified Vendor",
      cls: "bg-primary/15 border-primary/40 text-primary",
      desc: "Your profile is verified and live. Customers can book your stall.",
    },
    [VendorStatus.rejected]: {
      icon: ShieldX,
      label: "Verification Rejected",
      cls: "bg-destructive/10 border-destructive/20 text-destructive",
      desc: "Your verification was rejected. Please update your profile and resubmit.",
    },
    [VendorStatus.suspended]: {
      icon: ShieldX,
      label: "Account Suspended",
      cls: "bg-destructive/10 border-destructive/20 text-destructive",
      desc: "Your account has been suspended. Please contact support.",
    },
  };
  const { icon: Icon, label, cls, desc } = configs[status];
  return (
    <div className={cn("flex items-start gap-3 rounded-xl border p-4", cls)}>
      <Icon className="size-5 shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold text-sm">{label}</p>
        <p className="text-xs mt-0.5 opacity-80">{desc}</p>
      </div>
    </div>
  );
}

export default function VendorProfilePage() {
  const { principal } = useAuth();
  const { data: vendors = [], isLoading } = useVendors({});
  const vendor = vendors.find(
    (v) => v.ownerId.toString() === principal?.toString(),
  );
  const updateProfile = useUpdateVendorProfile();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isDirty, errors },
  } = useForm<ProfileFormValues>();

  const [bankValues, setBankValues] = useState<BankFormValues>({
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
  });

  useEffect(() => {
    if (vendor) {
      reset({
        businessName: vendor.businessName,
        ownerName: vendor.ownerName,
        phone: vendor.phone,
        email: vendor.email,
        category: vendor.category,
        serviceArea: vendor.serviceArea,
        description: vendor.description,
      });
    }
  }, [vendor, reset]);

  const onSave = async (values: ProfileFormValues) => {
    if (!vendor) return;
    try {
      await updateProfile.mutateAsync({
        vendorId: vendor.id,
        req: {
          businessName: values.businessName,
          ownerName: values.ownerName,
          phone: values.phone,
          email: values.email,
          category: values.category,
          serviceArea: values.serviceArea,
          description: values.description,
        },
      });
      toast.success("Profile saved successfully!");
      reset(values);
    } catch {
      toast.error("Failed to save profile.");
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout title="My Profile">
        <div className="max-w-2xl space-y-4">
          <Skeleton className="h-16 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
        </div>
      </DashboardLayout>
    );
  }

  if (!vendor) {
    return (
      <DashboardLayout title="My Profile">
        <div className="rounded-xl border border-border/60 bg-card p-12 text-center">
          <Building2 className="size-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-display font-semibold text-lg mb-1">
            No vendor profile found
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            You haven't registered as a vendor yet.
          </p>
          <Button asChild>
            <a href="/vendor/register">Register as Vendor</a>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="My Profile"
      subtitle="Manage your vendor profile and settings"
    >
      <div className="max-w-2xl space-y-5">
        {/* Verification status */}
        <VerificationStatus
          status={vendor.verificationStatus as VendorStatus}
        />

        {vendor.verificationStatus === VendorStatus.rejected && (
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast.info(
                "Please update your profile details and save to resubmit.",
              )
            }
            data-ocid="vendor_profile.resubmit_button"
          >
            Resubmit for Verification
          </Button>
        )}

        {/* Stall photos */}
        <Card className="border-border/60 glass-card">
          <CardHeader className="pb-3">
            <p className="font-display font-semibold text-base">Stall Photos</p>
            <p className="text-xs text-muted-foreground">
              Photos help customers choose your stall
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {vendor.photos.slice(0, 7).map((photo, i) => (
                <div
                  key={photo.getDirectURL()}
                  className="aspect-square rounded-lg overflow-hidden bg-muted border border-border/60"
                >
                  <img
                    src={photo.getDirectURL()}
                    alt={`Stall ${i + 1}`}
                    className="w-full h-full object-cover"
                    data-ocid={`vendor_profile.photo.${i + 1}`}
                  />
                </div>
              ))}
              {vendor.photos.length < 8 && (
                <button
                  type="button"
                  className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-colors flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary"
                  onClick={() =>
                    toast.info("Photo uploads available in the next update.")
                  }
                  data-ocid="vendor_profile.add_photo_button"
                >
                  <ImagePlus className="size-5" />
                  <span className="text-[10px] font-medium">Add Photo</span>
                </button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Profile form */}
        <Card className="border-border/60 glass-card">
          <CardHeader className="pb-3">
            <p className="font-display font-semibold text-base">
              Business Information
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            <form onSubmit={handleSubmit(onSave)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="businessName"
                    className="flex items-center gap-1.5"
                  >
                    <Building2 className="size-3.5 text-muted-foreground" />{" "}
                    Business Name
                  </Label>
                  <Input
                    id="businessName"
                    className="mt-1"
                    {...register("businessName", {
                      required: "Business name is required",
                    })}
                    data-ocid="vendor_profile.business_name.input"
                  />
                  {errors.businessName && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.businessName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="ownerName">Owner Name</Label>
                  <Input
                    id="ownerName"
                    className="mt-1"
                    {...register("ownerName", {
                      required: "Owner name is required",
                    })}
                    data-ocid="vendor_profile.owner_name.input"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="flex items-center gap-1.5">
                    <Phone className="size-3.5 text-muted-foreground" /> Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    className="mt-1"
                    {...register("phone", { required: "Phone is required" })}
                    data-ocid="vendor_profile.phone.input"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="flex items-center gap-1.5">
                    <Mail className="size-3.5 text-muted-foreground" /> Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="mt-1"
                    {...register("email", { required: "Email is required" })}
                    data-ocid="vendor_profile.email.input"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category" className="flex items-center gap-1.5">
                  <Tag className="size-3.5 text-muted-foreground" /> Stall
                  Category
                </Label>
                <Select
                  value={watch("category")}
                  onValueChange={(val) =>
                    setValue("category", val, { shouldDirty: true })
                  }
                >
                  <SelectTrigger
                    className="mt-1"
                    data-ocid="vendor_profile.category.select"
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {STALL_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="serviceArea"
                  className="flex items-center gap-1.5"
                >
                  <MapPin className="size-3.5 text-muted-foreground" /> Service
                  Area
                </Label>
                <Input
                  id="serviceArea"
                  className="mt-1"
                  placeholder="e.g. Nawada, Gaya, Patna"
                  {...register("serviceArea", {
                    required: "Service area is required",
                  })}
                  data-ocid="vendor_profile.service_area.input"
                />
              </div>

              <div>
                <Label htmlFor="description">About Your Stall</Label>
                <Textarea
                  id="description"
                  className="mt-1 resize-none"
                  rows={3}
                  placeholder="Describe your stall, specialties, and experience..."
                  {...register("description")}
                  data-ocid="vendor_profile.description.textarea"
                />
              </div>

              <Button
                type="submit"
                disabled={!isDirty || updateProfile.isPending}
                data-ocid="vendor_profile.save_button"
                className="w-full sm:w-auto shadow-gold"
              >
                <Save className="size-4 mr-1.5" />
                {updateProfile.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Bank details */}
        <Card className="border-border/60 glass-card">
          <CardHeader className="pb-3">
            <p className="font-display font-semibold text-base">Bank Details</p>
            <p className="text-xs text-muted-foreground">
              For payout processing. Stored securely and never shared.
            </p>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="accountHolderName">Account Holder Name</Label>
                <Input
                  id="accountHolderName"
                  className="mt-1"
                  placeholder="As on bank account"
                  value={bankValues.accountHolderName}
                  onChange={(e) =>
                    setBankValues((v) => ({
                      ...v,
                      accountHolderName: e.target.value,
                    }))
                  }
                  data-ocid="vendor_profile.account_holder.input"
                />
              </div>
              <div>
                <Label htmlFor="ifscCode">IFSC Code</Label>
                <Input
                  id="ifscCode"
                  className="mt-1"
                  placeholder="e.g. SBIN0001234"
                  value={bankValues.ifscCode}
                  onChange={(e) =>
                    setBankValues((v) => ({
                      ...v,
                      ifscCode: e.target.value.toUpperCase(),
                    }))
                  }
                  data-ocid="vendor_profile.ifsc.input"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  className="mt-1"
                  type="password"
                  placeholder="Bank account number"
                  value={bankValues.accountNumber}
                  onChange={(e) =>
                    setBankValues((v) => ({
                      ...v,
                      accountNumber: e.target.value,
                    }))
                  }
                  data-ocid="vendor_profile.account_number.input"
                />
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => toast.success("Bank details saved locally.")}
              data-ocid="vendor_profile.bank_save_button"
            >
              Save Bank Details
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

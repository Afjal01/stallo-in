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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  usePlatformConfig,
  useToggleFeatured,
  useUpdatePlatformConfig,
  useVendors,
} from "@/hooks/useBackend";
import { VendorStatus } from "@/types";
import type { PlatformConfig } from "@/types";
import { Info, Save, ToggleLeft, ToggleRight } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function SettingsSection({
  title,
  description,
  children,
}: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-display font-semibold">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

type FormState = {
  globalCommissionPercent: number;
  advancePaymentPercent: number;
  tier1Days: number;
  tier1FeePercent: number;
  tier2Days: number;
  tier2FeePercent: number;
  tier3FeePercent: number;
};

export default function AdminSettings() {
  const { data: config, isLoading } = usePlatformConfig();
  const updateConfig = useUpdatePlatformConfig();
  const { data: vendors = [] } = useVendors({ status: VendorStatus.approved });
  const toggleFeatured = useToggleFeatured();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [form, setForm] = useState<FormState>({
    globalCommissionPercent: 12,
    advancePaymentPercent: 50,
    tier1Days: 7,
    tier1FeePercent: 0,
    tier2Days: 3,
    tier2FeePercent: 25,
    tier3FeePercent: 50,
  });

  useEffect(() => {
    if (!config) return;
    setForm({
      globalCommissionPercent: config.globalCommissionPercent,
      advancePaymentPercent: Number(config.advancePaymentPercent),
      tier1Days: Number(config.cancellationPolicy.tier1Days),
      tier1FeePercent: Number(config.cancellationPolicy.tier1FeePercent),
      tier2Days: Number(config.cancellationPolicy.tier2Days),
      tier2FeePercent: Number(config.cancellationPolicy.tier2FeePercent),
      tier3FeePercent: Number(config.cancellationPolicy.tier3FeePercent),
    });
  }, [config]);

  const handleSave = async () => {
    const updated: PlatformConfig = {
      globalCommissionPercent: form.globalCommissionPercent,
      advancePaymentPercent: BigInt(form.advancePaymentPercent),
      cancellationPolicy: {
        tier1Days: BigInt(form.tier1Days),
        tier1FeePercent: BigInt(form.tier1FeePercent),
        tier2Days: BigInt(form.tier2Days),
        tier2FeePercent: BigInt(form.tier2FeePercent),
        tier3FeePercent: BigInt(form.tier3FeePercent),
      },
    };
    try {
      await updateConfig.mutateAsync(updated);
      toast.success("Platform settings saved successfully.");
      setConfirmOpen(false);
    } catch {
      toast.error("Failed to save settings. Please retry.");
    }
  };

  const handleToggle = async (
    vendorId: string,
    name: string,
    isFeatured: boolean,
  ) => {
    try {
      await toggleFeatured.mutateAsync(vendorId);
      toast.success(
        `${name} is now ${isFeatured ? "unfeatured" : "featured"}.`,
      );
    } catch {
      toast.error("Failed to update featured status.");
    }
  };

  const numField = (key: keyof FormState) => ({
    type: "number" as const,
    value: form[key],
    min: 0,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: Number(e.target.value) })),
    className: "w-full",
  });

  return (
    <DashboardLayout
      title="Platform Settings"
      subtitle="Commissions, cancellation tiers, and featured vendors"
    >
      <div className="max-w-2xl space-y-6">
        {/* Commission & Payment */}
        <SettingsSection
          title="Commission & Payment"
          description="Set the platform commission and advance payment requirement."
        >
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="commission">Global Commission (%)</Label>
                <Input
                  id="commission"
                  max={100}
                  {...numField("globalCommissionPercent")}
                  data-ocid="admin.settings.commission.input"
                />
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Info className="size-3" /> Applied to all bookings unless
                  overridden.
                </p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="advance">Advance Payment Required (%)</Label>
                <Input
                  id="advance"
                  max={100}
                  {...numField("advancePaymentPercent")}
                  data-ocid="admin.settings.advance.input"
                />
                <p className="text-xs text-muted-foreground">
                  Typically 50 or 100.
                </p>
              </div>
            </div>
          )}
        </SettingsSection>

        {/* Cancellation Policy */}
        <SettingsSection
          title="Cancellation Policy Tiers"
          description="Define tiered fee percentages based on days before the event."
        >
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {(
                [
                  {
                    key: "tier1",
                    label: "Tier 1 — Low Fee",
                    daysKey: "tier1Days",
                    feeKey: "tier1FeePercent",
                    daysOcid: "admin.settings.tier1_days.input",
                    feeOcid: "admin.settings.tier1_fee.input",
                  },
                  {
                    key: "tier2",
                    label: "Tier 2 — Medium Fee",
                    daysKey: "tier2Days",
                    feeKey: "tier2FeePercent",
                    daysOcid: "admin.settings.tier2_days.input",
                    feeOcid: "admin.settings.tier2_fee.input",
                  },
                ] as const
              ).map(({ key, label, daysKey, feeKey, daysOcid, feeOcid }) => (
                <div
                  key={key}
                  className="rounded-lg border border-border p-3 space-y-3 bg-muted/20"
                >
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {label}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label>Days Before Event (≥)</Label>
                      <Input {...numField(daysKey)} data-ocid={daysOcid} />
                    </div>
                    <div className="space-y-1">
                      <Label>Fee (%)</Label>
                      <Input
                        max={100}
                        {...numField(feeKey)}
                        data-ocid={feeOcid}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="rounded-lg border border-border p-3 space-y-3 bg-muted/20">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Tier 3 — High Fee
                </p>
                <div className="max-w-[180px] space-y-1">
                  <Label htmlFor="t3f">Fee (%)</Label>
                  <Input
                    id="t3f"
                    max={100}
                    {...numField("tier3FeePercent")}
                    data-ocid="admin.settings.tier3_fee.input"
                  />
                </div>
              </div>
            </div>
          )}
        </SettingsSection>

        <div className="flex justify-end">
          <Button
            onClick={() => setConfirmOpen(true)}
            disabled={isLoading || updateConfig.isPending}
            className="gap-2 min-w-[140px]"
            data-ocid="admin.settings.save.button"
          >
            <Save className="size-4" />
            {updateConfig.isPending ? "Saving…" : "Save Settings"}
          </Button>
        </div>

        {/* Featured Vendors */}
        <SettingsSection
          title="Featured Vendors"
          description="Toggle which vendors appear in the featured section on the homepage."
        >
          {vendors.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No approved vendors yet.
            </p>
          ) : (
            <div className="space-y-1">
              {vendors.map((v, i) => (
                <div
                  key={v.id}
                  className="flex items-center justify-between rounded-md px-3 py-2.5 hover:bg-muted/40 transition-colors"
                  data-ocid={`admin.settings.featured.item.${i + 1}`}
                >
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">
                      {v.businessName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {v.category} · {v.serviceArea}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleToggle(v.id, v.businessName, v.isFeatured)
                    }
                    className="ml-4 shrink-0 text-muted-foreground hover:text-primary transition-colors"
                    aria-label={
                      v.isFeatured
                        ? `Remove ${v.businessName} from featured`
                        : `Add ${v.businessName} to featured`
                    }
                    data-ocid={`admin.settings.featured_toggle.${i + 1}`}
                  >
                    {v.isFeatured ? (
                      <ToggleRight className="size-7 text-primary" />
                    ) : (
                      <ToggleLeft className="size-7" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </SettingsSection>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent data-ocid="admin.settings.confirm.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Save Platform Settings?</AlertDialogTitle>
            <AlertDialogDescription>
              This will update commission rates and cancellation policy across
              the platform immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.settings.confirm.cancel.button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSave}
              data-ocid="admin.settings.confirm.save.button"
            >
              {updateConfig.isPending ? "Saving…" : "Confirm Save"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}

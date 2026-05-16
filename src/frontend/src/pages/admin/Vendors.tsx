import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  useApproveVendor,
  useRejectVendor,
  useToggleFeatured,
  useVendors,
} from "@/hooks/useBackend";
import { formatDate } from "@/lib/utils";
import { VendorStatus } from "@/types";
import type { Vendor } from "@/types";
import {
  CheckCircle,
  ExternalLink,
  Search,
  Star,
  ToggleLeft,
  ToggleRight,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DEFAULT_COMMISSION = 12;

function VendorStatusBadge({ status }: { status: VendorStatus }) {
  const map: Record<VendorStatus, { label: string; classes: string }> = {
    [VendorStatus.pending]: {
      label: "Pending",
      classes: "bg-amber-400/15 text-amber-400 border-amber-400/30",
    },
    [VendorStatus.approved]: {
      label: "Approved",
      classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    },
    [VendorStatus.rejected]: {
      label: "Rejected",
      classes: "bg-destructive/10 text-destructive border-destructive/20",
    },
    [VendorStatus.suspended]: {
      label: "Suspended",
      classes: "bg-muted text-muted-foreground border-border",
    },
  };
  const cfg = map[status] ?? map[VendorStatus.pending];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${cfg.classes}`}
    >
      {cfg.label}
    </span>
  );
}

function RejectDialog({
  vendor,
  open,
  onClose,
}: { vendor: Vendor | null; open: boolean; onClose: () => void }) {
  const [reason, setReason] = useState("");
  const reject = useRejectVendor();

  const handleSubmit = async () => {
    if (!vendor) return;
    try {
      await reject.mutateAsync(vendor.id);
      toast.success(`${vendor.businessName} has been rejected.`);
      setReason("");
      onClose();
    } catch {
      toast.error("Failed to reject vendor. Please try again.");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent data-ocid="admin.reject_vendor.dialog">
        <DialogHeader>
          <DialogTitle>Reject Vendor Application</DialogTitle>
          <DialogDescription>
            Provide a reason for rejecting{" "}
            <strong>{vendor?.businessName}</strong>.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 py-2">
          <Textarea
            placeholder="Reason for rejection (optional)…"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            data-ocid="admin.reject_vendor.reason.textarea"
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            data-ocid="admin.reject_vendor.cancel.button"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={reject.isPending}
            data-ocid="admin.reject_vendor.confirm.button"
          >
            {reject.isPending ? "Rejecting…" : "Confirm Rejection"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PendingTable({
  vendors,
  search,
}: { vendors: Vendor[]; search: string }) {
  const approve = useApproveVendor();
  const [rejectTarget, setRejectTarget] = useState<Vendor | null>(null);

  const filtered = vendors.filter(
    (v) =>
      v.businessName.toLowerCase().includes(search.toLowerCase()) ||
      v.ownerName.toLowerCase().includes(search.toLowerCase()),
  );

  const handleApprove = async (v: Vendor) => {
    try {
      await approve.mutateAsync({
        vendorId: v.id,
        commissionRate: DEFAULT_COMMISSION,
      });
      toast.success(
        `${v.businessName} approved with ${DEFAULT_COMMISSION}% commission.`,
      );
    } catch {
      toast.error("Approval failed. Please retry.");
    }
  };

  if (filtered.length === 0) {
    return (
      <div
        className="py-12 text-center text-sm text-muted-foreground"
        data-ocid="admin.pending_vendors.empty_state"
      >
        No pending vendor applications.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/20">
              <th className="px-4 py-3 text-left text-[10px] font-bold text-primary/70 uppercase tracking-widest">
                Vendor
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-bold text-primary/70 uppercase tracking-widest hidden sm:table-cell">
                Category
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-bold text-primary/70 uppercase tracking-widest hidden md:table-cell">
                Service Area
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-bold text-primary/70 uppercase tracking-widest hidden lg:table-cell">
                Applied
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-bold text-primary/70 uppercase tracking-widest">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((v, _i) => (
              <tr
                key={v.id}
                className="hover:bg-muted/20 transition-colors odd:bg-muted/5"
              >
                <td className="px-4 py-3">
                  <p className="font-semibold">{v.businessName}</p>
                  <p className="text-xs text-muted-foreground">{v.ownerName}</p>
                  <p className="text-xs text-muted-foreground">{v.phone}</p>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                  {v.category}
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                  {v.serviceArea}
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                  {formatDate(v.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(v)}
                      disabled={approve.isPending}
                      className="gap-1.5 h-8 text-xs shadow-gold"
                    >
                      <CheckCircle className="size-3.5" /> Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setRejectTarget(v)}
                      className="gap-1.5 h-8 text-xs text-destructive border-destructive/30 hover:bg-destructive/10"
                    >
                      <XCircle className="size-3.5" /> Reject
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <RejectDialog
        vendor={rejectTarget}
        open={!!rejectTarget}
        onClose={() => setRejectTarget(null)}
      />
    </>
  );
}

function ActiveTable({
  vendors,
  search,
}: { vendors: Vendor[]; search: string }) {
  const toggleFeatured = useToggleFeatured();

  const filtered = vendors.filter(
    (v) =>
      v.businessName.toLowerCase().includes(search.toLowerCase()) ||
      v.ownerName.toLowerCase().includes(search.toLowerCase()),
  );

  const handleToggle = async (v: Vendor) => {
    try {
      await toggleFeatured.mutateAsync(v.id);
      toast.success(
        `${v.businessName} is now ${v.isFeatured ? "unfeatured" : "featured"}.`,
      );
    } catch {
      toast.error("Failed to update featured status.");
    }
  };

  if (filtered.length === 0) {
    return (
      <div
        className="py-12 text-center text-sm text-muted-foreground"
        data-ocid="admin.active_vendors.empty_state"
      >
        No vendors found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/60 bg-muted/20">
            <th className="px-4 py-3 text-left text-[10px] font-bold text-primary/70 uppercase tracking-widest">
              Vendor
            </th>
            <th className="px-4 py-3 text-left text-[10px] font-bold text-primary/70 uppercase tracking-widest hidden sm:table-cell">
              Category
            </th>
            <th className="px-4 py-3 text-right text-[10px] font-bold text-primary/70 uppercase tracking-widest hidden md:table-cell">
              Rating
            </th>
            <th className="px-4 py-3 text-left text-[10px] font-bold text-primary/70 uppercase tracking-widest">
              Status
            </th>
            <th className="px-4 py-3 text-left text-[10px] font-bold text-primary/70 uppercase tracking-widest">
              Featured
            </th>
            <th className="px-4 py-3 text-left text-[10px] font-bold text-primary/70 uppercase tracking-widest">
              View
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {filtered.map((v, i) => (
            <tr
              key={v.id}
              className="hover:bg-muted/20 transition-colors odd:bg-muted/5"
            >
              <td className="px-4 py-3">
                <p className="font-semibold">{v.businessName}</p>
                <p className="text-xs text-muted-foreground">{v.ownerName}</p>
              </td>
              <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                {v.category}
              </td>
              <td className="px-4 py-3 text-right hidden md:table-cell">
                <span className="inline-flex items-center gap-1">
                  <Star className="size-3 fill-amber-400 text-amber-400" />
                  {v.rating.toFixed(1)}
                </span>
              </td>
              <td className="px-4 py-3">
                <VendorStatusBadge status={v.verificationStatus} />
              </td>
              <td className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => handleToggle(v)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={
                    v.isFeatured ? "Remove from featured" : "Add to featured"
                  }
                  data-ocid={`admin.vendors.featured_toggle.${i + 1}`}
                >
                  {v.isFeatured ? (
                    <ToggleRight className="size-6 text-primary drop-shadow-[0_0_4px_hsl(var(--primary)/0.6)]" />
                  ) : (
                    <ToggleLeft className="size-6" />
                  )}
                </button>
              </td>
              <td className="px-4 py-3">
                <a
                  href={`/stall/${v.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  data-ocid={`admin.vendors.view_profile.${i + 1}`}
                >
                  <ExternalLink className="size-3" /> View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminVendors() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

  const { data: allVendors = [], isLoading } = useVendors();
  const { data: pendingVendors = [] } = useVendors({
    status: VendorStatus.pending,
  });
  const { data: activeVendors = [] } = useVendors({
    status: VendorStatus.approved,
  });

  return (
    <DashboardLayout
      title="Vendor Management"
      subtitle="Review applications, manage vendors, toggle featured listings"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by vendor or owner name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              data-ocid="admin.vendors.search.input"
            />
          </div>
          {pendingVendors.length > 0 && (
            <Badge variant="destructive" className="shrink-0">
              {pendingVendors.length} pending
            </Badge>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList data-ocid="admin.vendors.tabs">
            <TabsTrigger value="pending" data-ocid="admin.vendors.tab.pending">
              Pending Approval
              {pendingVendors.length > 0 && (
                <Badge className="ml-2 text-[10px] px-1.5 h-4 bg-destructive text-destructive-foreground">
                  {pendingVendors.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="active" data-ocid="admin.vendors.tab.active">
              Active Vendors
            </TabsTrigger>
            <TabsTrigger value="all" data-ocid="admin.vendors.tab.all">
              All Vendors
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 rounded-lg border border-border/50 bg-card overflow-hidden glass-card">
            {isLoading ? (
              <div className="p-4 space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))}
              </div>
            ) : (
              <>
                <TabsContent value="pending" className="m-0">
                  <PendingTable vendors={pendingVendors} search={search} />
                </TabsContent>
                <TabsContent value="active" className="m-0">
                  <ActiveTable vendors={activeVendors} search={search} />
                </TabsContent>
                <TabsContent value="all" className="m-0">
                  <ActiveTable vendors={allVendors} search={search} />
                </TabsContent>
              </>
            )}
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

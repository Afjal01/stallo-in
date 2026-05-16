import { r as reactExports, j as jsxRuntimeExports, S as Skeleton, f as formatDate, h as ue } from "./index-BKL2lxtv.js";
import { D as DashboardLayout } from "./DashboardLayout-BbZ-GuY6.js";
import { B as Badge } from "./sheet-DdO1tWzN.js";
import { c as createLucideIcon, B as Button, V as VendorStatus } from "./useAuth-IAGlSf5h.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-C3LvU69M.js";
import { I as Input } from "./input-wyOQctPS.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-JmZdT47h.js";
import { T as Textarea } from "./textarea-D-AlXnVk.js";
import { u as useVendors, s as useApproveVendor, t as useToggleFeatured, v as useRejectVendor } from "./useBackend-B1f4NLLV.js";
import { S as Search } from "./search-DmNAp61G.js";
import { C as CircleX } from "./circle-x-Ccgn6w3P.js";
import { S as Star } from "./star-7jLtUNX7.js";
import { T as ToggleRight, a as ToggleLeft } from "./toggle-right-DpwbsYNN.js";
import "./index-BEBufsG6.js";
import "./index-IXOTxK3N.js";
import "./users-CPmCI05L.js";
import "./calendar-BcXsBU70.js";
import "./trending-up-OZEtAFop.js";
import "./heart-BBjtls9Z.js";
import "./index-BjDY_mxd.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode);
const DEFAULT_COMMISSION = 12;
function VendorStatusBadge({ status }) {
  const map = {
    [VendorStatus.pending]: {
      label: "Pending",
      classes: "bg-amber-400/15 text-amber-400 border-amber-400/30"
    },
    [VendorStatus.approved]: {
      label: "Approved",
      classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
    },
    [VendorStatus.rejected]: {
      label: "Rejected",
      classes: "bg-destructive/10 text-destructive border-destructive/20"
    },
    [VendorStatus.suspended]: {
      label: "Suspended",
      classes: "bg-muted text-muted-foreground border-border"
    }
  };
  const cfg = map[status] ?? map[VendorStatus.pending];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${cfg.classes}`,
      children: cfg.label
    }
  );
}
function RejectDialog({
  vendor,
  open,
  onClose
}) {
  const [reason, setReason] = reactExports.useState("");
  const reject = useRejectVendor();
  const handleSubmit = async () => {
    if (!vendor) return;
    try {
      await reject.mutateAsync(vendor.id);
      ue.success(`${vendor.businessName} has been rejected.`);
      setReason("");
      onClose();
    } catch {
      ue.error("Failed to reject vendor. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Dialog,
    {
      open,
      onOpenChange: (v) => {
        if (!v) onClose();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "admin.reject_vendor.dialog", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Reject Vendor Application" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
            "Provide a reason for rejecting",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: vendor == null ? void 0 : vendor.businessName }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            placeholder: "Reason for rejection (optional)…",
            value: reason,
            onChange: (e) => setReason(e.target.value),
            rows: 4,
            "data-ocid": "admin.reject_vendor.reason.textarea"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: onClose,
              "data-ocid": "admin.reject_vendor.cancel.button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "destructive",
              onClick: handleSubmit,
              disabled: reject.isPending,
              "data-ocid": "admin.reject_vendor.confirm.button",
              children: reject.isPending ? "Rejecting…" : "Confirm Rejection"
            }
          )
        ] })
      ] })
    }
  );
}
function PendingTable({
  vendors,
  search
}) {
  const approve = useApproveVendor();
  const [rejectTarget, setRejectTarget] = reactExports.useState(null);
  const filtered = vendors.filter(
    (v) => v.businessName.toLowerCase().includes(search.toLowerCase()) || v.ownerName.toLowerCase().includes(search.toLowerCase())
  );
  const handleApprove = async (v) => {
    try {
      await approve.mutateAsync({
        vendorId: v.id,
        commissionRate: DEFAULT_COMMISSION
      });
      ue.success(
        `${v.businessName} approved with ${DEFAULT_COMMISSION}% commission.`
      );
    } catch {
      ue.error("Approval failed. Please retry.");
    }
  };
  if (filtered.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "py-12 text-center text-sm text-muted-foreground",
        "data-ocid": "admin.pending_vendors.empty_state",
        children: "No pending vendor applications."
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/60 bg-muted/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[10px] font-bold text-primary/70 uppercase tracking-widest", children: "Vendor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[10px] font-bold text-primary/70 uppercase tracking-widest hidden sm:table-cell", children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[10px] font-bold text-primary/70 uppercase tracking-widest hidden md:table-cell", children: "Service Area" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[10px] font-bold text-primary/70 uppercase tracking-widest hidden lg:table-cell", children: "Applied" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[10px] font-bold text-primary/70 uppercase tracking-widest", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: filtered.map((v, _i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "hover:bg-muted/20 transition-colors odd:bg-muted/5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: v.businessName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: v.ownerName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: v.phone })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden sm:table-cell", children: v.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden md:table-cell", children: v.serviceArea }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden lg:table-cell", children: formatDate(v.createdAt) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  onClick: () => handleApprove(v),
                  disabled: approve.isPending,
                  className: "gap-1.5 h-8 text-xs shadow-gold",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "size-3.5" }),
                    " Approve"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  onClick: () => setRejectTarget(v),
                  className: "gap-1.5 h-8 text-xs text-destructive border-destructive/30 hover:bg-destructive/10",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "size-3.5" }),
                    " Reject"
                  ]
                }
              )
            ] }) })
          ]
        },
        v.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      RejectDialog,
      {
        vendor: rejectTarget,
        open: !!rejectTarget,
        onClose: () => setRejectTarget(null)
      }
    )
  ] });
}
function ActiveTable({
  vendors,
  search
}) {
  const toggleFeatured = useToggleFeatured();
  const filtered = vendors.filter(
    (v) => v.businessName.toLowerCase().includes(search.toLowerCase()) || v.ownerName.toLowerCase().includes(search.toLowerCase())
  );
  const handleToggle = async (v) => {
    try {
      await toggleFeatured.mutateAsync(v.id);
      ue.success(
        `${v.businessName} is now ${v.isFeatured ? "unfeatured" : "featured"}.`
      );
    } catch {
      ue.error("Failed to update featured status.");
    }
  };
  if (filtered.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "py-12 text-center text-sm text-muted-foreground",
        "data-ocid": "admin.active_vendors.empty_state",
        children: "No vendors found."
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/60 bg-muted/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[10px] font-bold text-primary/70 uppercase tracking-widest", children: "Vendor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[10px] font-bold text-primary/70 uppercase tracking-widest hidden sm:table-cell", children: "Category" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-[10px] font-bold text-primary/70 uppercase tracking-widest hidden md:table-cell", children: "Rating" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[10px] font-bold text-primary/70 uppercase tracking-widest", children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[10px] font-bold text-primary/70 uppercase tracking-widest", children: "Featured" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[10px] font-bold text-primary/70 uppercase tracking-widest", children: "View" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: filtered.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "hover:bg-muted/20 transition-colors odd:bg-muted/5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: v.businessName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: v.ownerName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden sm:table-cell", children: v.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "size-3 fill-amber-400 text-amber-400" }),
            v.rating.toFixed(1)
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(VendorStatusBadge, { status: v.verificationStatus }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleToggle(v),
              className: "text-muted-foreground hover:text-primary transition-colors",
              "aria-label": v.isFeatured ? "Remove from featured" : "Add to featured",
              "data-ocid": `admin.vendors.featured_toggle.${i + 1}`,
              children: v.isFeatured ? /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleRight, { className: "size-6 text-primary drop-shadow-[0_0_4px_hsl(var(--primary)/0.6)]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleLeft, { className: "size-6" })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: `/stall/${v.id}`,
              target: "_blank",
              rel: "noreferrer",
              className: "inline-flex items-center gap-1 text-xs text-primary hover:underline",
              "data-ocid": `admin.vendors.view_profile.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "size-3" }),
                " View"
              ]
            }
          ) })
        ]
      },
      v.id
    )) })
  ] }) });
}
function AdminVendors() {
  const [search, setSearch] = reactExports.useState("");
  const [activeTab, setActiveTab] = reactExports.useState("pending");
  const { data: allVendors = [], isLoading } = useVendors();
  const { data: pendingVendors = [] } = useVendors({
    status: VendorStatus.pending
  });
  const { data: activeVendors = [] } = useVendors({
    status: VendorStatus.approved
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DashboardLayout,
    {
      title: "Vendor Management",
      subtitle: "Review applications, manage vendors, toggle featured listings",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search by vendor or owner name…",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "pl-9",
                "data-ocid": "admin.vendors.search.input"
              }
            )
          ] }),
          pendingVendors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "destructive", className: "shrink-0", children: [
            pendingVendors.length,
            " pending"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { "data-ocid": "admin.vendors.tabs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "pending", "data-ocid": "admin.vendors.tab.pending", children: [
              "Pending Approval",
              pendingVendors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-2 text-[10px] px-1.5 h-4 bg-destructive text-destructive-foreground", children: pendingVendors.length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "active", "data-ocid": "admin.vendors.tab.active", children: "Active Vendors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "all", "data-ocid": "admin.vendors.tab.all", children: "All Vendors" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 rounded-lg border border-border/50 bg-card overflow-hidden glass-card", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pending", className: "m-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PendingTable, { vendors: pendingVendors, search }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "active", className: "m-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActiveTable, { vendors: activeVendors, search }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "all", className: "m-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActiveTable, { vendors: allVendors, search }) })
          ] }) })
        ] })
      ] })
    }
  );
}
export {
  AdminVendors as default
};

import { r as reactExports, j as jsxRuntimeExports, S as Skeleton, h as ue } from "./index-BKL2lxtv.js";
import { D as DashboardLayout } from "./DashboardLayout-BbZ-GuY6.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-BRsBs6pr.js";
import { c as createLucideIcon, B as Button, V as VendorStatus } from "./useAuth-IAGlSf5h.js";
import { C as Card, b as CardHeader, c as CardTitle, d as CardDescription, a as CardContent } from "./card-BTgr7EEz.js";
import { I as Input } from "./input-wyOQctPS.js";
import { L as Label } from "./label-DYAxIx3c.js";
import { y as usePlatformConfig, z as useUpdatePlatformConfig, u as useVendors, t as useToggleFeatured } from "./useBackend-B1f4NLLV.js";
import { S as Save } from "./save-DIxOcleX.js";
import { T as ToggleRight, a as ToggleLeft } from "./toggle-right-DpwbsYNN.js";
import "./sheet-DdO1tWzN.js";
import "./index-BEBufsG6.js";
import "./index-IXOTxK3N.js";
import "./users-CPmCI05L.js";
import "./calendar-BcXsBU70.js";
import "./trending-up-OZEtAFop.js";
import "./heart-BBjtls9Z.js";
import "./index-Dsok7sFO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode);
function SettingsSection({
  title,
  description,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display font-semibold", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children })
  ] });
}
function AdminSettings() {
  const { data: config, isLoading } = usePlatformConfig();
  const updateConfig = useUpdatePlatformConfig();
  const { data: vendors = [] } = useVendors({ status: VendorStatus.approved });
  const toggleFeatured = useToggleFeatured();
  const [confirmOpen, setConfirmOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    globalCommissionPercent: 12,
    advancePaymentPercent: 50,
    tier1Days: 7,
    tier1FeePercent: 0,
    tier2Days: 3,
    tier2FeePercent: 25,
    tier3FeePercent: 50
  });
  reactExports.useEffect(() => {
    if (!config) return;
    setForm({
      globalCommissionPercent: config.globalCommissionPercent,
      advancePaymentPercent: Number(config.advancePaymentPercent),
      tier1Days: Number(config.cancellationPolicy.tier1Days),
      tier1FeePercent: Number(config.cancellationPolicy.tier1FeePercent),
      tier2Days: Number(config.cancellationPolicy.tier2Days),
      tier2FeePercent: Number(config.cancellationPolicy.tier2FeePercent),
      tier3FeePercent: Number(config.cancellationPolicy.tier3FeePercent)
    });
  }, [config]);
  const handleSave = async () => {
    const updated = {
      globalCommissionPercent: form.globalCommissionPercent,
      advancePaymentPercent: BigInt(form.advancePaymentPercent),
      cancellationPolicy: {
        tier1Days: BigInt(form.tier1Days),
        tier1FeePercent: BigInt(form.tier1FeePercent),
        tier2Days: BigInt(form.tier2Days),
        tier2FeePercent: BigInt(form.tier2FeePercent),
        tier3FeePercent: BigInt(form.tier3FeePercent)
      }
    };
    try {
      await updateConfig.mutateAsync(updated);
      ue.success("Platform settings saved successfully.");
      setConfirmOpen(false);
    } catch {
      ue.error("Failed to save settings. Please retry.");
    }
  };
  const handleToggle = async (vendorId, name, isFeatured) => {
    try {
      await toggleFeatured.mutateAsync(vendorId);
      ue.success(
        `${name} is now ${isFeatured ? "unfeatured" : "featured"}.`
      );
    } catch {
      ue.error("Failed to update featured status.");
    }
  };
  const numField = (key) => ({
    type: "number",
    value: form[key],
    min: 0,
    onChange: (e) => setForm((f) => ({ ...f, [key]: Number(e.target.value) })),
    className: "w-full"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DashboardLayout,
    {
      title: "Platform Settings",
      subtitle: "Commissions, cancellation tiers, and featured vendors",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SettingsSection,
            {
              title: "Commission & Payment",
              description: "Set the platform commission and advance payment requirement.",
              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "commission", children: "Global Commission (%)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "commission",
                      max: 100,
                      ...numField("globalCommissionPercent"),
                      "data-ocid": "admin.settings.commission.input",
                      className: "w-full focus:ring-primary/50 focus:border-primary/50"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "size-3" }),
                    " Applied to all bookings unless overridden."
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "advance", children: "Advance Payment Required (%)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "advance",
                      max: 100,
                      ...numField("advancePaymentPercent"),
                      "data-ocid": "admin.settings.advance.input",
                      className: "w-full focus:ring-primary/50 focus:border-primary/50"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Typically 50 or 100." })
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SettingsSection,
            {
              title: "Cancellation Policy Tiers",
              description: "Define tiered fee percentages based on days before the event.",
              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                [
                  {
                    key: "tier1",
                    label: "Tier 1 — Low Fee",
                    daysKey: "tier1Days",
                    feeKey: "tier1FeePercent",
                    daysOcid: "admin.settings.tier1_days.input",
                    feeOcid: "admin.settings.tier1_fee.input"
                  },
                  {
                    key: "tier2",
                    label: "Tier 2 — Medium Fee",
                    daysKey: "tier2Days",
                    feeKey: "tier2FeePercent",
                    daysOcid: "admin.settings.tier2_days.input",
                    feeOcid: "admin.settings.tier2_fee.input"
                  }
                ].map(({ key, label, daysKey, feeKey, daysOcid, feeOcid }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-lg border border-border p-3 space-y-3 bg-muted/20",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Days Before Event (≥)" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...numField(daysKey), "data-ocid": daysOcid })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Fee (%)" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              max: 100,
                              ...numField(feeKey),
                              "data-ocid": feeOcid
                            }
                          )
                        ] })
                      ] })
                    ]
                  },
                  key
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border p-3 space-y-3 bg-muted/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Tier 3 — High Fee" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[180px] space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "t3f", children: "Fee (%)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "t3f",
                        max: 100,
                        ...numField("tier3FeePercent"),
                        "data-ocid": "admin.settings.tier3_fee.input"
                      }
                    )
                  ] })
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => setConfirmOpen(true),
              disabled: isLoading || updateConfig.isPending,
              className: "gap-2 min-w-[140px]",
              "data-ocid": "admin.settings.save.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "size-4" }),
                updateConfig.isPending ? "Saving…" : "Save Settings"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SettingsSection,
            {
              title: "Featured Vendors",
              description: "Toggle which vendors appear in the featured section on the homepage.",
              children: vendors.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No approved vendors yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: vendors.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between rounded-md px-3 py-2.5 hover:bg-muted/40 transition-colors",
                  "data-ocid": `admin.settings.featured.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm truncate", children: v.businessName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                        v.category,
                        " · ",
                        v.serviceArea
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => handleToggle(v.id, v.businessName, v.isFeatured),
                        className: "ml-4 shrink-0 text-muted-foreground hover:text-primary transition-colors",
                        "aria-label": v.isFeatured ? `Remove ${v.businessName} from featured` : `Add ${v.businessName} to featured`,
                        "data-ocid": `admin.settings.featured_toggle.${i + 1}`,
                        children: v.isFeatured ? /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleRight, { className: "size-7 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleLeft, { className: "size-7" })
                      }
                    )
                  ]
                },
                v.id
              )) })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: confirmOpen, onOpenChange: setConfirmOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "admin.settings.confirm.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Save Platform Settings?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This will update commission rates and cancellation policy across the platform immediately." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "admin.settings.confirm.cancel.button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: handleSave,
                "data-ocid": "admin.settings.confirm.save.button",
                children: updateConfig.isPending ? "Saving…" : "Confirm Save"
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
export {
  AdminSettings as default
};

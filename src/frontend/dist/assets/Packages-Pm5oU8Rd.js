import { r as reactExports, j as jsxRuntimeExports, S as Skeleton, c as formatPrice, h as ue } from "./index-DIzWvAoP.js";
import { D as DashboardLayout, P as Package } from "./DashboardLayout-bdWF5nU2.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-6qk2QkpM.js";
import { B as Badge } from "./sheet-BeMLdLfo.js";
import { c as createLucideIcon, u as useAuth, B as Button } from "./useAuth-Bhs8pioH.js";
import { C as Card, a as CardContent } from "./card-BK5KlsOo.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-BOD-vms5.js";
import { I as Input } from "./input-DyqEZl5Y.js";
import { L as Label } from "./label-DRvcCxqI.js";
import { S as Separator } from "./separator-DrDgD32O.js";
import { T as Textarea } from "./textarea-BMWen7_k.js";
import { u as useVendors, b as useVendorPackages, l as useCreatePackage, m as useUpdatePackage, n as useDeletePackage } from "./useBackend-CUhkj_B6.js";
import { u as useForm } from "./index.esm-Cn19gDw4.js";
import { P as Plus } from "./plus-yJ8cRZfr.js";
import { U as Users } from "./users-pxzxJLV8.js";
import { I as IndianRupee } from "./indian-rupee-CddmOCNr.js";
import "./index-BWMPnhEC.js";
import "./index-IXOTxK3N.js";
import "./calendar-DPjbiL9q.js";
import "./trending-up-BEWPTL-N.js";
import "./heart-7w2sMjVh.js";
import "./index-C8VI1ok0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
const DEFAULT_VALUES = {
  name: "",
  price: "",
  guestMin: "50",
  guestMax: "200",
  inclusions: "",
  setupCharge: "0",
  travelCharge: "0"
};
function packageToFormValues(pkg) {
  return {
    name: pkg.name,
    price: (Number(pkg.price) / 100).toString(),
    guestMin: Number(pkg.guestMin).toString(),
    guestMax: Number(pkg.guestMax).toString(),
    inclusions: pkg.inclusions.join(", "),
    setupCharge: (Number(pkg.setupCharge) / 100).toString(),
    travelCharge: (Number(pkg.travelCharge) / 100).toString()
  };
}
function VendorPackagesPage() {
  const { principal } = useAuth();
  const { data: vendors = [] } = useVendors({});
  const myVendor = vendors.find(
    (v) => v.ownerId.toString() === (principal == null ? void 0 : principal.toString())
  );
  const { data: packages = [], isLoading } = useVendorPackages(myVendor == null ? void 0 : myVendor.id);
  const createPkg = useCreatePackage();
  const updatePkg = useUpdatePackage();
  const deletePkg = useDeletePackage();
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editingPkg, setEditingPkg] = reactExports.useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = reactExports.useState(false);
  const [deletingPkgId, setDeletingPkgId] = reactExports.useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: DEFAULT_VALUES
  });
  const openAdd = () => {
    setEditingPkg(null);
    reset(DEFAULT_VALUES);
    setDialogOpen(true);
  };
  const openEdit = (pkg) => {
    setEditingPkg(pkg);
    reset(packageToFormValues(pkg));
    setDialogOpen(true);
  };
  const onSubmit = async (values) => {
    if (!myVendor) {
      ue.error("Vendor profile not found.");
      return;
    }
    const inclusions = values.inclusions.split(",").map((s) => s.trim()).filter(Boolean);
    const pkg = {
      name: values.name,
      price: BigInt(Math.round(Number.parseFloat(values.price) * 100)),
      guestMin: BigInt(Number.parseInt(values.guestMin, 10)),
      guestMax: BigInt(Number.parseInt(values.guestMax, 10)),
      inclusions,
      setupCharge: BigInt(
        Math.round(Number.parseFloat(values.setupCharge) * 100)
      ),
      travelCharge: BigInt(
        Math.round(Number.parseFloat(values.travelCharge) * 100)
      )
    };
    try {
      if (editingPkg) {
        await updatePkg.mutateAsync({
          packageId: editingPkg.id,
          vendorId: myVendor.id,
          pkg
        });
        ue.success("Package updated!");
      } else {
        await createPkg.mutateAsync({ vendorId: myVendor.id, pkg });
        ue.success("Package created!");
      }
      setDialogOpen(false);
    } catch {
      ue.error(
        editingPkg ? "Failed to update package." : "Failed to create package."
      );
    }
  };
  const handleDeleteOpen = (pkgId) => {
    setDeletingPkgId(pkgId);
    setDeleteDialogOpen(true);
  };
  const handleDeleteConfirm = async () => {
    if (!deletingPkgId) return;
    try {
      await deletePkg.mutateAsync(deletingPkgId);
      ue.success("Package deleted.");
    } catch {
      ue.error("Failed to delete package.");
    } finally {
      setDeleteDialogOpen(false);
      setDeletingPkgId(null);
    }
  };
  const isSaving = createPkg.isPending || updatePkg.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DashboardLayout,
    {
      title: "Packages",
      subtitle: "Manage your stall pricing packages",
      actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: openAdd, "data-ocid": "packages.add_button", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4 mr-1" }),
        " Add Package"
      ] }),
      children: [
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-44 rounded-xl" }, i)) }) : packages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl border border-border/60 bg-card p-12 text-center",
            "data-ocid": "packages.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "size-10 text-muted-foreground mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-xl mb-1", children: "No packages yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Add pricing packages to attract customers" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openAdd, "data-ocid": "packages.empty.add_button", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4 mr-1.5" }),
                " Create your first package"
              ] })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: packages.map((pkg, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "border-border/60 hover:shadow-sm transition-smooth",
            "data-ocid": `packages.item.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-base", children: pkg.name }),
                    pkg.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "bg-secondary/10 text-secondary border-secondary/30 text-[10px]",
                        children: "Active"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-muted-foreground text-[10px]",
                        children: "Inactive"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-display font-bold text-xl mt-0.5", children: formatPrice(pkg.price) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      className: "size-8 text-muted-foreground hover:text-foreground",
                      onClick: () => openEdit(pkg),
                      "data-ocid": `packages.edit_button.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      className: "size-8 text-muted-foreground hover:text-destructive",
                      onClick: () => handleDeleteOpen(pkg.id),
                      "data-ocid": `packages.delete_button.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3.5" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    Number(pkg.guestMin),
                    "–",
                    Number(pkg.guestMax),
                    " guests"
                  ] })
                ] }),
                Number(pkg.setupCharge) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "size-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Setup: ",
                    formatPrice(pkg.setupCharge)
                  ] })
                ] }),
                Number(pkg.travelCharge) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "size-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Travel: ",
                    formatPrice(pkg.travelCharge)
                  ] })
                ] })
              ] }),
              pkg.inclusions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
                pkg.inclusions.slice(0, 3).map((inc) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground",
                    children: inc
                  },
                  inc
                )),
                pkg.inclusions.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground", children: [
                  "+",
                  pkg.inclusions.length - 3,
                  " more"
                ] })
              ] })
            ] })
          },
          pkg.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", "data-ocid": "packages.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: editingPkg ? "Edit Package" : "Create Package" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pkg-name", children: "Package Name *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "pkg-name",
                  className: "mt-1",
                  placeholder: "e.g. Wedding Premium Chaat Package",
                  ...register("name", { required: "Package name is required" }),
                  "data-ocid": "packages.name.input"
                }
              ),
              errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: errors.name.message })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pkg-price", children: "Price (₹) *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "pkg-price",
                    type: "number",
                    min: "0",
                    step: "1",
                    className: "pl-8",
                    placeholder: "15000",
                    ...register("price", {
                      required: "Price is required",
                      min: { value: 1, message: "Price must be > 0" }
                    }),
                    "data-ocid": "packages.price.input"
                  }
                )
              ] }),
              errors.price && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: errors.price.message })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pkg-guest-min", children: "Min Guests" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "pkg-guest-min",
                    type: "number",
                    min: "1",
                    className: "mt-1",
                    ...register("guestMin", { required: true })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pkg-guest-max", children: "Max Guests" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "pkg-guest-max",
                    type: "number",
                    min: "1",
                    className: "mt-1",
                    ...register("guestMax", { required: true })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pkg-inclusions", children: "Inclusions (comma-separated)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "pkg-inclusions",
                  className: "mt-1 resize-none",
                  rows: 2,
                  placeholder: "Live chaat counter, 2 helpers, serving equipment",
                  ...register("inclusions"),
                  "data-ocid": "packages.inclusions.textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pkg-setup", children: "Setup Charge (₹)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "pkg-setup",
                    type: "number",
                    min: "0",
                    step: "1",
                    className: "mt-1",
                    placeholder: "0",
                    ...register("setupCharge")
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pkg-travel", children: "Travel Charge (₹)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "pkg-travel",
                    type: "number",
                    min: "0",
                    step: "1",
                    className: "mt-1",
                    placeholder: "0",
                    ...register("travelCharge")
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  className: "flex-1",
                  onClick: () => setDialogOpen(false),
                  "data-ocid": "packages.cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "flex-1",
                  disabled: isSaving,
                  "data-ocid": "packages.submit_button",
                  children: isSaving ? editingPkg ? "Saving..." : "Creating..." : editingPkg ? "Save Changes" : "Create Package"
                }
              )
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: deleteDialogOpen, onOpenChange: setDeleteDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "packages.delete.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete this package?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Customers will no longer be able to book this package. Active bookings will not be affected." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "packages.delete.cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: handleDeleteConfirm,
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                "data-ocid": "packages.delete.confirm_button",
                children: "Delete Package"
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
export {
  VendorPackagesPage as default
};

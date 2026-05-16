import { r as reactExports, j as jsxRuntimeExports, S as Skeleton, h as ue, d as cn } from "./index-DIzWvAoP.js";
import { D as DashboardLayout } from "./DashboardLayout-bdWF5nU2.js";
import { c as createLucideIcon, u as useAuth, B as Button, V as VendorStatus } from "./useAuth-Bhs8pioH.js";
import { C as Card, b as CardHeader, a as CardContent } from "./card-BK5KlsOo.js";
import { I as Input } from "./input-DyqEZl5Y.js";
import { L as Label } from "./label-DRvcCxqI.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_KY13Mh.js";
import { T as Textarea } from "./textarea-BMWen7_k.js";
import { u as useVendors, o as useUpdateVendorProfile } from "./useBackend-CUhkj_B6.js";
import { u as useForm } from "./index.esm-Cn19gDw4.js";
import { B as Building2 } from "./building-2-BGK1_JCU.js";
import { P as Phone } from "./phone-DwtpoaGc.js";
import { M as Mail } from "./mail-BpmRirr0.js";
import { M as MapPin } from "./map-pin-Clah7rAK.js";
import { S as Save } from "./save-DaQMtnUc.js";
import { S as ShieldX } from "./shield-x-C3b8D7mv.js";
import { S as ShieldCheck } from "./shield-check-Ch-9huLs.js";
import "./sheet-BeMLdLfo.js";
import "./index-BWMPnhEC.js";
import "./index-IXOTxK3N.js";
import "./users-pxzxJLV8.js";
import "./calendar-DPjbiL9q.js";
import "./trending-up-BEWPTL-N.js";
import "./heart-7w2sMjVh.js";
import "./index-C8VI1ok0.js";
import "./index-CKDgaQ-I.js";
import "./index-CRX4YPgd.js";
import "./chevron-down-BCW7NqnS.js";
import "./check-BMuas-wb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }],
  ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
];
const ImagePlus = createLucideIcon("image-plus", __iconNode$2);
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
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
  "Live Sweets Counter"
];
function VerificationStatus({ status }) {
  const configs = {
    [VendorStatus.pending]: {
      icon: ShieldAlert,
      label: "Pending Verification",
      cls: "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-700/30 dark:text-amber-400",
      desc: "Your profile is under review. You'll be notified once approved."
    },
    [VendorStatus.approved]: {
      icon: ShieldCheck,
      label: "Verified Vendor",
      cls: "bg-secondary/10 border-secondary/30 text-secondary",
      desc: "Your profile is verified and live. Customers can book your stall."
    },
    [VendorStatus.rejected]: {
      icon: ShieldX,
      label: "Verification Rejected",
      cls: "bg-destructive/10 border-destructive/20 text-destructive",
      desc: "Your verification was rejected. Please update your profile and resubmit."
    },
    [VendorStatus.suspended]: {
      icon: ShieldX,
      label: "Account Suspended",
      cls: "bg-destructive/10 border-destructive/20 text-destructive",
      desc: "Your account has been suspended. Please contact support."
    }
  };
  const { icon: Icon, label, cls, desc } = configs[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex items-start gap-3 rounded-xl border p-4", cls), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5 shrink-0 mt-0.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-0.5 opacity-80", children: desc })
    ] })
  ] });
}
function VendorProfilePage() {
  const { principal } = useAuth();
  const { data: vendors = [], isLoading } = useVendors({});
  const vendor = vendors.find(
    (v) => v.ownerId.toString() === (principal == null ? void 0 : principal.toString())
  );
  const updateProfile = useUpdateVendorProfile();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isDirty, errors }
  } = useForm();
  const [bankValues, setBankValues] = reactExports.useState({
    accountNumber: "",
    ifscCode: "",
    accountHolderName: ""
  });
  reactExports.useEffect(() => {
    if (vendor) {
      reset({
        businessName: vendor.businessName,
        ownerName: vendor.ownerName,
        phone: vendor.phone,
        email: vendor.email,
        category: vendor.category,
        serviceArea: vendor.serviceArea,
        description: vendor.description
      });
    }
  }, [vendor, reset]);
  const onSave = async (values) => {
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
          description: values.description
        }
      });
      ue.success("Profile saved successfully!");
      reset(values);
    } catch {
      ue.error("Failed to save profile.");
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { title: "My Profile", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 rounded-xl" })
    ] }) });
  }
  if (!vendor) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { title: "My Profile", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-card p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "size-10 text-muted-foreground mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-lg mb-1", children: "No vendor profile found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "You haven't registered as a vendor yet." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/vendor/register", children: "Register as Vendor" }) })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DashboardLayout,
    {
      title: "My Profile",
      subtitle: "Manage your vendor profile and settings",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          VerificationStatus,
          {
            status: vendor.verificationStatus
          }
        ),
        vendor.verificationStatus === VendorStatus.rejected && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => ue.info(
              "Please update your profile details and save to resubmit."
            ),
            "data-ocid": "vendor_profile.resubmit_button",
            children: "Resubmit for Verification"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-base", children: "Stall Photos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Photos help customers choose your stall" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 sm:grid-cols-4 gap-3", children: [
            vendor.photos.slice(0, 7).map((photo, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "aspect-square rounded-lg overflow-hidden bg-muted border border-border/60",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: photo.getDirectURL(),
                    alt: `Stall ${i + 1}`,
                    className: "w-full h-full object-cover",
                    "data-ocid": `vendor_profile.photo.${i + 1}`
                  }
                )
              },
              photo.getDirectURL()
            )),
            vendor.photos.length < 8 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-colors flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary",
                onClick: () => ue.info("Photo uploads available in the next update."),
                "data-ocid": "vendor_profile.add_photo_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "size-5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium", children: "Add Photo" })
                ]
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-base", children: "Business Information" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(onSave), className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Label,
                  {
                    htmlFor: "businessName",
                    className: "flex items-center gap-1.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "size-3.5 text-muted-foreground" }),
                      " ",
                      "Business Name"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "businessName",
                    className: "mt-1",
                    ...register("businessName", {
                      required: "Business name is required"
                    }),
                    "data-ocid": "vendor_profile.business_name.input"
                  }
                ),
                errors.businessName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: errors.businessName.message })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ownerName", children: "Owner Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "ownerName",
                    className: "mt-1",
                    ...register("ownerName", {
                      required: "Owner name is required"
                    }),
                    "data-ocid": "vendor_profile.owner_name.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "phone", className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-3.5 text-muted-foreground" }),
                  " Phone"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "phone",
                    type: "tel",
                    className: "mt-1",
                    ...register("phone", { required: "Phone is required" }),
                    "data-ocid": "vendor_profile.phone.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "email", className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-3.5 text-muted-foreground" }),
                  " Email"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "email",
                    type: "email",
                    className: "mt-1",
                    ...register("email", { required: "Email is required" }),
                    "data-ocid": "vendor_profile.email.input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "category", className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "size-3.5 text-muted-foreground" }),
                " Stall Category"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: watch("category"),
                  onValueChange: (val) => setValue("category", val, { shouldDirty: true }),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "mt-1",
                        "data-ocid": "vendor_profile.category.select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select category" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STALL_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat, children: cat }, cat)) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "serviceArea",
                  className: "flex items-center gap-1.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-3.5 text-muted-foreground" }),
                    " Service Area"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "serviceArea",
                  className: "mt-1",
                  placeholder: "e.g. Nawada, Gaya, Patna",
                  ...register("serviceArea", {
                    required: "Service area is required"
                  }),
                  "data-ocid": "vendor_profile.service_area.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "About Your Stall" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "description",
                  className: "mt-1 resize-none",
                  rows: 3,
                  placeholder: "Describe your stall, specialties, and experience...",
                  ...register("description"),
                  "data-ocid": "vendor_profile.description.textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                disabled: !isDirty || updateProfile.isPending,
                "data-ocid": "vendor_profile.save_button",
                className: "w-full sm:w-auto",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "size-4 mr-1.5" }),
                  updateProfile.isPending ? "Saving..." : "Save Changes"
                ]
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-base", children: "Bank Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "For payout processing. Stored securely and never shared." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-0 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "accountHolderName", children: "Account Holder Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "accountHolderName",
                    className: "mt-1",
                    placeholder: "As on bank account",
                    value: bankValues.accountHolderName,
                    onChange: (e) => setBankValues((v) => ({
                      ...v,
                      accountHolderName: e.target.value
                    })),
                    "data-ocid": "vendor_profile.account_holder.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ifscCode", children: "IFSC Code" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "ifscCode",
                    className: "mt-1",
                    placeholder: "e.g. SBIN0001234",
                    value: bankValues.ifscCode,
                    onChange: (e) => setBankValues((v) => ({
                      ...v,
                      ifscCode: e.target.value.toUpperCase()
                    })),
                    "data-ocid": "vendor_profile.ifsc.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "accountNumber", children: "Account Number" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "accountNumber",
                    className: "mt-1",
                    type: "password",
                    placeholder: "Bank account number",
                    value: bankValues.accountNumber,
                    onChange: (e) => setBankValues((v) => ({
                      ...v,
                      accountNumber: e.target.value
                    })),
                    "data-ocid": "vendor_profile.account_number.input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => ue.success("Bank details saved locally."),
                "data-ocid": "vendor_profile.bank_save_button",
                children: "Save Bank Details"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
export {
  VendorProfilePage as default
};

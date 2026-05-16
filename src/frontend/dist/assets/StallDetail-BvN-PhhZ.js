import { b as useParams, u as useNavigate, r as reactExports, j as jsxRuntimeExports, S as Skeleton, L as Link, f as formatDate, c as formatPrice } from "./index-DIzWvAoP.js";
import { P as PackageCard } from "./PackageCard-CSkTrJI-.js";
import { S as StarRating } from "./StarRating-C3SBl5ni.js";
import { V as VerifiedBadge } from "./VerifiedBadge-DqllpAqD.js";
import { R as RootLayout } from "./RootLayout-58N_cMmF.js";
import { B as Badge } from "./sheet-BeMLdLfo.js";
import { B as Button } from "./useAuth-Bhs8pioH.js";
import { C as Card, a as CardContent } from "./card-BK5KlsOo.js";
import { S as Separator } from "./separator-DrDgD32O.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-ChGkEdjP.js";
import { a as useVendor, b as useVendorPackages, c as useVendorReviews } from "./useBackend-CUhkj_B6.js";
import { A as ArrowLeft } from "./arrow-left-CKYr6rae.js";
import { m as motion } from "./proxy-DxhnKv7e.js";
import { M as MapPin } from "./map-pin-Clah7rAK.js";
import { U as Users } from "./users-pxzxJLV8.js";
import { C as Clock } from "./clock-BmE9tPrM.js";
import { S as Star } from "./star-B5nEqYaN.js";
import { C as Calendar } from "./calendar-DPjbiL9q.js";
import { C as ChevronRight } from "./chevron-right-x2KILwBZ.js";
import { P as Phone } from "./phone-DwtpoaGc.js";
import { M as Mail } from "./mail-BpmRirr0.js";
import "./check-BMuas-wb.js";
import "./truck-CBbR9TLV.js";
import "./shield-x-C3b8D7mv.js";
import "./shield-check-Ch-9huLs.js";
import "./log-in-BiYDoRg7.js";
import "./index-C8VI1ok0.js";
import "./index-CKDgaQ-I.js";
import "./index-BWMPnhEC.js";
function StallDetailPage() {
  var _a;
  const { vendorId } = useParams({ from: "/stall/$vendorId" });
  const navigate = useNavigate();
  const { data: vendor, isLoading: vendorLoading } = useVendor(vendorId);
  const { data: packages = [], isLoading: pkgsLoading } = useVendorPackages(vendorId);
  const { data: reviews = [] } = useVendorReviews(vendorId);
  const [selectedPkg, setSelectedPkg] = reactExports.useState(null);
  if (vendorLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(RootLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-8 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 w-full rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-72" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-xl" })
      ] })
    ] }) });
  }
  if (!vendor) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(RootLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl mb-4 block", children: "🤷" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-2xl mb-3", children: "Vendor not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "This vendor may no longer be active on Stallo." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/browse",
          search: { category: void 0, search: void 0 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4 mr-1" }),
            " Back to Browse"
          ]
        }
      ) })
    ] }) });
  }
  const activePackages = packages.filter((p) => p.isActive);
  const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length : vendor.rating;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RootLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", asChild: true, className: "mb-5 -ml-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/browse",
        search: { category: void 0, search: void 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4 mr-1" }),
          " Back to Browse"
        ]
      }
    ) }),
    ((_a = vendor.photos) == null ? void 0 : _a[0]) && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "rounded-2xl overflow-hidden h-64 md:h-80 bg-muted mb-8 shadow-sm",
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.4 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: vendor.photos[0].getDirectURL(),
            alt: vendor.businessName,
            className: "h-full w-full object-cover"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "lg:col-span-2 space-y-8",
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start gap-3 justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "font-medium", children: vendor.category }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    VerifiedBadge,
                    {
                      status: vendor.verificationStatus
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: avgRating, size: "md" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                    "(",
                    Number(vendor.reviewCount),
                    " reviews)"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-4xl mb-2", children: vendor.businessName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: vendor.serviceArea })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Available for weddings & events" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Available for events" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-base", children: vendor.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "packages", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-6", "data-ocid": "stall.tabs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "packages", "data-ocid": "stall.packages.tab", children: [
                  "Packages (",
                  activePackages.length,
                  ")"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "reviews", "data-ocid": "stall.reviews.tab", children: [
                  "Reviews (",
                  reviews.length,
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "packages", className: "mt-0", children: pkgsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52" }, i)) }) : activePackages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl block mb-2", children: "📦" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No packages available yet." })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: activePackages.map((pkg, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                PackageCard,
                {
                  pkg,
                  index: i,
                  isSelected: (selectedPkg == null ? void 0 : selectedPkg.id) === pkg.id,
                  onSelect: setSelectedPkg
                },
                pkg.id
              )) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "reviews", className: "mt-0", children: reviews.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "size-10 mx-auto mb-2 opacity-20" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No reviews yet. Book this vendor and be the first to review!" })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: reviews.slice(0, 8).map((review) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StarRating,
                    {
                      value: Number(review.rating),
                      size: "sm"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDate(review.createdAt) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: review.comment })
              ] }) }, review.id)) }) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 16 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.4, delay: 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-card p-6 shadow-md sticky top-20 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl mb-1", children: "Book this Stall" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: selectedPkg ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
                selectedPkg.name,
                " selected"
              ] }) : "Select a package below, then book" })
            ] }),
            selectedPkg && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-primary/5 border border-primary/20 p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Starting price" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: formatPrice(selectedPkg.price) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Min. guests" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: Number(selectedPkg.guestMin) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "w-full",
                size: "lg",
                disabled: !selectedPkg,
                onClick: () => navigate({
                  to: "/book/$vendorId",
                  params: { vendorId: vendor.id }
                }),
                "data-ocid": "stall.book_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "size-4 mr-2" }),
                  selectedPkg ? "Book Now" : "Select a Package",
                  selectedPkg && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-4 ml-2" })
                ]
              }
            ),
            !selectedPkg && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground", children: "Choose a package from the Packages tab" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-4 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: vendor.phone })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-4 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: vendor.email })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Free cancellation" }),
              " ",
              "available 7+ days before your event.",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/cancellation-policy",
                  className: "text-primary ml-1 hover:underline",
                  children: "View policy"
                }
              )
            ] })
          ] })
        }
      )
    ] })
  ] }) }) });
}
export {
  StallDetailPage as default
};

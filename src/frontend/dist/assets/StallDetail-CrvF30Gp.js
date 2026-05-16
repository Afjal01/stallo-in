import { b as useParams, u as useNavigate, r as reactExports, j as jsxRuntimeExports, S as Skeleton, L as Link, f as formatDate, c as formatPrice } from "./index-BKL2lxtv.js";
import { P as PackageCard } from "./PackageCard-nAL-pZSo.js";
import { S as StarRating } from "./StarRating-ClJRJp0s.js";
import { V as VerifiedBadge } from "./VerifiedBadge-o3SLT3DJ.js";
import { R as RootLayout } from "./RootLayout-CQsg0YUW.js";
import { B as Badge } from "./sheet-DdO1tWzN.js";
import { B as Button } from "./useAuth-IAGlSf5h.js";
import { C as Card, a as CardContent } from "./card-BTgr7EEz.js";
import { S as Separator } from "./separator-DcZXF9iz.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-JmZdT47h.js";
import { a as useVendor, b as useVendorPackages, c as useVendorReviews } from "./useBackend-B1f4NLLV.js";
import { A as ArrowLeft } from "./arrow-left-DDDeDp3R.js";
import { m as motion } from "./proxy-5vBcU4c8.js";
import { M as MapPin } from "./map-pin-Dy2P6xtZ.js";
import { U as Users } from "./users-CPmCI05L.js";
import { C as Clock } from "./clock-DInTa1dw.js";
import { S as Star } from "./star-7jLtUNX7.js";
import { C as Calendar } from "./calendar-BcXsBU70.js";
import { C as ChevronRight } from "./chevron-right-BA5A7Oyr.js";
import { P as Phone } from "./phone-DyJDBbX7.js";
import { M as Mail } from "./mail-dfhO7J2A.js";
import "./check-hrLNaFSe.js";
import "./truck-DV3NLENy.js";
import "./shield-check-VRt3INtw.js";
import "./shield-x-CbUa9F-o.js";
import "./log-in-Lp5PKdYh.js";
import "./index-Dsok7sFO.js";
import "./index-BjDY_mxd.js";
import "./index-BEBufsG6.js";
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-40 bg-card/60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 w-full rounded-2xl bg-card/60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-72 bg-card/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-full bg-card/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4 bg-card/60" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-xl bg-card/60" })
      ] })
    ] }) });
  }
  if (!vendor) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(RootLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl mb-4 block", children: "🤷" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-2xl mb-3", children: "Vendor not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "This vendor may no longer be active on Stallo." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          variant: "outline",
          className: "border-primary/40 text-primary hover:bg-primary/10",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/browse",
              search: { category: void 0, search: void 0 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4 mr-1" }),
                " Back to Browse"
              ]
            }
          )
        }
      )
    ] }) });
  }
  const activePackages = packages.filter((p) => p.isActive);
  const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length : vendor.rating;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RootLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "ghost",
        size: "sm",
        asChild: true,
        className: "mb-5 -ml-2 text-muted-foreground hover:text-primary",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/browse",
            search: { category: void 0, search: void 0 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4 mr-1" }),
              " Back to Browse"
            ]
          }
        )
      }
    ),
    ((_a = vendor.photos) == null ? void 0 : _a[0]) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "rounded-2xl overflow-hidden h-64 md:h-96 bg-card mb-8 relative shadow-gold",
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: vendor.photos[0].getDirectURL(),
              alt: vendor.businessName,
              className: "h-full w-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-4xl md:text-5xl gold-gradient drop-shadow-lg", children: vendor.businessName }) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "rounded-2xl overflow-hidden h-40 bg-card mb-8 flex items-center justify-center border border-primary/20",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl", children: "🍽️" })
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "secondary",
                      className: "font-medium bg-primary/10 text-primary border-primary/20",
                      children: vendor.category
                    }
                  ),
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
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-6 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl text-primary", children: Number(vendor.reviewCount) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Reviews" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-2xl text-primary", children: [
                    vendor.rating.toFixed(1),
                    "★"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Rating" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl text-primary", children: activePackages.length }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Packages" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4 text-primary/70" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: vendor.serviceArea })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-4 text-primary/70" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Available for weddings & events" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-4 text-primary/70" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Available for events" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-base", children: vendor.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "packages", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsList,
                {
                  className: "mb-6 bg-card border border-border/40",
                  "data-ocid": "stall.tabs",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      TabsTrigger,
                      {
                        value: "packages",
                        "data-ocid": "stall.packages.tab",
                        className: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                        children: [
                          "Packages (",
                          activePackages.length,
                          ")"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      TabsTrigger,
                      {
                        value: "reviews",
                        "data-ocid": "stall.reviews.tab",
                        className: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                        children: [
                          "Reviews (",
                          reviews.length,
                          ")"
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "packages", className: "mt-0", children: pkgsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 bg-card/60" }, i)) }) : activePackages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
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
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "size-10 mx-auto mb-2 opacity-20 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No reviews yet. Book this vendor and be the first to review!" })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: reviews.slice(0, 8).map((review) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Card,
                {
                  className: "glass-card border-border/40",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
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
                  ] })
                },
                review.id
              )) }) })
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
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-6 shadow-gold sticky top-20 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl mb-1", children: "Book this Stall" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: selectedPkg ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-medium", children: [
                selectedPkg.name,
                " selected"
              ] }) : "Select a package below, then book" })
            ] }),
            selectedPkg && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-primary/5 border border-primary/30 p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Starting price" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary", children: formatPrice(selectedPkg.price) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Min. guests" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: Number(selectedPkg.guestMin) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-gold",
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-4 shrink-0 text-primary/70" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: vendor.phone })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-4 shrink-0 text-primary/70" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: vendor.email })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: `https://wa.me/${vendor.phone.replace(/[^0-9]/g, "")}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center justify-center gap-2 w-full rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 transition-smooth py-2.5 text-sm font-medium",
                "data-ocid": "stall.whatsapp_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      className: "size-4",
                      fill: "currentColor",
                      viewBox: "0 0 24 24",
                      "aria-hidden": "true",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
                    }
                  ),
                  "Chat on WhatsApp"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 p-3 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-primary", children: "Free cancellation" }),
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

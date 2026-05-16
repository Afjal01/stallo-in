import { j as jsxRuntimeExports, c as formatPrice, L as Link, d as cn } from "./index-DIzWvAoP.js";
import { B as Badge } from "./sheet-BeMLdLfo.js";
import { B as Button } from "./useAuth-Bhs8pioH.js";
import { C as Card, a as CardContent } from "./card-BK5KlsOo.js";
import { S as StarRating } from "./StarRating-C3SBl5ni.js";
import { V as VerifiedBadge } from "./VerifiedBadge-DqllpAqD.js";
import { M as MapPin } from "./map-pin-Clah7rAK.js";
import { U as Users } from "./users-pxzxJLV8.js";
function VendorCard({
  vendor,
  startingPackage,
  className,
  index = 0
}) {
  var _a, _b, _c;
  const photoUrl = (_c = (_b = (_a = vendor.photos) == null ? void 0 : _a[0]) == null ? void 0 : _b.getDirectURL) == null ? void 0 : _c.call(_b);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: cn(
        "group overflow-hidden border-border/60 shadow-xs hover:shadow-md transition-smooth",
        className
      ),
      "data-ocid": `vendor.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-48 overflow-hidden bg-muted", children: [
          photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: photoUrl,
              alt: vendor.businessName,
              className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "🍽️" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-2 top-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            VerifiedBadge,
            {
              status: vendor.verificationStatus,
              size: "sm"
            }
          ) }),
          vendor.isFeatured && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-2 top-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary text-primary-foreground text-xs", children: "Featured" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "mb-2 text-xs", children: vendor.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground leading-tight mb-1 truncate", children: vendor.businessName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-muted-foreground text-xs mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-3 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: vendor.serviceArea })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: vendor.rating, size: "sm" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                "(",
                Number(vendor.reviewCount),
                ")"
              ] })
            ] }),
            startingPackage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                Number(startingPackage.guestMin),
                "–",
                Number(startingPackage.guestMax)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: startingPackage ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Starting from" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-primary text-lg leading-tight", children: formatPrice(startingPackage.price) })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Contact for pricing" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                size: "sm",
                "data-ocid": `vendor.view_button.${index + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/stall/$vendorId", params: { vendorId: vendor.id }, children: "View Stall" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  VendorCard as V
};

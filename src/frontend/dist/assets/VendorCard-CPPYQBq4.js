import { j as jsxRuntimeExports, c as formatPrice, L as Link, d as cn } from "./index-BKL2lxtv.js";
import { B as Badge } from "./sheet-DdO1tWzN.js";
import { B as Button } from "./useAuth-IAGlSf5h.js";
import { C as Card, a as CardContent } from "./card-BTgr7EEz.js";
import { S as StarRating } from "./StarRating-ClJRJp0s.js";
import { V as VerifiedBadge } from "./VerifiedBadge-o3SLT3DJ.js";
import { M as MapPin } from "./map-pin-Dy2P6xtZ.js";
import { U as Users } from "./users-CPmCI05L.js";
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
        "group overflow-hidden bg-card border border-border/50 hover-lift",
        "hover:border-primary/40 hover:shadow-[0_0_24px_oklch(var(--primary)/0.15),0_8px_32px_oklch(0_0_0/0.35)]",
        "transition-all duration-300",
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
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl opacity-60", children: "🍽️" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-2 top-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            VerifiedBadge,
            {
              status: vendor.verificationStatus,
              size: "sm"
            }
          ) }),
          vendor.isFeatured && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-l from-primary to-primary/80 text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg tracking-wider uppercase shadow-[0_0_12px_oklch(var(--primary)/0.4)]", children: "⭐ Featured" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "mb-2 text-xs bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20",
              children: vendor.category
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground leading-tight mb-1 truncate group-hover:text-primary transition-colors duration-200", children: vendor.businessName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-muted-foreground text-xs mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-3 shrink-0 text-primary/60" }),
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: startingPackage ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: "Starting from" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-primary text-lg leading-tight gold-gradient", children: formatPrice(startingPackage.price) })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Contact for pricing" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                size: "sm",
                className: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_8px_oklch(var(--primary)/0.25)] hover:shadow-[0_0_16px_oklch(var(--primary)/0.4)] transition-shadow duration-200",
                "data-ocid": `vendor.view_button.${index + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/stall/$vendorId", params: { vendorId: vendor.id }, children: "Book Now" })
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

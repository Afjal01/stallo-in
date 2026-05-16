import { j as jsxRuntimeExports, c as formatPrice, d as cn } from "./index-BKL2lxtv.js";
import { B as Badge } from "./sheet-DdO1tWzN.js";
import { c as createLucideIcon, B as Button } from "./useAuth-IAGlSf5h.js";
import { C as Card, b as CardHeader, a as CardContent } from "./card-BTgr7EEz.js";
import { C as Check } from "./check-hrLNaFSe.js";
import { U as Users } from "./users-CPmCI05L.js";
import { T as Truck } from "./truck-DV3NLENy.js";
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
      d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
      key: "cbrjhi"
    }
  ]
];
const Wrench = createLucideIcon("wrench", __iconNode);
function PackageCard({
  pkg,
  onSelect,
  isSelected = false,
  className,
  index = 0
}) {
  const totalPrice = Number(pkg.price) + Number(pkg.setupCharge) + Number(pkg.travelCharge);
  const isFeatured = index === 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: cn(
        "relative transition-all duration-300 cursor-pointer group overflow-hidden",
        isFeatured || isSelected ? "border-primary/60 ring-1 ring-primary/30 shadow-[0_0_24px_oklch(var(--primary)/0.15),0_4px_24px_oklch(0_0_0/0.3)] bg-card" : "border-border/40 hover:border-primary/30 bg-card/80 backdrop-blur-sm",
        !pkg.isActive && "opacity-60 cursor-not-allowed",
        className
      ),
      onClick: () => pkg.isActive && (onSelect == null ? void 0 : onSelect(pkg)),
      "data-ocid": `package.item.${index + 1}`,
      children: [
        (isFeatured || isSelected) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" }),
        isFeatured && !isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-0 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary text-primary-foreground text-[10px] font-bold px-3 py-0.5 rounded-b-md tracking-widest uppercase shadow-[0_4px_12px_oklch(var(--primary)/0.4)]", children: "Popular" }) }),
        isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_10px_oklch(var(--primary)/0.5)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" }) }),
        !pkg.isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Unavailable" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg leading-tight", children: pkg.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1 text-muted-foreground text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                Number(pkg.guestMin),
                " – ",
                Number(pkg.guestMax),
                " guests"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: cn(
                  "font-display font-bold text-2xl leading-tight",
                  isFeatured || isSelected ? "gold-gradient" : "text-primary"
                ),
                children: formatPrice(pkg.price)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "base price" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-0", children: [
          pkg.inclusions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mb-3 space-y-1.5", children: pkg.inclusions.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "flex items-start gap-2 text-sm text-foreground/80",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Check,
                  {
                    className: cn(
                      "size-3.5 mt-0.5 shrink-0",
                      isFeatured || isSelected ? "text-primary" : "text-muted-foreground"
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
              ]
            },
            item
          )) }),
          (Number(pkg.setupCharge) > 0 || Number(pkg.travelCharge) > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 rounded-md bg-muted/40 border border-border/40 p-2 space-y-1", children: [
            Number(pkg.setupCharge) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "size-3" }),
                " Setup charge"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(pkg.setupCharge) })
            ] }),
            Number(pkg.travelCharge) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "size-3" }),
                " Travel charge"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(pkg.travelCharge) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs font-semibold text-foreground border-t border-border/40 pt-1 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: formatPrice(totalPrice) })
            ] })
          ] }),
          onSelect && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: cn(
                "w-full transition-all duration-200",
                isFeatured || isSelected ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_12px_oklch(var(--primary)/0.3)] hover:shadow-[0_0_20px_oklch(var(--primary)/0.45)]" : "border-border/60 hover:border-primary/40 hover:text-primary"
              ),
              variant: isFeatured || isSelected ? "default" : "outline",
              size: "sm",
              disabled: !pkg.isActive,
              onClick: (e) => {
                e.stopPropagation();
                pkg.isActive && onSelect(pkg);
              },
              "data-ocid": `package.select_button.${index + 1}`,
              children: isSelected ? "✓ Selected" : "Select Package"
            }
          )
        ] })
      ]
    }
  );
}
export {
  PackageCard as P
};

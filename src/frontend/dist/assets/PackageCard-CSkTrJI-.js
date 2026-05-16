import { j as jsxRuntimeExports, c as formatPrice, d as cn } from "./index-DIzWvAoP.js";
import { B as Badge } from "./sheet-BeMLdLfo.js";
import { c as createLucideIcon, B as Button } from "./useAuth-Bhs8pioH.js";
import { C as Card, b as CardHeader, a as CardContent } from "./card-BK5KlsOo.js";
import { C as Check } from "./check-BMuas-wb.js";
import { U as Users } from "./users-pxzxJLV8.js";
import { T as Truck } from "./truck-CBbR9TLV.js";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: cn(
        "relative transition-smooth cursor-pointer group",
        isSelected ? "border-primary ring-2 ring-primary/20 shadow-md" : "border-border/60 hover:border-primary/40 hover:shadow-sm",
        !pkg.isActive && "opacity-60 cursor-not-allowed",
        className
      ),
      onClick: () => pkg.isActive && (onSelect == null ? void 0 : onSelect(pkg)),
      "data-ocid": `package.item.${index + 1}`,
      children: [
        isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" }) }),
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-primary text-xl", children: formatPrice(pkg.price) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "base price" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-0", children: [
          pkg.inclusions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mb-3 space-y-1", children: pkg.inclusions.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "flex items-start gap-2 text-sm text-foreground/80",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5 text-secondary mt-0.5 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
              ]
            },
            item
          )) }),
          (Number(pkg.setupCharge) > 0 || Number(pkg.travelCharge) > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 rounded-md bg-muted/60 p-2 space-y-1", children: [
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
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs font-medium text-foreground border-t border-border pt-1 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(totalPrice) })
            ] })
          ] }),
          onSelect && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full",
              variant: isSelected ? "default" : "outline",
              size: "sm",
              disabled: !pkg.isActive,
              onClick: (e) => {
                e.stopPropagation();
                pkg.isActive && onSelect(pkg);
              },
              "data-ocid": `package.select_button.${index + 1}`,
              children: isSelected ? "Selected" : "Select Package"
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

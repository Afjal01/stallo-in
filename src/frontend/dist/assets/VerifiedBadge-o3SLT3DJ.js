import { d as cn, j as jsxRuntimeExports } from "./index-BKL2lxtv.js";
import { V as VendorStatus } from "./useAuth-IAGlSf5h.js";
import { S as ShieldCheck } from "./shield-check-VRt3INtw.js";
import { C as Clock } from "./clock-DInTa1dw.js";
import { S as ShieldX } from "./shield-x-CbUa9F-o.js";
function VerifiedBadge({
  status,
  className,
  size = "sm"
}) {
  const iconSize = size === "sm" ? "size-3" : "size-4";
  const baseClasses = cn(
    "inline-flex items-center gap-1 rounded-full font-semibold",
    size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
  );
  if (status === VendorStatus.approved) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: cn(
          baseClasses,
          "bg-primary/15 text-primary border border-primary/30 shadow-[0_0_8px_oklch(var(--primary)/0.2)]",
          className
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: cn(iconSize, "shrink-0") }),
          "Verified"
        ]
      }
    );
  }
  if (status === VendorStatus.pending) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: cn(
          baseClasses,
          "bg-amber-500/10 text-amber-400 border border-amber-500/25",
          className
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: cn(iconSize, "shrink-0") }),
          "Pending Review"
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        baseClasses,
        "bg-rose-500/10 text-rose-400 border border-rose-500/25",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldX, { className: cn(iconSize, "shrink-0") }),
        "Not Verified"
      ]
    }
  );
}
export {
  VerifiedBadge as V
};

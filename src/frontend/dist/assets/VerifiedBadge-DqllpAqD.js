import { j as jsxRuntimeExports, d as cn } from "./index-DIzWvAoP.js";
import { V as VendorStatus } from "./useAuth-Bhs8pioH.js";
import { S as ShieldX } from "./shield-x-C3b8D7mv.js";
import { S as ShieldCheck } from "./shield-check-Ch-9huLs.js";
function VerifiedBadge({
  status,
  className,
  size = "sm"
}) {
  if (status !== VendorStatus.approved) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: cn(
          "inline-flex items-center gap-1 rounded-full font-medium",
          size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
          "bg-muted text-muted-foreground",
          className
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldX, { className: size === "sm" ? "size-3" : "size-4" }),
          "Unverified"
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        "bg-primary/10 text-primary border border-primary/20",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: size === "sm" ? "size-3" : "size-4" }),
        "Verified"
      ]
    }
  );
}
export {
  VerifiedBadge as V
};

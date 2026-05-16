import { r as reactExports, j as jsxRuntimeExports, L as Link, S as Skeleton } from "./index-DIzWvAoP.js";
import { V as VendorCard } from "./VendorCard-Ci_Drmup.js";
import { D as DashboardLayout } from "./DashboardLayout-bdWF5nU2.js";
import { B as Button } from "./useAuth-Bhs8pioH.js";
import { a as useVendor, b as useVendorPackages } from "./useBackend-CUhkj_B6.js";
import { H as Heart } from "./heart-7w2sMjVh.js";
import { S as Sparkles } from "./sparkles-Bvor011p.js";
import "./sheet-BeMLdLfo.js";
import "./card-BK5KlsOo.js";
import "./StarRating-C3SBl5ni.js";
import "./star-B5nEqYaN.js";
import "./VerifiedBadge-DqllpAqD.js";
import "./shield-x-C3b8D7mv.js";
import "./shield-check-Ch-9huLs.js";
import "./map-pin-Clah7rAK.js";
import "./users-pxzxJLV8.js";
import "./index-BWMPnhEC.js";
import "./index-IXOTxK3N.js";
import "./calendar-DPjbiL9q.js";
import "./trending-up-BEWPTL-N.js";
const SAVED_KEY = "stallo_saved_vendors";
function getSavedIds() {
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY) ?? "[]");
  } catch {
    return [];
  }
}
function SavedVendorRow({
  vendorId,
  index,
  onRemove
}) {
  const { data: vendor, isLoading } = useVendor(vendorId);
  const { data: packages = [] } = useVendorPackages(vendorId);
  const startingPackage = packages.filter((p) => p.isActive).sort((a, b) => Number(a.price) - Number(b.price))[0];
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-xl" });
  }
  if (!vendor) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", "data-ocid": `saved.item.${index + 1}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      VendorCard,
      {
        vendor,
        startingPackage,
        index
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "ghost",
        size: "icon",
        className: "absolute top-2 right-2 size-8 bg-card/80 backdrop-blur-sm hover:bg-destructive/10 hover:text-destructive rounded-full shadow-sm",
        onClick: () => onRemove(vendorId),
        "aria-label": "Remove from saved",
        "data-ocid": `saved.remove_button.${index + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "size-4 fill-primary text-primary" })
      }
    )
  ] });
}
function CustomerSavedPage() {
  const [savedIds, setSavedIds] = reactExports.useState([]);
  reactExports.useEffect(() => {
    setSavedIds(getSavedIds());
  }, []);
  const handleRemove = (id) => {
    const updated = savedIds.filter((s) => s !== id);
    setSavedIds(updated);
    localStorage.setItem(SAVED_KEY, JSON.stringify(updated));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DashboardLayout,
    {
      title: "Saved Stalls",
      subtitle: "Your wishlist of favorite food vendors",
      actions: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          asChild: true,
          "data-ocid": "saved.browse_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/browse",
              search: { category: void 0, search: void 0 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3.5 mr-1.5" }),
                "Browse More"
              ]
            }
          )
        }
      ),
      children: savedIds.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl border border-border/60 bg-card p-12 text-center",
          "data-ocid": "saved.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-14 items-center justify-center rounded-full bg-muted mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "size-7 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-xl mb-2", children: "No saved stalls yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Tap the heart icon on any vendor card to save them here for quick access" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "saved.browse_cta.button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/browse",
                search: { category: void 0, search: void 0 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4 mr-2" }),
                  "Discover Stalls"
                ]
              }
            ) })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-5", children: [
          savedIds.length,
          " saved stall",
          savedIds.length !== 1 ? "s" : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: savedIds.map((id, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          SavedVendorRow,
          {
            vendorId: id,
            index: i,
            onRemove: handleRemove
          },
          id
        )) })
      ] })
    }
  );
}
export {
  CustomerSavedPage as default
};

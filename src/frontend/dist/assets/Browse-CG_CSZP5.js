import { r as reactExports, j as jsxRuntimeExports, a as useSearch, S as Skeleton } from "./index-BKL2lxtv.js";
import { V as VendorCard } from "./VendorCard-CPPYQBq4.js";
import { R as RootLayout } from "./RootLayout-CQsg0YUW.js";
import { B as Badge, X } from "./sheet-DdO1tWzN.js";
import { c as createLucideIcon, B as Button } from "./useAuth-IAGlSf5h.js";
import { I as Input } from "./input-wyOQctPS.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-6JdgOsio.js";
import { u as useVendors } from "./useBackend-B1f4NLLV.js";
import { M as MotionConfigContext, a as isHTMLElement, u as useConstant, P as PresenceContext, b as usePresence, c as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion } from "./proxy-5vBcU4c8.js";
import { S as Search } from "./search-DmNAp61G.js";
import { C as ChevronDown } from "./chevron-down-Ds0owe7i.js";
import "./card-BTgr7EEz.js";
import "./StarRating-ClJRJp0s.js";
import "./star-7jLtUNX7.js";
import "./VerifiedBadge-o3SLT3DJ.js";
import "./shield-check-VRt3INtw.js";
import "./clock-DInTa1dw.js";
import "./shield-x-CbUa9F-o.js";
import "./map-pin-Dy2P6xtZ.js";
import "./users-CPmCI05L.js";
import "./separator-DcZXF9iz.js";
import "./index-Dsok7sFO.js";
import "./log-in-Lp5PKdYh.js";
import "./index-IXOTxK3N.js";
import "./index-BjDY_mxd.js";
import "./index-BEBufsG6.js";
import "./index-hE9AgaEV.js";
import "./check-hrLNaFSe.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
const CATEGORIES = [
  "All",
  "Chaat",
  "Golgappa",
  "Chowmein",
  "Popcorn",
  "Ice Cream",
  "Tea & Coffee",
  "Dosa",
  "Pasta",
  "Mocktails",
  "Live BBQ"
];
const CATEGORY_EMOJI = {
  All: "🍽️",
  Chaat: "🍲",
  Golgappa: "🫙",
  Chowmein: "🍜",
  Popcorn: "🍿",
  "Ice Cream": "🍦",
  "Tea & Coffee": "☕",
  Dosa: "🥞",
  Pasta: "🍝",
  Mocktails: "🍹",
  "Live BBQ": "🔥"
};
function BrowsePage() {
  const rawSearch = useSearch({ from: "/browse" });
  const search = rawSearch;
  const [query, setQuery] = reactExports.useState((search == null ? void 0 : search.search) ?? "");
  const [category, setCategory] = reactExports.useState((search == null ? void 0 : search.category) ?? "All");
  const [sortBy, setSortBy] = reactExports.useState("rating");
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const filter = {
    ...category && category !== "All" ? { category } : {},
    verificationStatus: "approved"
  };
  const { data: vendors = [], isLoading } = useVendors(filter);
  const filtered = vendors.filter(
    (v) => !query || v.businessName.toLowerCase().includes(query.toLowerCase()) || v.serviceArea.toLowerCase().includes(query.toLowerCase()) || v.category.toLowerCase().includes(query.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(RootLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "mb-3 text-primary border-primary/40 bg-primary/5",
                children: "✦ All Vendors"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-4xl md:text-5xl mb-2 gold-gradient", children: "Browse Wedding Food Stalls" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg", children: "Find verified wedding food stall vendors near you" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "mt-6 flex gap-2 max-w-xl",
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.1 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Search vendors, stall names, locations...",
                  value: query,
                  onChange: (e) => setQuery(e.target.value),
                  className: "pl-9 h-11 bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60",
                  "data-ocid": "browse.search_input"
                }
              )
            ] }),
            query && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                onClick: () => setQuery(""),
                "aria-label": "Clear search",
                className: "hover:text-primary",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "icon",
                onClick: () => setShowFilters((p) => !p),
                "aria-label": "Toggle filters",
                "data-ocid": "browse.filters.toggle",
                className: "border-border/60 hover:border-primary/40 hover:text-primary",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "size-4" })
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "flex flex-wrap gap-2 items-center mb-4",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.4, delay: 0.15 },
          children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setCategory(cat),
              className: `rounded-full px-4 py-1.5 text-xs font-medium border transition-all duration-200 flex items-center gap-1.5 ${category === cat ? "bg-primary text-primary-foreground border-primary shadow-gold" : "bg-card text-muted-foreground border-border/50 hover:border-primary/50 hover:text-primary hover:bg-primary/5"}`,
              "data-ocid": `browse.category.${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: CATEGORY_EMOJI[cat] }),
                cat
              ]
            },
            cat
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { height: 0, opacity: 0 },
          animate: { height: "auto", opacity: 1 },
          exit: { height: 0, opacity: 0 },
          transition: { duration: 0.25 },
          className: "overflow-hidden",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-4 items-center py-4 border-t border-border/40 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Sort:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sortBy, onValueChange: setSortBy, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                SelectTrigger,
                {
                  className: "w-44 h-9 text-sm border-border/60 focus:ring-primary/50",
                  "data-ocid": "browse.sort.select",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-3 mr-1" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-card border-border/60", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "rating", children: "Top Rated" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "price", children: "Price: Low to High" })
              ] })
            ] })
          ] }) })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: isLoading ? "Loading vendors..." : `${filtered.length} vendor${filtered.length !== 1 ? "s" : ""} found${category !== "All" ? ` in ${category}` : ""}` }),
        (category !== "All" || query) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => {
              setQuery("");
              setCategory("All");
            },
            className: "text-muted-foreground hover:text-primary",
            "data-ocid": "browse.clear_filters_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3 mr-1" }),
              " Clear filters"
            ]
          }
        )
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5", children: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Skeleton,
        {
          className: "h-80 rounded-xl bg-card/60"
        },
        `skeleton-browse-${n}`
      )) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "flex flex-col items-center gap-4 py-24 glass-card rounded-2xl",
          "data-ocid": "browse.empty_state",
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl", children: "🔍" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-2xl", children: "No vendors found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: query ? `No results for "${query}"` : "No vendors in this category yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => {
                  setQuery("");
                  setCategory("All");
                },
                className: "border-primary/40 text-primary hover:bg-primary/10",
                "data-ocid": "browse.empty_state.clear_button",
                children: "Clear filters"
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5", children: filtered.map((vendor, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "animate-rise-in hover-lift",
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.35,
            delay: Math.min(i * 0.05, 0.4)
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(VendorCard, { vendor, index: i })
        },
        vendor.id
      )) })
    ] }) })
  ] });
}
export {
  BrowsePage as default
};

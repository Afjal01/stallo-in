import { u as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-BKL2lxtv.js";
import { c as createLucideIcon, u as useAuth, a as useCallerRole, C as ChefHat, B as Button } from "./useAuth-IAGlSf5h.js";
import { C as Card, a as CardContent } from "./card-BTgr7EEz.js";
import { S as Separator } from "./separator-DcZXF9iz.js";
import { L as LogIn } from "./log-in-Lp5PKdYh.js";
import { S as ShieldCheck } from "./shield-check-VRt3INtw.js";
import { A as ArrowLeft } from "./arrow-left-DDDeDp3R.js";
import "./index-Dsok7sFO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
];
const Key = createLucideIcon("key", __iconNode);
const BENEFITS = [
  { icon: Key, text: "No passwords to remember — ever" },
  {
    icon: ShieldCheck,
    text: "Cryptographically secure identity, not a username"
  },
  { icon: Globe, text: "Works across all devices seamlessly" }
];
function LoginPage() {
  const { isAuthenticated, isInitializing, isLoggingIn, login } = useAuth();
  const { data: role } = useCallerRole();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (isAuthenticated && role !== void 0) {
      localStorage.setItem("stallo_caller_role", String(role));
      if (localStorage.getItem("stallo_vendor_mode") === null) {
        localStorage.setItem("stallo_vendor_mode", "false");
      }
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, role, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex lg:w-5/12 bg-primary flex-col justify-between p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-10 items-center justify-center rounded-xl bg-primary-foreground/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "size-5 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-xl text-primary-foreground", children: [
          "Stallo",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-60", children: ".in" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/60 text-sm font-medium uppercase tracking-widest mb-6", children: "Trusted by families across Bihar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-4xl text-primary-foreground leading-snug mb-8", children: "Book verified wedding food stalls with confidence." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [
          "100+ verified stall vendors",
          "Transparent pricing & packages",
          "Secure Stripe-powered payments",
          "Dedicated support team"
        ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-1.5 rounded-full bg-primary-foreground/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 text-sm", children: item })
        ] }, item)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-primary-foreground/40 text-xs", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Stallo.in — Nawada, Bihar"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center p-6 lg:p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex lg:hidden items-center gap-3 mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-10 items-center justify-center rounded-xl bg-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "size-5 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-xl", children: [
          "Stallo",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: ".in" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-4xl mb-2", children: [
            "Welcome to ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Stallo" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Sign in to manage bookings, saved vendors, and your profile." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border/60 shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-4 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "What is Internet Identity?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "Internet Identity is a decentralised authentication system by DFINITY — the organisation behind the Internet Computer. It lets you sign in securely without a password or email, using your device's biometrics or security key." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              className: "w-full gap-2 mb-5",
              onClick: login,
              disabled: isInitializing || isLoggingIn,
              "data-ocid": "login.submit_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "size-4" }),
                isInitializing ? "Initialising…" : isLoggingIn ? "Opening Identity window…" : "Sign In with Internet Identity"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-6", children: BENEFITS.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-7 shrink-0 items-center justify-center rounded-lg bg-secondary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(b.icon, { className: "size-3.5 text-secondary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: b.text })
          ] }, b.text)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground", children: "Your identity is protected by the Internet Computer blockchain. Stallo.in never stores passwords." })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
            "data-ocid": "login.back_link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-3.5" }),
              "Continue browsing without signing in"
            ]
          }
        ) })
      ] })
    ] })
  ] });
}
export {
  LoginPage as default
};

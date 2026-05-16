import { r as reactExports, j as jsxRuntimeExports, L as Link, d as cn } from "./index-DIzWvAoP.js";
import { B as Badge, L as LayoutDashboard, d as LogOut, S as Sheet, e as SheetTrigger, M as Menu, f as SheetContent } from "./sheet-BeMLdLfo.js";
import { u as useAuth, a as useCallerRole, U as UserRole, B as Button, C as ChefHat } from "./useAuth-Bhs8pioH.js";
import { S as Separator } from "./separator-DrDgD32O.js";
import { L as LogIn } from "./log-in-BiYDoRg7.js";
const PUBLIC_NAV = [
  { label: "Browse Stalls", href: "/browse" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];
function Logo({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: cn("flex items-center gap-2 group", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "size-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-xl tracking-tight text-foreground", children: [
      "Stallo",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: ".in" })
    ] })
  ] });
}
function RootLayout({ children }) {
  const { isAuthenticated, isInitializing, isLoggingIn, login, logout } = useAuth();
  const { data: role } = useCallerRole();
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const dashboardHref = role === UserRole.admin ? "/admin" : role === UserRole.user ? "/dashboard" : "/dashboard";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-50 bg-card border-b border-border/60 shadow-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container flex h-16 items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "nav",
        {
          className: "hidden md:flex items-center gap-6",
          "aria-label": "Main navigation",
          children: PUBLIC_NAV.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: item.href,
              className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200",
              activeProps: { className: "text-foreground" },
              "data-ocid": `nav.${item.label.toLowerCase().replace(/\s+/g, "-")}.link`,
              children: item.label
            },
            item.href
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-2", children: [
        isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          role && role !== UserRole.guest && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs capitalize", children: role }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              asChild: true,
              "data-ocid": "nav.dashboard.link",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: dashboardHref, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "size-4 mr-1" }),
                "Dashboard"
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: isAuthenticated ? "outline" : "default",
            onClick: isAuthenticated ? logout : login,
            disabled: isInitializing || isLoggingIn,
            "data-ocid": "nav.auth.button",
            children: isInitializing ? "Loading..." : isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4 mr-1" }),
              "Logout"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "size-4 mr-1" }),
              "Sign In"
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { open: mobileOpen, onOpenChange: setMobileOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "md:hidden",
            "aria-label": "Open menu",
            "data-ocid": "nav.mobile_menu.button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "size-5" })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetContent, { side: "right", className: "w-72 p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 p-4 space-y-1", children: [
            PUBLIC_NAV.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: item.href,
                onClick: () => setMobileOpen(false),
                className: "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground transition-colors",
                children: item.label
              },
              item.href
            )),
            isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: dashboardHref,
                  onClick: () => setMobileOpen(false),
                  className: "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "size-4" }),
                    "Dashboard"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full",
              variant: isAuthenticated ? "outline" : "default",
              onClick: () => {
                isAuthenticated ? logout() : login();
                setMobileOpen(false);
              },
              disabled: isInitializing || isLoggingIn,
              "data-ocid": "nav.mobile_auth.button",
              children: isInitializing ? "Loading..." : isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4 mr-1" }),
                "Logout"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "size-4 mr-1" }),
                "Sign In"
              ] })
            }
          ) })
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-card border-t border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { className: "mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs leading-relaxed", children: "The trusted premium platform for booking verified wedding food stalls with transparent pricing, smooth booking, and reliable service." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground", children: "Serving Nawada, Bihar & expanding across India" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm mb-3", children: "Platform" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: [
            { label: "Browse Stalls", href: "/browse" },
            { label: "How It Works", href: "/how-it-works" },
            { label: "Register as Vendor", href: "/vendor/register" },
            { label: "About Us", href: "/about" }
          ].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: l.href,
              className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
              children: l.label
            }
          ) }, l.href)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm mb-3", children: "Legal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: [
            { label: "Terms & Conditions", href: "/terms" },
            { label: "Privacy Policy", href: "/privacy" },
            {
              label: "Cancellation Policy",
              href: "/cancellation-policy"
            },
            { label: "Contact Us", href: "/contact" }
          ].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: l.href,
              className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
              children: l.label
            }
          ) }, l.href)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Stallo.in. All rights reserved."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Built with love using",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "stallo.in")}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-primary hover:underline",
              children: "caffeine.ai"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  RootLayout as R
};

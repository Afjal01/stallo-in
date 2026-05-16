import { r as reactExports, j as jsxRuntimeExports, L as Link, d as cn } from "./index-BKL2lxtv.js";
import { B as Badge, L as LayoutDashboard, d as LogOut, S as Sheet, e as SheetTrigger, M as Menu, f as SheetContent } from "./sheet-DdO1tWzN.js";
import { u as useAuth, a as useCallerRole, U as UserRole, B as Button, C as ChefHat } from "./useAuth-IAGlSf5h.js";
import { S as Separator } from "./separator-DcZXF9iz.js";
import { L as LogIn } from "./log-in-Lp5PKdYh.js";
const PUBLIC_NAV = [
  { label: "Browse Stalls", href: "/browse" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];
function Logo({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: cn("flex items-center gap-2 group", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform duration-200 group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "size-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-xl tracking-tight", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-gradient", children: "Stallo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/60", children: ".in" })
    ] })
  ] });
}
function RootLayout({ children }) {
  const { isAuthenticated, isInitializing, isLoggingIn, login, logout } = useAuth();
  const { data: role } = useCallerRole();
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const [scrolled, setScrolled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const dashboardHref = role === UserRole.admin ? "/admin" : role === UserRole.user ? "/dashboard" : "/dashboard";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "header",
      {
        className: cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled ? "bg-background/95 backdrop-blur-lg border-b border-border/40 shadow-[0_4px_24px_oklch(0_0_0/0.4)]" : "bg-background/80 backdrop-blur-sm border-b border-transparent"
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container flex h-16 items-center justify-between gap-4", children: [
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
                  className: "relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
                  activeProps: {
                    className: "text-primary after:!w-full after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:bg-primary"
                  },
                  "data-ocid": `nav.${item.label.toLowerCase().replace(/\s+/g, "-")}.link`,
                  children: item.label
                },
                item.href
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-2", children: [
            isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              role && role !== UserRole.guest && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs capitalize border-primary/30 text-primary bg-primary/10",
                  children: role
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  asChild: true,
                  className: "text-muted-foreground hover:text-foreground",
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
                className: cn(
                  isAuthenticated ? "border-border/60 hover:border-primary/40 hover:text-primary" : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_12px_oklch(var(--primary)/0.3)]"
                ),
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
                className: "md:hidden text-muted-foreground hover:text-foreground",
                "aria-label": "Open menu",
                "data-ocid": "nav.mobile_menu.button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "size-5" })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SheetContent,
              {
                side: "right",
                className: "w-72 p-0 bg-card border-l border-border/60",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 p-4 space-y-1", children: [
                    PUBLIC_NAV.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Link,
                      {
                        to: item.href,
                        onClick: () => setMobileOpen(false),
                        className: "flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-foreground/70 hover:bg-primary/10 hover:text-primary transition-colors",
                        children: item.label
                      },
                      item.href
                    )),
                    isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-2 bg-border/60" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Link,
                        {
                          to: dashboardHref,
                          onClick: () => setMobileOpen(false),
                          className: "flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-foreground/70 hover:bg-primary/10 hover:text-primary transition-colors",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "size-4" }),
                            "Dashboard"
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-t border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      className: cn(
                        "w-full",
                        !isAuthenticated && "bg-primary text-primary-foreground hover:bg-primary/90"
                      ),
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
                ] })
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-card border-t border-border/60 mt-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container pt-12 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-10 md:grid-cols-4 mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { className: "mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs leading-relaxed", children: "The trusted premium platform for booking verified wedding food stalls with transparent pricing, smooth booking, and reliable service." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground/70", children: "Serving Nawada, Bihar & expanding across India" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-1 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex size-2 rounded-full bg-primary animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: "Live & Accepting Bookings" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-sm mb-4 text-foreground", children: "Platform" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: [
            { label: "Browse Stalls", href: "/browse" },
            { label: "How It Works", href: "/how-it-works" },
            { label: "Register as Vendor", href: "/vendor/register" },
            { label: "About Us", href: "/about" }
          ].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: l.href,
              className: "text-sm text-muted-foreground hover:text-primary transition-colors duration-200",
              children: l.label
            }
          ) }, l.href)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-sm mb-4 text-foreground", children: "Legal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: [
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
              className: "text-sm text-muted-foreground hover:text-primary transition-colors duration-200",
              children: l.label
            }
          ) }, l.href)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground pt-6", children: [
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

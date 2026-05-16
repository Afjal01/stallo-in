import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth, useCallerRole } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ChefHat,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const PUBLIC_NAV = [
  { label: "Browse Stalls", href: "/browse" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2 group", className)}>
      <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform duration-200 group-hover:scale-110">
        <ChefHat className="size-4" />
      </div>
      <span className="font-display font-bold text-xl tracking-tight">
        <span className="gold-gradient">Stallo</span>
        <span className="text-foreground/60">.in</span>
      </span>
    </Link>
  );
}

export function RootLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isInitializing, isLoggingIn, login, logout } =
    useAuth();
  const { data: role } = useCallerRole();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dashboardHref =
    role === UserRole.admin
      ? "/admin"
      : role === UserRole.user
        ? "/dashboard"
        : "/dashboard";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/95 backdrop-blur-lg border-b border-border/40 shadow-[0_4px_24px_oklch(0_0_0/0.4)]"
            : "bg-background/80 backdrop-blur-sm border-b border-transparent",
        )}
      >
        <div className="container flex h-16 items-center justify-between gap-4">
          <Logo />

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main navigation"
          >
            {PUBLIC_NAV.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                activeProps={{
                  className:
                    "text-primary after:!w-full after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:bg-primary",
                }}
                data-ocid={`nav.${item.label.toLowerCase().replace(/\s+/g, "-")}.link`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated && (
              <>
                {role && role !== UserRole.guest && (
                  <Badge
                    variant="outline"
                    className="text-xs capitalize border-primary/30 text-primary bg-primary/10"
                  >
                    {role}
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-muted-foreground hover:text-foreground"
                  data-ocid="nav.dashboard.link"
                >
                  <Link to={dashboardHref}>
                    <LayoutDashboard className="size-4 mr-1" />
                    Dashboard
                  </Link>
                </Button>
              </>
            )}
            <Button
              size="sm"
              variant={isAuthenticated ? "outline" : "default"}
              onClick={isAuthenticated ? logout : login}
              disabled={isInitializing || isLoggingIn}
              className={cn(
                isAuthenticated
                  ? "border-border/60 hover:border-primary/40 hover:text-primary"
                  : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_12px_oklch(var(--primary)/0.3)]",
              )}
              data-ocid="nav.auth.button"
            >
              {isInitializing ? (
                "Loading..."
              ) : isAuthenticated ? (
                <>
                  <LogOut className="size-4 mr-1" />
                  Logout
                </>
              ) : (
                <>
                  <LogIn className="size-4 mr-1" />
                  Sign In
                </>
              )}
            </Button>
          </div>

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-muted-foreground hover:text-foreground"
                aria-label="Open menu"
                data-ocid="nav.mobile_menu.button"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 p-0 bg-card border-l border-border/60"
            >
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-border/60">
                  <Logo />
                </div>
                <nav className="flex-1 p-4 space-y-1">
                  {PUBLIC_NAV.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-foreground/70 hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                  {isAuthenticated && (
                    <>
                      <Separator className="my-2 bg-border/60" />
                      <Link
                        to={dashboardHref}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-foreground/70 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <LayoutDashboard className="size-4" />
                        Dashboard
                      </Link>
                    </>
                  )}
                </nav>
                <div className="p-4 border-t border-border/60">
                  <Button
                    className={cn(
                      "w-full",
                      !isAuthenticated &&
                        "bg-primary text-primary-foreground hover:bg-primary/90",
                    )}
                    variant={isAuthenticated ? "outline" : "default"}
                    onClick={() => {
                      isAuthenticated ? logout() : login();
                      setMobileOpen(false);
                    }}
                    disabled={isInitializing || isLoggingIn}
                    data-ocid="nav.mobile_auth.button"
                  >
                    {isInitializing ? (
                      "Loading..."
                    ) : isAuthenticated ? (
                      <>
                        <LogOut className="size-4 mr-1" />
                        Logout
                      </>
                    ) : (
                      <>
                        <LogIn className="size-4 mr-1" />
                        Sign In
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border/60 mt-auto">
        <div className="container pt-12 pb-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4 mb-10">
            <div className="md:col-span-2">
              <Logo className="mb-4" />
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                The trusted premium platform for booking verified wedding food
                stalls with transparent pricing, smooth booking, and reliable
                service.
              </p>
              <p className="mt-3 text-xs text-muted-foreground/70">
                Serving Nawada, Bihar &amp; expanding across India
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs">
                <span className="inline-flex size-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary font-medium">
                  Live &amp; Accepting Bookings
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm mb-4 text-foreground">
                Platform
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Browse Stalls", href: "/browse" },
                  { label: "How It Works", href: "/how-it-works" },
                  { label: "Register as Vendor", href: "/vendor/register" },
                  { label: "About Us", href: "/about" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm mb-4 text-foreground">
                Legal
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Terms & Conditions", href: "/terms" },
                  { label: "Privacy Policy", href: "/privacy" },
                  {
                    label: "Cancellation Policy",
                    href: "/cancellation-policy",
                  },
                  { label: "Contact Us", href: "/contact" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Separator className="bg-border/60" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground pt-6">
            <span>
              © {new Date().getFullYear()} Stallo.in. All rights reserved.
            </span>
            <span>
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "stallo.in")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

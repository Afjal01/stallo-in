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
import { useState } from "react";

const PUBLIC_NAV = [
  { label: "Browse Stalls", href: "/browse" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2 group", className)}>
      <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
        <ChefHat className="size-4" />
      </div>
      <span className="font-display font-bold text-xl tracking-tight text-foreground">
        Stallo<span className="text-primary">.in</span>
      </span>
    </Link>
  );
}

export function RootLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isInitializing, isLoggingIn, login, logout } =
    useAuth();
  const { data: role } = useCallerRole();
  const [mobileOpen, setMobileOpen] = useState(false);

  const dashboardHref =
    role === UserRole.admin
      ? "/admin"
      : role === UserRole.user
        ? "/dashboard"
        : "/dashboard";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border/60 shadow-xs">
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
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                activeProps={{ className: "text-foreground" }}
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
                  <Badge variant="outline" className="text-xs capitalize">
                    {role}
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
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
                className="md:hidden"
                aria-label="Open menu"
                data-ocid="nav.mobile_menu.button"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-border">
                  <Logo />
                </div>
                <nav className="flex-1 p-4 space-y-1">
                  {PUBLIC_NAV.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                  {isAuthenticated && (
                    <>
                      <Separator className="my-2" />
                      <Link
                        to={dashboardHref}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground transition-colors"
                      >
                        <LayoutDashboard className="size-4" />
                        Dashboard
                      </Link>
                    </>
                  )}
                </nav>
                <div className="p-4 border-t border-border">
                  <Button
                    className="w-full"
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
      <footer className="bg-card border-t border-border/60">
        <div className="container py-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <Logo className="mb-3" />
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                The trusted premium platform for booking verified wedding food
                stalls with transparent pricing, smooth booking, and reliable
                service.
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Serving Nawada, Bihar &amp; expanding across India
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Platform</h4>
              <ul className="space-y-2">
                {[
                  { label: "Browse Stalls", href: "/browse" },
                  { label: "How It Works", href: "/how-it-works" },
                  { label: "Register as Vendor", href: "/vendor/register" },
                  { label: "About Us", href: "/about" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Legal</h4>
              <ul className="space-y-2">
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
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
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

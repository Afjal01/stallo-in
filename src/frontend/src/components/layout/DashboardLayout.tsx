import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth, useCallerRole } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { getInitials } from "@/lib/utils";
import { UserRole } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  ChartBar,
  ChefHat,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingBag,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";

type NavGroup = { label: string; items: NavItem[] };
type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
};

const ADMIN_NAV: NavGroup[] = [
  {
    label: "Operations",
    items: [
      { label: "Overview", href: "/admin", icon: LayoutDashboard },
      { label: "Vendors", href: "/admin/vendors", icon: Users },
      { label: "Bookings", href: "/admin/bookings", icon: ShoppingBag },
    ],
  },
  {
    label: "Insights",
    items: [
      { label: "Analytics", href: "/admin/analytics", icon: ChartBar },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

const VENDOR_NAV: NavGroup[] = [
  {
    label: "Business",
    items: [
      { label: "Orders", href: "/vendor", icon: ShoppingBag },
      { label: "Packages", href: "/vendor/packages", icon: Package },
      { label: "Calendar", href: "/vendor/calendar", icon: Calendar },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Earnings", href: "/vendor/earnings", icon: TrendingUp },
      { label: "Profile", href: "/vendor/profile", icon: User },
    ],
  },
];

const CUSTOMER_NAV: NavGroup[] = [
  {
    label: "My Account",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Bookings", href: "/dashboard/bookings", icon: ShoppingBag },
      { label: "Saved Stalls", href: "/dashboard/saved", icon: Heart },
      { label: "Profile", href: "/dashboard/profile", icon: User },
    ],
  },
];

function SidebarContent({
  navGroups,
  role,
  onNavClick,
}: {
  navGroups: NavGroup[];
  role: UserRole;
  onNavClick?: () => void;
}) {
  const { identity, logout } = useAuth();
  const principal = identity?.getPrincipal()?.toString();
  const shortPrincipal = principal
    ? `${principal.slice(0, 5)}...${principal.slice(-3)}`
    : "";

  const roleLabel =
    role === UserRole.admin
      ? "Admin"
      : role === UserRole.user
        ? "Vendor"
        : "Customer";

  const roleBadgeClasses =
    role === UserRole.admin
      ? "bg-primary/15 text-primary border border-primary/30"
      : role === UserRole.user
        ? "bg-secondary/15 text-secondary border border-secondary/30"
        : "bg-muted text-muted-foreground border border-border/60";

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-border/50">
        <Link
          to="/"
          onClick={onNavClick}
          className="flex items-center gap-2 group"
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform duration-200 group-hover:scale-110">
            <ChefHat className="size-4" />
          </div>
          <span className="font-display font-bold text-base">
            <span className="gold-gradient">Stallo</span>
            <span className="text-foreground/50">.in</span>
          </span>
        </Link>
      </div>

      {/* Role badge */}
      <div className="px-4 py-3 border-b border-border/30">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
            roleBadgeClasses,
          )}
        >
          <span className="inline-flex size-1.5 rounded-full bg-current opacity-80" />
          {roleLabel} Panel
        </span>
      </div>

      {/* Nav groups */}
      <ScrollArea className="flex-1 px-3 py-2">
        <nav className="space-y-5 pb-4">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="px-2 mb-1.5 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={onNavClick}
                      className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
                      activeProps={{
                        className:
                          "bg-primary/10 text-primary font-semibold border-l-4 border-primary pl-[6px] rounded-l-none",
                      }}
                      activeOptions={{
                        exact: item.href.split("/").length <= 2,
                      }}
                      data-ocid={`sidebar.${item.label.toLowerCase().replace(/\s+/g, "-")}.link`}
                    >
                      <item.icon className="size-4 shrink-0" />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <Badge className="ml-auto text-xs px-1.5 py-0 h-5 bg-primary text-primary-foreground">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* User footer */}
      <div className="border-t border-border/50 p-3">
        <div className="flex items-center gap-2.5 rounded-md p-2 hover:bg-muted/50 transition-colors">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold border border-primary/20">
            {getInitials(shortPrincipal || "U")}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">
              {shortPrincipal || "User"}
            </p>
            <p className="text-[10px] text-muted-foreground/70 truncate">
              Internet Identity
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-7 shrink-0 text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 transition-colors"
            onClick={logout}
            aria-label="Logout"
            data-ocid="sidebar.logout.button"
          >
            <LogOut className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function DashboardLayout({
  children,
  title,
  subtitle,
  actions,
}: DashboardLayoutProps) {
  const { data: role = UserRole.guest } = useCallerRole();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navGroups =
    role === UserRole.admin
      ? ADMIN_NAV
      : role === UserRole.user
        ? VENDOR_NAV
        : CUSTOMER_NAV;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-60 shrink-0 bg-background border-r border-border/50 shadow-[1px_0_0_0_oklch(var(--border)/0.5)]">
        <SidebarContent navGroups={navGroups} role={role} />
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="w-60 p-0 bg-background border-r border-border/50"
        >
          <SidebarContent
            navGroups={navGroups}
            role={role}
            onNavClick={() => setMobileOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border/50 bg-card/80 backdrop-blur-sm px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(true)}
            aria-label="Open sidebar"
            data-ocid="dashboard.mobile_menu.button"
          >
            <Menu className="size-5" />
          </Button>
          <div className="flex-1 min-w-0">
            {title && (
              <h1 className="font-display font-semibold text-lg text-foreground truncate">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-xs text-muted-foreground truncate">
                {subtitle}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2 shrink-0">{actions}</div>
          )}
        </header>

        {/* Page content */}
        <ScrollArea className="flex-1 bg-background">
          <div className="p-4 lg:p-6">{children}</div>
        </ScrollArea>
      </div>
    </div>
  );
}

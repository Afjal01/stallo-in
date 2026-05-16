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
        ? "Vendor / Customer"
        : "Guest";
  const roleBg =
    role === UserRole.admin
      ? "bg-primary/10 text-primary"
      : "bg-secondary/15 text-secondary";

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/" onClick={onNavClick} className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <ChefHat className="size-3.5" />
          </div>
          <span className="font-display font-bold text-base text-sidebar-foreground">
            Stallo<span className="text-primary">.in</span>
          </span>
        </Link>
      </div>

      {/* Role badge */}
      <div className="px-4 py-3">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
            roleBg,
          )}
        >
          {roleLabel}
        </span>
      </div>

      {/* Nav groups */}
      <ScrollArea className="flex-1 px-3">
        <nav className="space-y-4 pb-4">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="px-2 mb-1 text-xs font-semibold text-sidebar-accent-foreground uppercase tracking-wider">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={onNavClick}
                      className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
                      activeProps={{
                        className:
                          "bg-sidebar-accent text-sidebar-foreground font-semibold",
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
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2.5 rounded-md p-2 hover:bg-sidebar-accent transition-colors">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold">
            {getInitials(shortPrincipal || "U")}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-sidebar-foreground truncate">
              {shortPrincipal || "User"}
            </p>
            <p className="text-[10px] text-sidebar-accent-foreground truncate">
              Internet Identity
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-7 shrink-0 text-sidebar-accent-foreground hover:text-destructive"
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
      <aside className="hidden lg:flex lg:flex-col w-60 shrink-0 bg-sidebar border-r border-sidebar-border">
        <SidebarContent navGroups={navGroups} role={role} />
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-60 p-0 bg-sidebar">
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
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-card px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
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
        <ScrollArea className="flex-1">
          <div className="p-4 lg:p-6">{children}</div>
        </ScrollArea>
      </div>
    </div>
  );
}

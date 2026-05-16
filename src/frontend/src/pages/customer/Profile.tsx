import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { Bell, MapPin, Plus, Shield, User, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ADDRESSES_KEY = "stallo_saved_addresses";
const NOTIF_KEY = "stallo_notifications";

function getSavedAddresses(): string[] {
  try {
    return JSON.parse(localStorage.getItem(ADDRESSES_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

function getNotifPref(): boolean {
  return localStorage.getItem(NOTIF_KEY) !== "false";
}

export default function CustomerProfilePage() {
  const { principal, logout } = useAuth();
  const [addresses, setAddresses] = useState<string[]>(getSavedAddresses);
  const [newAddress, setNewAddress] = useState("");
  const [notifications, setNotifications] = useState(getNotifPref);

  const principalStr = principal?.toString() ?? "";

  const handleAddAddress = () => {
    const trimmed = newAddress.trim();
    if (!trimmed) return;
    if (addresses.includes(trimmed)) {
      toast.error("Address already saved");
      return;
    }
    const updated = [...addresses, trimmed];
    setAddresses(updated);
    localStorage.setItem(ADDRESSES_KEY, JSON.stringify(updated));
    setNewAddress("");
    toast.success("Address saved");
  };

  const handleRemoveAddress = (addr: string) => {
    const updated = addresses.filter((a) => a !== addr);
    setAddresses(updated);
    localStorage.setItem(ADDRESSES_KEY, JSON.stringify(updated));
  };

  const handleToggleNotifications = (value: boolean) => {
    setNotifications(value);
    localStorage.setItem(NOTIF_KEY, String(value));
    toast.success(value ? "Notifications enabled" : "Notifications disabled");
  };

  return (
    <DashboardLayout
      title="My Profile"
      subtitle="Manage your account and preferences"
    >
      <div className="max-w-2xl space-y-6">
        {/* Identity */}
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/15">
                <User className="size-5 text-primary" />
              </div>
              <div>
                <h2 className="font-display font-semibold text-lg">Identity</h2>
                <p className="text-xs text-muted-foreground">
                  Managed by Internet Identity
                </p>
              </div>
              <Badge
                variant="outline"
                className="ml-auto border-secondary/40 text-secondary"
              >
                <Shield className="size-3 mr-1" />
                Verified
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="principal">Principal ID</Label>
              <div className="relative mt-1">
                <Input
                  id="principal"
                  readOnly
                  value={principalStr}
                  className="font-mono text-xs pr-20 bg-muted/40"
                  data-ocid="profile.principal.input"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 text-xs"
                  onClick={() => {
                    navigator.clipboard.writeText(principalStr);
                    toast.success("Principal ID copied");
                  }}
                  data-ocid="profile.copy_principal.button"
                >
                  Copy
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">
                Your unique blockchain identity. No personal data is stored on
                our servers.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Saved addresses */}
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-muted-foreground" />
              <h2 className="font-display font-semibold text-base">
                Saved Addresses
              </h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {addresses.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No saved addresses yet.
              </p>
            ) : (
              <div className="space-y-2" data-ocid="profile.addresses.list">
                {addresses.map((addr, i) => (
                  <div
                    key={addr}
                    className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-3 py-2.5"
                    data-ocid={`profile.address.item.${i + 1}`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <MapPin className="size-3.5 text-muted-foreground shrink-0" />
                      <span className="text-sm truncate">{addr}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-7 shrink-0 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemoveAddress(addr)}
                      aria-label="Remove address"
                      data-ocid={`profile.remove_address.button.${i + 1}`}
                    >
                      <X className="size-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <Separator />

            <div className="flex gap-2">
              <Input
                placeholder="Add a venue address..."
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddAddress()}
                className="flex-1"
                data-ocid="profile.new_address.input"
              />
              <Button
                type="button"
                size="sm"
                onClick={handleAddAddress}
                disabled={!newAddress.trim()}
                data-ocid="profile.add_address.button"
              >
                <Plus className="size-4 mr-1" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification preferences */}
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Bell className="size-4 text-muted-foreground" />
              <h2 className="font-display font-semibold text-base">
                Notifications
              </h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">
                  Email & booking notifications
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Receive updates about bookings, confirmations, and reminders
                </p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={handleToggleNotifications}
                aria-label="Toggle notifications"
                data-ocid="profile.notifications.switch"
              />
            </div>
          </CardContent>
        </Card>

        {/* Danger zone */}
        <Card className="border-destructive/30">
          <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-sm">Sign Out</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Disconnect your Internet Identity from this session
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={logout}
              data-ocid="profile.logout.button"
            >
              Log Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

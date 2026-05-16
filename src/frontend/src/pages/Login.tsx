import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth, useCallerRole } from "@/hooks/useAuth";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChefHat,
  Globe,
  Key,
  LogIn,
  ShieldCheck,
} from "lucide-react";
import { useEffect } from "react";

const BENEFITS = [
  { icon: Key, text: "No passwords to remember — ever" },
  {
    icon: ShieldCheck,
    text: "Cryptographically secure identity, not a username",
  },
  { icon: Globe, text: "Works across all devices seamlessly" },
];

export default function LoginPage() {
  const { isAuthenticated, isInitializing, isLoggingIn, login } = useAuth();
  const { data: role } = useCallerRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && role !== undefined) {
      // Persist role to localStorage for route guards
      localStorage.setItem("stallo_caller_role", String(role));
      if (localStorage.getItem("stallo_vendor_mode") === null) {
        localStorage.setItem("stallo_vendor_mode", "false");
      }
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, role, navigate]);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left decorative panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-5/12 bg-primary flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary-foreground/10">
            <ChefHat className="size-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-primary-foreground">
            Stallo<span className="opacity-60">.in</span>
          </span>
        </div>

        <div>
          <p className="text-primary-foreground/60 text-sm font-medium uppercase tracking-widest mb-6">
            Trusted by families across Bihar
          </p>
          <h2 className="font-display font-bold text-4xl text-primary-foreground leading-snug mb-8">
            Book verified wedding food stalls with confidence.
          </h2>
          <div className="space-y-4">
            {[
              "100+ verified stall vendors",
              "Transparent pricing & packages",
              "Secure Stripe-powered payments",
              "Dedicated support team",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="size-1.5 rounded-full bg-primary-foreground/60" />
                <p className="text-primary-foreground/80 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-primary-foreground/40 text-xs">
          © {new Date().getFullYear()} Stallo.in — Nawada, Bihar
        </p>
      </div>

      {/* Right login panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-3 mb-10">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary">
            <ChefHat className="size-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl">
            Stallo<span className="text-primary">.in</span>
          </span>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="font-display font-bold text-4xl mb-2">
              Welcome to <span className="text-primary">Stallo</span>
            </h1>
            <p className="text-muted-foreground">
              Sign in to manage bookings, saved vendors, and your profile.
            </p>
          </div>

          <Card className="border-border/60 shadow-md">
            <CardContent className="p-8">
              {/* Internet Identity explanation */}
              <div className="bg-muted/40 rounded-xl p-4 mb-6">
                <p className="text-sm font-medium mb-1">
                  What is Internet Identity?
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Internet Identity is a decentralised authentication system by
                  DFINITY — the organisation behind the Internet Computer. It
                  lets you sign in securely without a password or email, using
                  your device's biometrics or security key.
                </p>
              </div>

              <Button
                size="lg"
                className="w-full gap-2 mb-5"
                onClick={login}
                disabled={isInitializing || isLoggingIn}
                data-ocid="login.submit_button"
              >
                <LogIn className="size-4" />
                {isInitializing
                  ? "Initialising…"
                  : isLoggingIn
                    ? "Opening Identity window…"
                    : "Sign In with Internet Identity"}
              </Button>

              <div className="space-y-3 mb-6">
                {BENEFITS.map((b) => (
                  <div key={b.text} className="flex items-center gap-3">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                      <b.icon className="size-3.5 text-secondary" />
                    </div>
                    <p className="text-xs text-muted-foreground">{b.text}</p>
                  </div>
                ))}
              </div>

              <Separator className="mb-5" />

              <p className="text-xs text-center text-muted-foreground">
                Your identity is protected by the Internet Computer blockchain.
                Stallo.in never stores passwords.
              </p>
            </CardContent>
          </Card>

          <div className="mt-5 flex items-center justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="login.back_link"
            >
              <ArrowLeft className="size-3.5" />
              Continue browsing without signing in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

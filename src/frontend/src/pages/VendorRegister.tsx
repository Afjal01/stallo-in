import { RootLayout } from "@/components/layout/RootLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCreateVendorProfile } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import {
  Building2,
  CheckCircle2,
  ChefHat,
  ChevronRight,
  FileText,
  ShieldCheck,
  Star,
  TrendingUp,
  UtensilsCrossed,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CATEGORIES = [
  "Chaat & Golgappa",
  "Chowmein & Pasta",
  "Dosa & Snacks",
  "Ice Cream & Desserts",
  "Tea & Coffee",
  "Mocktails & Juices",
  "Popcorn & Snacks",
  "Interactive Stations",
  "Biryani & Rice",
  "Kebabs & Grills",
];

const STEPS = [
  { id: 1, label: "Business Info", icon: Building2 },
  { id: 2, label: "Stall Details", icon: UtensilsCrossed },
  { id: 3, label: "Agreement", icon: FileText },
];

const TRUST_SIGNALS = [
  { icon: ShieldCheck, text: "Admin-verified before going live" },
  { icon: TrendingUp, text: "Reach thousands of wedding clients" },
  { icon: Star, text: "Build your reputation with reviews" },
];

type Step1Values = {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  serviceArea: string;
};

type Step2Values = {
  description: string;
  packageName: string;
  packagePrice: string;
  guestMin: string;
  guestMax: string;
  inclusions: string;
};

type Step3Values = {
  accountNumber: string;
  ifscCode: string;
  holderName: string;
  gstNumber: string;
};

type AllValues = Step1Values & Step2Values & Step3Values;

export default function VendorRegisterPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [category, setCategory] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<AllValues>({ mode: "onBlur" });

  const createVendor = useCreateVendorProfile();

  const nextStep = async () => {
    const fieldsStep1: (keyof Step1Values)[] = [
      "businessName",
      "ownerName",
      "email",
      "phone",
      "serviceArea",
    ];
    const fieldsStep2: (keyof Step2Values)[] = [
      "description",
      "packageName",
      "packagePrice",
      "guestMin",
      "guestMax",
    ];

    if (step === 1) {
      if (!category) {
        toast.error("Please select a category");
        return;
      }
      const ok = await trigger(fieldsStep1);
      if (ok) setStep(2);
    } else if (step === 2) {
      const ok = await trigger(fieldsStep2);
      if (ok) setStep(3);
    }
  };

  const onSubmit = async (data: AllValues) => {
    if (!agreed) {
      toast.error("Please accept the agreement");
      return;
    }
    if (!category) {
      toast.error("Please select a category");
      return;
    }
    try {
      await createVendor.mutateAsync({
        businessName: data.businessName,
        ownerName: data.ownerName,
        email: data.email,
        phone: data.phone,
        category,
        serviceArea: data.serviceArea,
        description: data.description,
        photos: [],
      });
      localStorage.setItem("stallo_vendor_mode", "true");
      setSubmitted(true);
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  };

  // Success screen
  if (submitted) {
    return (
      <RootLayout>
        <div className="container py-20 max-w-lg text-center">
          <div className="flex size-24 items-center justify-center rounded-full bg-primary/15 border border-primary/30 mx-auto mb-6 shadow-gold">
            <CheckCircle2 className="size-12 text-primary" />
          </div>
          <h1 className="font-display font-bold text-3xl mb-3 gold-gradient">
            Application Submitted!
          </h1>
          <p className="text-muted-foreground mb-6">
            Your vendor application has been received. Our team will review your
            details and get back to you within 1–3 business days.
          </p>
          <div className="glass-card rounded-xl p-5 text-left space-y-3 mb-8">
            <p className="font-semibold text-sm text-primary">
              What happens next?
            </p>
            {[
              "📧 You'll receive a confirmation email shortly",
              "🔍 Admin team reviews your application (1–3 days)",
              "✅ Once approved, your stall goes live on Stallo.in",
              "💰 Start receiving bookings from wedding clients",
            ].map((s) => (
              <p key={s} className="text-sm text-muted-foreground">
                {s}
              </p>
            ))}
          </div>
          <a
            href="/"
            className="text-primary text-sm font-medium hover:underline"
          >
            Return to Home
          </a>
        </div>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      {/* Hero */}
      <section className="bg-card border-b border-border/40">
        <div className="container py-14 max-w-2xl text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/15 border border-primary/30 shadow-gold mx-auto mb-5">
            <ChefHat className="size-8 text-primary" />
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-3 gold-gradient">
            Become a Stallo Vendor
          </h1>
          <p className="text-muted-foreground text-lg">
            Join Stallo.in and reach thousands of wedding clients. Admin
            verification required.
          </p>
          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-5 mt-6">
            {TRUST_SIGNALS.map((t) => (
              <div
                key={t.text}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <t.icon className="size-4 text-primary shrink-0" />
                <span>{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-background">
        <div className="container py-12 max-w-2xl">
          {/* Step indicator */}
          <div className="flex items-center gap-0 mb-8">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center flex-1">
                <div
                  className={cn(
                    "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                    step === s.id
                      ? "bg-primary text-primary-foreground shadow-gold"
                      : step > s.id
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "bg-card text-muted-foreground border border-border/50",
                  )}
                  data-ocid={`vendor_register.step.${s.id}`}
                >
                  {step > s.id ? (
                    <CheckCircle2 className="size-3.5 text-primary" />
                  ) : (
                    <s.icon className="size-3.5" />
                  )}
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-px mx-1",
                      step > s.id ? "bg-primary/50" : "bg-border/40",
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <Card className="glass-card shadow-gold">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* ─── Step 1: Business Info ─── */}
                {step === 1 && (
                  <div className="space-y-5">
                    <div>
                      <h2 className="font-display font-semibold text-xl gold-gradient">
                        Business Information
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tell us about your stall business
                      </p>
                    </div>
                    <Separator className="bg-border/40" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="businessName"
                          className="text-foreground/80"
                        >
                          Business Name *
                        </Label>
                        <Input
                          id="businessName"
                          className="mt-1 bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60"
                          placeholder="e.g. Sharma Chaat Corner"
                          {...register("businessName", {
                            required: "Required",
                          })}
                          data-ocid="vendor_register.business_name.input"
                        />
                        {errors.businessName && (
                          <p
                            className="text-xs text-destructive mt-1"
                            data-ocid="vendor_register.business_name.field_error"
                          >
                            {errors.businessName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label
                          htmlFor="ownerName"
                          className="text-foreground/80"
                        >
                          Owner Name *
                        </Label>
                        <Input
                          id="ownerName"
                          className="mt-1 bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60"
                          placeholder="Full name"
                          {...register("ownerName", { required: "Required" })}
                          data-ocid="vendor_register.owner_name.input"
                        />
                        {errors.ownerName && (
                          <p
                            className="text-xs text-destructive mt-1"
                            data-ocid="vendor_register.owner_name.field_error"
                          >
                            {errors.ownerName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-foreground/80">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          className="mt-1 bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60"
                          placeholder="you@example.com"
                          {...register("email", { required: "Required" })}
                          data-ocid="vendor_register.email.input"
                        />
                        {errors.email && (
                          <p
                            className="text-xs text-destructive mt-1"
                            data-ocid="vendor_register.email.field_error"
                          >
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-foreground/80">
                          Phone *
                        </Label>
                        <Input
                          id="phone"
                          className="mt-1 bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60"
                          placeholder="+91 9876543210"
                          {...register("phone", { required: "Required" })}
                          data-ocid="vendor_register.phone.input"
                        />
                        {errors.phone && (
                          <p
                            className="text-xs text-destructive mt-1"
                            data-ocid="vendor_register.phone.field_error"
                          >
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label className="text-foreground/80">
                        Stall Category *
                      </Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger
                          className="mt-1 bg-background border-border/60 focus:ring-primary/50"
                          data-ocid="vendor_register.category.select"
                        >
                          <SelectValue placeholder="Select stall category" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border/60">
                          {CATEGORIES.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label
                        htmlFor="serviceArea"
                        className="text-foreground/80"
                      >
                        Service Area *
                      </Label>
                      <Input
                        id="serviceArea"
                        className="mt-1 bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60"
                        placeholder="e.g. Nawada, Bihar"
                        {...register("serviceArea", { required: "Required" })}
                        data-ocid="vendor_register.service_area.input"
                      />
                      {errors.serviceArea && (
                        <p
                          className="text-xs text-destructive mt-1"
                          data-ocid="vendor_register.service_area.field_error"
                        >
                          {errors.serviceArea.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* ─── Step 2: Stall Details ─── */}
                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <h2 className="font-display font-semibold text-xl gold-gradient">
                        Stall Details
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Describe your stall and initial package
                      </p>
                    </div>
                    <Separator className="bg-border/40" />

                    <div>
                      <Label
                        htmlFor="description"
                        className="text-foreground/80"
                      >
                        Stall Description *
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your stall, specialties, years of experience, and what makes you special..."
                        rows={4}
                        className="mt-1 resize-none bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60"
                        {...register("description", { required: "Required" })}
                        data-ocid="vendor_register.description.textarea"
                      />
                      {errors.description && (
                        <p
                          className="text-xs text-destructive mt-1"
                          data-ocid="vendor_register.description.field_error"
                        >
                          {errors.description.message}
                        </p>
                      )}
                    </div>

                    <div className="rounded-lg border border-primary/20 bg-card/50 p-4 space-y-4">
                      <p className="font-semibold text-sm text-primary">
                        ✦ Initial Package
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="packageName"
                            className="text-foreground/80"
                          >
                            Package Name *
                          </Label>
                          <Input
                            id="packageName"
                            className="mt-1 bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60"
                            placeholder="e.g. Standard Wedding Package"
                            {...register("packageName", {
                              required: "Required",
                            })}
                            data-ocid="vendor_register.package_name.input"
                          />
                          {errors.packageName && (
                            <p className="text-xs text-destructive mt-1">
                              {errors.packageName.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label
                            htmlFor="packagePrice"
                            className="text-foreground/80"
                          >
                            Price (₹) *
                          </Label>
                          <Input
                            id="packagePrice"
                            type="number"
                            className="mt-1 bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60"
                            placeholder="e.g. 15000"
                            {...register("packagePrice", {
                              required: "Required",
                              min: { value: 1, message: "Must be > 0" },
                            })}
                            data-ocid="vendor_register.package_price.input"
                          />
                          {errors.packagePrice && (
                            <p className="text-xs text-destructive mt-1">
                              {errors.packagePrice.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="guestMin"
                            className="text-foreground/80"
                          >
                            Min Guests *
                          </Label>
                          <Input
                            id="guestMin"
                            type="number"
                            className="mt-1 bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60"
                            placeholder="50"
                            {...register("guestMin", {
                              required: "Required",
                              min: { value: 1, message: "Min 1" },
                            })}
                            data-ocid="vendor_register.guest_min.input"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="guestMax"
                            className="text-foreground/80"
                          >
                            Max Guests *
                          </Label>
                          <Input
                            id="guestMax"
                            type="number"
                            className="mt-1 bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60"
                            placeholder="500"
                            {...register("guestMax", {
                              required: "Required",
                              min: { value: 1, message: "Min 1" },
                            })}
                            data-ocid="vendor_register.guest_max.input"
                          />
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="inclusions"
                          className="text-foreground/80"
                        >
                          Package Inclusions
                        </Label>
                        <Textarea
                          id="inclusions"
                          placeholder="List what's included, one per line (e.g. Live chaat counter, Staff included, Setup & cleanup)"
                          rows={3}
                          className="mt-1 resize-none bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60"
                          {...register("inclusions")}
                          data-ocid="vendor_register.inclusions.textarea"
                        />
                      </div>
                    </div>

                    {/* Photo upload area */}
                    <div className="rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 p-6 text-center">
                      <span className="text-3xl block mb-2">📷</span>
                      <p className="text-sm font-medium text-primary">Photos</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        You can upload stall photos after your account is
                        approved. High-quality photos significantly improve
                        booking rates.
                      </p>
                    </div>
                  </div>
                )}

                {/* ─── Step 3: Agreement ─── */}
                {step === 3 && (
                  <div className="space-y-5">
                    <div>
                      <h2 className="font-display font-semibold text-xl gold-gradient">
                        Banking & Agreement
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        For payments and platform agreement
                      </p>
                    </div>
                    <Separator className="bg-border/40" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="holderName"
                          className="text-foreground/80"
                        >
                          Account Holder Name *
                        </Label>
                        <Input
                          id="holderName"
                          className="mt-1 bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60"
                          placeholder="Name as on bank account"
                          {...register("holderName", { required: "Required" })}
                          data-ocid="vendor_register.holder_name.input"
                        />
                        {errors.holderName && (
                          <p className="text-xs text-destructive mt-1">
                            {errors.holderName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label
                          htmlFor="ifscCode"
                          className="text-foreground/80"
                        >
                          IFSC Code *
                        </Label>
                        <Input
                          id="ifscCode"
                          className="mt-1 uppercase bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60"
                          placeholder="e.g. SBIN0001234"
                          {...register("ifscCode", { required: "Required" })}
                          data-ocid="vendor_register.ifsc_code.input"
                        />
                        {errors.ifscCode && (
                          <p className="text-xs text-destructive mt-1">
                            {errors.ifscCode.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="accountNumber"
                        className="text-foreground/80"
                      >
                        Account Number *
                      </Label>
                      <Input
                        id="accountNumber"
                        type="password"
                        className="mt-1 bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60"
                        placeholder="Bank account number"
                        {...register("accountNumber", { required: "Required" })}
                        data-ocid="vendor_register.account_number.input"
                      />
                      {errors.accountNumber && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.accountNumber.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="gstNumber" className="text-foreground/80">
                        GST Number (optional)
                      </Label>
                      <Input
                        id="gstNumber"
                        className="mt-1 uppercase bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60"
                        placeholder="e.g. 22AAAAA0000A1Z5"
                        {...register("gstNumber")}
                        data-ocid="vendor_register.gst_number.input"
                      />
                    </div>

                    <div className="rounded-xl border border-primary/20 bg-card/50 p-5">
                      <p className="font-semibold text-sm text-primary mb-2">
                        Platform Agreement
                      </p>
                      <div className="text-xs text-muted-foreground space-y-1.5 mb-4 max-h-32 overflow-y-auto">
                        <p>
                          By registering as a vendor on Stallo.in, you agree to:
                        </p>
                        <p>
                          • Provide accurate and truthful information about your
                          services
                        </p>
                        <p>
                          • Maintain availability and fulfill confirmed bookings
                        </p>
                        <p>• Follow the cancellation and refund policies</p>
                        <p>
                          • Allow Stallo.in to collect a commission on each
                          successful booking
                        </p>
                        <p>
                          • Maintain service quality and respond to customer
                          feedback
                        </p>
                        <p>
                          • Comply with all applicable local laws and food
                          safety regulations
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id="agreement"
                          checked={agreed}
                          onCheckedChange={(v) => setAgreed(v === true)}
                          data-ocid="vendor_register.agreement.checkbox"
                          className="border-primary/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <Label
                          htmlFor="agreement"
                          className="text-sm cursor-pointer"
                        >
                          I agree to the Stallo.in vendor terms and platform
                          agreement
                        </Label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground shadow-gold hover:bg-primary/90"
                      size="lg"
                      disabled={!agreed || createVendor.isPending}
                      data-ocid="vendor_register.submit_button"
                    >
                      {createVendor.isPending
                        ? "Submitting Application..."
                        : "Submit for Approval"}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Your profile will be reviewed by our team within 1–3
                      business days.
                    </p>
                  </div>
                )}

                {/* Navigation (steps 1 & 2) */}
                {step < 3 && (
                  <div className="flex justify-between mt-6 pt-4 border-t border-border/40">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        step > 1 && setStep((s) => (s - 1) as 1 | 2 | 3)
                      }
                      disabled={step === 1}
                      className="border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary"
                      data-ocid="vendor_register.prev_button"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-primary text-primary-foreground shadow-gold hover:bg-primary/90"
                      data-ocid="vendor_register.next_button"
                    >
                      Next <ChevronRight className="size-4 ml-1" />
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </RootLayout>
  );
}

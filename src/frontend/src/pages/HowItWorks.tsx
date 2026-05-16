import { RootLayout } from "@/components/layout/RootLayout";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  HelpCircle,
  Lock,
  PartyPopper,
  Search,
  ShieldCheck,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const STEPS = [
  {
    icon: Search,
    title: "Browse & Compare Stalls",
    desc: "Explore verified food stall vendors across categories like chaat, golgappa, dosa, mocktails, and more. Filter by location, guest count, and price. Compare packages side by side to find your perfect match.",
    detail: "100+ verified vendors in Bihar",
    number: "01",
  },
  {
    icon: Calendar,
    title: "Choose Your Date & Venue",
    desc: "Select your wedding or event date and enter your venue details. Real-time availability is checked against the vendor's confirmed schedule so you never face a last-minute conflict.",
    detail: "Live availability calendar",
    number: "02",
  },
  {
    icon: CreditCard,
    title: "Pay Securely Online",
    desc: "Pay your advance securely via Stripe. We support partial advance payments. Your payment details are never stored on Stallo.in — everything flows through Stripe's encrypted vault.",
    detail: "Stripe-secured transactions",
    number: "03",
  },
  {
    icon: CheckCircle2,
    title: "Vendor Confirms & Prepares",
    desc: "The vendor receives your booking instantly, reviews event details, and confirms within 24 hours. You get an email notification the moment they accept. They then begin stall preparation.",
    detail: "24-hour confirmation guarantee",
    number: "04",
  },
  {
    icon: PartyPopper,
    title: "Enjoy Your Wedding!",
    desc: "Your vendor arrives on time, sets up the stall professionally, and serves your guests. After the event, leave a review to help future customers. Any dispute is handled by our support team.",
    detail: "Post-event review & support",
    number: "05",
  },
];

const VENDOR_BENEFITS = [
  {
    icon: TrendingUp,
    title: "Grow Your Business",
    desc: "Get discovered by hundreds of wedding families across Nawada and Bihar. Our verified badge builds instant trust with potential customers.",
  },
  {
    icon: Bell,
    title: "Seamless Order Management",
    desc: "Accept or reject bookings, manage your availability calendar, and track earnings — all from your vendor dashboard without any back-and-forth calls.",
  },
  {
    icon: BarChart3,
    title: "Transparent Earnings",
    desc: "See exactly what you earn per booking. Commission is clearly disclosed upfront. Payouts are processed after event completion with no hidden fees.",
  },
];

const SECURITY_POINTS = [
  {
    icon: Lock,
    title: "Encrypted Payments",
    desc: "All transactions are processed via Stripe, a PCI-DSS Level 1 certified payment provider. Stallo never stores card information.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Vendors Only",
    desc: "Every vendor is manually reviewed by our team before listing. We verify identity, business legitimacy, and service quality.",
  },
  {
    icon: Zap,
    title: "Instant Confirmations",
    desc: "Booking confirmations and payment receipts are delivered via email in real time, giving you a secure paper trail of every transaction.",
  },
];

const FAQS = [
  {
    q: "Can I book a stall on short notice?",
    a: "Yes — many vendors accept bookings up to 48 hours in advance, subject to availability. We recommend booking at least 7 days ahead to ensure your preferred vendor is available.",
  },
  {
    q: "How much advance do I need to pay?",
    a: "Stallo requires a 30% advance payment to confirm a booking. The remaining balance is settled directly with the vendor as per your agreed terms.",
  },
  {
    q: "What happens if a vendor cancels?",
    a: "If a vendor cancels your confirmed booking, you receive a 100% refund of your advance within 3–5 business days. Our team will also assist you in finding a replacement vendor.",
  },
  {
    q: "Can I change my event date after booking?",
    a: "Date changes are subject to vendor availability and require at least 7 days' notice. Contact our support team and we'll coordinate with the vendor on your behalf.",
  },
  {
    q: "Is my payment refundable if I cancel?",
    a: "Refunds depend on how early you cancel. Cancellations 7+ days before the event receive a 90% refund. See our full Cancellation Policy for all tiers.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center justify-between gap-3 p-5 text-left font-semibold bg-transparent hover:bg-primary/5 transition-smooth"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-ocid="how-it-works.faq.toggle"
      >
        <span className="flex items-center gap-3">
          <HelpCircle className="size-4 text-primary shrink-0" />
          {q}
        </span>
        <ChevronDown
          className={`size-4 text-primary shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-0 text-sm text-muted-foreground leading-relaxed border-t border-border/30">
          <p className="pt-4">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <RootLayout>
      {/* Hero */}
      <section className="bg-card border-b border-border/60 relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="container py-20 max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-4 border border-primary/20">
              Simple & Transparent
            </span>
            <h1 className="font-display font-bold text-5xl md:text-6xl mb-4 leading-tight">
              How <span className="gold-gradient">Stallo</span> Works
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              From browsing to your wedding day — book a premium food stall in 5
              straightforward steps. No phone calls, no guesswork, no surprises.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-background py-20">
        <div className="container max-w-5xl">
          <div className="space-y-12">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`flex flex-col ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-10 md:gap-16`}
              >
                {/* Visual: step card with large transparent number */}
                <div className="flex-1 flex justify-center">
                  <div className="relative">
                    {/* Large transparent gold step number */}
                    <span className="absolute -top-8 -left-4 font-display font-bold text-8xl text-primary/8 select-none pointer-events-none leading-none">
                      {step.number}
                    </span>
                    <div className="flex size-32 items-center justify-center rounded-3xl bg-primary/10 border border-primary/20 shadow-gold relative z-10">
                      <step.icon className="size-14 text-primary" />
                    </div>
                    <div className="absolute -top-3 -right-3 flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-display font-bold text-sm shadow-gold z-20">
                      {i + 1}
                    </div>
                  </div>
                </div>
                {/* Text */}
                <div className="flex-[2] min-w-0">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                    Step {i + 1}
                  </p>
                  <h2 className="font-display font-bold text-3xl mb-3">
                    {step.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-base mb-4">
                    {step.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
                    <CheckCircle2 className="size-3" />
                    {step.detail}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor Benefits */}
      <section className="bg-muted/20 py-20 border-y border-border/40">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl mb-3">
              Built for Vendors Too
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Stallo isn't just for customers. Vendors get a complete operations
              platform to manage their stall business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VENDOR_BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 border-t-2 border-t-primary/40 hover-lift"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-4">
                  <b.icon className="size-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="bg-background py-20">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl mb-3">
              Your Security, Our Priority
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Stallo uses enterprise-grade security to protect your payments and
              personal data at every step.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SECURITY_POINTS.map((pt, i) => (
              <motion.div
                key={pt.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-start gap-3 p-6 glass-card rounded-2xl border-t-2 border-t-primary/30 hover-lift"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                  <pt.icon className="size-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg">
                  {pt.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pt.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/20 py-20 border-y border-border/40">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to know before your first booking.
            </p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-card border-t border-border/40 py-20 relative overflow-hidden">
        {/* Gold glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 rounded-full bg-primary/8 blur-3xl" />
        </div>
        <div className="container max-w-3xl text-center relative z-10">
          <h2 className="font-display font-bold text-4xl gold-gradient mb-4">
            Ready to Book Your Stall?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Browse 100+ verified food stall vendors across Bihar and book in
            minutes.
          </p>
          <Link
            to="/browse"
            search={{ category: undefined, search: undefined }}
          >
            <Button
              size="lg"
              className="gap-2 bg-primary text-primary-foreground shadow-gold hover:bg-primary/90"
              data-ocid="how-it-works.browse_cta_button"
            >
              Browse Stalls <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </section>
    </RootLayout>
  );
}

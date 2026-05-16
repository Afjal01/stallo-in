import { RootLayout } from "@/components/layout/RootLayout";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Clock,
  HelpCircle,
  Phone,
  RefreshCw,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const TIERS = [
  {
    label: "Early Cancellation",
    days: "7+ days before event",
    fee: "10%",
    refund: "90%",
    example: "Booking ₹5,000 advance → ₹500 fee → ₹4,500 refund",
    color: "border-secondary/40 bg-secondary/5",
    badge: "bg-secondary/15 text-secondary",
    icon: CheckCircle2,
    iconColor: "text-secondary",
  },
  {
    label: "Standard Cancellation",
    days: "3–7 days before event",
    fee: "25%",
    refund: "75%",
    example: "Booking ₹5,000 advance → ₹1,250 fee → ₹3,750 refund",
    color:
      "border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-900/10",
    badge:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    icon: Clock,
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    label: "Late Cancellation",
    days: "Less than 72 hours (3 days)",
    fee: "50%",
    refund: "50%",
    example: "Booking ₹5,000 advance → ₹2,500 fee → ₹2,500 refund",
    color: "border-destructive/30 bg-destructive/5",
    badge: "bg-destructive/10 text-destructive",
    icon: AlertTriangle,
    iconColor: "text-destructive",
  },
];

const REFUND_STEPS = [
  {
    step: "1",
    text: "Submit cancellation request from your dashboard or by contacting support.",
  },
  {
    step: "2",
    text: "Our team reviews and approves your request within 24 hours.",
  },
  {
    step: "3",
    text: "Refund is initiated to your original payment method via Stripe.",
  },
  {
    step: "4",
    text: "Amount appears in your account within 3–5 business days.",
  },
];

const FAQS = [
  {
    q: "What counts as the cancellation date?",
    a: "The cancellation date is the time your written request is received and logged by Stallo.in, not the time you send the message. We calculate days as full calendar days between the cancellation date and your event date.",
  },
  {
    q: "Can I reschedule instead of cancelling?",
    a: "Yes! Rescheduling is treated separately from cancellations. You can request a date change subject to vendor availability and at least 7 days' notice, with no cancellation fee. Contact support to initiate a reschedule.",
  },
  {
    q: "What if the vendor cancels my booking?",
    a: "If a confirmed vendor cancels your booking, you receive a 100% full refund of your advance with no deductions, processed within 3–5 business days. Our team will also proactively help find a replacement vendor if time permits.",
  },
  {
    q: "Is the Stallo service fee refundable?",
    a: "Stallo.in's platform service fee is non-refundable in all cases, including force majeure events. It covers the costs of vendor verification, booking facilitation, and customer support.",
  },
  {
    q: "What is force majeure?",
    a: "Force majeure events include natural disasters, government-mandated lockdowns, or other extraordinary circumstances beyond our control. Such cases are handled individually by our support team and may qualify for full or partial refunds beyond the standard policy.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border/60 rounded-xl overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center justify-between gap-3 p-5 text-left font-semibold bg-card hover:bg-muted/30 transition-smooth"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-ocid="cancellation.faq.toggle"
      >
        <span className="flex items-center gap-3">
          <HelpCircle className="size-4 text-primary shrink-0" />
          {q}
        </span>
        <ChevronDown
          className={`size-4 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 bg-card border-t border-border/40">
          <p className="pt-4 text-sm text-muted-foreground leading-relaxed">
            {a}
          </p>
        </div>
      )}
    </div>
  );
}

export default function CancellationPolicyPage() {
  return (
    <RootLayout>
      {/* Hero */}
      <section className="bg-card border-b border-border/60">
        <div className="container py-16 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-4">
              Transparent Policies
            </span>
            <h1 className="font-display font-bold text-5xl md:text-6xl mb-4">
              Cancellation <span className="text-primary">Policy</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              We believe in complete transparency. Our cancellation fees are
              tiered based on notice period — the earlier you cancel, the lower
              the fee.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fee Tiers */}
      <section className="bg-background py-16">
        <div className="container max-w-4xl">
          <h2 className="font-display font-bold text-3xl mb-2">
            Cancellation Fee Structure
          </h2>
          <p className="text-muted-foreground mb-8">
            All fees apply to the advance payment amount. The Stallo platform
            service fee is non-refundable.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TIERS.map((tier, i) => (
              <motion.div
                key={tier.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`rounded-2xl border-2 p-6 ${tier.color}`}
              >
                <div
                  className={`flex size-10 items-center justify-center rounded-xl mb-4 ${tier.badge}`}
                >
                  <tier.icon className={`size-5 ${tier.iconColor}`} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  {tier.label}
                </p>
                <h3 className="font-display font-bold text-xl mb-1">
                  {tier.days}
                </h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-4xl font-display font-bold">
                    {tier.fee}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    cancellation fee
                  </span>
                </div>
                <span
                  className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${tier.badge} mb-4`}
                >
                  {tier.refund} refund
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed border-t border-border/30 pt-4">
                  {tier.example}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Refunds Work */}
      <section className="bg-muted/30 py-16 border-y border-border/40">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-display font-bold text-3xl mb-3">
                How Refunds Work
              </h2>
              <p className="text-muted-foreground mb-6">
                Once your cancellation is approved, we process the refund
                through Stripe directly to your original payment method.
              </p>
              <div className="space-y-4">
                {REFUND_STEPS.map((step, i) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      {step.step}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                      {step.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm">
              <RefreshCw className="size-8 text-primary mb-4" />
              <h3 className="font-display font-semibold text-xl mb-2">
                Refund Timeline
              </h3>
              <p className="text-muted-foreground text-sm mb-5">
                From cancellation request to money in your account:
              </p>
              <div className="space-y-3">
                {[
                  { label: "Review & Approval", time: "Within 24 hours" },
                  { label: "Stripe Refund Processing", time: "1 business day" },
                  { label: "Bank / Card Credit", time: "3–5 business days" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between text-sm py-2 border-b border-border/40 last:border-0"
                  >
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Cancellation */}
      <section className="bg-background py-16">
        <div className="container max-w-4xl">
          <div className="rounded-2xl border border-border/60 bg-card p-8">
            <AlertTriangle className="size-7 text-amber-500 mb-4" />
            <h2 className="font-display font-bold text-2xl mb-3">
              Vendor Cancellation Policy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div className="space-y-3">
                <p>
                  <strong className="text-foreground">
                    Full refund guaranteed:
                  </strong>{" "}
                  If a confirmed vendor cancels your booking for any reason, you
                  receive 100% of your advance payment back with no deductions.
                </p>
                <p>
                  <strong className="text-foreground">
                    Replacement assistance:
                  </strong>{" "}
                  Our team will proactively reach out to available vendors in
                  your area. While we cannot guarantee a replacement, we make
                  every effort to find one.
                </p>
              </div>
              <div className="space-y-3">
                <p>
                  <strong className="text-foreground">
                    Vendor consequences:
                  </strong>{" "}
                  Vendors who cancel confirmed bookings without valid reason
                  face account warnings, temporary suspension, or permanent
                  removal from the platform.
                </p>
                <p>
                  <strong className="text-foreground">Force majeure:</strong>{" "}
                  Cancellations due to natural disasters, government
                  restrictions, or genuine emergencies are reviewed case-by-case
                  and are exempt from vendor penalties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/30 py-16 border-t border-border/40">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Common questions about our cancellation and refund process.
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
      <section className="bg-background py-14 border-t border-border/40">
        <div className="container max-w-3xl">
          <div className="flex flex-col md:flex-row items-center gap-6 p-8 rounded-2xl border border-border/60 bg-card shadow-sm">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
              <Phone className="size-7 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-display font-semibold text-xl mb-1">
                Need help with a cancellation?
              </h3>
              <p className="text-muted-foreground text-sm">
                Our support team is available Mon–Sat, 9 AM–7 PM IST. We'll
                guide you through the process.
              </p>
            </div>
            <Link to="/contact">
              <Button
                size="lg"
                className="shrink-0"
                data-ocid="cancellation.contact_support_button"
              >
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </RootLayout>
  );
}

import { j as jsxRuntimeExports, L as Link, r as reactExports } from "./index-DIzWvAoP.js";
import { R as RootLayout } from "./RootLayout-58N_cMmF.js";
import { B as Button } from "./useAuth-Bhs8pioH.js";
import { m as motion } from "./proxy-DxhnKv7e.js";
import { C as CircleCheck } from "./circle-check-DYr8r4nJ.js";
import { C as Clock } from "./clock-BmE9tPrM.js";
import { T as TriangleAlert } from "./triangle-alert-DqppkAyN.js";
import { R as RefreshCw } from "./refresh-cw-ywRWPwVF.js";
import { P as Phone } from "./phone-DwtpoaGc.js";
import { C as CircleHelp } from "./circle-help-BopkzGAD.js";
import { C as ChevronDown } from "./chevron-down-BCW7NqnS.js";
import "./sheet-BeMLdLfo.js";
import "./separator-DrDgD32O.js";
import "./index-C8VI1ok0.js";
import "./log-in-BiYDoRg7.js";
const TIERS = [
  {
    label: "Early Cancellation",
    days: "7+ days before event",
    fee: "10%",
    refund: "90%",
    example: "Booking ₹5,000 advance → ₹500 fee → ₹4,500 refund",
    color: "border-secondary/40 bg-secondary/5",
    badge: "bg-secondary/15 text-secondary",
    icon: CircleCheck,
    iconColor: "text-secondary"
  },
  {
    label: "Standard Cancellation",
    days: "3–7 days before event",
    fee: "25%",
    refund: "75%",
    example: "Booking ₹5,000 advance → ₹1,250 fee → ₹3,750 refund",
    color: "border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-900/10",
    badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    icon: Clock,
    iconColor: "text-amber-600 dark:text-amber-400"
  },
  {
    label: "Late Cancellation",
    days: "Less than 72 hours (3 days)",
    fee: "50%",
    refund: "50%",
    example: "Booking ₹5,000 advance → ₹2,500 fee → ₹2,500 refund",
    color: "border-destructive/30 bg-destructive/5",
    badge: "bg-destructive/10 text-destructive",
    icon: TriangleAlert,
    iconColor: "text-destructive"
  }
];
const REFUND_STEPS = [
  {
    step: "1",
    text: "Submit cancellation request from your dashboard or by contacting support."
  },
  {
    step: "2",
    text: "Our team reviews and approves your request within 24 hours."
  },
  {
    step: "3",
    text: "Refund is initiated to your original payment method via Stripe."
  },
  {
    step: "4",
    text: "Amount appears in your account within 3–5 business days."
  }
];
const FAQS = [
  {
    q: "What counts as the cancellation date?",
    a: "The cancellation date is the time your written request is received and logged by Stallo.in, not the time you send the message. We calculate days as full calendar days between the cancellation date and your event date."
  },
  {
    q: "Can I reschedule instead of cancelling?",
    a: "Yes! Rescheduling is treated separately from cancellations. You can request a date change subject to vendor availability and at least 7 days' notice, with no cancellation fee. Contact support to initiate a reschedule."
  },
  {
    q: "What if the vendor cancels my booking?",
    a: "If a confirmed vendor cancels your booking, you receive a 100% full refund of your advance with no deductions, processed within 3–5 business days. Our team will also proactively help find a replacement vendor if time permits."
  },
  {
    q: "Is the Stallo service fee refundable?",
    a: "Stallo.in's platform service fee is non-refundable in all cases, including force majeure events. It covers the costs of vendor verification, booking facilitation, and customer support."
  },
  {
    q: "What is force majeure?",
    a: "Force majeure events include natural disasters, government-mandated lockdowns, or other extraordinary circumstances beyond our control. Such cases are handled individually by our support team and may qualify for full or partial refunds beyond the standard policy."
  }
];
function FaqItem({ q, a }) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border/60 rounded-xl overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "w-full flex items-center justify-between gap-3 p-5 text-left font-semibold bg-card hover:bg-muted/30 transition-smooth",
        onClick: () => setOpen((v) => !v),
        "aria-expanded": open,
        "data-ocid": "cancellation.faq.toggle",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "size-4 text-primary shrink-0" }),
            q
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronDown,
            {
              className: `size-4 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`
            }
          )
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-5 bg-card border-t border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-4 text-sm text-muted-foreground leading-relaxed", children: a }) })
  ] });
}
function CancellationPolicyPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(RootLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container py-16 max-w-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-4", children: "Transparent Policies" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-5xl md:text-6xl mb-4", children: [
            "Cancellation ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Policy" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-2xl", children: "We believe in complete transparency. Our cancellation fees are tiered based on notice period — the earlier you cancel, the lower the fee." })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl mb-2", children: "Cancellation Fee Structure" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "All fees apply to the advance payment amount. The Stallo platform service fee is non-refundable." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: TIERS.map((tier, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: i * 0.1 },
          className: `rounded-2xl border-2 p-6 ${tier.color}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `flex size-10 items-center justify-center rounded-xl mb-4 ${tier.badge}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(tier.icon, { className: `size-5 ${tier.iconColor}` })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1", children: tier.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl mb-1", children: tier.days }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-display font-bold", children: tier.fee }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "cancellation fee" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `inline-block text-sm font-semibold px-3 py-1 rounded-full ${tier.badge} mb-4`,
                children: [
                  tier.refund,
                  " refund"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed border-t border-border/30 pt-4", children: tier.example })
          ]
        },
        tier.label
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-16 border-y border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-10 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl mb-3", children: "How Refunds Work" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Once your cancellation is approved, we process the refund through Stripe directly to your original payment method." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: REFUND_STEPS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -16 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.4, delay: i * 0.1 },
            className: "flex items-start gap-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm", children: step.step }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed pt-1", children: step.text })
            ]
          },
          step.step
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border/60 rounded-2xl p-6 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-8 text-primary mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-xl mb-2", children: "Refund Timeline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-5", children: "From cancellation request to money in your account:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
          { label: "Review & Approval", time: "Within 24 hours" },
          { label: "Stripe Refund Processing", time: "1 business day" },
          { label: "Bank / Card Credit", time: "3–5 business days" }
        ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between text-sm py-2 border-b border-border/40 last:border-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: item.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: item.time })
            ]
          },
          item.label
        )) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-card p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-7 text-amber-500 mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl mb-3", children: "Vendor Cancellation Policy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Full refund guaranteed:" }),
            " ",
            "If a confirmed vendor cancels your booking for any reason, you receive 100% of your advance payment back with no deductions."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Replacement assistance:" }),
            " ",
            "Our team will proactively reach out to available vendors in your area. While we cannot guarantee a replacement, we make every effort to find one."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Vendor consequences:" }),
            " ",
            "Vendors who cancel confirmed bookings without valid reason face account warnings, temporary suspension, or permanent removal from the platform."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Force majeure:" }),
            " ",
            "Cancellations due to natural disasters, government restrictions, or genuine emergencies are reviewed case-by-case and are exempt from vendor penalties."
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-16 border-t border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl mb-2", children: "Frequently Asked Questions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Common questions about our cancellation and refund process." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: FAQS.map((faq) => /* @__PURE__ */ jsxRuntimeExports.jsx(FaqItem, { q: faq.q, a: faq.a }, faq.q)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-14 border-t border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-center gap-6 p-8 rounded-2xl border border-border/60 bg-card shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-7 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center md:text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-xl mb-1", children: "Need help with a cancellation?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Our support team is available Mon–Sat, 9 AM–7 PM IST. We'll guide you through the process." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "lg",
          className: "shrink-0",
          "data-ocid": "cancellation.contact_support_button",
          children: "Contact Support"
        }
      ) })
    ] }) }) })
  ] });
}
export {
  CancellationPolicyPage as default
};

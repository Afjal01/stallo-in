import { j as jsxRuntimeExports, L as Link } from "./index-DIzWvAoP.js";
import { R as RootLayout } from "./RootLayout-58N_cMmF.js";
import { B as Badge } from "./sheet-BeMLdLfo.js";
import { c as createLucideIcon, B as Button } from "./useAuth-Bhs8pioH.js";
import { C as Card, a as CardContent } from "./card-BK5KlsOo.js";
import { S as Separator } from "./separator-DrDgD32O.js";
import { m as motion } from "./proxy-DxhnKv7e.js";
import { S as Shield } from "./shield-B_CFQNu-.js";
import { H as Heart } from "./heart-7w2sMjVh.js";
import { M as MapPin } from "./map-pin-Clah7rAK.js";
import { A as ArrowRight } from "./arrow-right-BOHxw3XF.js";
import "./log-in-BiYDoRg7.js";
import "./index-C8VI1ok0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode);
const STATS = [
  { number: "50+", label: "Verified Vendors" },
  { number: "1,000+", label: "Happy Weddings" },
  { number: "10+", label: "Food Categories" },
  { number: "4.8★", label: "Average Rating" }
];
const TEAM = [
  {
    name: "Arjun Singh",
    role: "Co-Founder & CEO",
    bio: "Wedding industry veteran with 10+ years in event management across Bihar.",
    initials: "AS"
  },
  {
    name: "Priya Kumari",
    role: "Co-Founder & Operations",
    bio: "Passionate about local food culture and helping vendors grow their businesses.",
    initials: "PK"
  },
  {
    name: "Rahul Verma",
    role: "Head of Vendor Relations",
    bio: "Building trust and quality standards between vendors and customers since 2024.",
    initials: "RV"
  }
];
const VALUES = [
  {
    icon: Shield,
    title: "Trust First",
    desc: "Every vendor is verified by our team before going live. We stake our reputation on every stall listed."
  },
  {
    icon: Target,
    title: "Transparent Pricing",
    desc: "No hidden fees. No last-minute surprises. What you see before booking is what you pay."
  },
  {
    icon: Heart,
    title: "Local First",
    desc: "We are proudly built in Nawada, Bihar. We believe in empowering local food vendors and celebrating local culture."
  },
  {
    icon: MapPin,
    title: "Hyper-Local Focus",
    desc: "We start with Nawada and expand district by district, ensuring quality over quantity at every step."
  }
];
function AboutPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(RootLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border/40 py-16 md:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-4xl text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "mb-4 text-primary border-primary/30",
              children: "Our Story"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-5xl md:text-6xl mb-5 leading-tight", children: [
            "Built in Bihar, ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "For Bihar" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed", children: "Stallo.in is the trusted premium platform for booking verified wedding food stalls. We connect families celebrating weddings with the best local food vendors — from classic chaat and golgappa to modern live cooking stations." })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-5", children: STATS.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "rounded-xl border border-border/60 bg-card p-6 text-center shadow-xs",
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.4, delay: i * 0.08 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-4xl text-primary", children: stat.number }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: stat.label })
        ]
      },
      stat.label
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-y border-border/40 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "mb-4 text-primary border-primary/30",
              children: "Our Mission"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl mb-5", children: "Bringing premium food experiences to every wedding in Bihar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-base mb-4", children: "Founded in Nawada, Bihar in 2024, Stallo was built to bring transparency, reliability, and premium service quality to the local wedding food market. We saw families struggling to find reliable food vendors, and vendors struggling to reach customers beyond word of mouth." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-base", children: "Today, Stallo bridges that gap. Every vendor on our platform is manually verified with document checks, photo review, and a call verification before they can accept bookings. Our transparent pricing and smooth booking flow give families the confidence they deserve on their most important day." })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center mb-10",
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "mb-3 text-primary border-primary/30",
                children: "Our Values"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl", children: "What We Stand For" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: VALUES.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "flex gap-4 rounded-xl border border-border/60 bg-card p-6 shadow-xs",
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: i * 0.08 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(v.icon, { className: "size-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg mb-1", children: v.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: v.desc })
            ] })
          ]
        },
        v.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-y border-border/40 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center mb-10",
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "mb-3 text-primary border-primary/30",
                children: "Our Team"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl", children: "The People Behind Stallo" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto", children: TEAM.map((member, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: i * 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "text-center border-border/60 shadow-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl mx-auto mb-3", children: member.initials }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg", children: member.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary font-medium mb-2", children: member.role }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: member.bio })
          ] }) })
        },
        member.name
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-2xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-10 opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl mb-4", children: "Ready to book your perfect stalls?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Browse 50+ verified vendors and start planning your wedding today." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", asChild: true, "data-ocid": "about.cta_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/browse",
          search: { category: void 0, search: void 0 },
          children: [
            "Browse Vendors ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 size-4" })
          ]
        }
      ) })
    ] }) })
  ] });
}
export {
  AboutPage as default
};

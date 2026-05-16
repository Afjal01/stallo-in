import { j as jsxRuntimeExports, L as Link } from "./index-DIzWvAoP.js";
import { S as StarRating } from "./StarRating-C3SBl5ni.js";
import { V as VendorCard } from "./VendorCard-Ci_Drmup.js";
import { R as RootLayout } from "./RootLayout-58N_cMmF.js";
import { B as Badge } from "./sheet-BeMLdLfo.js";
import { c as createLucideIcon, B as Button } from "./useAuth-Bhs8pioH.js";
import { C as Card, a as CardContent } from "./card-BK5KlsOo.js";
import { S as Separator } from "./separator-DrDgD32O.js";
import { u as useVendors } from "./useBackend-CUhkj_B6.js";
import { m as motion } from "./proxy-DxhnKv7e.js";
import { A as ArrowRight } from "./arrow-right-BOHxw3XF.js";
import { U as Users } from "./users-pxzxJLV8.js";
import { C as Calendar } from "./calendar-DPjbiL9q.js";
import { S as Star } from "./star-B5nEqYaN.js";
import { C as CircleCheck } from "./circle-check-DYr8r4nJ.js";
import { S as ShieldCheck } from "./shield-check-Ch-9huLs.js";
import { Z as Zap } from "./zap-zJAFE-7Y.js";
import { M as Mail } from "./mail-BpmRirr0.js";
import { P as Phone } from "./phone-DwtpoaGc.js";
import "./VerifiedBadge-DqllpAqD.js";
import "./shield-x-C3b8D7mv.js";
import "./map-pin-Clah7rAK.js";
import "./log-in-BiYDoRg7.js";
import "./index-C8VI1ok0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode);
const CATEGORIES = [
  { emoji: "🍲", name: "Chaat", slug: "Chaat", count: "12 vendors" },
  { emoji: "🫙", name: "Golgappa", slug: "Golgappa", count: "9 vendors" },
  { emoji: "🍜", name: "Chowmein", slug: "Chowmein", count: "8 vendors" },
  { emoji: "🍿", name: "Popcorn", slug: "Popcorn", count: "5 vendors" },
  { emoji: "🍦", name: "Ice Cream", slug: "Ice Cream", count: "7 vendors" },
  {
    emoji: "☕",
    name: "Tea & Coffee",
    slug: "Tea & Coffee",
    count: "9 vendors"
  },
  { emoji: "🥞", name: "Dosa", slug: "Dosa", count: "10 vendors" },
  { emoji: "🍝", name: "Pasta", slug: "Pasta", count: "6 vendors" },
  { emoji: "🍹", name: "Mocktails", slug: "Mocktails", count: "6 vendors" },
  { emoji: "🔥", name: "Live BBQ", slug: "Live BBQ", count: "4 vendors" }
];
const TRUST_FEATURES = [
  {
    icon: ShieldCheck,
    title: "Verified Vendors Only",
    desc: "Every vendor passes document checks, photo review, and a live call before going live on Stallo."
  },
  {
    icon: Star,
    title: "Transparent Pricing",
    desc: "Package price, setup fee, and travel charges shown upfront. No surprise bills on your wedding day."
  },
  {
    icon: Zap,
    title: "Instant Confirmation",
    desc: "Book online, pay advance via Stripe, and receive email confirmation instantly — no back-and-forth."
  },
  {
    icon: Award,
    title: "24/7 Support",
    desc: "Our team is available round-the-clock to resolve issues, coordinate vendors, and ensure your event is perfect."
  }
];
const STEPS = [
  {
    num: "01",
    title: "Browse & Compare",
    desc: "Explore 50+ verified food stalls by category. Compare packages, pricing, and ratings."
  },
  {
    num: "02",
    title: "Choose & Book",
    desc: "Select your date, venue, and guest count. Review transparent pricing before confirming."
  },
  {
    num: "03",
    title: "Pay Securely",
    desc: "Pay your advance online via Stripe. Your booking is locked and confirmed immediately."
  },
  {
    num: "04",
    title: "Enjoy Your Day",
    desc: "Vendor arrives, sets up the stall, and serves your guests. Leave a review afterward."
  }
];
const TESTIMONIALS = [
  {
    name: "Ananya Sharma",
    location: "Nawada, Bihar",
    rating: 5,
    text: "Stallo made our wedding reception unforgettable. The chaat and golgappa stall from Raj's Chaat Corner was a massive hit with all 400 guests. Booking was seamless and the vendor was on time!",
    event: "Wedding Reception, March 2026",
    avatar: "AS"
  },
  {
    name: "Vikram Prasad",
    location: "Patna, Bihar",
    rating: 5,
    text: "I was skeptical at first, but Stallo's vendor verification really works. The dosa stall was professional, clean, and served 250 people without a single complaint. Highly recommend!",
    event: "Wedding Dinner, February 2026",
    avatar: "VP"
  },
  {
    name: "Priya Mishra",
    location: "Nawada, Bihar",
    rating: 5,
    text: "The ice cream and mocktail stations were a perfect combo for our summer wedding. Transparent pricing, easy payment, and excellent service. Stallo is now our go-to for every family event.",
    event: "Wedding Celebration, April 2026",
    avatar: "PM"
  }
];
const STATS = [
  { icon: Users, number: "50+", label: "Verified Vendors" },
  { icon: Calendar, number: "500+", label: "Events Booked" },
  { icon: Star, number: "4.8★", label: "Average Rating" },
  { icon: CircleCheck, number: "10+", label: "Food Categories" }
];
function HomePage() {
  const { data: allVendors = [], isLoading: vendorsLoading } = useVendors({});
  const featuredVendors = allVendors.filter(
    (v) => v.featured
  );
  const displayVendors = (featuredVendors.length > 0 ? featuredVendors : allVendors).slice(0, 4);
  const sectionTitle = featuredVendors.length > 0 ? "Top-Rated Stall Vendors" : "Popular Stall Vendors";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(RootLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-card border-b border-border/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/assets/generated/hero-wedding-food.dim_1600x900.jpg",
            alt: "Premium wedding food stalls",
            className: "h-full w-full object-cover"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container relative py-24 md:py-36", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/30 text-xs font-medium px-3 py-1 mb-5", children: "🏆 Nawada Bihar's Most Trusted Platform" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.h1,
          {
            className: "font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-5",
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.55, delay: 0.1 },
            children: [
              "Book Premium ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Wedding" }),
              " Food Stalls"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            className: "text-muted-foreground text-lg md:text-xl max-w-lg leading-relaxed mb-8",
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.2 },
            children: "Verified chaat, dosa, ice cream, and live food stalls for your wedding. Transparent pricing. Seamless online booking. Reliable service."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "flex flex-wrap gap-3",
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.3 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  asChild: true,
                  "data-ocid": "hero.browse_button",
                  className: "shadow-lg",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: "/browse",
                      search: { category: void 0, search: void 0 },
                      children: [
                        "Browse Stalls ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 size-4" })
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  variant: "outline",
                  asChild: true,
                  "data-ocid": "hero.how_it_works_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/how-it-works", children: "How It Works" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "mt-10 flex flex-wrap gap-6",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.5, delay: 0.45 },
            children: STATS.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: "size-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground", children: stat.number }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: stat.label })
            ] }, stat.label))
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center mb-12",
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "mb-3 text-primary border-primary/30",
                children: "10 Categories"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl", children: "Browse by Food Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 text-lg", children: "From street food classics to gourmet live stations" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3", children: CATEGORIES.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: i * 0.05 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/browse",
              search: { category: cat.slug, search: void 0 },
              className: "group flex flex-col items-center gap-2.5 rounded-xl border border-border/60 bg-card p-5 shadow-xs hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200",
              "data-ocid": `category.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl group-hover:scale-110 transition-transform duration-200", children: cat.emoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground text-center leading-tight", children: cat.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: cat.count })
              ]
            }
          )
        },
        cat.name
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-y border-border/40 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "flex flex-wrap items-end justify-between gap-4 mb-10",
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "mb-2 text-primary border-primary/30",
                  children: "Featured"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl", children: sectionTitle }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Handpicked, verified vendors trusted by hundreds of families" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                asChild: true,
                "data-ocid": "featured.view_all_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/browse",
                    search: { category: void 0, search: void 0 },
                    children: [
                      "View All Vendors ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1.5 size-4" })
                    ]
                  }
                )
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5", children: vendorsLoading ? [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl border border-border/60 bg-card p-4 space-y-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 rounded-lg bg-muted animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-3/4 bg-muted rounded animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-1/2 bg-muted rounded animate-pulse" })
          ]
        },
        i
      )) : displayVendors.map((vendor, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: i * 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(VendorCard, { vendor, index: i })
        },
        vendor.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center mb-12",
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
                children: "Simple Process"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl", children: "How Stallo Works" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 text-lg", children: "Book your dream wedding food stall in 4 simple steps" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: STEPS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "relative flex flex-col gap-4 rounded-xl border border-border/60 bg-card p-6 shadow-xs",
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.45, delay: i * 0.1 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-5xl text-primary/20 leading-none select-none", children: step.num }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg", children: step.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: step.desc })
          ]
        },
        step.num
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          asChild: true,
          "data-ocid": "how_it_works.learn_more_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/how-it-works", children: [
            "See Full Process ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1.5 size-4" })
          ] })
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-y border-border/40 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center mb-12",
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
                children: "Real Reviews"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl", children: "What Families Are Saying" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 text-lg", children: "Trusted by hundreds of Bihar families for their weddings" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.45, delay: i * 0.12 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "h-full border-border/60 shadow-xs hover:shadow-sm transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex flex-col gap-4 h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: t.rating, size: "sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground/80 leading-relaxed flex-1", children: [
              "“",
              t.text,
              "”"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm", children: t.avatar }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm truncate", children: t.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t.event })
              ] })
            ] })
          ] }) })
        },
        t.name
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center mb-12",
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
                children: "Why Stallo"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl", children: "Built for Trust & Reliability" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 text-lg", children: "Every feature designed to give you peace of mind on your wedding day" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5", children: TRUST_FEATURES.map((feature, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "flex flex-col gap-4 rounded-xl border border-border/60 bg-card p-6 shadow-xs hover:border-primary/30 hover:shadow-sm transition-all duration-200",
          "data-ocid": `trust.item.${i + 1}`,
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: i * 0.08 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-11 items-center justify-center rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(feature.icon, { className: "size-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg", children: feature.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: feature.desc })
          ]
        },
        feature.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-t border-border/40 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "rounded-2xl bg-primary/5 border border-primary/20 p-8 md:p-14 text-center shadow-sm",
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/30 mb-4", children: "Get Started Today" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-3xl md:text-5xl mb-4", children: [
            "Make your wedding",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "unforgettable" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 max-w-lg mx-auto text-lg leading-relaxed", children: "Browse 50+ verified food stall vendors, compare packages, and book your perfect stalls in minutes." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 justify-center mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "lg",
                asChild: true,
                "data-ocid": "cta.browse_button",
                className: "shadow-md",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/browse",
                    search: { category: void 0, search: void 0 },
                    children: [
                      "Start Browsing ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 size-4" })
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "lg",
                variant: "outline",
                asChild: true,
                "data-ocid": "cta.contact_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: "Contact Us" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "max-w-sm mx-auto mb-8 opacity-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-6 justify-center text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "support@stallo.in" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "+91 98765 43210" })
            ] })
          ] })
        ]
      }
    ) }) })
  ] });
}
export {
  HomePage as default
};

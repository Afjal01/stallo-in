import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-BKL2lxtv.js";
import { S as StarRating } from "./StarRating-ClJRJp0s.js";
import { V as VendorCard } from "./VendorCard-CPPYQBq4.js";
import { R as RootLayout } from "./RootLayout-CQsg0YUW.js";
import { B as Badge } from "./sheet-DdO1tWzN.js";
import { c as createLucideIcon, B as Button } from "./useAuth-IAGlSf5h.js";
import { u as useVendors } from "./useBackend-B1f4NLLV.js";
import { h as hasReducedMotionListener, i as initPrefersReducedMotion, p as prefersReducedMotion, m as motion } from "./proxy-5vBcU4c8.js";
import { A as ArrowRight } from "./arrow-right-5VUV0FB7.js";
import { S as ShieldCheck } from "./shield-check-VRt3INtw.js";
import { C as Calendar } from "./calendar-BcXsBU70.js";
import { S as Star } from "./star-7jLtUNX7.js";
import { U as Users } from "./users-CPmCI05L.js";
import { C as CircleCheck } from "./circle-check-B67wFSiq.js";
import { Z as Zap } from "./zap-EtwVtcXR.js";
import { M as Mail } from "./mail-dfhO7J2A.js";
import { P as Phone } from "./phone-DyJDBbX7.js";
import "./card-BTgr7EEz.js";
import "./VerifiedBadge-o3SLT3DJ.js";
import "./clock-DInTa1dw.js";
import "./shield-x-CbUa9F-o.js";
import "./map-pin-Dy2P6xtZ.js";
import "./separator-DcZXF9iz.js";
import "./index-Dsok7sFO.js";
import "./log-in-Lp5PKdYh.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode);
function useReducedMotion() {
  !hasReducedMotionListener.current && initPrefersReducedMotion();
  const [shouldReduceMotion] = reactExports.useState(prefersReducedMotion.current);
  return shouldReduceMotion;
}
const CATEGORIES = [
  {
    emoji: "🍲",
    name: "Chaat",
    slug: "Chaat",
    count: "12 vendors",
    img: "/assets/generated/category-chaat.dim_600x400.jpg"
  },
  {
    emoji: "🫙",
    name: "Golgappa",
    slug: "Golgappa",
    count: "9 vendors",
    img: "/assets/generated/category-chaat.dim_600x400.jpg"
  },
  {
    emoji: "🍜",
    name: "Chowmein",
    slug: "Chowmein",
    count: "8 vendors",
    img: "/assets/generated/category-dosa.dim_600x400.jpg"
  },
  {
    emoji: "🥞",
    name: "Dosa",
    slug: "Dosa",
    count: "10 vendors",
    img: "/assets/generated/category-dosa.dim_600x400.jpg"
  },
  {
    emoji: "🍹",
    name: "Mocktails",
    slug: "Mocktails",
    count: "6 vendors",
    img: "/assets/generated/category-mocktails.dim_600x400.jpg"
  },
  {
    emoji: "🍦",
    name: "Ice Cream",
    slug: "Ice Cream",
    count: "7 vendors",
    img: "/assets/generated/category-icecream.dim_600x400.jpg"
  },
  {
    emoji: "☕",
    name: "Tea & Coffee",
    slug: "Tea & Coffee",
    count: "9 vendors",
    img: "/assets/generated/category-mocktails.dim_600x400.jpg"
  },
  {
    emoji: "🍿",
    name: "Popcorn",
    slug: "Popcorn",
    count: "5 vendors",
    img: "/assets/generated/category-icecream.dim_600x400.jpg"
  },
  {
    emoji: "🍝",
    name: "Pasta",
    slug: "Pasta",
    count: "6 vendors",
    img: "/assets/generated/category-dosa.dim_600x400.jpg"
  },
  {
    emoji: "🔥",
    name: "Live BBQ",
    slug: "Live BBQ",
    count: "4 vendors",
    img: "/assets/generated/category-chaat.dim_600x400.jpg"
  }
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
function useRevealOnScroll(ref) {
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}
function SectionHeading({
  badge,
  title,
  sub,
  center = true
}) {
  const ref = reactExports.useRef(null);
  useRevealOnScroll(ref);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref, className: `rise-in mb-14 ${center ? "text-center" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/40 text-primary bg-primary/8 mb-4", children: badge }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl xl:text-5xl leading-tight text-foreground", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3 text-base md:text-lg max-w-xl mx-auto", children: sub })
  ] });
}
function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const { data: allVendors = [], isLoading: vendorsLoading } = useVendors({});
  const featuredVendors = allVendors.filter(
    (v) => v.featured
  );
  const displayVendors = (featuredVendors.length > 0 ? featuredVendors : allVendors).slice(0, 4);
  const sectionTitle = featuredVendors.length > 0 ? "Top-Rated Stall Vendors" : "Popular Stall Vendors";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(RootLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative min-h-screen flex items-center overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/assets/generated/hero-wedding-food.dim_1600x900.jpg",
            alt: "Premium wedding food stalls",
            className: "h-full w-full object-cover object-center"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background/97 via-background/80 to-background/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/20" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none",
          style: {
            background: "radial-gradient(ellipse, oklch(var(--primary) / 0.08) 0%, transparent 70%)",
            filter: "blur(60px)"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container relative z-10 py-28 md:py-36", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: shouldReduceMotion ? false : { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-primary/40 text-primary bg-primary/10 backdrop-blur-sm mb-6", children: "🏆 Nawada Bihar's Most Trusted Platform" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.h1,
          {
            className: "font-display font-bold text-5xl md:text-6xl xl:text-7xl leading-[1.05] mb-6 text-foreground",
            initial: shouldReduceMotion ? false : { opacity: 0, y: 28 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.1 },
            children: [
              "Premium",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-primary",
                  style: { textShadow: "0 0 40px oklch(var(--primary) / 0.5)" },
                  children: "Wedding"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "Food Stalls,",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-4xl md:text-5xl xl:text-6xl font-normal", children: "Delivered with Love" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            className: "text-muted-foreground text-lg md:text-xl max-w-lg leading-relaxed mb-8",
            initial: shouldReduceMotion ? false : { opacity: 0, y: 18 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.22 },
            children: "Verified chaat, dosa, ice cream, and live food stalls for your wedding. Transparent pricing. Seamless online booking. Reliable service across Bihar."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "flex flex-wrap gap-3 mb-10",
            initial: shouldReduceMotion ? false : { opacity: 0, y: 14 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.32 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  asChild: true,
                  "data-ocid": "hero.browse_button",
                  className: "shadow-gold gap-2 font-semibold text-base px-7 py-5",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: "/browse",
                      search: { category: void 0, search: void 0 },
                      children: [
                        "Book a Stall ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
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
                  className: "border-foreground/30 text-foreground hover:bg-foreground/8 font-semibold text-base px-7 py-5 backdrop-blur-sm",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/browse",
                      search: { category: void 0, search: void 0 },
                      children: "Browse Stalls"
                    }
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "flex flex-wrap gap-5",
            initial: shouldReduceMotion ? false : { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.6, delay: 0.46 },
            children: [
              { icon: ShieldCheck, label: "500+ Verified Vendors" },
              { icon: Calendar, label: "10,000+ Events" },
              { icon: Star, label: "₹0 Hidden Fees" }
            ].map(({ icon: Icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-4 text-primary shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/90 font-medium", children: label })
            ] }, label))
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-y border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: STATS.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "flex flex-col items-center gap-1 text-center",
        initial: shouldReduceMotion ? false : { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.4, delay: i * 0.07 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: "size-5 text-primary mb-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-display font-bold text-2xl text-primary",
              style: { textShadow: "0 0 20px oklch(var(--primary) / 0.4)" },
              children: stat.number
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground tracking-wide uppercase", children: stat.label })
        ]
      },
      stat.label
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeading,
        {
          badge: "10 Categories",
          title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Browse by ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Food Category" })
          ] }),
          sub: "From street food classics to gourmet live stations"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4", children: CATEGORIES.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: shouldReduceMotion ? false : { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: i * 0.05 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/browse",
              search: { category: cat.slug, search: void 0 },
              className: "group relative flex flex-col overflow-hidden rounded-2xl h-40 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold",
              "data-ocid": `category.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: cat.img,
                    alt: cat.name,
                    className: "absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-background/10" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-auto p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl block mb-1", children: cat.emoji }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground leading-tight", children: cat.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: cat.count })
                ] })
              ]
            }
          )
        },
        cat.name
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-24 border-y border-border/40",
        style: { background: "oklch(var(--card) / 0.5)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4 mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.5 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/40 text-primary bg-primary/8 mb-3", children: "Featured" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl text-foreground", children: sectionTitle }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Handpicked, verified vendors trusted by hundreds of families" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                asChild: true,
                "data-ocid": "featured.view_all_button",
                className: "border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-semibold",
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
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5", children: vendorsLoading ? [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl border border-border/50 bg-card overflow-hidden",
              "data-ocid": "vendors.loading_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 bg-muted animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-1/3 bg-muted rounded animate-pulse" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-3/4 bg-muted rounded animate-pulse" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-1/2 bg-muted rounded animate-pulse" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-2/3 bg-muted rounded animate-pulse" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-1/3 bg-muted rounded animate-pulse" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-1/4 bg-muted rounded animate-pulse" })
                  ] })
                ] })
              ]
            },
            i
          )) : displayVendors.map((vendor, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: shouldReduceMotion ? false : { opacity: 0, y: 24 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.4, delay: i * 0.1 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(VendorCard, { vendor, index: i })
            },
            vendor.id
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeading,
        {
          badge: "Simple Process",
          title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "How ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Stallo" }),
            " Works"
          ] }),
          sub: "Book your dream wedding food stall in 4 simple steps"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: STEPS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "relative flex flex-col gap-4 rounded-2xl border border-border/50 bg-card p-7 shadow-subtle hover:border-primary/40 hover:shadow-gold transition-all duration-300",
          initial: shouldReduceMotion ? false : { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.45, delay: i * 0.1 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-display font-bold text-6xl leading-none select-none",
                style: {
                  color: "oklch(var(--primary) / 0.25)",
                  textShadow: "0 0 30px oklch(var(--primary) / 0.1)"
                },
                children: step.num
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-full border border-primary/40 bg-primary/8 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold text-sm", children: i + 1 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground", children: step.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: step.desc }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute top-0 left-7 right-7 h-px rounded-full",
                style: {
                  background: `linear-gradient(90deg, transparent, oklch(var(--primary) / ${i === 0 ? 0.6 : 0.2}), transparent)`
                }
              }
            )
          ]
        },
        step.num
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          asChild: true,
          "data-ocid": "how_it_works.learn_more_button",
          className: "border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-semibold",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/how-it-works", children: [
            "See Full Process ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1.5 size-4" })
          ] })
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-24 border-y border-border/40",
        style: { background: "oklch(var(--card) / 0.4)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeading,
            {
              badge: "Real Reviews",
              title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                "What Families ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Are Saying" })
              ] }),
              sub: "Trusted by hundreds of Bihar families for their weddings"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "flex flex-col gap-5 rounded-2xl border border-border/50 bg-card p-7 shadow-subtle hover:border-primary/30 hover:shadow-gold transition-all duration-300",
              initial: shouldReduceMotion ? false : { opacity: 0, y: 24 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.45, delay: i * 0.12 },
              "data-ocid": `testimonial.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-display text-6xl leading-none select-none",
                    style: { color: "oklch(var(--primary) / 0.35)" },
                    children: "“"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: t.rating, size: "sm" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed flex-1", children: t.text }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-3 border-t border-border/40", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex size-10 shrink-0 items-center justify-center rounded-full font-bold text-sm",
                      style: {
                        background: "oklch(var(--primary) / 0.15)",
                        color: "oklch(var(--primary))",
                        border: "1px solid oklch(var(--primary) / 0.3)"
                      },
                      children: t.avatar
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: t.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      t.event,
                      " · ",
                      t.location
                    ] })
                  ] })
                ] })
              ]
            },
            t.name
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeading,
        {
          badge: "Why Stallo",
          title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Built for ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Trust" }),
            " & Reliability"
          ] }),
          sub: "Every feature designed to give you peace of mind on your wedding day"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5", children: TRUST_FEATURES.map((feature, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "flex flex-col gap-4 rounded-2xl border border-border/50 bg-card p-7 shadow-subtle hover:border-primary/40 hover:shadow-gold transition-all duration-300",
          style: {
            borderTop: "2px solid oklch(var(--primary) / 0.35)"
          },
          "data-ocid": `trust.item.${i + 1}`,
          initial: shouldReduceMotion ? false : { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: i * 0.08 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex size-12 items-center justify-center rounded-xl",
                style: {
                  background: "oklch(var(--primary) / 0.12)",
                  border: "1px solid oklch(var(--primary) / 0.25)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(feature.icon, { className: "size-5 text-primary" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground", children: feature.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: feature.desc })
          ]
        },
        feature.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-20 border-t border-border/40",
        style: { background: "oklch(var(--card) / 0.5)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "rounded-3xl p-8 md:p-14 text-center border border-border/50 shadow-subtle relative overflow-hidden",
            style: {
              background: "linear-gradient(135deg, oklch(var(--card)) 0%, oklch(var(--background)) 100%)"
            },
            initial: shouldReduceMotion ? false : { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.55 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 pointer-events-none",
                  style: {
                    background: "radial-gradient(ellipse at 50% 0%, oklch(var(--primary) / 0.07) 0%, transparent 65%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "inline-flex size-14 items-center justify-center rounded-2xl mb-5",
                      style: { background: "#25D366" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "size-7 text-white" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-3xl md:text-4xl mb-3 text-foreground", children: [
                    "Need Help?",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Chat on WhatsApp" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6 max-w-md mx-auto", children: "Our team responds within minutes. Get vendor recommendations, pricing help, or booking support — instantly." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "lg",
                      "data-ocid": "whatsapp.cta_button",
                      className: "font-semibold gap-2 px-8",
                      style: { background: "#25D366", color: "#fff" },
                      onClick: () => window.open(
                        "https://wa.me/919876543210?text=Hi%20Stallo%2C%20I%20need%20help%20booking%20a%20food%20stall",
                        "_blank"
                      ),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "size-5" }),
                        "Chat on WhatsApp"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-px h-12 mx-auto mb-10 rounded-full",
                    style: { background: "oklch(var(--border))" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: "mb-4",
                    style: {
                      background: "oklch(var(--primary) / 0.12)",
                      color: "oklch(var(--primary))",
                      border: "1px solid oklch(var(--primary) / 0.3)"
                    },
                    children: "Get Started Today"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-3xl md:text-5xl mb-4 text-foreground", children: [
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
                      className: "shadow-gold font-semibold text-base px-8 gap-2",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Link,
                        {
                          to: "/browse",
                          search: { category: void 0, search: void 0 },
                          children: [
                            "Start Browsing ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
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
                      className: "border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-semibold",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: "Contact Us" })
                    }
                  )
                ] }),
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
              ] })
            ]
          }
        ) })
      }
    )
  ] });
}
export {
  HomePage as default
};

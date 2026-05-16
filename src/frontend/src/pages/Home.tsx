import { StarRating } from "@/components/common/StarRating";
import { VendorCard } from "@/components/common/VendorCard";
import { RootLayout } from "@/components/layout/RootLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useVendors } from "@/hooks/useBackend";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

// ─── Static Data ────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    emoji: "🍲",
    name: "Chaat",
    slug: "Chaat",
    count: "12 vendors",
    img: "/assets/generated/category-chaat.dim_600x400.jpg",
  },
  {
    emoji: "🫙",
    name: "Golgappa",
    slug: "Golgappa",
    count: "9 vendors",
    img: "/assets/generated/category-chaat.dim_600x400.jpg",
  },
  {
    emoji: "🍜",
    name: "Chowmein",
    slug: "Chowmein",
    count: "8 vendors",
    img: "/assets/generated/category-dosa.dim_600x400.jpg",
  },
  {
    emoji: "🥞",
    name: "Dosa",
    slug: "Dosa",
    count: "10 vendors",
    img: "/assets/generated/category-dosa.dim_600x400.jpg",
  },
  {
    emoji: "🍹",
    name: "Mocktails",
    slug: "Mocktails",
    count: "6 vendors",
    img: "/assets/generated/category-mocktails.dim_600x400.jpg",
  },
  {
    emoji: "🍦",
    name: "Ice Cream",
    slug: "Ice Cream",
    count: "7 vendors",
    img: "/assets/generated/category-icecream.dim_600x400.jpg",
  },
  {
    emoji: "☕",
    name: "Tea & Coffee",
    slug: "Tea & Coffee",
    count: "9 vendors",
    img: "/assets/generated/category-mocktails.dim_600x400.jpg",
  },
  {
    emoji: "🍿",
    name: "Popcorn",
    slug: "Popcorn",
    count: "5 vendors",
    img: "/assets/generated/category-icecream.dim_600x400.jpg",
  },
  {
    emoji: "🍝",
    name: "Pasta",
    slug: "Pasta",
    count: "6 vendors",
    img: "/assets/generated/category-dosa.dim_600x400.jpg",
  },
  {
    emoji: "🔥",
    name: "Live BBQ",
    slug: "Live BBQ",
    count: "4 vendors",
    img: "/assets/generated/category-chaat.dim_600x400.jpg",
  },
];

const TRUST_FEATURES = [
  {
    icon: ShieldCheck,
    title: "Verified Vendors Only",
    desc: "Every vendor passes document checks, photo review, and a live call before going live on Stallo.",
  },
  {
    icon: Star,
    title: "Transparent Pricing",
    desc: "Package price, setup fee, and travel charges shown upfront. No surprise bills on your wedding day.",
  },
  {
    icon: Zap,
    title: "Instant Confirmation",
    desc: "Book online, pay advance via Stripe, and receive email confirmation instantly — no back-and-forth.",
  },
  {
    icon: Award,
    title: "24/7 Support",
    desc: "Our team is available round-the-clock to resolve issues, coordinate vendors, and ensure your event is perfect.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Browse & Compare",
    desc: "Explore 50+ verified food stalls by category. Compare packages, pricing, and ratings.",
  },
  {
    num: "02",
    title: "Choose & Book",
    desc: "Select your date, venue, and guest count. Review transparent pricing before confirming.",
  },
  {
    num: "03",
    title: "Pay Securely",
    desc: "Pay your advance online via Stripe. Your booking is locked and confirmed immediately.",
  },
  {
    num: "04",
    title: "Enjoy Your Day",
    desc: "Vendor arrives, sets up the stall, and serves your guests. Leave a review afterward.",
  },
];

const TESTIMONIALS = [
  {
    name: "Ananya Sharma",
    location: "Nawada, Bihar",
    rating: 5,
    text: "Stallo made our wedding reception unforgettable. The chaat and golgappa stall from Raj's Chaat Corner was a massive hit with all 400 guests. Booking was seamless and the vendor was on time!",
    event: "Wedding Reception, March 2026",
    avatar: "AS",
  },
  {
    name: "Vikram Prasad",
    location: "Patna, Bihar",
    rating: 5,
    text: "I was skeptical at first, but Stallo's vendor verification really works. The dosa stall was professional, clean, and served 250 people without a single complaint. Highly recommend!",
    event: "Wedding Dinner, February 2026",
    avatar: "VP",
  },
  {
    name: "Priya Mishra",
    location: "Nawada, Bihar",
    rating: 5,
    text: "The ice cream and mocktail stations were a perfect combo for our summer wedding. Transparent pricing, easy payment, and excellent service. Stallo is now our go-to for every family event.",
    event: "Wedding Celebration, April 2026",
    avatar: "PM",
  },
];

const STATS = [
  { icon: Users, number: "50+", label: "Verified Vendors" },
  { icon: Calendar, number: "500+", label: "Events Booked" },
  { icon: Star, number: "4.8★", label: "Average Rating" },
  { icon: CheckCircle2, number: "10+", label: "Food Categories" },
];

// ─── Intersection observer hook ─────────────────────────────────────────────

function useRevealOnScroll(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

// ─── Section Heading ─────────────────────────────────────────────────────────

function SectionHeading({
  badge,
  title,
  sub,
  center = true,
}: {
  badge: string;
  title: React.ReactNode;
  sub: string;
  center?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useRevealOnScroll(ref as React.RefObject<HTMLElement>);
  return (
    <div ref={ref} className={`rise-in mb-14 ${center ? "text-center" : ""}`}>
      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/40 text-primary bg-primary/8 mb-4">
        {badge}
      </span>
      <h2 className="font-display font-bold text-3xl md:text-4xl xl:text-5xl leading-tight text-foreground">
        {title}
      </h2>
      <p className="text-muted-foreground mt-3 text-base md:text-lg max-w-xl mx-auto">
        {sub}
      </p>
    </div>
  );
}

// ─── HomePage ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const { data: allVendors = [], isLoading: vendorsLoading } = useVendors({});
  const featuredVendors = allVendors.filter(
    (v) => (v as { featured?: boolean }).featured,
  );
  const displayVendors = (
    featuredVendors.length > 0 ? featuredVendors : allVendors
  ).slice(0, 4);
  const sectionTitle =
    featuredVendors.length > 0
      ? "Top-Rated Stall Vendors"
      : "Popular Stall Vendors";

  return (
    <RootLayout>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Cinematic background */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-wedding-food.dim_1600x900.jpg"
            alt="Premium wedding food stalls"
            className="h-full w-full object-cover object-center"
          />
          {/* Multi-layer dark overlay for cinematic depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/97 via-background/80 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/20" />
        </div>

        {/* Decorative gold glow blob */}
        <div
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, oklch(var(--primary) / 0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="container relative z-10 py-28 md:py-36">
          <div className="max-w-2xl">
            {/* Trust badge */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-primary/40 text-primary bg-primary/10 backdrop-blur-sm mb-6">
                🏆 Nawada Bihar's Most Trusted Platform
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              className="font-display font-bold text-5xl md:text-6xl xl:text-7xl leading-[1.05] mb-6 text-foreground"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Premium{" "}
              <span
                className="text-primary"
                style={{ textShadow: "0 0 40px oklch(var(--primary) / 0.5)" }}
              >
                Wedding
              </span>
              <br />
              Food Stalls,
              <br />
              <span className="text-muted-foreground text-4xl md:text-5xl xl:text-6xl font-normal">
                Delivered with Love
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-muted-foreground text-lg md:text-xl max-w-lg leading-relaxed mb-8"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
            >
              Verified chaat, dosa, ice cream, and live food stalls for your
              wedding. Transparent pricing. Seamless online booking. Reliable
              service across Bihar.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-3 mb-10"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
            >
              <Button
                size="lg"
                asChild
                data-ocid="hero.browse_button"
                className="shadow-gold gap-2 font-semibold text-base px-7 py-5"
              >
                <Link
                  to="/browse"
                  search={{ category: undefined, search: undefined }}
                >
                  Book a Stall <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                data-ocid="hero.how_it_works_button"
                className="border-foreground/30 text-foreground hover:bg-foreground/8 font-semibold text-base px-7 py-5 backdrop-blur-sm"
              >
                <Link
                  to="/browse"
                  search={{ category: undefined, search: undefined }}
                >
                  Browse Stalls
                </Link>
              </Button>
            </motion.div>

            {/* Trust badges row */}
            <motion.div
              className="flex flex-wrap gap-5"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.46 }}
            >
              {[
                { icon: ShieldCheck, label: "500+ Verified Vendors" },
                { icon: Calendar, label: "10,000+ Events" },
                { icon: Star, label: "₹0 Hidden Fees" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm">
                  <Icon className="size-4 text-primary shrink-0" />
                  <span className="text-foreground/90 font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────────── */}
      <section className="bg-card border-y border-border/50">
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center gap-1 text-center"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <stat.icon className="size-5 text-primary mb-1" />
                <span
                  className="font-display font-bold text-2xl text-primary"
                  style={{ textShadow: "0 0 20px oklch(var(--primary) / 0.4)" }}
                >
                  {stat.number}
                </span>
                <span className="text-xs text-muted-foreground tracking-wide uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────────────────── */}
      <section className="bg-background py-24">
        <div className="container">
          <SectionHeading
            badge="10 Categories"
            title={
              <>
                Browse by <span className="text-primary">Food Category</span>
              </>
            }
            sub="From street food classics to gourmet live stations"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  to="/browse"
                  search={{ category: cat.slug, search: undefined }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl h-40 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold"
                  data-ocid={`category.item.${i + 1}`}
                >
                  {/* Background image */}
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-background/10" />
                  {/* Content */}
                  <div className="relative mt-auto p-3">
                    <span className="text-2xl block mb-1">{cat.emoji}</span>
                    <p className="font-semibold text-sm text-foreground leading-tight">
                      {cat.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{cat.count}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED VENDORS ──────────────────────────────────────────────── */}
      <section
        className="py-24 border-y border-border/40"
        style={{ background: "oklch(var(--card) / 0.5)" }}
      >
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/40 text-primary bg-primary/8 mb-3">
                Featured
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
                {sectionTitle}
              </h2>
              <p className="text-muted-foreground mt-1">
                Handpicked, verified vendors trusted by hundreds of families
              </p>
            </motion.div>
            <Button
              variant="outline"
              asChild
              data-ocid="featured.view_all_button"
              className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-semibold"
            >
              <Link
                to="/browse"
                search={{ category: undefined, search: undefined }}
              >
                View All Vendors <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {vendorsLoading
              ? [1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-border/50 bg-card overflow-hidden"
                    data-ocid="vendors.loading_state"
                  >
                    <div className="h-48 bg-muted animate-pulse" />
                    <div className="p-4 space-y-3">
                      <div className="h-3 w-1/3 bg-muted rounded animate-pulse" />
                      <div className="h-5 w-3/4 bg-muted rounded animate-pulse" />
                      <div className="h-3 w-1/2 bg-muted rounded animate-pulse" />
                      <div className="h-3 w-2/3 bg-muted rounded animate-pulse" />
                      <div className="flex justify-between items-center pt-1">
                        <div className="h-6 w-1/3 bg-muted rounded animate-pulse" />
                        <div className="h-8 w-1/4 bg-muted rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))
              : displayVendors.map((vendor, i) => (
                  <motion.div
                    key={vendor.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <VendorCard vendor={vendor} index={i} />
                  </motion.div>
                ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section className="bg-background py-24">
        <div className="container">
          <SectionHeading
            badge="Simple Process"
            title={
              <>
                How <span className="text-primary">Stallo</span> Works
              </>
            }
            sub="Book your dream wedding food stall in 4 simple steps"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                className="relative flex flex-col gap-4 rounded-2xl border border-border/50 bg-card p-7 shadow-subtle hover:border-primary/40 hover:shadow-gold transition-all duration-300"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                {/* Gold number */}
                <span
                  className="font-display font-bold text-6xl leading-none select-none"
                  style={{
                    color: "oklch(var(--primary) / 0.25)",
                    textShadow: "0 0 30px oklch(var(--primary) / 0.1)",
                  }}
                >
                  {step.num}
                </span>
                {/* Step icon circle */}
                <div className="size-10 rounded-full border border-primary/40 bg-primary/8 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
                {/* Top gold accent line */}
                <div
                  className="absolute top-0 left-7 right-7 h-px rounded-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, oklch(var(--primary) / ${i === 0 ? 0.6 : 0.2}), transparent)`,
                  }}
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              variant="outline"
              asChild
              data-ocid="how_it_works.learn_more_button"
              className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-semibold"
            >
              <Link to="/how-it-works">
                See Full Process <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section
        className="py-24 border-y border-border/40"
        style={{ background: "oklch(var(--card) / 0.4)" }}
      >
        <div className="container">
          <SectionHeading
            badge="Real Reviews"
            title={
              <>
                What Families <span className="text-primary">Are Saying</span>
              </>
            }
            sub="Trusted by hundreds of Bihar families for their weddings"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                className="flex flex-col gap-5 rounded-2xl border border-border/50 bg-card p-7 shadow-subtle hover:border-primary/30 hover:shadow-gold transition-all duration-300"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
                data-ocid={`testimonial.item.${i + 1}`}
              >
                {/* Large gold quote mark */}
                <span
                  className="font-display text-6xl leading-none select-none"
                  style={{ color: "oklch(var(--primary) / 0.35)" }}
                >
                  &ldquo;
                </span>
                {/* Stars */}
                <StarRating value={t.rating} size="sm" />
                {/* Review text */}
                <p className="text-sm text-foreground/80 leading-relaxed flex-1">
                  {t.text}
                </p>
                {/* Author */}
                <div className="flex items-center gap-3 pt-3 border-t border-border/40">
                  <div
                    className="flex size-10 shrink-0 items-center justify-center rounded-full font-bold text-sm"
                    style={{
                      background: "oklch(var(--primary) / 0.15)",
                      color: "oklch(var(--primary))",
                      border: "1px solid oklch(var(--primary) / 0.3)",
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.event} · {t.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE STALLO ─────────────────────────────────────────────── */}
      <section className="bg-background py-24">
        <div className="container">
          <SectionHeading
            badge="Why Stallo"
            title={
              <>
                Built for <span className="text-primary">Trust</span> &amp;
                Reliability
              </>
            }
            sub="Every feature designed to give you peace of mind on your wedding day"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRUST_FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-card p-7 shadow-subtle hover:border-primary/40 hover:shadow-gold transition-all duration-300"
                style={{
                  borderTop: "2px solid oklch(var(--primary) / 0.35)",
                }}
                data-ocid={`trust.item.${i + 1}`}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div
                  className="flex size-12 items-center justify-center rounded-xl"
                  style={{
                    background: "oklch(var(--primary) / 0.12)",
                    border: "1px solid oklch(var(--primary) / 0.25)",
                  }}
                >
                  <feature.icon className="size-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHATSAPP CTA ──────────────────────────────────────────────────── */}
      <section
        className="py-20 border-t border-border/40"
        style={{ background: "oklch(var(--card) / 0.5)" }}
      >
        <div className="container">
          <motion.div
            className="rounded-3xl p-8 md:p-14 text-center border border-border/50 shadow-subtle relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, oklch(var(--card)) 0%, oklch(var(--background)) 100%)",
            }}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            {/* Decorative gold glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, oklch(var(--primary) / 0.07) 0%, transparent 65%)",
              }}
            />

            <div className="relative">
              {/* WhatsApp section */}
              <div className="mb-10">
                <div
                  className="inline-flex size-14 items-center justify-center rounded-2xl mb-5"
                  style={{ background: "#25D366" }}
                >
                  <MessageCircle className="size-7 text-white" />
                </div>
                <h2 className="font-display font-bold text-3xl md:text-4xl mb-3 text-foreground">
                  Need Help?{" "}
                  <span className="text-primary">Chat on WhatsApp</span>
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Our team responds within minutes. Get vendor recommendations,
                  pricing help, or booking support — instantly.
                </p>
                <Button
                  size="lg"
                  data-ocid="whatsapp.cta_button"
                  className="font-semibold gap-2 px-8"
                  style={{ background: "#25D366", color: "#fff" }}
                  onClick={() =>
                    window.open(
                      "https://wa.me/919876543210?text=Hi%20Stallo%2C%20I%20need%20help%20booking%20a%20food%20stall",
                      "_blank",
                    )
                  }
                >
                  <MessageCircle className="size-5" />
                  Chat on WhatsApp
                </Button>
              </div>

              {/* Divider */}
              <div
                className="w-px h-12 mx-auto mb-10 rounded-full"
                style={{ background: "oklch(var(--border))" }}
              />

              {/* Main CTA */}
              <Badge
                className="mb-4"
                style={{
                  background: "oklch(var(--primary) / 0.12)",
                  color: "oklch(var(--primary))",
                  border: "1px solid oklch(var(--primary) / 0.3)",
                }}
              >
                Get Started Today
              </Badge>
              <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-foreground">
                Make your wedding{" "}
                <span className="text-primary">unforgettable</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-lg leading-relaxed">
                Browse 50+ verified food stall vendors, compare packages, and
                book your perfect stalls in minutes.
              </p>
              <div className="flex flex-wrap gap-3 justify-center mb-10">
                <Button
                  size="lg"
                  asChild
                  data-ocid="cta.browse_button"
                  className="shadow-gold font-semibold text-base px-8 gap-2"
                >
                  <Link
                    to="/browse"
                    search={{ category: undefined, search: undefined }}
                  >
                    Start Browsing <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  data-ocid="cta.contact_button"
                  className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-semibold"
                >
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>

              {/* Contact details */}
              <div className="flex flex-wrap gap-6 justify-center text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="size-4 text-primary" />
                  <span>support@stallo.in</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="size-4 text-primary" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </RootLayout>
  );
}

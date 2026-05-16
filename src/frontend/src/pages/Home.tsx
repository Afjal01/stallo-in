import { StarRating } from "@/components/common/StarRating";
import { VendorCard } from "@/components/common/VendorCard";
import { RootLayout } from "@/components/layout/RootLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useVendors } from "@/hooks/useBackend";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  Mail,
  Phone,
  ShieldCheck,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

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
    count: "9 vendors",
  },
  { emoji: "🥞", name: "Dosa", slug: "Dosa", count: "10 vendors" },
  { emoji: "🍝", name: "Pasta", slug: "Pasta", count: "6 vendors" },
  { emoji: "🍹", name: "Mocktails", slug: "Mocktails", count: "6 vendors" },
  { emoji: "🔥", name: "Live BBQ", slug: "Live BBQ", count: "4 vendors" },
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

export default function HomePage() {
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
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-card border-b border-border/40">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-wedding-food.dim_1600x900.jpg"
            alt="Premium wedding food stalls"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </div>

        <div className="container relative py-24 md:py-36">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-primary/10 text-primary border-primary/30 text-xs font-medium px-3 py-1 mb-5">
                🏆 Nawada Bihar's Most Trusted Platform
              </Badge>
            </motion.div>

            <motion.h1
              className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-5"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              Book Premium <span className="text-primary">Wedding</span> Food
              Stalls
            </motion.h1>

            <motion.p
              className="text-muted-foreground text-lg md:text-xl max-w-lg leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Verified chaat, dosa, ice cream, and live food stalls for your
              wedding. Transparent pricing. Seamless online booking. Reliable
              service.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                size="lg"
                asChild
                data-ocid="hero.browse_button"
                className="shadow-lg"
              >
                <Link
                  to="/browse"
                  search={{ category: undefined, search: undefined }}
                >
                  Browse Stalls <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                data-ocid="hero.how_it_works_button"
              >
                <Link to="/how-it-works">How It Works</Link>
              </Button>
            </motion.div>

            {/* Stats trust row */}
            <motion.div
              className="mt-10 flex flex-wrap gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <stat.icon className="size-4 text-primary" />
                  <span className="font-display font-bold text-foreground">
                    {stat.number}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────── */}
      <section className="bg-background py-20">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-3 text-primary border-primary/30"
            >
              10 Categories
            </Badge>
            <h2 className="font-display font-bold text-3xl md:text-4xl">
              Browse by Food Category
            </h2>
            <p className="text-muted-foreground mt-2 text-lg">
              From street food classics to gourmet live stations
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  to="/browse"
                  search={{ category: cat.slug, search: undefined }}
                  className="group flex flex-col items-center gap-2.5 rounded-xl border border-border/60 bg-card p-5 shadow-xs hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  data-ocid={`category.item.${i + 1}`}
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
                    {cat.emoji}
                  </span>
                  <span className="font-semibold text-sm text-foreground text-center leading-tight">
                    {cat.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {cat.count}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Vendors ─────────────────────────────────── */}
      <section className="bg-muted/30 border-y border-border/40 py-20">
        <div className="container">
          <motion.div
            className="flex flex-wrap items-end justify-between gap-4 mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <Badge
                variant="outline"
                className="mb-2 text-primary border-primary/30"
              >
                Featured
              </Badge>
              <h2 className="font-display font-bold text-3xl md:text-4xl">
                {sectionTitle}
              </h2>
              <p className="text-muted-foreground mt-1">
                Handpicked, verified vendors trusted by hundreds of families
              </p>
            </div>
            <Button
              variant="outline"
              asChild
              data-ocid="featured.view_all_button"
            >
              <Link
                to="/browse"
                search={{ category: undefined, search: undefined }}
              >
                View All Vendors <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {vendorsLoading
              ? [1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border/60 bg-card p-4 space-y-3"
                  >
                    <div className="h-40 rounded-lg bg-muted animate-pulse" />
                    <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                    <div className="h-3 w-1/2 bg-muted rounded animate-pulse" />
                  </div>
                ))
              : displayVendors.map((vendor, i) => (
                  <motion.div
                    key={vendor.id}
                    initial={{ opacity: 0, y: 20 }}
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

      {/* ── How It Works ─────────────────────────────────────── */}
      <section className="bg-background py-20">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-3 text-primary border-primary/30"
            >
              Simple Process
            </Badge>
            <h2 className="font-display font-bold text-3xl md:text-4xl">
              How Stallo Works
            </h2>
            <p className="text-muted-foreground mt-2 text-lg">
              Book your dream wedding food stall in 4 simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                className="relative flex flex-col gap-4 rounded-xl border border-border/60 bg-card p-6 shadow-xs"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <span className="font-display font-bold text-5xl text-primary/20 leading-none select-none">
                  {step.num}
                </span>
                <h3 className="font-display font-semibold text-lg">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              asChild
              data-ocid="how_it_works.learn_more_button"
            >
              <Link to="/how-it-works">
                See Full Process <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="bg-muted/30 border-y border-border/40 py-20">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-3 text-primary border-primary/30"
            >
              Real Reviews
            </Badge>
            <h2 className="font-display font-bold text-3xl md:text-4xl">
              What Families Are Saying
            </h2>
            <p className="text-muted-foreground mt-2 text-lg">
              Trusted by hundreds of Bihar families for their weddings
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
              >
                <Card className="h-full border-border/60 shadow-xs hover:shadow-sm transition-smooth">
                  <CardContent className="p-6 flex flex-col gap-4 h-full">
                    <StarRating value={t.rating} size="sm" />
                    <p className="text-sm text-foreground/80 leading-relaxed flex-1">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                        {t.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate">
                          {t.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t.event}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Signals ────────────────────────────────────── */}
      <section className="bg-background py-20">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-3 text-primary border-primary/30"
            >
              Why Stallo
            </Badge>
            <h2 className="font-display font-bold text-3xl md:text-4xl">
              Built for Trust &amp; Reliability
            </h2>
            <p className="text-muted-foreground mt-2 text-lg">
              Every feature designed to give you peace of mind on your wedding
              day
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRUST_FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card p-6 shadow-xs hover:border-primary/30 hover:shadow-sm transition-all duration-200"
                data-ocid={`trust.item.${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="size-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg">
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

      {/* ── CTA + Contact ────────────────────────────────────── */}
      <section className="bg-muted/30 border-t border-border/40 py-20">
        <div className="container">
          <motion.div
            className="rounded-2xl bg-primary/5 border border-primary/20 p-8 md:p-14 text-center shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-primary/10 text-primary border-primary/30 mb-4">
              Get Started Today
            </Badge>
            <h2 className="font-display font-bold text-3xl md:text-5xl mb-4">
              Make your wedding{" "}
              <span className="text-primary">unforgettable</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-lg leading-relaxed">
              Browse 50+ verified food stall vendors, compare packages, and book
              your perfect stalls in minutes.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              <Button
                size="lg"
                asChild
                data-ocid="cta.browse_button"
                className="shadow-md"
              >
                <Link
                  to="/browse"
                  search={{ category: undefined, search: undefined }}
                >
                  Start Browsing <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                data-ocid="cta.contact_button"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
            <Separator className="max-w-sm mx-auto mb-8 opacity-50" />
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
          </motion.div>
        </div>
      </section>
    </RootLayout>
  );
}

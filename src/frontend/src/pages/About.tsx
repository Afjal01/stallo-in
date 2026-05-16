import { RootLayout } from "@/components/layout/RootLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart, MapPin, Shield, Target } from "lucide-react";
import { motion } from "motion/react";

const STATS = [
  { number: "50+", label: "Verified Vendors" },
  { number: "1,000+", label: "Happy Weddings" },
  { number: "10+", label: "Food Categories" },
  { number: "4.8★", label: "Average Rating" },
];

const TEAM = [
  {
    name: "Arjun Singh",
    role: "Co-Founder & CEO",
    bio: "Wedding industry veteran with 10+ years in event management across Bihar.",
    initials: "AS",
  },
  {
    name: "Priya Kumari",
    role: "Co-Founder & Operations",
    bio: "Passionate about local food culture and helping vendors grow their businesses.",
    initials: "PK",
  },
  {
    name: "Rahul Verma",
    role: "Head of Vendor Relations",
    bio: "Building trust and quality standards between vendors and customers since 2024.",
    initials: "RV",
  },
];

const VALUES = [
  {
    icon: Shield,
    title: "Trust First",
    desc: "Every vendor is verified by our team before going live. We stake our reputation on every stall listed.",
  },
  {
    icon: Target,
    title: "Transparent Pricing",
    desc: "No hidden fees. No last-minute surprises. What you see before booking is what you pay.",
  },
  {
    icon: Heart,
    title: "Local First",
    desc: "We are proudly built in Nawada, Bihar. We believe in empowering local food vendors and celebrating local culture.",
  },
  {
    icon: MapPin,
    title: "Hyper-Local Focus",
    desc: "We start with Nawada and expand district by district, ensuring quality over quantity at every step.",
  },
];

export default function AboutPage() {
  return (
    <RootLayout>
      {/* Hero */}
      <section className="bg-card border-b border-border/40 py-16 md:py-24">
        <div className="container max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-4 text-primary border-primary/30"
            >
              Our Story
            </Badge>
            <h1 className="font-display font-bold text-5xl md:text-6xl mb-5 leading-tight">
              Built in Bihar, <span className="text-primary">For Bihar</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Stallo.in is the trusted premium platform for booking verified
              wedding food stalls. We connect families celebrating weddings with
              the best local food vendors — from classic chaat and golgappa to
              modern live cooking stations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-background py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="rounded-xl border border-border/60 bg-card p-6 text-center shadow-xs"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <p className="font-display font-bold text-4xl text-primary">
                  {stat.number}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-muted/30 border-y border-border/40 py-16">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-4 text-primary border-primary/30"
            >
              Our Mission
            </Badge>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-5">
              Bringing premium food experiences to every wedding in Bihar
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base mb-4">
              Founded in Nawada, Bihar in 2024, Stallo was built to bring
              transparency, reliability, and premium service quality to the
              local wedding food market. We saw families struggling to find
              reliable food vendors, and vendors struggling to reach customers
              beyond word of mouth.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base">
              Today, Stallo bridges that gap. Every vendor on our platform is
              manually verified with document checks, photo review, and a call
              verification before they can accept bookings. Our transparent
              pricing and smooth booking flow give families the confidence they
              deserve on their most important day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-background py-16">
        <div className="container">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-3 text-primary border-primary/30"
            >
              Our Values
            </Badge>
            <h2 className="font-display font-bold text-3xl md:text-4xl">
              What We Stand For
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                className="flex gap-4 rounded-xl border border-border/60 bg-card p-6 shadow-xs"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <v.icon className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-1">
                    {v.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-muted/30 border-y border-border/40 py-16">
        <div className="container">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-3 text-primary border-primary/30"
            >
              Our Team
            </Badge>
            <h2 className="font-display font-bold text-3xl md:text-4xl">
              The People Behind Stallo
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="text-center border-border/60 shadow-xs">
                  <CardContent className="p-6">
                    <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl mx-auto mb-3">
                      {member.initials}
                    </div>
                    <h3 className="font-display font-semibold text-lg">
                      {member.name}
                    </h3>
                    <p className="text-xs text-primary font-medium mb-2">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background py-16">
        <div className="container max-w-2xl text-center">
          <Separator className="mb-10 opacity-50" />
          <h2 className="font-display font-bold text-3xl mb-4">
            Ready to book your perfect stalls?
          </h2>
          <p className="text-muted-foreground mb-6">
            Browse 50+ verified vendors and start planning your wedding today.
          </p>
          <Button size="lg" asChild data-ocid="about.cta_button">
            <Link
              to="/browse"
              search={{ category: undefined, search: undefined }}
            >
              Browse Vendors <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </RootLayout>
  );
}

import { RootLayout } from "@/components/layout/RootLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "lucide-react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "stallo@example.com",
    href: "mailto:stallo@example.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Nawada, Bihar 805110, India",
    href: null,
  },
  {
    icon: Clock,
    label: "Support Hours",
    value: "Mon–Sat, 9:00 AM – 7:00 PM IST",
    href: null,
  },
];

const SOCIAL_LINKS = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
];

const SUBJECTS = [
  "General Inquiry",
  "Booking Help",
  "Vendor Onboarding",
  "Payment Issue",
  "Cancellation & Refund",
  "Technical Support",
  "Partnership",
];

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (_data: FormValues) => {
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Message sent!", {
      description: "We'll get back to you within 24 hours.",
    });
    reset();
  };

  return (
    <RootLayout>
      {/* Hero */}
      <section className="bg-card border-b border-border/60 relative overflow-hidden">
        {/* Gold glow decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="container py-16 max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-4 border border-primary/20">
              Support & Inquiries
            </span>
            <h1 className="font-display font-bold text-5xl md:text-6xl mb-4">
              Get in <span className="gold-gradient">Touch</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Have a question about a booking, a vendor, or our platform? Our
              team in Nawada is here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-background py-16">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Form — left/wider */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <Card className="glass-card shadow-gold">
                <CardContent className="p-8">
                  <h2 className="font-display font-semibold text-2xl mb-1">
                    Send Us a Message
                  </h2>
                  <p className="text-muted-foreground text-sm mb-7">
                    Fill out the form and we'll respond within one business day.
                  </p>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                    noValidate
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <Label htmlFor="c-name" className="text-foreground/80">
                          Full Name
                        </Label>
                        <Input
                          id="c-name"
                          placeholder="Rahul Sharma"
                          className="bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60"
                          {...register("name", {
                            required: "Name is required",
                          })}
                          data-ocid="contact.name.input"
                        />
                        {errors.name && (
                          <p
                            className="text-xs text-destructive"
                            data-ocid="contact.name.field_error"
                          >
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="c-email" className="text-foreground/80">
                          Email Address
                        </Label>
                        <Input
                          id="c-email"
                          type="email"
                          placeholder="rahul@example.com"
                          className="bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[^@]+@[^@]+\.[^@]+$/,
                              message: "Enter a valid email",
                            },
                          })}
                          data-ocid="contact.email.input"
                        />
                        {errors.email && (
                          <p
                            className="text-xs text-destructive"
                            data-ocid="contact.email.field_error"
                          >
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="c-subject" className="text-foreground/80">
                        Subject
                      </Label>
                      <select
                        id="c-subject"
                        className="flex h-10 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/60 transition-colors"
                        {...register("subject", {
                          required: "Please select a subject",
                        })}
                        data-ocid="contact.subject.select"
                      >
                        <option value="">Select a subject…</option>
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      {errors.subject && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="contact.subject.field_error"
                        >
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="c-message" className="text-foreground/80">
                        Message
                      </Label>
                      <Textarea
                        id="c-message"
                        rows={6}
                        placeholder="Describe your query in detail…"
                        className="resize-none bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60"
                        {...register("message", {
                          required: "Message is required",
                          minLength: {
                            value: 20,
                            message: "Please provide at least 20 characters",
                          },
                        })}
                        data-ocid="contact.message.textarea"
                      />
                      {errors.message && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="contact.message.field_error"
                        >
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gap-2 bg-primary text-primary-foreground shadow-gold hover:bg-primary/90"
                      disabled={isSubmitting}
                      data-ocid="contact.submit_button"
                    >
                      <Send className="size-4" />
                      {isSubmitting ? "Sending…" : "Send Message"}
                    </Button>

                    {/* WhatsApp CTA */}
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 transition-smooth py-2.5 text-sm font-medium"
                      data-ocid="contact.whatsapp_button"
                    >
                      <svg
                        className="size-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Chat on WhatsApp
                    </a>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              <div>
                <h2 className="font-display font-semibold text-2xl mb-5">
                  Contact Information
                </h2>
                <div className="space-y-3">
                  {CONTACT_INFO.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-4 p-4 rounded-xl glass-card hover-lift"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                        <item.icon className="size-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-primary/70 uppercase tracking-wider mb-0.5">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="font-medium text-sm hover:text-primary transition-colors break-all"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-medium text-sm">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="p-5 rounded-xl glass-card">
                <p className="text-xs font-semibold text-primary/70 uppercase tracking-wider mb-4">
                  Follow Us
                </p>
                <div className="flex items-center gap-3">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex size-10 items-center justify-center rounded-lg border border-primary/20 bg-background hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-smooth"
                      data-ocid="contact.social_link"
                    >
                      <s.icon className="size-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-xl border border-primary/20 bg-card/50 overflow-hidden h-36 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="size-6 text-primary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">
                    Nawada, Bihar, India
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </RootLayout>
  );
}

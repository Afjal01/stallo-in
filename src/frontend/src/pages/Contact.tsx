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
      <section className="bg-card border-b border-border/60">
        <div className="container py-16 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-4">
              Support & Inquiries
            </span>
            <h1 className="font-display font-bold text-5xl md:text-6xl mb-4">
              Get in <span className="text-primary">Touch</span>
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
              <Card className="border-border/60 shadow-sm">
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
                        <Label htmlFor="c-name">Full Name</Label>
                        <Input
                          id="c-name"
                          placeholder="Rahul Sharma"
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
                        <Label htmlFor="c-email">Email Address</Label>
                        <Input
                          id="c-email"
                          type="email"
                          placeholder="rahul@example.com"
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
                      <Label htmlFor="c-subject">Subject</Label>
                      <select
                        id="c-subject"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                      <Label htmlFor="c-message">Message</Label>
                      <Textarea
                        id="c-message"
                        rows={6}
                        placeholder="Describe your query in detail…"
                        className="resize-none"
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
                      className="w-full gap-2"
                      disabled={isSubmitting}
                      data-ocid="contact.submit_button"
                    >
                      <Send className="size-4" />
                      {isSubmitting ? "Sending…" : "Send Message"}
                    </Button>
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
                      className="flex items-start gap-4 p-4 rounded-xl border border-border/60 bg-card"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <item.icon className="size-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
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
              <div className="p-5 rounded-xl border border-border/60 bg-card">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
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
                      className="flex size-10 items-center justify-center rounded-lg border border-border/60 bg-background hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-smooth"
                      data-ocid="contact.social_link"
                    >
                      <s.icon className="size-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-xl border border-border/60 bg-muted/30 overflow-hidden h-36 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="size-6 text-muted-foreground mx-auto mb-1" />
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

import { RootLayout } from "@/components/layout/RootLayout";
import { motion } from "motion/react";

const SECTIONS = [
  {
    title: "1. Information We Collect",
    content: [
      "We collect information you provide directly to us when you create an account, make a booking, register as a vendor, or contact us for support. This includes your name, email address, phone number, and event details such as date, venue, and guest count.",
      "When you make a payment through the Platform, Stripe collects your payment card information directly. Stallo.in only receives a transaction confirmation and a masked card summary — we never see or store your full card details.",
      "We automatically collect certain technical information when you use the Platform, including your IP address, browser type, device identifiers, pages visited, and actions taken. This data is used to improve the Platform, diagnose technical issues, and detect fraudulent activity.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "We use the information we collect to operate, maintain, and improve the Platform; to process and fulfil bookings; to communicate with you about your bookings, account, and promotional offers; and to personalise your experience.",
      "We may use your contact information to send transactional emails such as booking confirmations, payment receipts, status updates, and cancellation notices. These communications are essential to the service and cannot be opted out of while you have an active booking.",
      "We use aggregated and anonymised data to analyse platform trends, understand user behaviour, and make product improvements. This data cannot be used to identify individual users and is not shared with third parties in identifiable form.",
    ],
  },
  {
    title: "3. Information Sharing",
    content: [
      "We share your name, contact number, and event details with the vendor you book, solely for the purpose of fulfilling your booking. Vendors are contractually obligated to keep this information confidential and not use it for any purpose other than service delivery.",
      "We do not sell, rent, or lease your personal information to third parties for marketing purposes. We may share information with trusted service providers who assist us in operating the Platform, including payment processors, email service providers, and analytics tools — all under strict confidentiality agreements.",
      "We may disclose your information if required by law, court order, or governmental authority, or if we believe in good faith that such disclosure is necessary to protect the rights, property, or safety of Stallo.in, our users, or the public.",
    ],
  },
  {
    title: "4. Data Security",
    content: [
      "We implement industry-standard technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. This includes HTTPS encryption for all data in transit and secure data storage on the Internet Computer blockchain.",
      "While we strive to protect your personal information, no method of transmission over the internet or method of electronic storage is 100% secure. We cannot guarantee absolute security, and you provide your information at your own risk.",
      "In the event of a data breach that may affect your rights and freedoms, we will notify affected users within 72 hours of becoming aware of the breach, in accordance with applicable data protection laws.",
    ],
  },
  {
    title: "5. Cookies & Tracking",
    content: [
      "Stallo.in uses cookies and similar tracking technologies to enhance your experience on the Platform. These include essential cookies (required for the Platform to function), analytics cookies (to understand how users interact with the Platform), and preference cookies (to remember your settings).",
      "You can control cookie settings through your browser preferences. Disabling cookies may affect some features of the Platform, particularly authentication and session management. We do not use cookies for advertising or cross-site tracking.",
      "We use Plausible Analytics, a privacy-focused analytics tool that does not use cookies and does not collect personally identifiable information. Aggregated, anonymised usage statistics help us improve the Platform.",
    ],
  },
  {
    title: "6. Third-Party Services",
    content: [
      "We use Stripe for payment processing. When you make a payment, you are subject to Stripe's Privacy Policy. We encourage you to review Stripe's privacy practices before submitting payment information.",
      "Our Platform may contain links to third-party websites or services, including vendor websites and social media platforms. We are not responsible for the privacy practices of these third parties and encourage you to read their privacy policies.",
      "We use Resend for transactional email delivery. Email content is transmitted securely and is not used by Resend for any purpose other than message delivery. Email logs are retained for 30 days for debugging purposes.",
    ],
  },
  {
    title: "7. Your Rights",
    content: [
      "You have the right to access the personal information we hold about you. You may request a copy of your data by contacting us at privacy@stallo.in. We will respond to access requests within 30 days.",
      "You have the right to request correction of inaccurate or incomplete information. You can update most information directly through your account profile. For information that cannot be self-edited, contact our support team.",
      "You have the right to request deletion of your personal information, subject to our legal obligations to retain certain records. To request account deletion and data erasure, contact us at privacy@stallo.in. Active booking data may be retained for up to 7 years for legal and accounting purposes.",
    ],
  },
  {
    title: "8. Children's Privacy",
    content: [
      "Stallo.in is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from minors. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.",
      "If we discover that we have inadvertently collected personal information from a minor, we will promptly delete such information from our records and terminate the associated account.",
    ],
  },
  {
    title: "9. Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or Platform features. We will notify you of material changes by posting the updated policy on this page and sending an email to registered users.",
      "Your continued use of the Platform after the effective date of any changes constitutes your acceptance of the updated Privacy Policy. We encourage you to review this page periodically.",
    ],
  },
  {
    title: "10. Contact Us",
    content: [
      "If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Data Privacy Team at privacy@stallo.in.",
      "You may also write to us at: Data Privacy Officer, Stallo.in, Nawada, Bihar 805110, India. We aim to respond to all privacy inquiries within 5 business days.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <RootLayout>
      {/* Hero */}
      <section className="bg-card border-b border-border/60">
        <div className="container py-14 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-4">
              Legal
            </span>
            <h1 className="font-display font-bold text-5xl mb-3">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-base">
              Effective Date: <strong>January 1, 2024</strong>
            </p>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Your privacy matters to us. This policy explains what data we
              collect, why we collect it, and how we keep it safe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-background py-16">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* TOC */}
            <aside className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-6 space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Sections
                </p>
                {SECTIONS.map((s) => (
                  <a
                    key={s.title}
                    href={`#priv-${s.title.split(".")[0].replace(" ", "")}`}
                    className="block text-xs text-muted-foreground hover:text-foreground transition-colors py-1 leading-snug"
                  >
                    {s.title}
                  </a>
                ))}
              </div>
            </aside>
            <div className="lg:col-span-3 space-y-10">
              {SECTIONS.map((section, i) => (
                <motion.div
                  key={section.title}
                  id={`priv-${section.title.split(".")[0].replace(" ", "")}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className="scroll-mt-6"
                >
                  <h2 className="font-display font-semibold text-xl mb-4 text-foreground">
                    {section.title}
                  </h2>
                  <div className="space-y-3">
                    {section.content.map((para, j) => (
                      <p
                        key={`${section.title}-${j}`}
                        className="text-sm text-muted-foreground leading-relaxed"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                  {i < SECTIONS.length - 1 && (
                    <div className="mt-8 border-b border-border/40" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </RootLayout>
  );
}

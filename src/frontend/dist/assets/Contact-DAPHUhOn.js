import { j as jsxRuntimeExports, h as ue } from "./index-DIzWvAoP.js";
import { R as RootLayout } from "./RootLayout-58N_cMmF.js";
import { c as createLucideIcon, B as Button } from "./useAuth-Bhs8pioH.js";
import { C as Card, a as CardContent } from "./card-BK5KlsOo.js";
import { I as Input } from "./input-DyqEZl5Y.js";
import { L as Label } from "./label-DRvcCxqI.js";
import { T as Textarea } from "./textarea-BMWen7_k.js";
import { u as useForm } from "./index.esm-Cn19gDw4.js";
import { m as motion } from "./proxy-DxhnKv7e.js";
import { M as Mail } from "./mail-BpmRirr0.js";
import { P as Phone } from "./phone-DwtpoaGc.js";
import { M as MapPin } from "./map-pin-Clah7rAK.js";
import { C as Clock } from "./clock-BmE9tPrM.js";
import "./sheet-BeMLdLfo.js";
import "./separator-DrDgD32O.js";
import "./index-C8VI1ok0.js";
import "./log-in-BiYDoRg7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", key: "1jg4f8" }
  ]
];
const Facebook = createLucideIcon("facebook", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "2e1cvw" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "9exkf1" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "r4j83e" }]
];
const Instagram = createLucideIcon("instagram", __iconNode$2);
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
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode$1);
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
      d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
      key: "pff0z6"
    }
  ]
];
const Twitter = createLucideIcon("twitter", __iconNode);
const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "stallo@example.com",
    href: "mailto:stallo@example.com"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210"
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Nawada, Bihar 805110, India",
    href: null
  },
  {
    icon: Clock,
    label: "Support Hours",
    value: "Mon–Sat, 9:00 AM – 7:00 PM IST",
    href: null
  }
];
const SOCIAL_LINKS = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" }
];
const SUBJECTS = [
  "General Inquiry",
  "Booking Help",
  "Vendor Onboarding",
  "Payment Issue",
  "Cancellation & Refund",
  "Technical Support",
  "Partnership"
];
function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();
  const onSubmit = async (_data) => {
    await new Promise((r) => setTimeout(r, 600));
    ue.success("Message sent!", {
      description: "We'll get back to you within 24 hours."
    });
    reset();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(RootLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container py-16 max-w-4xl text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-4", children: "Support & Inquiries" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-5xl md:text-6xl mb-4", children: [
            "Get in ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Touch" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto", children: "Have a question about a booking, a vendor, or our platform? Our team in Nawada is here to help." })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-5xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, delay: 0.1 },
          className: "lg:col-span-3",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border/60 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-2xl mb-1", children: "Send Us a Message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-7", children: "Fill out the form and we'll respond within one business day." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSubmit(onSubmit),
                className: "space-y-5",
                noValidate: true,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "c-name", children: "Full Name" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "c-name",
                          placeholder: "Rahul Sharma",
                          ...register("name", {
                            required: "Name is required"
                          }),
                          "data-ocid": "contact.name.input"
                        }
                      ),
                      errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-destructive",
                          "data-ocid": "contact.name.field_error",
                          children: errors.name.message
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "c-email", children: "Email Address" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "c-email",
                          type: "email",
                          placeholder: "rahul@example.com",
                          ...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[^@]+@[^@]+\.[^@]+$/,
                              message: "Enter a valid email"
                            }
                          }),
                          "data-ocid": "contact.email.input"
                        }
                      ),
                      errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-destructive",
                          "data-ocid": "contact.email.field_error",
                          children: errors.email.message
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "c-subject", children: "Subject" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        id: "c-subject",
                        className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        ...register("subject", {
                          required: "Please select a subject"
                        }),
                        "data-ocid": "contact.subject.select",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select a subject…" }),
                          SUBJECTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
                        ]
                      }
                    ),
                    errors.subject && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs text-destructive",
                        "data-ocid": "contact.subject.field_error",
                        children: errors.subject.message
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "c-message", children: "Message" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        id: "c-message",
                        rows: 6,
                        placeholder: "Describe your query in detail…",
                        className: "resize-none",
                        ...register("message", {
                          required: "Message is required",
                          minLength: {
                            value: 20,
                            message: "Please provide at least 20 characters"
                          }
                        }),
                        "data-ocid": "contact.message.textarea"
                      }
                    ),
                    errors.message && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs text-destructive",
                        "data-ocid": "contact.message.field_error",
                        children: errors.message.message
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "submit",
                      size: "lg",
                      className: "w-full gap-2",
                      disabled: isSubmitting,
                      "data-ocid": "contact.submit_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4" }),
                        isSubmitting ? "Sending…" : "Send Message"
                      ]
                    }
                  )
                ]
              }
            )
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, delay: 0.2 },
          className: "lg:col-span-2 space-y-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-2xl mb-5", children: "Contact Information" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: CONTACT_INFO.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-start gap-4 p-4 rounded-xl border border-border/60 bg-card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "size-4 text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5", children: item.label }),
                      item.href ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "a",
                        {
                          href: item.href,
                          className: "font-medium text-sm hover:text-primary transition-colors break-all",
                          children: item.value
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: item.value })
                    ] })
                  ]
                },
                item.label
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-xl border border-border/60 bg-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4", children: "Follow Us" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: SOCIAL_LINKS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: s.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": s.label,
                  className: "flex size-10 items-center justify-center rounded-lg border border-border/60 bg-background hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-smooth",
                  "data-ocid": "contact.social_link",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "size-4" })
                },
                s.label
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border/60 bg-muted/30 overflow-hidden h-36 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-6 text-muted-foreground mx-auto mb-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Nawada, Bihar, India" })
            ] }) })
          ]
        }
      )
    ] }) }) })
  ] });
}
export {
  ContactPage as default
};

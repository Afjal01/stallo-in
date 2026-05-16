import { R as React, b as useParams, r as reactExports, j as jsxRuntimeExports, L as Link, S as Skeleton, f as formatDate, c as formatPrice, d as cn, e as calculateCancellationFee, g as dateToTimestamp, h as ue } from "./index-DIzWvAoP.js";
import { P as PackageCard } from "./PackageCard-CSkTrJI-.js";
import { R as RootLayout } from "./RootLayout-58N_cMmF.js";
import { B as Badge } from "./sheet-BeMLdLfo.js";
import { c as createLucideIcon, B as Button } from "./useAuth-Bhs8pioH.js";
import { I as Input } from "./input-DyqEZl5Y.js";
import { L as Label } from "./label-DRvcCxqI.js";
import { S as Separator } from "./separator-DrDgD32O.js";
import { T as Textarea } from "./textarea-BMWen7_k.js";
import { a as useVendor, b as useVendorPackages, d as useCreateBooking, e as useCreateCheckoutSession } from "./useBackend-CUhkj_B6.js";
import { C as Check } from "./check-BMuas-wb.js";
import { A as ArrowLeft } from "./arrow-left-CKYr6rae.js";
import { C as CreditCard } from "./credit-card-5hiZauoO.js";
import { T as TriangleAlert } from "./triangle-alert-DqppkAyN.js";
import { A as ArrowRight } from "./arrow-right-BOHxw3XF.js";
import "./card-BK5KlsOo.js";
import "./users-pxzxJLV8.js";
import "./truck-CBbR9TLV.js";
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
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
const Wallet = createLucideIcon("wallet", __iconNode);
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState2;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState2 = state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
const identity = (arg) => arg;
function useStore(api, selector = identity) {
  const slice = React.useSyncExternalStore(
    api.subscribe,
    React.useCallback(() => selector(api.getState()), [api, selector]),
    React.useCallback(() => selector(api.getInitialState()), [api, selector])
  );
  React.useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
const initialState = {
  step: 1,
  selectedVendor: null,
  selectedPackage: null,
  eventDate: null,
  eventVenue: "",
  guestCount: 100,
  notes: "",
  paymentMethod: "advance",
  checkoutUrl: null,
  bookingId: null
};
const useBookingStore = create(
  (set, get) => ({
    ...initialState,
    setStep: (step) => set({ step }),
    nextStep: () => {
      const current = get().step;
      if (current < 5) set({ step: current + 1 });
    },
    prevStep: () => {
      const current = get().step;
      if (current > 1) set({ step: current - 1 });
    },
    setVendor: (vendor) => set({ selectedVendor: vendor }),
    setPackage: (pkg) => set({ selectedPackage: pkg }),
    setEventDate: (date) => set({ eventDate: date }),
    setEventVenue: (venue) => set({ eventVenue: venue }),
    setGuestCount: (count) => set({ guestCount: count }),
    setNotes: (notes) => set({ notes }),
    setPaymentMethod: (method) => set({ paymentMethod: method }),
    setCheckoutUrl: (url) => set({ checkoutUrl: url }),
    setBookingId: (id) => set({ bookingId: id }),
    reset: () => set(initialState),
    // These are stubs — actual data loading happens in the page components
    initFromVendorId: (_vendorId) => {
    },
    initFromPackageId: (_packageId) => {
    }
  })
);
const STEPS = [
  { id: 1, label: "Package" },
  { id: 2, label: "Date & Venue" },
  { id: 3, label: "Guests" },
  { id: 4, label: "Review" },
  { id: 5, label: "Payment" }
];
function StepProgress({ currentStep }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0 mb-8", "data-ocid": "booking.stepper", children: STEPS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-colors",
          currentStep === s.id ? "bg-primary text-primary-foreground shadow-sm" : currentStep > s.id ? "bg-secondary/20 text-secondary" : "bg-muted text-muted-foreground"
        ),
        children: [
          currentStep > s.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s.id }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: s.label })
        ]
      }
    ),
    i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border mx-1" })
  ] }, s.id)) });
}
function BookingPage() {
  const { vendorId } = useParams({ from: "/book/$vendorId" });
  const sessionId = new URLSearchParams(window.location.search).get("session_id") ?? void 0;
  const { data: vendor } = useVendor(vendorId);
  const { data: packages = [], isLoading } = useVendorPackages(vendorId);
  const store = useBookingStore();
  const createBooking = useCreateBooking();
  const createCheckout = useCreateCheckoutSession();
  const activePackages = packages.filter((p) => p.isActive);
  reactExports.useEffect(() => {
    store.reset();
  }, []);
  const canProceed = () => {
    if (store.step === 1) return !!store.selectedPackage;
    if (store.step === 2)
      return !!store.eventDate && store.eventVenue.trim().length > 0;
    if (store.step === 3) return store.guestCount > 0;
    if (store.step === 4) return true;
    return false;
  };
  const totalPrice = store.selectedPackage ? Number(store.selectedPackage.price) + Number(store.selectedPackage.setupCharge) + Number(store.selectedPackage.travelCharge) : 0;
  const advanceAmount = store.paymentMethod === "advance" ? Math.round(totalPrice * 0.3) : totalPrice;
  const handleSubmitBooking = async () => {
    if (!store.selectedPackage || !store.eventDate || !vendor) return;
    try {
      const booking = await createBooking.mutateAsync({
        vendorId: vendor.id,
        packageId: store.selectedPackage.id,
        eventDate: dateToTimestamp(store.eventDate),
        eventVenue: store.eventVenue,
        guestCount: BigInt(store.guestCount),
        notes: store.notes || void 0
      });
      store.setBookingId(booking.id);
      const payLabel = store.paymentMethod === "advance" ? "30% Advance" : "Full Payment";
      const url = await createCheckout.mutateAsync({
        items: [
          {
            productName: `${vendor.businessName} — ${store.selectedPackage.name}`,
            productDescription: `Wedding food stall booking (${payLabel}) for ${store.eventDate.toLocaleDateString("en-IN")}`,
            quantity: BigInt(1),
            priceInCents: BigInt(advanceAmount),
            currency: "inr"
          }
        ],
        successUrl: `${window.location.origin}/dashboard/bookings`,
        cancelUrl: `${window.location.origin}/book/${vendorId}`
      });
      store.setCheckoutUrl(url);
      store.nextStep();
    } catch {
      ue.error("Failed to create booking. Please try again.");
    }
  };
  if (sessionId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(RootLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-20 max-w-lg text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-20 items-center justify-center rounded-full bg-secondary/20 mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-10 text-secondary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl mb-3", children: "Booking Confirmed! 🎉" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Your payment was successful. The vendor will confirm your booking within 24 hours." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-card p-5 text-left space-y-2 mb-8 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-base mb-3", children: "What's next?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "📧 Booking confirmation sent to your email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "📞 Vendor will call to confirm details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "🎊 Enjoy your wedding celebration!" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", "data-ocid": "booking.go_to_dashboard.button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/bookings", children: "View My Bookings" }) })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RootLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-8 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", asChild: true, className: "mb-4 -ml-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/stall/$vendorId", params: { vendorId }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4 mr-1" }),
      "Back to Stall"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StepProgress, { currentStep: store.step }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-card p-6 shadow-sm", children: [
      store.step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-2xl", children: "Choose a Package" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: vendor ? `Packages offered by ${vendor.businessName}` : "Select the package that fits your needs" })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-xl" }, i)) }) : activePackages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No packages available for this vendor yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: activePackages.map((pkg, i) => {
          var _a;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            PackageCard,
            {
              pkg,
              index: i,
              isSelected: ((_a = store.selectedPackage) == null ? void 0 : _a.id) === pkg.id,
              onSelect: (p) => store.setPackage(p)
            },
            pkg.id
          );
        }) })
      ] }),
      store.step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-2xl", children: "Date & Venue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "When and where is your event?" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "event-date", children: "Event Date *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "event-date",
              type: "date",
              value: store.eventDate ? store.eventDate.toISOString().slice(0, 10) : "",
              onChange: (e) => store.setEventDate(
                e.target.value ? new Date(e.target.value) : null
              ),
              min: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
              className: "mt-1",
              "data-ocid": "booking.event_date.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "venue", children: "Venue Address *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "venue",
              placeholder: "Enter your wedding venue address...",
              value: store.eventVenue,
              onChange: (e) => store.setEventVenue(e.target.value),
              className: "mt-1 resize-none",
              rows: 3,
              "data-ocid": "booking.venue.textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "notes", children: "Additional Notes (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "notes",
              placeholder: "Any special requests or instructions for the vendor...",
              value: store.notes,
              onChange: (e) => store.setNotes(e.target.value),
              className: "mt-1 resize-none",
              rows: 2,
              "data-ocid": "booking.notes.textarea"
            }
          )
        ] })
      ] }),
      store.step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-2xl", children: "Guest Count" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "How many guests are expected?" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "guest-count", children: "Number of Guests *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "guest-count",
              type: "number",
              min: store.selectedPackage ? Number(store.selectedPackage.guestMin) : 1,
              max: store.selectedPackage ? Number(store.selectedPackage.guestMax) : 9999,
              value: store.guestCount,
              onChange: (e) => store.setGuestCount(
                Number.parseInt(e.target.value, 10) || 0
              ),
              className: "mt-1 text-lg h-12",
              "data-ocid": "booking.guest_count.input"
            }
          )
        ] }),
        store.selectedPackage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/40 p-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
            "Package capacity: ",
            Number(store.selectedPackage.guestMin),
            "–",
            Number(store.selectedPackage.guestMax),
            " guests"
          ] }),
          store.guestCount > Number(store.selectedPackage.guestMax) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs mt-1", children: "⚠ Guest count exceeds package maximum" })
        ] })
      ] }),
      store.step === 4 && store.selectedPackage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-2xl", children: "Review & Confirm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Verify your booking details before payment" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border/60 p-4 space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-xs text-muted-foreground uppercase tracking-wide", children: "Booking Summary" }),
          [
            ["Vendor", (vendor == null ? void 0 : vendor.businessName) ?? "—"],
            ["Package", store.selectedPackage.name],
            [
              "Event Date",
              store.eventDate ? formatDate(store.eventDate.getTime()) : "—"
            ],
            ["Venue", store.eventVenue],
            ["Guests", `${store.guestCount} guests`]
          ].map(([label, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-right max-w-xs truncate", children: value })
          ] }, label))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-card border border-border/60 p-4 space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-xs text-muted-foreground uppercase tracking-wide", children: "Price Breakdown" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Base price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(store.selectedPackage.price) })
          ] }),
          Number(store.selectedPackage.setupCharge) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Setup charge" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(store.selectedPackage.setupCharge) })
          ] }),
          Number(store.selectedPackage.travelCharge) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Travel charge" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(store.selectedPackage.travelCharge) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold text-base", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: formatPrice(totalPrice) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold mb-3", children: "Payment Method" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            {
              method: "advance",
              label: "50% Advance",
              sub: `Pay ${formatPrice(Math.round(totalPrice * 0.3))} now`,
              icon: Wallet
            },
            {
              method: "full",
              label: "Pay in Full",
              sub: `Pay ${formatPrice(totalPrice)} now`,
              icon: CreditCard
            }
          ].map(({ method, label, sub, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => store.setPaymentMethod(method),
              className: cn(
                "flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-colors",
                store.paymentMethod === method ? "border-primary bg-primary/5" : "border-border hover:border-border/80"
              ),
              "data-ocid": `booking.payment_method.${method}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Icon,
                  {
                    className: cn(
                      "size-5 shrink-0",
                      store.paymentMethod === method ? "text-primary" : "text-muted-foreground"
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: sub })
                ] }),
                store.paymentMethod === method && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-4 text-primary ml-auto" })
              ]
            },
            method
          )) })
        ] }),
        store.eventDate && (() => {
          const fee = calculateCancellationFee(
            store.eventDate.getTime(),
            totalPrice
          );
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800/30 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-4 text-amber-600 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-amber-800 dark:text-amber-300 mb-1", children: "Cancellation Policy" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-amber-700 dark:text-amber-400", children: "If you cancel within 7 days of the event, a fee of up to 50% applies." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-amber-700 dark:text-amber-400 mt-1", children: [
                "Current: ",
                fee.daysToEvent,
                " day",
                fee.daysToEvent !== 1 ? "s" : "",
                " away —",
                " ",
                fee.feePercent,
                "% fee if cancelled today"
              ] })
            ] })
          ] }) });
        })(),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-muted/30 p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "You will be redirected to Stripe to complete the payment securely." }) })
      ] }),
      store.step === 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-16 items-center justify-center rounded-full bg-secondary/20 mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "size-7 text-secondary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-2xl", children: "Complete Payment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Your booking is reserved. Complete payment to confirm." })
        ] }),
        store.selectedPackage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border/60 bg-muted/30 p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "mb-2 text-xs", children: store.selectedPackage.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-lg", children: vendor == null ? void 0 : vendor.businessName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
              store.eventDate ? formatDate(store.eventDate.getTime()) : "",
              store.eventVenue && ` · ${store.eventVenue.slice(0, 40)}${store.eventVenue.length > 40 ? "..." : ""}`
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: store.paymentMethod === "advance" ? "Advance (30%)" : "Full amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl text-primary", children: formatPrice(advanceAmount) })
          ] })
        ] }) }),
        store.checkoutUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              size: "lg",
              className: "w-full",
              "data-ocid": "booking.pay_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: store.checkoutUrl, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "size-4 mr-2" }),
                "Pay Now via Stripe"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground", children: "🔒 Secured by Stripe — your payment details are never stored" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-center py-4",
            "data-ocid": "booking.payment.loading_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-lg" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "link",
            size: "sm",
            asChild: true,
            className: "text-muted-foreground",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/bookings", children: "View my bookings instead" })
          }
        ) })
      ] }),
      store.step < 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-6 pt-4 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => store.step > 1 ? store.prevStep() : void 0,
            disabled: store.step === 1,
            asChild: store.step === 1,
            "data-ocid": "booking.prev_button",
            children: store.step === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/stall/$vendorId", params: { vendorId }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4 mr-1" }),
              "Back"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4 mr-1 inline" }),
              "Back"
            ] })
          }
        ),
        store.step < 4 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: store.nextStep,
            disabled: !canProceed(),
            "data-ocid": "booking.next_button",
            children: [
              "Next ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4 ml-1" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: handleSubmitBooking,
            disabled: createBooking.isPending || createCheckout.isPending,
            "data-ocid": "booking.submit_button",
            children: createBooking.isPending || createCheckout.isPending ? "Processing..." : "Proceed to Payment"
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  BookingPage as default
};

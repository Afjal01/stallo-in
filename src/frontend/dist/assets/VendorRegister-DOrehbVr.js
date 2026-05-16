import { r as reactExports, j as jsxRuntimeExports, d as cn, h as ue } from "./index-BKL2lxtv.js";
import { R as RootLayout } from "./RootLayout-CQsg0YUW.js";
import { c as createLucideIcon, b as useComposedRefs, C as ChefHat, B as Button } from "./useAuth-IAGlSf5h.js";
import { C as Card, a as CardContent } from "./card-BTgr7EEz.js";
import { P as Presence, a as Primitive, u as useControllableState, c as composeEventHandlers, b as createContextScope } from "./sheet-DdO1tWzN.js";
import { u as usePrevious, a as useSize } from "./index-hE9AgaEV.js";
import { C as Check } from "./check-hrLNaFSe.js";
import { I as Input } from "./input-wyOQctPS.js";
import { L as Label } from "./label-DYAxIx3c.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-6JdgOsio.js";
import { S as Separator } from "./separator-DcZXF9iz.js";
import { T as Textarea } from "./textarea-D-AlXnVk.js";
import { f as useCreateVendorProfile } from "./useBackend-B1f4NLLV.js";
import { u as useForm } from "./index.esm-BBs13Liq.js";
import { C as CircleCheck } from "./circle-check-B67wFSiq.js";
import { S as ShieldCheck } from "./shield-check-VRt3INtw.js";
import { T as TrendingUp } from "./trending-up-OZEtAFop.js";
import { S as Star } from "./star-7jLtUNX7.js";
import { B as Building2 } from "./building-2-Crmyd6ft.js";
import { F as FileText } from "./file-text-DjVaf2HB.js";
import { C as ChevronRight } from "./chevron-right-BA5A7Oyr.js";
import "./log-in-Lp5PKdYh.js";
import "./index-Dsok7sFO.js";
import "./index-IXOTxK3N.js";
import "./index-BjDY_mxd.js";
import "./index-BEBufsG6.js";
import "./chevron-down-Ds0owe7i.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8", key: "n7qcjb" }],
  [
    "path",
    { d: "M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7", key: "d0u48b" }
  ],
  ["path", { d: "m2.1 21.8 6.4-6.3", key: "yn04lh" }],
  ["path", { d: "m19 5-7 7", key: "194lzd" }]
];
const UtensilsCrossed = createLucideIcon("utensils-crossed", __iconNode);
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  );
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = reactExports.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form = control == null ? void 0 : control.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener("reset", reset);
        return () => form.removeEventListener("reset", reset);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }
);
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = reactExports.forwardRef(
  ({ __scopeCheckbox, ...props }, forwardedRef) => {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const bubbles = !hasConsumerStoppedPropagationRef.current;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
      }
    }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
    const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
const CATEGORIES = [
  "Chaat & Golgappa",
  "Chowmein & Pasta",
  "Dosa & Snacks",
  "Ice Cream & Desserts",
  "Tea & Coffee",
  "Mocktails & Juices",
  "Popcorn & Snacks",
  "Interactive Stations",
  "Biryani & Rice",
  "Kebabs & Grills"
];
const STEPS = [
  { id: 1, label: "Business Info", icon: Building2 },
  { id: 2, label: "Stall Details", icon: UtensilsCrossed },
  { id: 3, label: "Agreement", icon: FileText }
];
const TRUST_SIGNALS = [
  { icon: ShieldCheck, text: "Admin-verified before going live" },
  { icon: TrendingUp, text: "Reach thousands of wedding clients" },
  { icon: Star, text: "Build your reputation with reviews" }
];
function VendorRegisterPage() {
  const [step, setStep] = reactExports.useState(1);
  const [category, setCategory] = reactExports.useState("");
  const [agreed, setAgreed] = reactExports.useState(false);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm({ mode: "onBlur" });
  const createVendor = useCreateVendorProfile();
  const nextStep = async () => {
    const fieldsStep1 = [
      "businessName",
      "ownerName",
      "email",
      "phone",
      "serviceArea"
    ];
    const fieldsStep2 = [
      "description",
      "packageName",
      "packagePrice",
      "guestMin",
      "guestMax"
    ];
    if (step === 1) {
      if (!category) {
        ue.error("Please select a category");
        return;
      }
      const ok = await trigger(fieldsStep1);
      if (ok) setStep(2);
    } else if (step === 2) {
      const ok = await trigger(fieldsStep2);
      if (ok) setStep(3);
    }
  };
  const onSubmit = async (data) => {
    if (!agreed) {
      ue.error("Please accept the agreement");
      return;
    }
    if (!category) {
      ue.error("Please select a category");
      return;
    }
    try {
      await createVendor.mutateAsync({
        businessName: data.businessName,
        ownerName: data.ownerName,
        email: data.email,
        phone: data.phone,
        category,
        serviceArea: data.serviceArea,
        description: data.description,
        photos: []
      });
      localStorage.setItem("stallo_vendor_mode", "true");
      setSubmitted(true);
    } catch {
      ue.error("Registration failed. Please try again.");
    }
  };
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(RootLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-20 max-w-lg text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-24 items-center justify-center rounded-full bg-primary/15 border border-primary/30 mx-auto mb-6 shadow-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-12 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl mb-3 gold-gradient", children: "Application Submitted!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Your vendor application has been received. Our team will review your details and get back to you within 1–3 business days." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-xl p-5 text-left space-y-3 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-primary", children: "What happens next?" }),
        [
          "📧 You'll receive a confirmation email shortly",
          "🔍 Admin team reviews your application (1–3 days)",
          "✅ Once approved, your stall goes live on Stallo.in",
          "💰 Start receiving bookings from wedding clients"
        ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: s }, s))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "text-primary text-sm font-medium hover:underline",
          children: "Return to Home"
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(RootLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-14 max-w-2xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-16 items-center justify-center rounded-2xl bg-primary/15 border border-primary/30 shadow-gold mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "size-8 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-4xl md:text-5xl mb-3 gold-gradient", children: "Become a Stallo Vendor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg", children: "Join Stallo.in and reach thousands of wedding clients. Admin verification required." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-5 mt-6", children: TRUST_SIGNALS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-2 text-sm text-muted-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(t.icon, { className: "size-4 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t.text })
          ]
        },
        t.text
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-12 max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0 mb-8", children: STEPS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              step === s.id ? "bg-primary text-primary-foreground shadow-gold" : step > s.id ? "bg-primary/20 text-primary border border-primary/30" : "bg-card text-muted-foreground border border-border/50"
            ),
            "data-ocid": `vendor_register.step.${s.id}`,
            children: [
              step > s.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-3.5 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "size-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: s.label })
            ]
          }
        ),
        i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "flex-1 h-px mx-1",
              step > s.id ? "bg-primary/50" : "bg-border/40"
            )
          }
        )
      ] }, s.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glass-card shadow-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [
        step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-xl gold-gradient", children: "Business Information" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Tell us about your stall business" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "businessName",
                  className: "text-foreground/80",
                  children: "Business Name *"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "businessName",
                  className: "mt-1 bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60",
                  placeholder: "e.g. Sharma Chaat Corner",
                  ...register("businessName", {
                    required: "Required"
                  }),
                  "data-ocid": "vendor_register.business_name.input"
                }
              ),
              errors.businessName && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive mt-1",
                  "data-ocid": "vendor_register.business_name.field_error",
                  children: errors.businessName.message
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "ownerName",
                  className: "text-foreground/80",
                  children: "Owner Name *"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "ownerName",
                  className: "mt-1 bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60",
                  placeholder: "Full name",
                  ...register("ownerName", { required: "Required" }),
                  "data-ocid": "vendor_register.owner_name.input"
                }
              ),
              errors.ownerName && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive mt-1",
                  "data-ocid": "vendor_register.owner_name.field_error",
                  children: errors.ownerName.message
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", className: "text-foreground/80", children: "Email *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "email",
                  type: "email",
                  className: "mt-1 bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60",
                  placeholder: "you@example.com",
                  ...register("email", { required: "Required" }),
                  "data-ocid": "vendor_register.email.input"
                }
              ),
              errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive mt-1",
                  "data-ocid": "vendor_register.email.field_error",
                  children: errors.email.message
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", className: "text-foreground/80", children: "Phone *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "phone",
                  className: "mt-1 bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60",
                  placeholder: "+91 9876543210",
                  ...register("phone", { required: "Required" }),
                  "data-ocid": "vendor_register.phone.input"
                }
              ),
              errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive mt-1",
                  "data-ocid": "vendor_register.phone.field_error",
                  children: errors.phone.message
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-foreground/80", children: "Stall Category *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: category, onValueChange: setCategory, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "mt-1 bg-background border-border/60 focus:ring-primary/50",
                  "data-ocid": "vendor_register.category.select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select stall category" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-card border-border/60", children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "serviceArea",
                className: "text-foreground/80",
                children: "Service Area *"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "serviceArea",
                className: "mt-1 bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60",
                placeholder: "e.g. Nawada, Bihar",
                ...register("serviceArea", { required: "Required" }),
                "data-ocid": "vendor_register.service_area.input"
              }
            ),
            errors.serviceArea && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive mt-1",
                "data-ocid": "vendor_register.service_area.field_error",
                children: errors.serviceArea.message
              }
            )
          ] })
        ] }),
        step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-xl gold-gradient", children: "Stall Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Describe your stall and initial package" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "description",
                className: "text-foreground/80",
                children: "Stall Description *"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "description",
                placeholder: "Describe your stall, specialties, years of experience, and what makes you special...",
                rows: 4,
                className: "mt-1 resize-none bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60",
                ...register("description", { required: "Required" }),
                "data-ocid": "vendor_register.description.textarea"
              }
            ),
            errors.description && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive mt-1",
                "data-ocid": "vendor_register.description.field_error",
                children: errors.description.message
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-primary/20 bg-card/50 p-4 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-primary", children: "✦ Initial Package" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "packageName",
                    className: "text-foreground/80",
                    children: "Package Name *"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "packageName",
                    className: "mt-1 bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60",
                    placeholder: "e.g. Standard Wedding Package",
                    ...register("packageName", {
                      required: "Required"
                    }),
                    "data-ocid": "vendor_register.package_name.input"
                  }
                ),
                errors.packageName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: errors.packageName.message })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "packagePrice",
                    className: "text-foreground/80",
                    children: "Price (₹) *"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "packagePrice",
                    type: "number",
                    className: "mt-1 bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60",
                    placeholder: "e.g. 15000",
                    ...register("packagePrice", {
                      required: "Required",
                      min: { value: 1, message: "Must be > 0" }
                    }),
                    "data-ocid": "vendor_register.package_price.input"
                  }
                ),
                errors.packagePrice && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: errors.packagePrice.message })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "guestMin",
                    className: "text-foreground/80",
                    children: "Min Guests *"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "guestMin",
                    type: "number",
                    className: "mt-1 bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60",
                    placeholder: "50",
                    ...register("guestMin", {
                      required: "Required",
                      min: { value: 1, message: "Min 1" }
                    }),
                    "data-ocid": "vendor_register.guest_min.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "guestMax",
                    className: "text-foreground/80",
                    children: "Max Guests *"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "guestMax",
                    type: "number",
                    className: "mt-1 bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60",
                    placeholder: "500",
                    ...register("guestMax", {
                      required: "Required",
                      min: { value: 1, message: "Min 1" }
                    }),
                    "data-ocid": "vendor_register.guest_max.input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "inclusions",
                  className: "text-foreground/80",
                  children: "Package Inclusions"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "inclusions",
                  placeholder: "List what's included, one per line (e.g. Live chaat counter, Staff included, Setup & cleanup)",
                  rows: 3,
                  className: "mt-1 resize-none bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60",
                  ...register("inclusions"),
                  "data-ocid": "vendor_register.inclusions.textarea"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 p-6 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl block mb-2", children: "📷" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-primary", children: "Photos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "You can upload stall photos after your account is approved. High-quality photos significantly improve booking rates." })
          ] })
        ] }),
        step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-xl gold-gradient", children: "Banking & Agreement" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "For payments and platform agreement" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "holderName",
                  className: "text-foreground/80",
                  children: "Account Holder Name *"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "holderName",
                  className: "mt-1 bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60",
                  placeholder: "Name as on bank account",
                  ...register("holderName", { required: "Required" }),
                  "data-ocid": "vendor_register.holder_name.input"
                }
              ),
              errors.holderName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: errors.holderName.message })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "ifscCode",
                  className: "text-foreground/80",
                  children: "IFSC Code *"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "ifscCode",
                  className: "mt-1 uppercase bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60",
                  placeholder: "e.g. SBIN0001234",
                  ...register("ifscCode", { required: "Required" }),
                  "data-ocid": "vendor_register.ifsc_code.input"
                }
              ),
              errors.ifscCode && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: errors.ifscCode.message })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "accountNumber",
                className: "text-foreground/80",
                children: "Account Number *"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "accountNumber",
                type: "password",
                className: "mt-1 bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60",
                placeholder: "Bank account number",
                ...register("accountNumber", { required: "Required" }),
                "data-ocid": "vendor_register.account_number.input"
              }
            ),
            errors.accountNumber && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: errors.accountNumber.message })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "gstNumber", className: "text-foreground/80", children: "GST Number (optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "gstNumber",
                className: "mt-1 uppercase bg-background border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary/60",
                placeholder: "e.g. 22AAAAA0000A1Z5",
                ...register("gstNumber"),
                "data-ocid": "vendor_register.gst_number.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-primary/20 bg-card/50 p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-primary mb-2", children: "Platform Agreement" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground space-y-1.5 mb-4 max-h-32 overflow-y-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "By registering as a vendor on Stallo.in, you agree to:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "• Provide accurate and truthful information about your services" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "• Maintain availability and fulfill confirmed bookings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "• Follow the cancellation and refund policies" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "• Allow Stallo.in to collect a commission on each successful booking" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "• Maintain service quality and respond to customer feedback" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "• Comply with all applicable local laws and food safety regulations" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  id: "agreement",
                  checked: agreed,
                  onCheckedChange: (v) => setAgreed(v === true),
                  "data-ocid": "vendor_register.agreement.checkbox",
                  className: "border-primary/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "agreement",
                  className: "text-sm cursor-pointer",
                  children: "I agree to the Stallo.in vendor terms and platform agreement"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: "w-full bg-primary text-primary-foreground shadow-gold hover:bg-primary/90",
              size: "lg",
              disabled: !agreed || createVendor.isPending,
              "data-ocid": "vendor_register.submit_button",
              children: createVendor.isPending ? "Submitting Application..." : "Submit for Approval"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Your profile will be reviewed by our team within 1–3 business days." })
        ] }),
        step < 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-6 pt-4 border-t border-border/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => step > 1 && setStep((s) => s - 1),
              disabled: step === 1,
              className: "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary",
              "data-ocid": "vendor_register.prev_button",
              children: "Back"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: nextStep,
              className: "bg-primary text-primary-foreground shadow-gold hover:bg-primary/90",
              "data-ocid": "vendor_register.next_button",
              children: [
                "Next ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-4 ml-1" })
              ]
            }
          )
        ] })
      ] }) }) })
    ] }) })
  ] });
}
export {
  VendorRegisterPage as default
};

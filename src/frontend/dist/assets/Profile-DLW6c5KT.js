import { r as reactExports, j as jsxRuntimeExports, d as cn, h as ue } from "./index-BKL2lxtv.js";
import { D as DashboardLayout, U as User } from "./DashboardLayout-BbZ-GuY6.js";
import { u as useControllableState, a as Primitive, c as composeEventHandlers, b as createContextScope, B as Badge, X } from "./sheet-DdO1tWzN.js";
import { b as useComposedRefs, u as useAuth, B as Button } from "./useAuth-IAGlSf5h.js";
import { C as Card, b as CardHeader, a as CardContent } from "./card-BTgr7EEz.js";
import { I as Input } from "./input-wyOQctPS.js";
import { L as Label } from "./label-DYAxIx3c.js";
import { S as Separator } from "./separator-DcZXF9iz.js";
import { u as usePrevious, a as useSize } from "./index-hE9AgaEV.js";
import { S as Shield } from "./shield-CpxlDVvs.js";
import { M as MapPin } from "./map-pin-Dy2P6xtZ.js";
import { P as Plus } from "./plus-ijadTrik.js";
import { B as Bell } from "./bell-C54NI-fQ.js";
import "./index-BEBufsG6.js";
import "./index-IXOTxK3N.js";
import "./users-CPmCI05L.js";
import "./calendar-BcXsBU70.js";
import "./trending-up-OZEtAFop.js";
import "./heart-BBjtls9Z.js";
import "./index-Dsok7sFO.js";
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
const ADDRESSES_KEY = "stallo_saved_addresses";
const NOTIF_KEY = "stallo_notifications";
function getSavedAddresses() {
  try {
    return JSON.parse(localStorage.getItem(ADDRESSES_KEY) ?? "[]");
  } catch {
    return [];
  }
}
function getNotifPref() {
  return localStorage.getItem(NOTIF_KEY) !== "false";
}
function CustomerProfilePage() {
  const { principal, logout } = useAuth();
  const [addresses, setAddresses] = reactExports.useState(getSavedAddresses);
  const [newAddress, setNewAddress] = reactExports.useState("");
  const [notifications, setNotifications] = reactExports.useState(getNotifPref);
  const principalStr = (principal == null ? void 0 : principal.toString()) ?? "";
  const handleAddAddress = () => {
    const trimmed = newAddress.trim();
    if (!trimmed) return;
    if (addresses.includes(trimmed)) {
      ue.error("Address already saved");
      return;
    }
    const updated = [...addresses, trimmed];
    setAddresses(updated);
    localStorage.setItem(ADDRESSES_KEY, JSON.stringify(updated));
    setNewAddress("");
    ue.success("Address saved");
  };
  const handleRemoveAddress = (addr) => {
    const updated = addresses.filter((a) => a !== addr);
    setAddresses(updated);
    localStorage.setItem(ADDRESSES_KEY, JSON.stringify(updated));
  };
  const handleToggleNotifications = (value) => {
    setNotifications(value);
    localStorage.setItem(NOTIF_KEY, String(value));
    ue.success(value ? "Notifications enabled" : "Notifications disabled");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DashboardLayout,
    {
      title: "My Profile",
      subtitle: "Manage your account and preferences",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass-card border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-10 items-center justify-center rounded-full bg-primary/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg", children: "Identity" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Managed by Internet Identity" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "ml-auto border-secondary/40 text-secondary",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "size-3 mr-1" }),
                  "Verified"
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "principal", children: "Principal ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "principal",
                  readOnly: true,
                  value: principalStr,
                  className: "font-mono text-xs pr-20 bg-muted/40 focus:ring-primary/50 focus:border-primary/50",
                  "data-ocid": "profile.principal.input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  className: "absolute right-1 top-1/2 -translate-y-1/2 h-7 text-xs",
                  onClick: () => {
                    navigator.clipboard.writeText(principalStr);
                    ue.success("Principal ID copied");
                  },
                  "data-ocid": "profile.copy_principal.button",
                  children: "Copy"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5", children: "Your unique blockchain identity. No personal data is stored on our servers." })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass-card border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base", children: "Saved Addresses" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
            addresses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No saved addresses yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "profile.addresses.list", children: addresses.map((addr, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-3 py-2.5",
                "data-ocid": `profile.address.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-3.5 text-muted-foreground shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm truncate", children: addr })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "ghost",
                      size: "icon",
                      className: "size-7 shrink-0 text-muted-foreground hover:text-destructive",
                      onClick: () => handleRemoveAddress(addr),
                      "aria-label": "Remove address",
                      "data-ocid": `profile.remove_address.button.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3.5" })
                    }
                  )
                ]
              },
              addr
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Add a venue address...",
                  value: newAddress,
                  onChange: (e) => setNewAddress(e.target.value),
                  onKeyDown: (e) => e.key === "Enter" && handleAddAddress(),
                  className: "flex-1 focus:ring-primary/50 focus:border-primary/50",
                  "data-ocid": "profile.new_address.input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  onClick: handleAddAddress,
                  disabled: !newAddress.trim(),
                  "data-ocid": "profile.add_address.button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4 mr-1" }),
                    "Add"
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass-card border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "size-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base", children: "Notifications" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Email & booking notifications" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Receive updates about bookings, confirmations, and reminders" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                checked: notifications,
                onCheckedChange: handleToggleNotifications,
                "aria-label": "Toggle notifications",
                "data-ocid": "profile.notifications.switch"
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-destructive/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: "Sign Out" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Disconnect your Internet Identity from this session" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "destructive",
              size: "sm",
              onClick: logout,
              "data-ocid": "profile.logout.button",
              children: "Log Out"
            }
          )
        ] }) })
      ] })
    }
  );
}
export {
  CustomerProfilePage as default
};

import { j as jsxRuntimeExports, d as cn } from "./index-BKL2lxtv.js";
import { S as Star } from "./star-7jLtUNX7.js";
function StarRating({
  value,
  max = 5,
  interactive = false,
  onChange,
  size = "md",
  className
}) {
  const sizeClass = {
    sm: "size-3.5",
    md: "size-5",
    lg: "size-6"
  }[size];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn("flex items-center gap-0.5", className),
      role: interactive ? "radiogroup" : void 0,
      "aria-label": interactive ? "Star rating" : `${value} out of ${max} stars`,
      children: Array.from({ length: max }, (_, i) => {
        const filled = i + 1 <= Math.round(value);
        const partial = !filled && i < value && value > 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            role: interactive ? "radio" : void 0,
            "aria-checked": interactive ? i + 1 === Math.round(value) : void 0,
            "aria-label": interactive ? `${i + 1} star${i + 1 > 1 ? "s" : ""}` : void 0,
            disabled: !interactive,
            onClick: () => interactive && (onChange == null ? void 0 : onChange(i + 1)),
            className: cn(
              "transition-transform",
              interactive ? "cursor-pointer hover:scale-125 disabled:cursor-default" : "cursor-default"
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Star,
              {
                className: cn(
                  sizeClass,
                  "drop-shadow-sm",
                  filled || partial ? "fill-primary text-primary" : "fill-muted/40 text-muted-foreground/30"
                )
              }
            )
          },
          `star-${i + 1}`
        );
      })
    }
  );
}
export {
  StarRating as S
};

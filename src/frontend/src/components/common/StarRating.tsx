import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  max?: number;
  interactive?: boolean;
  onChange?: (value: number) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StarRating({
  value,
  max = 5,
  interactive = false,
  onChange,
  size = "md",
  className,
}: StarRatingProps) {
  const sizeClass = {
    sm: "size-3.5",
    md: "size-5",
    lg: "size-6",
  }[size];

  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role={interactive ? "radiogroup" : undefined}
      aria-label={interactive ? "Star rating" : `${value} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, i) => {
        const filled = i + 1 <= Math.round(value);
        const partial = !filled && i < value && value > 0;

        return (
          <button
            key={`star-${i + 1}`}
            type="button"
            role={interactive ? "radio" : undefined}
            aria-checked={interactive ? i + 1 === Math.round(value) : undefined}
            aria-label={
              interactive ? `${i + 1} star${i + 1 > 1 ? "s" : ""}` : undefined
            }
            disabled={!interactive}
            onClick={() => interactive && onChange?.(i + 1)}
            className={cn(
              "transition-transform",
              interactive
                ? "cursor-pointer hover:scale-110 disabled:cursor-default"
                : "cursor-default",
            )}
          >
            <Star
              className={cn(
                sizeClass,
                filled || partial
                  ? "fill-primary text-primary"
                  : "fill-muted text-muted-foreground/40",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

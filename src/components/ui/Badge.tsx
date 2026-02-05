import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
    {
        variants: {
            variant: {
                default: "bg-neutral-100 text-neutral-700",
                primary: "bg-primary-100 text-primary-700",
                secondary: "bg-secondary-100 text-secondary-700",
                accent: "bg-accent-100 text-accent-700",
                success: "bg-green-100 text-green-700",
                warning: "bg-yellow-100 text-yellow-700",
                error: "bg-red-100 text-red-700",
                outline: "border border-neutral-300 text-neutral-700 bg-transparent",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> { }

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant, ...props }, ref) => {
        return (
            <span
                ref={ref}
                className={cn(badgeVariants({ variant, className }))}
                {...props}
            />
        );
    }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };

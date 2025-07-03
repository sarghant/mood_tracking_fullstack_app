import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

const buttonVariants = cva("cursor-pointer focus:outline-none", {
  variants: {
    variant: {
      "nav-link": "flex items-center group transition-colors",
      "provider-login":
        "flex items-center ring-1 ring-neutral-300 shadow bg-neutral-50 hover:bg-slate-100 hover:shadow-md focus:bg-slate-100 focus:shadow-md transition",
    },
    size: {
      full: "w-full gap-3 lg:gap-4 p-2 lg:p-3 rounded-md",
      "full-rounded-circle": "w-full gap-4 lg:gap-5 p-2 lg:p-3 rounded-full",
    },
  },
  defaultVariants: {
    variant: "nav-link",
    size: "full",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

const buttonVariants = cva("cursor-pointer focus:outline-none", {
  variants: {
    variant: {
      "nav-link":
        "flex items-center hover:bg-slate-200 dark:hover:bg-gray-800 focus:bg-slate-200 dark:focus:bg-gray-800 group transition-colors",
      "provider-login":
        "flex items-center ring-1 ring-neutral-300 dark:ring-neutral-400/40 shadow bg-neutral-50 dark:bg-gray-700 hover:bg-slate-100 dark:hover:bg-gray-800/90 hover:shadow-md focus:bg-slate-100 dark:focus:bg-gray-800/90 focus:shadow-md transition",
      cta: "bg-teal-600 text-teal-50 text-shadow-2xs text-shadow-neutral-800 shadow ring-1 ring-teal-900/40 hover:bg-teal-700 focus:bg-teal-700 transition-colors",
    },
    size: {
      full: "w-full gap-3 lg:gap-4 p-2 lg:p-3 rounded-md",
      "full-rounded-circle": "w-full gap-4 lg:gap-5 p-2 lg:p-3 rounded-full",
      adaptive:
        "w-full sm:w-auto font-semibold text-nowrap sm:text-lg md:text-xl mx-auto sm:mx-0 py-2 px-6 sm:px-12 md:px-16 sm:py-3 md:py-4 rounded-md sm:rounded-lg",
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

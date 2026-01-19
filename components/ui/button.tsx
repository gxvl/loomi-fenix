import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center whitespace-nowrap rounded-xl text-base font-semibold text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full py-3",
  {
    variants: {
      variant: {
        default: "bg-accent-blue hover:bg-accent-blue/90",
        glowingdefault:
          "bg-accent-blue hover:bg-accent-blue/90 shadow-[0_0_20px_rgba(24,118,210,1)]",
        glowingcard:
          "bg-[#38B4CC] hover:bg-[#38B4CC]/90 shadow-[0_0_20px_#38B4CC]",
        secondary: "bg-secondary-blue hover:scale-105",
        grayblue: "bg-light-grayblue hover:scale-105",
        buttongray: "bg-button-gray hover:scale-105"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
